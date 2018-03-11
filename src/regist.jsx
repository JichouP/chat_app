import React from 'react';
import io from 'socket.io-client';

export default function Regist(props) {
  const socket = io();
  return (
    <div>
      <input type="text" name="ID" id="ID"/>
      <label htmlFor="ID">ID:</label>
      <input type="password" name="PassWord" id="PassWord"/>
      <label htmlFor="PassWord">パスワード:</label>
      <input type="password" name='Re-PassWord' id="Re-PassWord"/>
      <label htmlFor="Re-PassWord">もういちど:</label>
      <button onClick={() => {
        const ID = document.getElementById('ID').value;
        const PassWord = document.getElementById('PassWord').value;
        const RePassWord = document.getElementById('RePassWord').value;
        if(PassWord===RePassWord && ID===/\w{5,}/ && PassWord===/\w{5,}/) {
          socket.emit('Register', ID, PassWord);
        }else if (PassWord!==RePassWord) {
          alert('パスワードが一致していません');
        }else {
          alert('IDとパスワードは少なくとも5文字以上の英数字で入力してください');
        }}}>
        登録
      </button>
    </div>
  )
}