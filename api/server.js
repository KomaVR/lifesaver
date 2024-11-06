const express = require('express');
const os = require('os');
const axios = require('axios');

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

// Function to get public IP address using an external API
const getPublicIP = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error("Error fetching public IP:", error);
        return null;
    }
};

// API route to get private or public IP
app.get('/private-ip', async (req, res) => {
    let ip = getPrivateIP();

    if (!ip) {
        console.log('Private IP not found. Using public IP...');
        ip = await getPublicIP();
    }

    if (ip) {
        res.json({ ip });
    } else {
        res.status(500).json({ error: "Could not detect IP" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
