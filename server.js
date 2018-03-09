const express = require('express')();
const server = require('http').Server(express);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');
express.get('*', (req, res) => {
  res.sendFile(path.resolve('dist') + req.path);
});

io.on('connection', (socket) => {

});

express.listen(3000, () => {
  console.log('listening to port3000');
});
