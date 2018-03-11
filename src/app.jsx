import io from 'socket.io-client';
import React from 'react';
import Title from './title';
import Login from './login';
import Regist from './regist';
import { SCENE_TITLE, SCENE_LOGIN, SCENE_REGIST } from './scenes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scene: SCENE_TITLE };
    this.onChangeScene = this.onChangeScene.bind(this);
  }
  onChangeScene(nextScene) {
    this.setState({ scene: nextScene });
  }
  render() {
    const { scene } = this.state;
    if (scene === SCENE_TITLE) {
      return <Title onChangeScene={this.onChangeScene} {...this.state}/>
    }else if (scene === SCENE_LOGIN) {
      return <Login onChangeScene={this.onChangeScene} {...this.state}/>
    }else if (scene === SCENE_REGIST) {
      return <Regist onChangeScene={this.onChangeScene} {...this.state}/>
    }
  }
}
