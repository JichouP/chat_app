import React from 'react';
import io from 'socket.io-client';

export default function Regist(props) {
  const socket = io();
  return (
    <div>
      <div><label htmlFor="ID">ID:</label>
      <input type="text" name="ID" id="ID"/></div>
      <div><label htmlFor="PassWord">パスワード:</label>
      <input type="password" name="PassWord" id="PassWord"/></div>
      <div><label htmlFor="Re-PassWord">もういちど:</label>
      <input type="password" name='Re-PassWord' id="Re-PassWord"/></div>
      <div><button onClick={() => {
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
      </button></div>
    </div>
  )
}