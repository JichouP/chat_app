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
// express.use(morgan('combined'));

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
const roomCOl = 'roomData';

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
  const isUserExist = (db, collection, obj) => {
    return new Promise((resolve, reject) => {
      client
        .db(db)
        .collection(collection)
        .find(obj)
        .toArray((err, docs) => {
          console.log(docs);
          if (docs[0] === undefined) {
            resolve(false);
          }
          resolve(true);
        });
    });
  };

  const getUserData = (db, collection, obj) => {
    return new Promise((resolve, reject) => {
      client
        .db(db)
        .collection(collection)
        .find(obj)
        .toArray((err, docs) => {
          resolve(docs[0]);
        });
    });
  };

  /**
   * Create a user data
   * @param {string} ID
   * @param {string} Pass
   */
  const createUser = (ID, Pass) => {
    insertData(dbName, userCol, { ID: ID, Pass: Pass, Rooms: [] });
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
    console.log(socket.id);
    socket.on('disconnect', reason => {
      console.log(socket.id + ' is disconnected Reason: ' + reason);
    });
    //Login
    socket.on('LoginReq', async (ID, Pass) => {
      console.log(`[Login] ID:${ID}, PassWord:${Pass}`);
      if (await isUserExist(dbName, userCol, { ID: ID, Pass: createHash(Pass) })) {
        socketid[socket.id] = ID;
        io.to(socket.id).emit('LoginSuccess');
      } else {
        console.log('Not Found!');
      }
    });
    //Regist
    socket.on('RegistReq', (ID, Pass) => {
      console.log(`[Regist] ID:${ID}, Hash:${createHash(Pass)}`);
      new Promise(async (resolve, reject) => {
        if (await isUserExist(dbName, userCol, { ID: ID })) {
          console.log('There are already same ID');
          io.to(socket.id).emit('RegistFailed');
          resolve(false);
        } else {
          resolve(true);
        }
      })
        .then(isOk => {
          if (isOk) {
            createUser(ID, createHash(Pass));
          }
        })
        .catch(() => {
          console.log('There are error');
        });
    });

    //Request Room from Lobby
    socket.on('RoomReq', async () => {
      console.log(socket.id + 'これはテストです' + socketid[socket.id]);
      const rooms = await getUserData(dbName, userCol, { ID: socketid[socket.id] });
      const unreads = [10, 20, 30];
      console.log(rooms);
      io.to(socket.id).emit('RoomRes', rooms.Rooms, unreads);
    });

    //Enter Room Request
    socket.on('EnterReq', value => {
      console.log(value);
      socket.join(value);
      io.to(value).emit('EnterRes', value);
    });
  });
});
