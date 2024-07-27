import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { over } from 'stompjs';
import { io, Socket } from 'socket.io-client';
import { IoSearch } from 'react-icons/io5';
import './CustomScrollBar.css';
Chatroom.propTypes = {};

function Chatroom() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Xuân Phong',
    },
    {
      id: 2,
      name: 'Phù Minh Hương',
    },
  ]);
  const [receivedUser, setReceivedUser] = useState(users[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = io('http://localhost:8080');

    // Listen for messages from the server
    socketRef.current.on('message', (message) => {
      const { senderId, receiverId, text } = message;
      setMessages((prevMessages) => {
        const userMessages = prevMessages[receiverId] || [];
        return {
          ...prevMessages,
          [receiverId]: [...userMessages, { senderId, text }],
        };
      });
    });

    // Cleanup function to disconnect from the server
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const message = {
      senderId: 'admin', // Replace with actual admin ID if needed
      receiverId: receivedUser.id,
      text: inputMessage,
    };
    socketRef.current.emit('message', message);
    setMessages((prevMessages) => {
      const userMessages = prevMessages[receivedUser.id] || [];
      return {
        ...prevMessages,
        [receivedUser.id]: [
          ...userMessages,
          { senderId: 'admin', text: inputMessage },
        ],
      };
    });
    setInputMessage('');
  };

  const handleChangeMessage = (e) => {
    const { value } = e.target;
    setInputMessage(value);
  };

  return (
    <div className="grid min-h-screen grid-cols-12 gap-5 bg-[#181818] px-10 py-5 text-sm text-white">
      <div className="col-span-4 rounded-xl bg-[#222222] px-5 py-3">
        <h2 className="text-2xl font-black">Đoạn chat</h2>
        <div className="relative my-3 h-8 rounded-full bg-[#3A3B3C] pl-10">
          <label htmlFor="search-user">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-[#737475]" />
          </label>
          <input
            id="search-user"
            placeholder="Tìm kiếm người dùng"
            className="none h-full w-full bg-transparent text-[#B0B3B8] outline-none"
          />
        </div>
        <div className="customizedScrollbar flex max-h-[550px] flex-col gap-2 overflow-y-auto pr-5">
          {users.map((user) => (
            <article
              key={user.id}
              onClick={() => setReceivedUser(user)}
              className={`${receivedUser.id === user.id ? 'bg-[#414141]' : ''} flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2`}
            >
              <div className="size-12 overflow-hidden rounded-full">
                <img
                  className="h-full w-full object-cover"
                  alt="avatar"
                  src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-[#FAFAFA]">{user.name}</h3>
                <p className="text-xs text-[#B0B3B8]">Newest message</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="relative col-span-8 rounded-xl bg-[#222222] px-5 py-3">
        <div className="flex items-center gap-4">
          <div className="size-12 overflow-hidden rounded-full">
            <img
              alt="avatar"
              className="h-full w-full object-cover"
              src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            />
          </div>
          <h2 className="text-xl font-medium">{receivedUser.name}</h2>
        </div>
        <div className="customizedScrollbar max-h-[530px] overflow-y-auto">
          <ul className="mt-10 flex flex-col gap-3">
            {(messages[receivedUser.id] || []).map((message, index) => (
              <li
                key={index}
                className={`flex ${message.senderId === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`w-fit max-w-[80%] rounded-lg ${message.senderId === 'admin' ? 'bg-blue-500' : 'bg-[#4c4c4c]'} px-4 py-1`}
                >
                  {message.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex gap-5">
          <input
            value={inputMessage}
            onChange={handleChangeMessage}
            className="flex-1 rounded-full bg-[#3A3B3C] px-4 py-2 outline-blue-600"
            placeholder="Nhập tin nhắn..."
          />
          <button
            onClick={handleSendMessage}
            className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 px-5 text-white hover:bg-blue-500"
          >
            Gửi tin nhắn
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
