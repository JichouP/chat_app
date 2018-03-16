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
      <form>
        <div className="input-group col-xs-4 form" >
          <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
          <input type="text" name="ID" id="ID" className="form-control" placeholder="ID" autoFocus={true}/>
        </div>
        <div className="input-group col-xs-4 form">
          <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
          <input type="password" name="PassWord" id="PassWord" className="form-control" placeholder="Password" />
        </div>
        <div className="input-group col-xs-4 form">
          <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
          <input type="password" name='ConfirmPassWord' id="ConfirmPassWord" className="form-control" placeholder="ConfirmPasswrod" />
        </div>
        <div><button className="btn btn-primary btn-lg" onClick={() => {
          const ID = document.getElementById('ID').value;
          const PassWord = document.getElementById('PassWord').value;
          const RePassWord = document.getElementById('ConfirmPassWord').value;
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
        </button>
        <button className="btn" onClick={() => {props.onChangeScene( SCENE_TITLE )}}>戻る</button></div>
      </form>
    </div>
  )
}