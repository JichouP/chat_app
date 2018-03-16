import React from 'react';
import io from 'socket.io-client';
import { SCENE_ROOM, SCENE_TITLE } from './scenes';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.room = [];
    this.state = { data: this.room }
    this.socket = io();
    this.socket.on('hello', (mes) => {
      console.log(mes);
    });
    this.socket.emit('RoomReq');
    this.socket.on('RoomRes', (rooms) => {
      for(let value of rooms) {
        this.room.push(<div key={value}>
                        <label className="label label-default" htmlFor={value}>{value}</label>
                        <button id={value} onClick={() => {this.onClick(value)}}>Join</button>
                      </div>)
        this.setState({ data: this.room });
      }
    })
  }

  onClick(value) {
    this.socket.emit('EnterReq', value);
  }

  render() {
    return <div>{this.room}</div>
  }
}