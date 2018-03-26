/**
 * Add data to Object
 * @param {string} serverInfo
 * @param {string} collection
 * @param {Object} query
 * @param {Object} add
 * @param {Boolean} upsert
 */
const addData = async (serverInfo, collection, query, add, upsert) => {
  await serverInfo.client
    .db(serverInfo.db)
    .collection(collection)
    .update(
      query,
      {
        $set: add,
      },
      {
        upsert: upsert,
      }
    );
};

module.exports = addData;
