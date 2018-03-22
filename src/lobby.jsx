import React from 'react';
import { SCENE_ROOM, SCENE_TITLE } from './scenes';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.lobby = [];
    this.state = { lobby: this.lobby }
    this.props.socket.on('EnterRes', (value) => {
      this.setState({ room: value });
      this.props.onChangeScene( SCENE_ROOM );
    });
    this.props.socket.emit('RoomReq');
    this.props.socket.on('RoomRes', (rooms) => {
      for(let value of rooms) {
        this.lobby.push(<div key={value}>
                        <label className="label label-default" htmlFor={value}>{value}</label>
                        <button id={value} onClick={() => {this.onClick(value)}}>Join</button>
                      </div>)
        this.setState({ lobby: this.lobby });
      }
    })
  }

  onClick(value) {
    this.props.socket.emit('EnterReq', value);
  }

  render() {
    return <div>{this.lobby}</div>
  }
}