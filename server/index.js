const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const {Server } = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});


// Connection event

io.on('connection', (socket) => {
    console.log('New client connected');






    // Handling dicsconnect event
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

   
});


server.listen(8001, () => {
    console.log('Server is running on port 8001');
});