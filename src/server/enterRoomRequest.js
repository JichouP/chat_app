const isDataExist = require('./isDataExist');

const enterRoomRequest = async (serverInfo, roomID, socket) => {
  if(await isDataExist(serverInfo, serverInfo.roomCol, { ID: roomID })){
    socket.join(roomID);
    io.to(socket.id).emit('EnterSuccess', roomID);
  }else{
    io.to(socket.id).emit('EnterFailed');
  };
};
