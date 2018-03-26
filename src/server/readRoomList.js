/**
 * readRoomList
 * @param {*} serverInfo
 */
const readRoomList = async (serverInfo, collection, id) => {
  return await serverInfo.client
    .db(serverInfo.db)
    .collection(collection)
    .find({ ID: id })
    .toArray();
};

module.exports = readRoomList;
