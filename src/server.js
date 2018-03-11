const express = require('express')();
const server = require('http').createServer(express);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const shajs = require('sha.js');

//log
express.use(morgan('combined'));

//mongodb
const dbName = 'chatApp';

express.get('*', (req, res) => {
  res.sendFile(`${path.resolve('public')}${req.path}`);
});
server.listen(3000, () => {
  console.log('listening to port3000');
});

io.on('connection', (socket) => {
  console.log('Connection Success!!!');
  socket.on('Login', (ID, Pass) => {
    console.log(`[Login] ID:${ID}, PassWord:${Pass}`);
  });
  socket.on('Regist', (ID, Pass) => {
    console.log(`[Regist] ID:${ID}, PassWord:${Pass}, Hash:${shajs('sha256').update(Pass).digest('hex')}`);
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    assert.equal(err, null);
    console.log("Connect to MongoDB!");
    const db = client.db(dbName).collection('userData').insert({'ID': ID, 'Pass': shajs('sha256').update(Pass).digest('hex')});
    });
  })
});
