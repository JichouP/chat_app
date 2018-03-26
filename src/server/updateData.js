/**
 * Overwrite object
 * @param {Object} serverInfo
 * @param {string} collection
 * @param {Object} query
 * @param {Object} update
 * @param {Boolean} upsert
 */
const updateData = async (serverInfo, collection, query, update, upsert) => {
  await serverInfo.client
    .db(serverInfo.db)
    .collection(collection)
    .update(query, update, {
      upsert: upsert,
    });
};

module.exports = updateData;
