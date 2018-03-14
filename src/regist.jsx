import React from 'react';
import io from 'socket.io-client';
import { SCENE_TITLE } from './scenes'

export default function Regist(props) {
  const socket = io();
  socket.on('RegistFailed', () => {
    alert('This ID is already registed');
  });
  return (
    <div>
      <div><label htmlFor="ID">ID:</label>
      <input type="text" name="ID" id="ID"/></div>
      <div><label htmlFor="PassWord">パスワード:</label>
      <input type="password" name="PassWord" id="PassWord"/></div>
      <div><label htmlFor="RePassWord">もういちど:</label>
      <input type="password" name='RePassWord' id="RePassWord"/></div>
      <div><button onClick={() => {
        const ID = document.getElementById('ID').value;
        const PassWord = document.getElementById('PassWord').value;
        const RePassWord = document.getElementById('RePassWord').value;
        const RegExpPattern = /\w{5,}/;
        if(PassWord!==RePassWord) {
          alert('パスワードが一致していません')
        }else if (ID.match(RegExpPattern) && PassWord.match(RegExpPattern)) {
          socket.emit('RegistReq', ID, PassWord);
        }else {
          alert('IDとパスワードは少なくとも5文字以上の英数字で入力してください');
        }
        socket.on('RegistSuc', () => {
          
        })
      }}>
        登録
      </button></div>
      <div><button onClick={() => {props.onChangeScene( SCENE_TITLE )}}>戻る</button></div>
    </div>
  )
}