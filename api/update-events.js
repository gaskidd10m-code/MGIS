const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const body = req.body;

    try {
        await kv.set('events', body);
        res.status(200).json({ message: 'Events updated successfully' });
    } catch (error) {
        console.error('Error saving events to KV store:', error);
        res.status(500).send('Error saving events');
    }
};
