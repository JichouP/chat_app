/**
 * readRoomList
 * @param {*} serverInfo 
 */
const readRoomList = async (serverInfo, collection) => {
  return await serverInfo.client
    .db(serverInfo.db)
    .collection(collection)
    .find({})
    .toArray();
};

module.exports = readRoomList;
