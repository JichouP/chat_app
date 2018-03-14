import React from 'react';
import io from 'socket.io-client';
import { SCENE_ROOM, SCENE_TITLE } from './scenes';

const socket = io();

export default function Lobby(props) {
  socket.emit('RoomReq')
  let room = [];
  let roomm = [];
  socket.on('RoomRes', (rooms) => {
    for(let value of rooms) {
      room.push(<div><label htmlFor={value}>{value}</label><button id={value}>Join</button></div>)
    }
  });
  return (<div>{room}</div>)
}
  