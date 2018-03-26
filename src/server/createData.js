/**
 * Create new object to DB
 * @param {string} serverInfo
 * @param {string} collection
 * @param {Object} obj
 */
const createData = async (serverInfo, collection, obj) => {
  await serverInfo.client
    .db(serverInfo.db)
    .collection(collection)
    .insert(obj);
};
module.exports = createData;
