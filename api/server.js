const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('New WebSocket connection established');
    ws.on('message', message => {
        console.log('received: %s', message);
    });
});

console.log('WebSocket server running on ws://localhost:8080');
