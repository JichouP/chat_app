import React from 'react'
import { SCENE_LOGIN } from './scenes'
import { SCENE_REGIST } from './scenes'


export default function Title(props) {
  return (
    <div>
      <h1>Welcome to Chat App!</h1>
      <button type="button" className="btn btn-primary btn-lg" onClick={() => {props.onChangeScene(SCENE_LOGIN)}}>ログイン</button>
      <button type="button" className="btn btn-primary btn-lg" onClick={() => {props.onChangeScene(SCENE_REGIST)}}>登録</button>
    </div>
  )
}