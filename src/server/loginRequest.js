const isUserExist = require('./isUserExist');

/**
 * loginRequest
 * @param {Object} serverInfo
 * @param {string} id
 * @param {string} pass
 * @param {string} registSocketID
 */
const loginRequest = async (serverInfo, id, pass, registSocketID) => {
  if (await isUserExist(serverInfo, 'userData', {ID: id})) {
    const id = registSocketID();
    serverInfo.io.to(id).emit('LoginSuccess');
  } else {
    console.log('not found');
  }
};

module.exports = loginRequest;
