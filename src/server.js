const express = require('express')();
const server = require('http').createServer(express);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');
express.get('*', (req, res) => {
  res.sendFile(path.resolve('public') + req.path);
});
server.listen(3000, () => {
  console.log('listening to port3000');
});

io.on('connection', (socket) => {
  console.log('success!!!');
  socket.on('mes', (mes) => {
    console.log(mes);
  })
});
