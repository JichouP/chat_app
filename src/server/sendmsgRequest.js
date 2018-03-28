const addArrayElement = require('./addArrayElement');
const getNow = require('./getNow');


const sendmsgRequest = async (serverInfo, msg, roomID, socketid) => {
  addArrayElement(
    serverInfo,
    serverInfo.roomCol,
    {
      ID: roomID,
    },
    'chat',
    {
      msg: msg,
      from: serverInfo.socketIDList[socketid],
      time: getNow(),
    }
  );
  serverInfo.io.to(socketid).emit('sendmsgSuccess');
  serverInfo.io.to(roomID).emit('newMessage');
};

module.exports = sendmsgRequest;