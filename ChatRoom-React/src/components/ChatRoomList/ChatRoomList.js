import React, { useState, useEffect, useContext } from 'react';
import UserInfo from './UserInfo/UserInfo';
import ListEntry from './ListEntry/ListEntry';
import MessageArea from '../MessageArea/MessageArea';
import ChatRoomContext from '../ChatRoomContext/ChatRoomContext';
import { getRoomList, addRoom, playSound } from '../../utils/utils';
import { PropTypes } from 'prop-types';

import './ChatRoomList.css';


const ChatRoomList = (props) => {
  const { onRoomSelection } = props;
  const { userName, currentRoom } = useContext(ChatRoomContext);
  const [ roomList, setRoomList ] = useState([]);

  useEffect(() => {
    getRoomList().then((response) => {
      console.table("response.data: ", response.data);
      setRoomList(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const onSelection = (id) => {
    const room = roomList.find(e => e.id.toString() === id);
    onRoomSelection(room);
  }

  const onMessageTyped = (name) => {
    addRoom({name, users: [ userName ]})
    .then(response => {
        if (response.status === 200) {
            const newRoom = {name: response.data.name, id: response.data.id};
            playSound();
            console.log(response);
            console.table(roomList);
            setRoomList([...roomList, newRoom]);
        }
    }).catch(error => console.error(error));
  };

  const chatRooms = (roomList.length) ? roomList.map(room => {
    return (<ListEntry
      key={room.id} 
      id={room.id.toString()} 
      roomName={room.name}
      selected={currentRoom && currentRoom.id.toString()}
      onSelection={onSelection}
    >
    </ListEntry>)
  }) : null;

  const isAdmin = (userName.charAt(0) === 'C');
  
  return (
    <div className="ChatRoomList">
      <UserInfo userName={userName}/>
      <div className="ChatRoomList__rooms">
        {chatRooms}
      </div>
      <div>
      {isAdmin ? <MessageArea className="ChatRoomList__input" placeHolder="New room name..." actionText="Add" onMessageTyped={onMessageTyped} /> : null}
      </div>
    </div>
  );
};

ChatRoomList.propTypes = {
  onRoomSelection: PropTypes.func.isRequired
};

export default ChatRoomList;