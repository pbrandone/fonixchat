import React, { Component } from 'react';
import { Socket } from 'phoenix';
import './App.css';

import New from './New';
import Chat from './Chat';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchor: null,
      errors: false,
      connected: false,
      connecting: false,
      inputMessage: '',
      lastMessage: '',
      messages: [],
      username: '',
      room: ''
    };
  }

  connect(event) {
    event.preventDefault();

    if (!this.state.room || !this.state.username) {
      this.setState({
        errors: true
      });
    } else {
      this.socket = new Socket(`ws:${window.location.href.split(':')[1]}:4001/socket`,{});
      this.socket.connect();

      this.joinChannel(this.state.room);

      this.channel.on('new_order_accepted', res => {
        let messages = this.state.messages;
        messages.push(res);
        this.setState({
          messages
        });

        this.state.anchor.scrollIntoView();
      });
    }
  }

  handleLastMessage() {
    this.setState({
      inputMessage: this.state.lastMessage
    });
  }

  joinChannel(roomname) {
    this.setState({
      connecting: true
    });

    this.channel = this.socket.channel(
      `fonixchat:${roomname}`,
      { nickname: this.state.username }
    );

    this.channel.join()
    .receive('ok', () => {
      this.setState({
        connected: true,
        connecting: false
      });
    })
    .receive('error', () => {
      this.setState({
        connected: false,
        connecting: false
      });
    });
  }

  updateInputMessage(e) {
    this.setState({
      inputMessage: e.target.value
    });
  }

  updateUsername(e) {
    this.setState({
      errors: false,
      username: e.target.value
    });
  }

  updateRoom(e) {
    this.setState({
      errors: false,
      room: e.target.value
    });
  }

  sendMessage(event) {
    event.preventDefault();

    if (this.state.inputMessage) {
      this.channel.push('new_order', {
        'order_text': this.state.inputMessage
      });
      this.setState({
        lastMessage: this.state.inputMessage,
        inputMessage: ''
      });
    }
  }

  setAnchor(element) {
    this.setState({
      anchor: element
    });
  }

  render() {
    const status = this.state.connected
                   ? 'chat__status chat__status--connected'
                   : this.state.connecting
                   ? 'chat__status chat__status--connecting'
                   : 'chat__status';

    return (
      <div className="chat">
        <div className="chat__header">
          <h1 className="chat__header-title">
            Phoenix Channels
          </h1>
        </div>

        <div className={status}>
          {
            this.state.connected
            ? `Connected to ${this.state.room}`
            : this.state.connecting
            ? 'Connecting...'
            : 'Disconnected'
          }
        </div>

        {
          !this.state.connected ?
          <New
            connect={this.connect.bind(this)}
            room={this.state.room}
            username={this.state.username}
            updateUsername={this.updateUsername.bind(this)}
            updateRoom={this.updateRoom.bind(this)}
            errors={this.state.errors}
          />
          :
          <Chat
            setAnchor={this.setAnchor.bind(this)}
            inputMessage={this.state.inputMessage}
            messages={this.state.messages}
            sendMessage={this.sendMessage.bind(this)}
            handleLastMessage={this.handleLastMessage.bind(this)}
            updateInputMessage={this.updateInputMessage.bind(this)}
          />
        }
      </div>
    );
  }
}

export default App;
