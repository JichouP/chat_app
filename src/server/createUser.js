const createData = require('./createData');

/**
 * Create a user data
 * @param {string} ID
 * @param {string} Pass
 */
const createUser = async(serverInfo, ID, Pass) => {
  await createData(serverInfo, dbName, userCol, {
    ID: ID,
    Pass: Pass,
    Rooms: [],
  });
};

module.exports = createUser;
