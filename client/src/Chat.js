import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

import './Chat.css';

class Chat extends Component {
  componentDidMount() {
    this.messageInput.focus();
    this.props.setAnchor(this.fakeAnchor);
  }

  render() {
    const {
      inputMessage,
      messages,
      sendMessage,
      updateInputMessage,
      handleLastMessage
    } = this.props;

    return (
      <div className="messages">
        <ul className="messages__list">
          {
            messages.length > 0 ?
            messages.map(message => {
              const timestamp = message.date_time;
              const date = new Date(timestamp * 1000);
              const hours = date.getHours();
              const minutes = date.getMinutes();
              return (
                <Message
                  message={message.text}
                  name={message.nickname}
                  time={`${hours}:${minutes}`}
                  key={message.id}
                />
              );
            }) :
            <div className="messages__empty">
              No messages here
            </div>
          }
          <div
            className="messages__fake-anchor"
            ref={element => this.fakeAnchor = element}
          />
        </ul>

        <div className="messages__send">
          <form
            autoComplete="off"
            onSubmit={sendMessage}
            onKeyDown={e => {
              e.key === 'ArrowUp' && handleLastMessage();
            }}
            >
            <input
              className="messages__input"
              type="text"
              ref={element => this.messageInput = element}
              placeholder="Type your message here"
              value={inputMessage}
              onChange={updateInputMessage}
            />
          </form>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  inputMessage: PropTypes.string,
  messages: PropTypes.array,
  sendMessage: PropTypes.func,
  handleLastMessage: PropTypes.func,
  setAnchor: PropTypes.func,
  updateInputMessage: PropTypes.func
};

export default Chat;
