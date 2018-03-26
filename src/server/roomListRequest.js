const readRoomList = require('./readRoomList');

/**
 * roomListRequest
 * @param {Object} serverInfo
 */
const roomListRequest = async serverInfo => {
  const roomList = await readRoomList(serverInfo);
  io.on('RoomListRes', roomList);
};

module.exports = roomListRequest;
