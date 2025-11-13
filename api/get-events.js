const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const filePath = path.resolve(__dirname, '..', 'events.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading events file');
            return;
        }
        res.status(200).json(JSON.parse(data));
    });
};
