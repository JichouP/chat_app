import React from 'react';
import io from 'socket.io-client';
import { SCENE_TITLE, SCENE_LOBBY } from './scenes';

export default function Login(props) {
  const socket = io();
  socket.on('LoginSuccess', () => {
    return props.onChangeScene( SCENE_LOBBY );
  });
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const ID = document.getElementById('ID').value;
        const PassWord = document.getElementById('PassWord').value;
        const RegExpPattern = /\w{5,}/;
        if(ID.match(RegExpPattern) && PassWord.match(RegExpPattern)) {
          socket.emit('LoginReq', ID, PassWord);
        }else {
          alert('IDとパスワードは少なくとも5文字以上の英数字で入力してください');
      }}}>
        <div className="input-group col-xs-4 form">
          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
          <input type="text" name="ID" id="ID" className="form-control" placeholder="ID" autoFocus={true}/>
        </div>
        <div className="input-group col-xs-4 form" >
          <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
          <input type="password" name="PassWord" id="PassWord" className="form-control" placeholder="Password" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-lg">
            ログイン
          </button>
          <button className="btn" onClick={() => {props.onChangeScene( SCENE_TITLE )}}>戻る</button>
        </div>
      </form>
     
    </div>
  )
}