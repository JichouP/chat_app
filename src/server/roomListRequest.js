const readData = require('./readData');

/**
 * roomListRequest
 * @param {Object} serverInfo
 */
const roomListRequest = async (serverInfo, socketid) => {
  const userData = await readData(serverInfo, serverInfo.userCol, {
    ID: serverInfo.socketIDList[socketid],
  });
  console.log(userData);
  const roomList = userData[0].Rooms;
  const unreads = [10, 20, 30];
  serverInfo.io.to(socketid).emit('RoomListRes', roomList, unreads);
};

module.exports = roomListRequest;
