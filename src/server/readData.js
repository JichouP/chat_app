/**
 * Read and return data from DB
 * Require 'async', 'aware'
 * @param {string} serverInfo
 * @param {string} collection
 * @param {Object} obj
 */
const readData = (serverInfo, collection, obj) => {
  return new Promise((resolve, reject) => {
    serverInfo.client
      .db(serverInfo.db)
      .collection(collection)
      .find(obj)
      .toArray((err, docs) => {
        resolve(docs);
      });
  });
};

module.exports = readData;