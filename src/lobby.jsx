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
    this.props.socket.emit('RoomListReq');
    this.props.socket.on('RoomListRes', (rooms, unreads) => {
      if(rooms !== null){
        this.lobby = rooms.map((currentValue, index, array) => {
          return(
            <div key={index}>
              <a className="list-group-item" onClick={() => {this.onClick(currentValue)}}>{currentValue}<span className="badge">{unreads[index]}</span></a>
            </div>
          )
        })
      } else {
        this.lobby = (
          <div>
            <a className="list-group-item">参加可能な部屋がありません。部屋に参加するか、新しい部屋を作成してください</a>
          </div>
        )
      }
      this.setState({lobby: this.lobby});
    })
  }

  onClick(value) {
    this.props.socket.emit('EnterReq', value);
  }

  render() {
    return (
      <div className="container">
        <div className="lobby-top" >
          <div className="createroom" >
            <button className="btn btn-lg btn-primary" >既存の部屋に参加する</button>
            <button className="btn btn-lg btn-success">新しい部屋を作成する</button>
          </div>
        </div>
        <div className="lobby" >
          <form className="lobby" >
            {this.lobby}
          </form>
        </div>
      </div>
    )
  }
}