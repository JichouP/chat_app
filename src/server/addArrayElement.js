/**
 * Add array element to Object **DO NOT ALLOW DUPLICATES**
 * @param {string} serverInfo
 * @param {string} collection
 * @param {Object} query
 * @param {Object} add
 */
const addArrayElement = async (serverInfo, collection, query, array, element) => {
  await serverInfo.client
    .db(serverInfo.db)
    .collection(collection)
    .update(
      query,
      {
        $push: {array, element},
      }
    );
};

module.exports = addData;