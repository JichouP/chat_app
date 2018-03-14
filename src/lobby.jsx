import React from 'react';
import io from 'socket.io-client';
import { SCENE_ROOM, SCENE_TITLE } from './scenes';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.room = [];
    this.state = { data: this.room }
    this.socket = io();
  }

  onRoomReq() {
    this.socket.emit('RoomReq')
    this.socket.on('RoomRes', (rooms) => {
      for(let value of rooms) {
        this.room.push(<div key={value}><label className="label label-default" htmlFor={value}>{value}</label><button id={value}>Join</button></div>)
        this.setState({ data: this.room });
      }
    })
  }

  componentDidMount() {
    this.onRoomReq();
  }

  render() {
    return <div>{this.room}</div>
  }
}