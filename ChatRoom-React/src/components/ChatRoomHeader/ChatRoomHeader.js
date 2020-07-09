import React, { useContext } from 'react';
import ChatRoomContext from '../ChatRoomContext/ChatRoomContext';
import { PropTypes } from 'prop-types';

import './ChatRoomHeader.css';


const ChatRoomHeader = (props) => {
  const { roomUsers } = props;
  const { userName, currentRoom } = useContext(ChatRoomContext);

  let users = (roomUsers.length) ? roomUsers : [userName];
  
  users = users.map((user, index) => {
      return (<span className="room-people" key={index}>{index > 0 ? ', ' + user : user}</span>);
  });

  return (
    <div className="ChatRoomHeader">
        <p className="room-name">{(currentRoom) ? currentRoom.name : <em>Selected Chat Room...</em>}</p>
        <div className="room-users-container">
          {users}
        </div>
    </div>
  );
};

ChatRoomHeader.propTypes = {
  roomUsers: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ChatRoomHeader;