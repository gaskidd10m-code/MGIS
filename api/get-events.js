const { kv } = require('@vercel/kv');
const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
    try {
        let events = await kv.get('events');

        if (events === null || events === undefined) {
            // If no events in KV store, try to read from the JSON file
            const filePath = path.join(process.cwd(), 'public', 'events.json');
            try {
                const fileContent = await fs.readFile(filePath, 'utf8');
                events = JSON.parse(fileContent);
                // Store the initial events in the KV store for next time
                await kv.set('events', events);
            } catch (fileError) {
                // If the file doesn't exist, initialize with an empty array
                if (fileError.code === 'ENOENT') {
                    console.log('events.json not found, initializing with empty array.');
                    events = [];
                    await kv.set('events', events);
                } else {
                    // For other file-related errors, re-throw to be caught by the outer catch
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
