import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import './UserInfo.css';


const UserInfo = (props) => {
  const { userName } = props;
  const [ ellapsedTime, setEllapsedTime ] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEllapsedTime(ellapsedTime + 1);
    }, 60000);
    return () => clearTimeout(timer);
  }, [ellapsedTime]);
  
  return (
    <div className="UserInfo">
      <p className="name">{userName}</p>
      <p className="stats">Online for {ellapsedTime} minute{(ellapsedTime === 1) ? '' : 's'}</p>
    </div>
  );
};

UserInfo.propTypes = {
  userName: PropTypes.string.isRequired
};

export default UserInfo;