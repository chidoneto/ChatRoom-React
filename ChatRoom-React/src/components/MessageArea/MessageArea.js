import React, { useState, useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import './MessageArea.css';


const MessageArea = (props) => {
  const { onMessageTyped, disabled } = props;

  const [ messageText, setMessageText ] = useState('');
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    onMessageTyped(messageText);
    setMessageText('');
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [disabled]);

  return (
    <form className="MessageArea" onSubmit={submitHandler} >
      <input ref={inputRef}
        placeholder={"Type a message..."}
        value={messageText} 
        onChange={event => setMessageText(event.target.value)}
        disabled={disabled} 
      >
      </input>
      <button disabled={disabled} >Send</button>
    </form>
  );
};

MessageArea.propTypes = {
  onMessageTyped: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default MessageArea;