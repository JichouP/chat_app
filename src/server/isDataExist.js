/**
 * Find a object from DB
 * @param {string} serverInfo
 * @param {string} collection
 * @param {Object} obj
 * @returns {Boolean} isFound?
 */
const isDataExist = (serverInfo, collection, obj) => {
  return new Promise((resolve, reject) => {
    serverInfo.client
      .db(serverInfo.db)
      .collection(collection)
      .find(obj)
      .toArray((err, docs) => {
        console.log(docs);
        if (docs[0] === undefined) {
          resolve(false);
        }
        resolve(true);
      });
  });
};

module.exports = isDataExist;
