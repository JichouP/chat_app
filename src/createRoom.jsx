import React from 'react';
import {} from './scenes';

export default function CreateRoom(props) {
  return (
    <div>
      <div>
        <form action="">
          <h1>新しい部屋を作る</h1>
          <div>
            <input type="text" name="name" id="name" className="form-control" placeholder="部屋の名前" autoFocus={true} />
          </div>
          <div>
            <button onClick={
              props.socket.emit('createRoom', document.getElementById('name'))
              
            } >部屋作成</button>
            <button>キャンセル</button>
          </div>
        </form>
      </div>
    </div>
  );
}
