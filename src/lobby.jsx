import React from 'react';
import io from 'socket.io-client';

const socket = io();

export default function Lobby(props) {
  const promise = new Promise((resolve, reject) => {
    socket.emit('RoomReq')
  });
  promise.then(() => {
    socket.on('RoomRes', (rooms) => {
      console.log(rooms);
    });
  })
  return (
    <div>{}</div>
  )
}
