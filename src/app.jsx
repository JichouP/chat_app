import io from 'socket.io-client';
import React from 'react';
import Title from './title';
import Login from './login';
import Regist from './regist';
import Lobby from './lobby';
import Room from './room';
import CreateRoom from './createRoom';
import { SCENE_TITLE, SCENE_LOGIN, SCENE_REGIST, SCENE_LOBBY, SCENE_ROOM, SCENE_CREATEROOM } from './scenes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = { scene: SCENE_TITLE, socket: this.socket };
    this.onChangeScene = this.onChangeScene.bind(this);
  }
  onChangeScene(nextScene) {
    this.setState({ scene: nextScene });
  }
  render() {
    const { scene } = this.state;
    if (scene === SCENE_TITLE) {
      return <Title onChangeScene={this.onChangeScene} {...this.state} />;
    } else if (scene === SCENE_LOGIN) {
      return <Login onChangeScene={this.onChangeScene} {...this.state} />;
    } else if (scene === SCENE_REGIST) {
      return <Regist onChangeScene={this.onChangeScene} {...this.state} />;
    } else if (scene === SCENE_LOBBY) {
      return <Lobby onChangeScene={this.onChangeScene} {...this.state} />;
    } else if (scene === SCENE_ROOM) {
      return <Room onChangeScene={this.onChangeScene} {...this.state} />;
    } else if (scene === SCENE_CREATEROOM) {
      return <CreateRoom onChangeScene={this.onChangeScene} {...this.state} />;
    }
  }
}
