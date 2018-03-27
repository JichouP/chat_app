import React from 'react';
import { lifecycle } from 'recompose';
import { SCENE_TITLE, SCENE_LOBBY } from './scenes';

export function Login(props) {
  return (
    <div className="container">
      <div className="signin">
        <form
          className="signin"
          onSubmit={e => {
            e.preventDefault();
            const ID = document.getElementById('ID').value;
            const PassWord = document.getElementById('PassWord').value;
            const RegExpPattern = /\w{5,}/;
            if (ID.match(RegExpPattern) && PassWord.match(RegExpPattern)) {
              props.socket.emit('LoginRequest', ID, PassWord);
            } else {
              alert('IDとパスワードは少なくとも5文字以上の英数字で入力してください');
            }
          }}
        >
          <h1>Login</h1>
          <div className="input-group col-lg-12 form">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user" />
            </span>
            <input type="text" name="ID" id="ID" className="form-control" placeholder="ID" autoFocus={true} />
          </div>
          <div className="input-group col-lg-12 form">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock" />
            </span>
            <input type="password" name="PassWord" id="PassWord" className="form-control" placeholder="Password" />
          </div>
          <div className="col-lg-12">
            <button type="submit" className="btn btn-primary btn-lg">
              ログイン
            </button>
            <button
              className="btn btn-lg"
              onClick={() => {
                props.onChangeScene(SCENE_TITLE);
              }}
            >
              戻る
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default lifecycle({
  componentDidMount() {
    this.props.socket.on('LoginSuccess', () => {
      return this.props.onChangeScene(SCENE_LOBBY);
    });
  },
})(Login);
