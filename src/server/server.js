import { promisify } from 'util';

const express = require('express')();
const server = require('http').createServer(express);
const socketio = require('socket.io');
const io = socketio(server, {
  pingInterval: 1000,
});
const path = require('path');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const shajs = require('sha.js');
const serverInfo = require('./serverInfo');
const roomListRequest = require('./roomListRequest');
const loginRequest = require('./loginRequest');

//log
// express.use(morgan('combined'));

//rooting
express.get('*', (req, res) => {
  res.sendFile(`${path.resolve('public')}${req.path}`);
});
server.listen(3000, () => {
  console.log('listening to port3000');
});

//mongodb
const dbUri = 'mongodb://localhost:27017';
const dbName = 'chatApp';
const userCol = 'userData';
const roomCOl = 'roomData';

const initSocketConnection = (socket, serverInfo) => {
  const socketIDList = {};
  const registSocketID = ID => {
    socketIDList[socket.id] = ID;
    return socket.id;
  };
  socket.on('LoginReq', (id, pass) => {
    loginRequest(serverInfo, id, pass, registSocketID);
  });
  socket.on('RoomListReq', () => {
    roomListRequest(serverInfo);
  });
};

const addSocketListeners = serverInfo => {
  serverInfo.io.on('connection', socket => {
    console.log('Connection Success!');
    initSocketConnection(socket, serverInfo);
  });
};

const init = async () => {
  const client = await MongoClient.connect(dbUri);
  addSocketListeners(new serverInfo(client, dbName, io));
};
init();
