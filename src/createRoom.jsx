import React from 'react';
import { SCENE_LOBBY } from './scenes';

export default function CreateRoom(props) {
  return (
    <div>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <h1>新しい部屋を作る</h1>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="部屋の名前"
              autoFocus={true}
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={() => {
                props.socket.emit('createRoom', document.getElementById('name'));
              }}
            >
              部屋作成
            </button>
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
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
