module.exports = class ServerInfo {
  constructor(client, db, io) {
    this.client = client;
    this.db = db;
    this.userCol = 'userData';
    this.roomCol = 'roomData';
    this.io = io;
    this.socketIDList = {};
  }
};
