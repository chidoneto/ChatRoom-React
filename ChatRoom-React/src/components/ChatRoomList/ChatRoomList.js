import React, { useState, useEffect, useContext } from 'react';
import UserInfo from './UserInfo/UserInfo';
import ListEntry from './ListEntry/ListEntry';
import ChatRoomContext from '../ChatRoomContext/ChatRoomContext';
import { getRoomList } from '../../utils/utils';
import { PropTypes } from 'prop-types';

import './ChatRoomList.css';


const ChatRoomList = (props) => {
  const { onRoomSelection } = props;
  const { userName, currentRoom } = useContext(ChatRoomContext);
  const [ roomList, setRoomList ] = useState([]);

  useEffect(() => {
    getRoomList().then((response) => {
      setRoomList(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const onSelection = (id) => {
    onRoomSelection(roomList[id]);
  }

  const chatRooms = (roomList.length) ? roomList.map(room => {
    return (<ListEntry
      key={room.id} 
      id={room.id} 
      roomName={room.name}
      selected={currentRoom && currentRoom.id}
      onSelection={onSelection}
    >
    </ListEntry>)
  }) : null;

  return (
    <div className="ChatRoomList">
      <UserInfo userName={userName} />
      {chatRooms}
    </div>
  );
};

ChatRoomList.propTypes = {
  onRoomSelection: PropTypes.func.isRequired
};

export default ChatRoomList;