const readRoomList = require('./readRoomList');

module.exports = roomListRequest = async dbInfo => {
  const roomList = await readRoomList(dbInfo);
  io.on('RoomListRes', roomList);
};
