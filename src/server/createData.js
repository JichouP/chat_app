/**
 * Create new object to DB
 * @param {string} db
 * @param {string} collection
 * @param {Object} obj
 */
const createData = async (dbInfo, collection, obj) => {
  await dbInfo.client
    .db(dbInfo.db)
    .collection(collection)
    .insert(obj);
};
module.exports = createData;
