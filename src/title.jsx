import React from 'react'
import { SCENE_LOGIN } from './scenes'
import { SCENE_REGIST } from './scenes'


export default function Title(props) {
  return (
    <div className="container" >
      <div className="jumbotron" >
        <h1>Chat App</h1>
        <h2>Welcome to Chat App!</h2>
      </div>
      <div className="row" >
        <div className="col-lg-2" ></div>
        <div className="col-lg-4" >
          <button type="button" className="btn btn-primary btn-block btn-title" onClick={() => {props.onChangeScene(SCENE_LOGIN)}}>ログイン</button>
        </div>
        <div className="col-lg-4" >
          <button type="button" className="btn btn-primary btn-block btn-title" onClick={() => {props.onChangeScene(SCENE_REGIST)}}>登録</button>
        </div>
      </div>
    </div>
  )
}