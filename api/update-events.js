// Edge Config is designed for high-read, low-write scenarios.
// Writing to Edge Config from a serverless function is not directly supported
// via a simple 'set' method like other storage solutions.
// Updates typically require using the Vercel API, which is not suitable for
// frequent, real-time updates from an admin panel.

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    // For Edge Config, updates must be done manually via the Vercel dashboard
    // or programmatically via the Vercel API (which is complex for this use case).
    res.status(501).send('Writing to Edge Config is not supported from this function. Please update manually via Vercel dashboard.');
};
