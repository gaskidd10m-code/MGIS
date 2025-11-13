const { get } = require('@vercel/edge-config');
const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
    try {
        let events = await get('events');

        if (!events) {
            // If no events in Edge Config, try to read from the JSON file
            // This is for initial seeding, but Edge Config cannot be written to from here.
            const filePath = path.join(process.cwd(), 'public', 'events.json');
            try {
                const fileContent = await fs.readFile(filePath, 'utf8');
                events = JSON.parse(fileContent);
                // IMPORTANT: Edge Config cannot be written to from a serverless function directly.
                // The user will need to manually update their Edge Config with this data
                // (e.g., by adding a key 'events' with the content of public/events.json).
            } catch (fileError) {
                if (fileError.code === 'ENOENT') {
                    console.log('events.json not found, returning empty array.');
                    events = [];
                } else {
                    throw fileError;
                }
            }
        }

        res.status(200).json(events);
    } catch (error) {
        console.error('Error in get-events API:', error);
        res.status(500).send('An error occurred while retrieving events.');
    }
};
