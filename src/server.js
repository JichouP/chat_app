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
  //Login
  socket.on('LoginReq', (ID, Pass) => {
    console.log(`[Login] ID:${ID}, PassWord:${Pass}`);
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
      assert.equal(err, null);
      console.log("Connect to MongoDB!");
      client.db(dbName).collection('userData').find({'ID': ID, 'Pass': shajs('sha256').update(Pass).digest('hex')}).toArray((err, docs) => {
        if (docs[0] === undefined) {
          console.log('Not Found!');
        }else{
          console.log(`Found UserData! ID:${docs[0].ID}, Pass:${docs[0].Pass}`);
        }
      })
      client.close();
    });
    
  });
  //Regist
  socket.on('RegistReq', (ID, Pass) => {
    console.log(`[Regist] ID:${ID}, PassWord:${Pass}, Hash:${shajs('sha256').update(Pass).digest('hex')}`);
    const promise = new Promise((resolve, reject) => {
      MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        assert.equal(err, null);
        console.log("Connect to MongoDB!");
        client.db(dbName).collection('userData').find({'ID': ID, 'Pass': shajs('sha256').update(Pass).digest('hex')}).toArray((err, docs) => {
          if (docs[0] !== undefined) {
            console.log('There are already same ID');
          }else {
            resolve();
          }
        client.close();
        })
      });
    })
    promise.then(() => {
      MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        assert.equal(err, null);
        console.log("Connect to MongoDB!");
        client.db(dbName).collection('userData').insert({'ID': ID, 'Pass': shajs('sha256').update(Pass).digest('hex')});
        client.close();
      })
    }).catch(() => {
      console.log('There are error');
    });
  })
});
