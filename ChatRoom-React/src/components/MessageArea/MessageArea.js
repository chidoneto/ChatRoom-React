import React, { useState, useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import './MessageArea.css';


const MessageArea = (props) => {
  const { className, placeHolder, actionText, onMessageTyped, disabled } = props;

  const classes = `MessageArea ${className}`;
  const [ messageText, setMessageText ] = useState('');
  const inputRef = useRef();

  const submitHandler = (event) => {
    event && event.preventDefault();
    onMessageTyped(messageText);
    setMessageText('');
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [disabled]);

  return (
    <form className={classes} onSubmit={submitHandler} >
      <input ref={inputRef}
        placeholder={placeHolder || "Type a message..."}
        value={messageText} 
        onChange={event => setMessageText(event && event.target.value)}
        disabled={disabled} 
      >
      </input>
      <button disabled={disabled} >{actionText || "Send"}</button>
    </form>
  );
};

MessageArea.propTypes = {
  onMessageTyped: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default MessageArea;