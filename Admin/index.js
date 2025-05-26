require('dotenv').config({ path: '../.env' })

const express = require('express');
const cors = require('cors');

const http = require('http');
const path = require('path');

const AdminRoutes = require('./routes/AdminRoutes');

const ADMIN_PORT = process.env.ADMIN_PORT || 9001;

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

app.use('/admin', AdminRoutes);

//============================== socket code starts from here ==============================

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('Admin disconnected to socket.');
    });
    socket.on('admin', async function (data) {
        var room = `admin`;
        socket.join(room);
        console.log("join", room);
    });
});

//============================== socket code ends from here ==============================

server.listen(ADMIN_PORT, () => {
    console.log(`Admin server is running on port ${ADMIN_PORT}`);
});