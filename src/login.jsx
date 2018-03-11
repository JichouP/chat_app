import React from 'react';
import io from 'socket.io-client';
import { SCENE_TITLE } from './scenes';

export default function Login(props) {
  const socket = io();
  return (
    <div>
      <div><label htmlFor="ID">ID:</label>
      <input type="text" name="ID" id="ID"/></div>
      <div><label htmlFor="PassWord">パスワード:</label>
      <input type="password" name="PassWord" id="PassWord"/></div>
      <div><button onClick={() => {
        const ID = document.getElementById('ID').value;
        const PassWord = document.getElementById('PassWord').value;
        const RegExpPattern = /\w{5,}/;
        console.log(ID.match(RegExpPattern), PassWord.match(RegExpPattern));
        if(ID.match(RegExpPattern) && PassWord.match(RegExpPattern)) {
          socket.emit('Login', ID, PassWord);
        }else {
          alert('IDとパスワードは少なくとも5文字以上の英数字で入力してください');
        }}}>
        ログイン
      </button></div>
      <div><button onClick={() => {props.onChangeScene( SCENE_TITLE )}}>戻る</button></div>
    </div>
  )
}