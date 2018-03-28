import React from 'react';
import { SCENE_ROOM, SCENE_TITLE, SCENE_CREATEROOM } from './scenes';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lobby: [] };
  }
  componentDidMount() {
    this.props.socket.on('EnterSuccess', roomID => {
      this.setState({ room: roomID });
      this.props.onChangeScene(SCENE_ROOM);
    });
    this.props.socket.on('EnterFailed', () => {
      alert('入室できませんでした');
    })
    this.props.socket.emit('RoomListReq');
    this.props.socket.on('RoomListRes', (rooms, unreads) => {
      if (rooms !== null) {
        this.setState({
          lobby: rooms.map((currentValue, index, array) => {
            return (
              <div key={index}>
                <a
                  className="list-group-item"
                  onClick={() => {
                    this.onClick(currentValue)
                  }}
                >
                  {currentValue}
                  <span className="badge">{unreads[index]}</span>
                </a>
              </div>
            );
          }),
        });
      } else {
        this.setState({
          lobby: [
            <div key="norrom">
              <a className="list-group-item">
                参加可能な部屋がありません。部屋に参加するか、新しい部屋を作成してください
              </a>
            </div>,
          ],
        });
      }
    });
  }

  onClick(roomID) {
    this.props.socket.emit('EnterReq', roomID);
  }

  render() {
    return (
      <div className="container">
        <div className="lobby-top">
          <div className="createroom">
            <button
              className="btn btn-lg btn-primary"
              onClick={() => {
                this.props.onChangeScene(SCENE_CREATEROOM);
              }}
            >
              既存の部屋に参加する
            </button>
            <button
              onClick={() => {
                this.props.onChangeScene(SCENE_CREATEROOM);
              }}
              className="btn btn-lg btn-success"
            >
              新しい部屋を作成する
            </button>
          </div>
        </div>
        <div className="lobby">
          <form className="lobby">{this.state.lobby}</form>
        </div>
      </div>
    );
  }
}
