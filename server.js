const express = require('express')();
const server = require('http').Server(express);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');
express.get('*', (req, res) => {
  res.sendFile(path.resolve() + req.path);
});

io.on('connection', (socket) => {

});

express.listen(3000);
