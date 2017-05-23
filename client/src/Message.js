import React from 'react';
import PropTypes from 'prop-types';

import './Message.css';

const Message = ({message, name, time}) => (
  <li className="chat-message">

    <div className="chat-message__info">
      <div className="chat-message__author">
        {name}
      </div>
      <div className="chat-message__time">
        {time}
      </div>
    </div>

    <div className="chat-message__message">
      {message}
    </div>

  </li>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};

export default Message;
