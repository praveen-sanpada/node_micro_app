require('dotenv').config({ path: '../.env' })

const express = require('express');
const cors = require('cors');

const http = require('http');
const path = require('path');

const RecognitionRoutes = require('./routes/RecognitionRoutes');

const RECOGNITION_PORT = process.env.RECOGNITION_PORT || 9003;

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

app.use('/recognition', RecognitionRoutes);

//============================== socket code starts from here ==============================

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Recognition disconnected to socket.');
    });
    socket.on('recognition', async function (data) {
        var room = `recognition`;
        socket.join(room);
        console.log("join", room);
    });
});

//============================== socket code ends from here ==============================

server.listen(RECOGNITION_PORT, () => {
    console.log(`Recognition server is running on port ${RECOGNITION_PORT}`);
});