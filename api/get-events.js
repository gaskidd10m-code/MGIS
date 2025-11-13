const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    try {
        const events = await kv.get('events');
        res.status(200).json(events);
    } catch (error) {
        console.error('Error reading events from KV store:', error);
        res.status(500).send('Error reading events');
    }
};
