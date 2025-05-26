require('dotenv').config({ path: '../.env' })

const express = require('express');
const cors = require('cors');

const http = require('http');
const path = require('path');

const DetectionRoutes = require('./routes/DetectionRoutes');

const DETECTION_PORT = process.env.DETECTION_PORT || 9004;

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

app.use('/detection', DetectionRoutes);

//============================== socket code starts from here ==============================

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Detection disconnected to socket.');
    });
    socket.on('detection', async function (data) {
        var room = `detection`;
        socket.join(room);
        console.log("join", room);
    });
});

//============================== socket code ends from here ==============================

server.listen(DETECTION_PORT, () => {
    console.log(`Detection server is running on port ${DETECTION_PORT}`);
});