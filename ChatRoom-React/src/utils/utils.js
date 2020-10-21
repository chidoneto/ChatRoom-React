const axios = require('axios');

// https://historic-everglades-18064.herokuapp.com
// http://localhost:8080
const API_URL = process.env.API_URL || 'https://historic-everglades-18064.herokuapp.com';


// API Calls
const getRoomList = (id) => {
    return axios.get(`${API_URL}/api/rooms${(id !== undefined) ? '/' + id : ''}`);
};

const addRoom = ({ name, users = [] }) => {
    return axios.post(`${API_URL}/api/rooms`, { name, users });
};

const getRoomMessages = (id) => {
    // console.log(`[getRoomMessages(${id})] ${(new Date()).toLocaleTimeString()}`);
    return axios.get(`${API_URL}/api/rooms/${id}/messages`);
};

const addRoomMessage = ({ name, id, message }) => {
    return axios.post(`${API_URL}/api/rooms/${id}/messages`, { name, message });
};

// '/rooms/:roomId/messages/:messageId'
const addMessageReaction = ({ reaction , roomId, messageId }) => {
    return axios.post(`${API_URL}/api/rooms/${roomId}/messages/${messageId}`, { reaction });
};

// Misc utility functions
const validateUser = () => true;

const cleanUserList = (users) => {
    const alreadyIn = {};
    users = users.filter(user => {
        const added = alreadyIn[user.trim().toLowerCase()];
        if (added) return false;
        alreadyIn[user.trim().toLowerCase()] = true;
        return true;
    });
    return users;
};

const playSound = () => {
    (new Audio('bubble.mov')).play();
};

export {
    getRoomList, addRoom, getRoomMessages, addRoomMessage, addMessageReaction,
    validateUser, cleanUserList, playSound
};

// # Backend APIs provided for you:
// 
// ## Messages API
//  - http://localhost:8080/api/rooms/0/messages
//   - `GET /rooms/<id>/messages`
//     - Response shape:
//     ```
//     [
//       {
//         name: String,
//         message: String,
//       }
//     ]
//     ```
//     - messages are ordered by time
//   - `POST /rooms/<id>/messages`
//     - Expected payload shape:
//     ```
//     {
//       name: String,
//       message: String,
//     }
//     ```
// 
// 
// ## RoomsList API
// - http://localhost:8080/api/rooms
//   - `GET /rooms`
//     - Response shape:
//     ```
//     [
//       {
//         id: Integer,
//         name: String,
//       }
//     ]
//     ```
// 
// 
// ## RoomsDetail API
// - http://localhost:8080/api/rooms/0
//   - `GET /rooms/<id>`
//     - Response shape:
//     ```
//     {
//       id: Integer,
//       name: String,
//       users: String[],
//     }
//     ```
// 