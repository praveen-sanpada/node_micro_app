require('dotenv').config({ path: '../.env' })

const express = require('express');
const cors = require('cors');

const http = require('http');
const path = require('path');

const ReaderRoutes = require('./routes/ReaderRoutes');

const READER_PORT = process.env.READER_PORT || 9005;

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        headers: "Origin,Content-Type,Accept, Authorization, Content-Length, X-Requested-With"
    }
});

global.io = io;

app.use('/reader', ReaderRoutes);

//============================== socket code starts from here ==============================

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Reader disconnected to socket.');
    });
    socket.on('reader', async function (data) {
        var room = `reader`;
        socket.join(room);
        console.log("join", room);
    });
});

//============================== socket code ends from here ==============================

server.listen(READER_PORT, () => {
    console.log(`Reader server is running on port ${READER_PORT}`);
});