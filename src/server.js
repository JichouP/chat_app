const express = require('express')();
const server = require('http').createServer(express);
const socketio = require('socket.io');
const io = socketio(server, {
  pingInterval: 1000,
});
const path = require('path');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const shajs = require('sha.js');

//log
express.use(morgan('combined'));

//rooting
express.get('*', (req, res) => {
  res.sendFile(`${path.resolve('public')}${req.path}`);
});
server.listen(3000, () => {
  console.log('listening to port3000');
});

//mongodb
const dbName = 'chatApp';
const userCol = 'userData';

//storage of socketid
let socketid = {};

//connect to Mongo
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  /**
   * Insert a object to DB
   * @param {string} db
   * @param {string} collection
   * @param {Object} obj
   */
  const insertData = (db, collection, obj) => {
    client
      .db(db)
      .collection(collection)
      .insert(obj);
  };

  /**
   * Find a object from DB
   * @param {string} db
   * @param {string} collection
   * @param {Object} obj
   * @returns {Boolean} isFound?
   */
  const isDataExist = (db, collection, obj) => {
    new Promise((resolve, reject) => {
      client
        .db(db)
        .collection(collection)
        .find(obj)
        .toArray((err, docs) => {
          if (docs[0] === undefined) {
            resolve(false);
          }
          resolve(true);
        });
    });
  };

  /**
   * Create a user data
   * @param {string} ID
   * @param {string} Pass
   */
  const createUser = (ID, Pass) => {
    insertData(dbName, userCol, { ID: ID, Pass: Pass });
  };

  /**
   * Create a hash data
   * @param {string} data
   * @returns {string} Hash
   */
  const createHash = data =>
    shajs('sha256')
      .update(data)
      .digest('hex');

  //socket
  io.on('connection', socket => {
    console.log('Connection Success!!!');
    //Login
    socket.on('LoginReq', async (ID, Pass) => {
      console.log(`[Login] ID:${ID}, PassWord:${Pass}`);
      if (await isDataExist(dbName, userCol, { ID: ID, Pass: createHash(Pass) })) {
        console.log(`Found UserData! ID:${docs[0].ID}, Pass:${docs[0].Pass}`);
        socketid[socket.id] = ID;
        io.to(socket.id).emit('LoginSuccess');
        console.log(socketid);
      } else {
        console.log('Not Found!');
      }
    });
    //Regist
    socket.on('RegistReq', (ID, Pass) => {
      console.log(
        `[Regist] ID:${ID}, PassWord:${Pass}, Hash:${shajs('sha256')
          .update(Pass)
          .digest('hex')}`
      );
      const promise = new Promise(async (resolve, reject) => {
        if (await isDataExist(dbName, userCol, { ID: ID, Pass: createHash(Pass) })) {
          console.log('There are already same ID');
          io.to(socket.id).emit('RegistFailed');
        } else {
          resolve();
        }
      });
      promise.then(createUser(ID, createHash(Pass))).catch(() => {
        console.log('There are error');
      });
    });

    //Request Room in Lobby
    let rooms = ['room1', 'room2', 'room3'];
    socket.on('RoomReq', () => {
      io.to(socket.id).emit('RoomRes', rooms);
    });

    //Enter Room Request
    socket.on('EnterReq', value => {
      console.log(value);
      socket.join(value);
      io.to(value).emit('EnterRes', value);
    });
  });
});
