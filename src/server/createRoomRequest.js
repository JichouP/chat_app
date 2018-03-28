const createHash = require('./createHash');
const isDataExist = require('./isDataExist');
const createData = require('./createData');
const addArrayElement = require('./addArrayElement');

const createRoomRequest = async (serverInfo, name, socketid) => {
  const CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let salt = '';
  for (let i = 0; i < 20; i++) {
    salt += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  const roomHash = createHash(salt + name);
  if (
    await isDataExist(dbName, roomCOl, {
      ID: roomHash,
    })
  ) {
    //Hash confricted
    serverInfo.io.to(socketid).emit('CreateRoomFailed');
    return -1;
  }
  await createData(serverInfo, serverInfo.roomCOl, {
    ID: roomHash,
    name: name,
    chat: [],
  });
  await addArrayElement(
    serverInfo,
    serverInfo.userCol,
    {
      ID: serverInfo.socketIDList[socketid],
    },
    'Rooms',
    roomHash
  );
  serverInfo.io.to(socketid).emit('CreateRoomSuccess');
};

module.exports = createRoomRequest;
