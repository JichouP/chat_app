const readRoomList = require('./readRoomList');

/**
 * roomListRequest
 * @param {Object} serverInfo
 */
const roomListRequest = async (serverInfo, socketid) => {
  const userData = await readRoomList(serverInfo, 'userData', serverInfo.socketIDList[socketid]);
  const roomList = userData.Rooms;
  const unreads = [10, 20, 30]
  serverInfo.io.to(socketid).emit('RoomListRes', roomList, unreads);
};

module.exports = roomListRequest;
