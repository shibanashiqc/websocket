
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

console.log('WebSocket server running on ws://localhost:3000');

const clients = new Set();

server.on('connection', (socket) => {
  clients.add(socket);
  console.log('New client connected. Total clients:', clients.size);

  socket.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast the message to all clients
    for (const client of clients) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('Client disconnected. Total clients:', clients.size);
  });
});
