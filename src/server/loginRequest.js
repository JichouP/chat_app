const isUserExist = require('./isUserExist');

/**
 * loginRequest
 * @param {Object} serverInfo
 * @param {string} id
 * @param {string} pass
 * @param {function} registSocketID
 */
const loginRequest = async (serverInfo, id, pass, registSocketID) => {
  if (await isUserExist(serverInfo, 'userData', {ID: id})) {
    const socketid = registSocketID(id);
    serverInfo.io.to(socketid).emit('LoginSuccess');
  } else {
    console.log('not found');
  }
};

module.exports = loginRequest;
