import React from 'react';
import { SCENE_LOBBY } from './scenes';

export default function CreateRoom(props) {
  return (
    <div className="container">
      <div className="signin" >
        <form
          className="signin"
          onSubmit={e => {
            e.preventDefault();
            const name_value = document.getElementById('name').value;
            const RegExpPattern = /\w{1,}/;
            if (name_value.match(RegExpPattern)) {
              props.socket.emit('CreateRoomReq', name_value);
            } else {
              alert('IDとパスワードは少なくとも1文字以上の英数字で入力してください');
            }
          }}
        >
          <h1>新しい部屋を作る</h1>
          <div className="input-group col-lg-12 form" >
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="部屋の名前"
              autoFocus={true}
            />
          </div>
          <div className="col-lg-12" >
            <button
              type="submit"
              className="btn btn-primary btn-lg"
            >
              部屋作成
            </button>
            <button
              type="button"
              className="btn btn-lg"
              onClick={() => {
                props.onChangeScene(SCENE_LOBBY);
              }}
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
