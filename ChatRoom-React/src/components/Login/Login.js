import React, { useState, useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import './Login.css';


const Login = (props) => {
  const { onLogIn } = props;

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    onLogIn(inputValue);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="Login" onSubmit={submitHandler} >
        <input ref={inputRef}
          className="input"
          placeholder={"Type your username..."}
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        >
        </input>
        <div className="button" onClick={submitHandler} >Join the DoorDash Chat!</div>
    </form>
  );
};

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired
};

export default Login;