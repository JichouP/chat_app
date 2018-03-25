module.exports = loginRequest = async (dbInfo, id, pass, registSocketID) => {
  if (await isUserExist(id, pass)) {
    const id = registSocketID();
    io.to(id).emit('LoginSuccess');
  } else {
    console.log('not found');
  }
};
