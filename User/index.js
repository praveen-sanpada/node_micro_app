require('dotenv').config({ path: '../.env' })

const express = require('express');
const cors = require('cors');

const http = require('http');
const path = require('path');

const UserRoutes = require('./routes/UserRoutes');

const USER_PORT = process.env.USER_PORT || 9002;

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

app.use('/user', UserRoutes);

//============================== socket code starts from here ==============================

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('User disconnected to socket.');
    });
    socket.on('user', async function (data) {
        var room = `user`;
        socket.join(room);
        console.log("join", room);
    });
});

//============================== socket code ends from here ==============================

server.listen(USER_PORT, () => {
    console.log(`User server is running on port ${USER_PORT}`);
});