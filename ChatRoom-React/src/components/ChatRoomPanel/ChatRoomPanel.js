import React, { useState, useEffect, useContext } from 'react';
import ChatRoomHeader from '../ChatRoomHeader/ChatRoomHeader';
import ChatEntry from './ChatEntry/ChatEntry';
import MessageArea from '../MessageArea/MessageArea';
import ChatRoomContext from '../ChatRoomContext/ChatRoomContext';
import { getRoomList, getRoomMessages, addRoomMessage, cleanUserList, playSound } from '../../utils/utils';

import './ChatRoomPanel.css';


const ChatRoomPanel = (props) => {
    const { userName, currentRoom } = useContext(ChatRoomContext);

    const [panelMessages, setPanelMessages] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    const [isVisible, setIsVisible] = useState(false); // Used for smooth transition between panels

    useEffect(() => {
        const T_TIMER_1 = 250; // time before the API is called, for simulation purposes
        const T_TIMER_2 = 100; // delay before showing results, for smoother UI transition
        let timer1, timer2;

        if (currentRoom) {
            setIsVisible(false);
            timer1 = setTimeout(() => { 
                getRoomMessages(currentRoom.id).then((results) => {
                    // console.table(results.data);
                    setPanelMessages(results.data);
                    timer2 = setTimeout(() => { setIsVisible(true); }, T_TIMER_2);
                }).catch(error => console.error(error));                
            }, T_TIMER_1);
        }
        return () => clearTimeout(timer1, timer2);
    }, [currentRoom]);

    // This next block is for demo purposes only!
    // An alternative non-polling solution would have to be used in the real world.
    useEffect(() => {
        const T_POLLING_INTERVAL = 3500; // For demo purposes

        const timer = setInterval(() => {
            if (currentRoom) getRoomMessages(currentRoom.id).then((results) => {
                if (panelMessages.length !== results.data.length) {
                    playSound();
                    setPanelMessages(results.data);
                }
            }).catch(error => console.error(error));
        }, T_POLLING_INTERVAL);
        return () => clearTimeout(timer);
    }, [currentRoom, panelMessages]);

    // Arrival of new messages may imply the addition of new users in the room
    useEffect(() => {
        if (currentRoom) getRoomList(currentRoom.id).then((results) => {
            setRoomUsers(cleanUserList([userName, ...results.data.users]));
        }).catch(error => console.error(error));
    }, [currentRoom, userName, panelMessages.length]);

    const scrollToLast = (ref) => {
        ref && ref.current && ref.current.scrollIntoView({behavior: 'smooth'});
    };

    // Adds a message to the chat room panel
    const onMessageTyped = (message) => {
        addRoomMessage({name: userName, id: currentRoom.id, message})
        .then(response => {
            if (response.status === 200) {
                playSound();
                setPanelMessages([...panelMessages, {name: userName, id: response.data.id, message}]);
            }
        }).catch(error => console.error(error));
    };

    // Build the chat entries list
    let chatEntries = ( <div className="empty-chat-container" > Select a chat room... </div>);
    if (panelMessages.length) {
        chatEntries = panelMessages.map((chat, index, chats) => {
            let own = (chat.name === userName); // if (own) I'm the author => hide the author
            // Also, if next chat entry's author is the same as this one's => hide the author 
            let author = (own || ((chats.length > 1) &&
                (index < chats.length - 1) &&
                    (chat.name === chats[index + 1].name))) ? null : chat.name;
            const lastRef = (index === chats.length - 1) ? scrollToLast : null;
            return (<ChatEntry key={chat.id} lastRef={lastRef}
                content={chat.message} author={author} own={own} />);
        });
    }

    let containerClasses = `chat-container ${(isVisible || !chatEntries.length) ? 'visible' : ''}`;
    return (
        <div className="ChatRoomPanel" >
            <ChatRoomHeader roomUsers={roomUsers} />
            <div className={containerClasses} >
                <div className="chat-content" >
                    {chatEntries}
                </div> 
            </div> 
            <MessageArea onMessageTyped={onMessageTyped} disabled={!currentRoom} />
        </div>
    );
};

export default ChatRoomPanel;