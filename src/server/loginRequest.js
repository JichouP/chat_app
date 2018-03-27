const isUserExist = require('./isUserExist');
const createHash = require('./createHash');

/**
 * loginRequest
 * @param {Object} serverInfo
 * @param {string} ID
 * @param {string} pass
 * @param {function} registSocketID
 */
const loginRequest = async (serverInfo, ID, Pass, registSocketID) => {
  if (await isUserExist(serverInfo, serverInfo.userCol, { ID: ID,  Pass: createHash(Pass)})) {
    const socketid = registSocketID(ID);
    serverInfo.io.to(socketid).emit('LoginSuccess');
  } else {
    console.log('not found');
  }
};

module.exports = loginRequest;
