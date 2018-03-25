module.exports = getRoomList = async dbInfo => {
  return await dbInfo.client
    .db(dbInfo.db)
    .collection(USER_LIST_COLLECTION)
    .find({})
    .toArray();
};
