import React from 'react';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mes: {} }
  }

  componentDidMount() {
    this.props.socket.on('msgUpdate', msg => {
      
    })
  }

  render() {
    return <div></div>
  }
}