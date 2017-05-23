import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './New.css';

class New extends Component {
  render() {
    const {
      errors,
      connect,
      updateRoom,
      updateUsername,
      username,
      room,
    } = this.props;

    return (
      <form
        className="new-chat"
        onSubmit={connect}
        >
        <div className="new-chat__input-group">
          <label className="new-chat__label">
            Join Channel
          </label>
          <input
            className="new-chat__input"
            type="text"
            placeholder="Type the channel name"
            value={room}
            onChange={updateRoom}
          />
        </div>
        
        <div className="new-chat__input-group">
          <label className="new-chat__label">
            Username
          </label>
          <input
            className="new-chat__input"
            type="text"
            placeholder="Type your desired username"
            value={username}
            onChange={updateUsername}
          />
        </div>

        {
          errors &&
          <div className="new-chat__error">
            Please type in both Channel and Username
          </div>
        }

        <div
          className="new-chat__submit"
          onClick={connect}
        >
          Join channel
        </div>

        <input type="submit" className="is-hidden" />

      </form>
    );
  }
}

New.propTypes = {
  errors: PropTypes.bool,
  connect: PropTypes.func,
  updateRoom: PropTypes.func,
  updateUsername: PropTypes.func,
  username: PropTypes.string,
  room: PropTypes.string
};

export default New;
