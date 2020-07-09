import React, { useState } from 'react';
import Login from '../Login/Login';
import ChatRoomList from '../ChatRoomList/ChatRoomList';
import ChatRoomPanel from '../ChatRoomPanel/ChatRoomPanel';
import ChatRoomContext from '../ChatRoomContext/ChatRoomContext';
import { validateUser } from '../../utils/utils';

import './Layout.css';


const Layout = () => {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userName, setUserName ] = useState(''); 
    const [ currentRoom, setCurrentRoom ] = useState(null);

    const loginHandler = (userName) => {
        if (validateUser(userName)) {
            setLoggedIn(true);
            setUserName(userName);
        }
    };

    const onRoomSelection = (room) => {
      setCurrentRoom(room);
    };

    return (
      <div className="Layout">
        {!loggedIn && <Login onLogIn={loginHandler}/>}
        <ChatRoomContext.Provider value={{ userName, currentRoom }}>
          <ChatRoomList onRoomSelection={onRoomSelection} />
          <ChatRoomPanel />
        </ChatRoomContext.Provider>
      </div>
    );
};

export default Layout;