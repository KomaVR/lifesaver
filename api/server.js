const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

// Function to get private IP address
const getPrivateIP = () => {
    const networkInterfaces = os.networkInterfaces();
    let privateIP = '';

    for (let iface in networkInterfaces) {
        for (let alias of networkInterfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                privateIP = alias.address;
                break;
            }
        }
        if (privateIP) break;
    }

    return privateIP;
};

// API route to get private IP
app.get('/private-ip', (req, res) => {
    res.json({ ip: getPrivateIP() });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
