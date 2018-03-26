module.exports = class ServerInfo {
  constructor(client, db, io) {
    this.client = client;
    this.db = db;
    this.io = io;
  }
};
