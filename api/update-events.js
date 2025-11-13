const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            const filePath = path.resolve(__dirname, '..', 'events.json');
            fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
                if (err) {
                    res.status(500).send('Error writing events file');
                    return;
                }
                res.status(200).send('Events updated successfully');
            });
        } catch (e) {
            res.status(400).send('Invalid JSON');
        }
    });
};
