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
    this.props.socket.on('RoomRes', (rooms, unreads) => {
      this.lobby = rooms.map((currentValue, index, array) => {
        return(
          <div key={index}>
            <a className="list-group-item" onClick={() => {this.onClick(currentValue)}}>{currentValue}<span className="badge">{unreads[index]}</span></a>
          </div>
        )
      })
      this.setState({lobby: this.lobby});
    })
  }

  onClick(value) {
    this.props.socket.emit('EnterReq', value);
  }

  render() {
    return (
      <div className="container">
        <div className="lobby" >
          <form className="lobby" >
            {this.lobby}
          </form>
        </div>
      </div>
    )
  }
}