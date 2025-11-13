const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const body = req.body;

    try {
        const { url } = await put('events.json', JSON.stringify(body, null, 2), {
            access: 'public',
            contentType: 'application/json',
            allowOverwrite: true
        });
        res.status(200).json({ message: 'Events updated successfully', url });
    } catch (error) {
        console.error('Error uploading events to blob store:', error);
        res.status(500).send('Error saving events');
    }
};
