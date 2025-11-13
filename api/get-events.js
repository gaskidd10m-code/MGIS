const { head, put } = require('@vercel/blob');
const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
    const blobUrl = `${process.env.BLOB_URL}/events.json`;

    try {
        const blobInfo = await head(blobUrl).catch(error => {
            // head throws an error for 404 not found, so we catch it and return null
            if (error.status === 404) {
                return null;
            }
            throw error; // re-throw other errors
        });

        if (blobInfo) {
            // Blob exists, fetch and return it
            const response = await fetch(blobUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch blob: ${response.statusText}`);
            }
            const events = await response.json();
            return res.status(200).json(events);
        } else {
            // Blob doesn't exist, seed it from the file
            const filePath = path.join(process.cwd(), 'public', 'events.json');
            try {
                const fileContent = await fs.readFile(filePath, 'utf8');
                // Put the file content into the blob store
                await put('events.json', fileContent, {
                    access: 'public',
                    contentType: 'application/json'
                });
                return res.status(200).json(JSON.parse(fileContent));
            } catch (fileError) {
                if (fileError.code === 'ENOENT') {
                    // File doesn't exist, create an empty blob
                    const emptyEvents = '[]';
                    await put('events.json', emptyEvents, {
                        access: 'public',
                        contentType: 'application/json'
                    });
                    return res.status(200).json([]);
                } else {
                    throw fileError;
                }
            }
        }
    } catch (error) {
        console.error('Error in get-events API:', error);
        res.status(500).send('An error occurred while retrieving events.');
    }
};
