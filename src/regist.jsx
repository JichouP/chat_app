import React from 'react';
import { SCENE_TITLE } from './scenes'

export default function Regist(props) {
  props.socket.on('RegistFailed', () => {
    alert('This ID is already registed');
  });
  return (
    <div className="container" >
      <div className="signin" >
        <form className="signin" onSubmit={(e) => {
          e.preventDefault();
          const ID = document.getElementById('ID').value;
          const PassWord = document.getElementById('PassWord').value;
          const RePassWord = document.getElementById('ConfirmPassWord').value;
          const RegExpPattern = /\w{5,}/;
          if(PassWord!==RePassWord) {
            alert('パスワードが一致していません')
          }else if (ID.match(RegExpPattern) && PassWord.match(RegExpPattern)) {
            props.socket.emit('RegistReq', ID, PassWord);
          }else {
            alert('IDとパスワードは少なくとも5文字以上の英数字で入力してください');
          }
          props.socket.on('RegistSuc', () => {
            props.onChangeScene( SCENE_TITLE );
          })
        }}>
          <h1>Regist</h1>
          <div className="input-group col-lg-12 form" >
            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
            <input type="text" name="ID" id="ID" className="form-control" placeholder="ID" autoFocus={true}/>
          </div>
          <div className="input-group col-lg-12 form">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
            <input type="password" name="PassWord" id="PassWord" className="form-control" placeholder="Password" />
          </div>
          <div className="input-group col-lg-12 form">
            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
            <input type="password" name='ConfirmPassWord' id="ConfirmPassWord" className="form-control" placeholder="ConfirmPasswrod" />
          </div>
          <div className="col-lg-12" ><button type="submit" className="btn btn-primary btn-lg">
            登録
          </button>
          <button className="btn btn-lg" onClick={() => {props.onChangeScene( SCENE_TITLE )}}>戻る</button></div>
        </form>
      </div>
    </div>
  )
}