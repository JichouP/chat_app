const readRoomList = require('./readRoomList');

/**
 * roomListRequest
 * @param {Object} serverInfo
 */
const roomListRequest = async (serverInfo, socketid) => {
  const roomList = await readRoomList(serverInfo, 'userData');
  serverInfo.io.to(socketid).emit('RoomListRes', roomList);
};

module.exports = roomListRequest;
