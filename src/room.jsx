import React from 'react';
import io from 'socket.io-client';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.mes = {};
    this.state = { mes: this.mes }
    this.socket = io();
  }

  render() {
    return <div></div>
  }
}