const createHash = require('./createHash');
const isUserExist = require('./isUserExist');

const createRoomRequest = async (serverInfo, name) => {
  const CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let salt = '';
  for (let i = 0; i < 20; i++) {
    salt += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  const roomHash = createHash(salt + name);
  if (
    await isUserExist(dbName, roomCOl, {
      type: 'meta',
      ID: roomHash,
    })
  ) {
    return 'room';
  } else {
    return (roomHash);
  }
}

module.exports = createRoomRequest;
