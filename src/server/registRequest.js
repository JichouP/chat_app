const isDataExist = require('./isDataExist');
const createHash = require('./createHash');
const createUser = require('./createUser');

const registRequest = async (serverInfo, ID, Pass, socketID) => {
  if (
    await isDataExist(serverInfo, 'userData', {
      ID: ID,
    })
  ) {
    serverInfo.io.to(socketID).emit('RegistFailed');
  } else {
    await createUser(serverInfo, ID, createHash(Pass));
    serverInfo.io.to(socketID).emit('RegistSuccess');
  }
};

module.exports = registRequest;
