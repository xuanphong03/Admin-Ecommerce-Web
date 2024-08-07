import './init';
import React, { useEffect, useRef, useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import {
  IoIosArrowDown,
  IoMdSearch,
  IoMdHelp,
  IoIosList,
  IoMdHome,
  IoMdMail,
  IoIosShirt,
  IoMdHappy,
  IoLogoPinterest,
  IoIosPaperPlane,
} from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
// import './ChatBox.css';
import EmojiPicker from 'emoji-picker-react';
import { client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import StorageKeys from '~/constants/storage-key';
import { EmojiStyle } from 'emoji-picker-react';
Chatroom.propTypes = {};

const RECEIVER = {
  chatbot: 'Aza Assistant',
  admin: 'ADMIN',
};
let stompClient = null;
const SOCKET_URL = 'http://localhost:8080/ws';
let save_ReiverID = null;
let save_Img = null;
function Chatroom(props) {
  const token = localStorage.getItem(StorageKeys.TOKEN) || '';
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER)) || {};
  const { id, name, userImgUrl } = user;
  const [chatting, setChatting] = useState(true);
  const [receiverId, setReceiverId] = useState();
  const [receiversList, setReceiversList] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  // --------------------------------------------------------------------------------------
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
    // setOptionalListVisible((prev) => !prev);
    // setShowEmojiPicker(false);
  };
  //--------------------------------------------------------------------------------------
  const isImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  //--------------------------------------------------------------------------------------
  const [optionalListVisible, setOptionalListVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [inputFilter, setInputFilter] = useState('');

  const normalizeString = (str) => {
    if (typeof str === 'string') {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    console.error('Expected a string, but got:', typeof str);
    return '';
  };

  const fetchOptions = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/v1/rest/getAllQuestions',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  useEffect(() => {
    if (optionalListVisible) {
      fetchOptions();
    }
  }, [optionalListVisible]);

  useEffect(() => {
    // Normalize the input filter value
    const normalizedFilter = normalizeString(inputFilter);
    setFilteredOptions(
      options.filter((option) =>
        normalizeString(option)
          .toLowerCase()
          .includes(normalizedFilter.toLowerCase()),
      ),
    );
  }, [inputFilter, options]);

  const handleOptionClick = (option) => {
    setMessage(option); // Set the message input to the selected option
    setInputFilter('');
    // setOptionalListVisible(false); // Hide options list after selection
    // fetchOptions();
  };
  const handleInputChange = (e) => {
    setInputFilter(e.target.value); // Update filter value
  };
  //--------------------------------------------------------------------------------------
  const [newOptions, setNewOptions] = useState([]);
  const [inputFilter2, setInputFilter2] = useState(''); // State to hold input filter value
  const [optionalListVisible2, setOptionalListVisible2] = useState(false);
  const [filteredOptions2, setFilteredOptions2] = useState([]);
  const handleInputChange2 = (e) => {
    setInputFilter2(e.target.value);
  };
  const fetchOptions2 = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/v1/global/products-chat-bot',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log(data);

      setNewOptions(data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  useEffect(() => {
    const normalizedFilter2 = normalizeString(inputFilter2);
    setFilteredOptions2(
      newOptions.filter(
        (option) =>
          normalizeString(option.name)
            .toLowerCase()
            .includes(normalizedFilter2.toLowerCase()) ||
          normalizeString(option.originalPrice)
            .toLowerCase()
            .includes(normalizedFilter2.toLowerCase()) ||
          normalizeString(option.finalPrice)
            .toLowerCase()
            .includes(normalizedFilter2.toLowerCase()),
      ),
    );
  }, [inputFilter2, newOptions]);
  const handleOptionClick2 = (e) => {
    setMessage(e.name);
    setInputFilter2('');
    // setOptionalListVisible2(false);
  };
  //--------------------------------------------------------------------------------------
  const [optionalListVisible3, setOptionalListVisible3] = useState(false);
  const [lastOptions, setLastOptions] = useState([]);
  const [filteredOptions3, setFilteredOptions3] = useState([]); // State to hold filtered options
  const [inputFilter3, setInputFilter3] = useState(''); // State to hold input filter value
  const fetchOptions3 = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/v1/global/products-chat-bot-image',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      console.log(data);
      setLastOptions(data); // Store options in state
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  useEffect(() => {
    // Normalize the input filter value
    const normalizedFilter = normalizeString(inputFilter3);
    setFilteredOptions3(
      lastOptions.filter((option) =>
        normalizeString(option)
          .toLowerCase()
          .includes(normalizedFilter.toLowerCase()),
      ),
    );
  }, [inputFilter3, lastOptions]);
  // const handleInputChange3 = (e) => {
  //   setInputFilter3(e.target.value);
  // };
  const handleOptionClick3 = (e) => {
    setMessage(e.img_url); // Set the message input to the selected option
    setInputFilter('');
    console.log('BUG1');

    setSendTriggered(true); // Set the flag to true
  };
  const [sendTriggered, setSendTriggered] = useState(false);
  useEffect(() => {
    if (sendTriggered) {
      handleSendMessage();
      // console.log('BUG2');
      setSendTriggered(false); // Reset the flag
    }
  }, [sendTriggered, message]);

  //--------------------------------------------------------------------------------------
  const toggleOptionalList3 = () => {
    fetchOptions3();
    setOptionalListVisible3((prev) => !prev);
    if (!optionalListVisible3) {
      setOptionalListVisible(false);
      setShowEmojiPicker(false);
      setOptionalListVisible2(false);
    }
  };

  const toggleOptionalList2 = () => {
    fetchOptions2();
    setOptionalListVisible2((prev) => !prev);
    if (!optionalListVisible2) {
      setOptionalListVisible(false);
      setOptionalListVisible3(false);
      setShowEmojiPicker(false);
    }
  };

  const toggleOptionalList = () => {
    setOptionalListVisible((prev) => !prev);
    if (!optionalListVisible) {
      setOptionalListVisible3(false);
      setOptionalListVisible2(false);
      setShowEmojiPicker(false);
    }
  };

  const toggleShowEmojiList = () => {
    setShowEmojiPicker((prev) => !prev);
    if (!showEmojiPicker) {
      setOptionalListVisible3(false);
      setOptionalListVisible(false);
      setOptionalListVisible2(false);
    }
  };
  //--------------------------------------------------------------------------------------
  const backhome = () => {
    window.location.href = 'http://localhost:8888';
  };
  const contactUs = () => {
    window.location.href = 'http://localhost:8888/contact';
  };
  const guide = () => {
    window.location.href = 'http://localhost:8888/about';
  };
  useEffect(() => {
    if (chatting) {
      connect();
    }
  }, [chatting]);
  //--------------------------------------------------------------------------------------
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({});
  };

  useEffect(scrollToBottom, [messages]);
  const connect = () => {
    const socket = new SockJS(SOCKET_URL);
    stompClient = over(socket);
    stompClient.connect(
      { Authorization: `Bearer ${token}` },
      onConnected,
      onError,
    );
  };

  const onConnected = () => {
    stompClient.subscribe(`/user/${name}/queue/messages`, onMessageReceived);
    stompClient.subscribe(`/user/queue/public`, onMessageReceived);
    stompClient.send(
      '/app/addUser',
      { Authorization: `Bearer ${token}` },
      JSON.stringify({
        name: name,
        fullName: name,
        img_url: userImgUrl,
        status: 'ONLINE',
      }),
    );
    if (
      !optionalListVisible &&
      !optionalListVisible2 &&
      !optionalListVisible3 &&
      !showEmojiPicker
    ) {
      fetchOptions2();
      setOptionalListVisible2((prev) => !prev);
    }
    findAndDisplayConnectedUsers();
  };
  const logout = () => {
    if (name !== RECEIVER.chatbot) {
      stompClient.send(
        '/app/disconnectUser',
        {},
        JSON.stringify({
          name: name,
          fullName: name,
          img_url: userImgUrl,
          status: 'OFFLINE',
        }),
      );
      stompClient.disconnect();
      // window.location.reload();
      // setMessage('');
      // setSendTriggered((prev) => !prev);
    }
  };

  const findAndDisplayConnectedUsers = async () => {
    const connectedUsersResponse = await fetch('http://localhost:8080/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());

    const connectedUsers = connectedUsersResponse.filter(
      (user) => user.name !== name,
    );

    setReceiversList(connectedUsers);
  };

  const fetchAndDisplayUserChat = async () => {
    const userChatResponse = await fetch(
      `http://localhost:8080/api/v1/chat-box/messages/${name}/${receiverId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((response) => response.json());
    setMessages(userChatResponse);
    // console.log(userChatResponse);

    if (receiverId === RECEIVER.chatbot) {
      const userChatResponse = await fetch(
        `http://localhost:8080/api/v1/chat-box/messages/${receiverId}/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => response.json());
      setMessages(userChatResponse);
    }
    // console.log(userChatResponse);
  };

  const onError = (err) => {
    // console.log('Lỗi', err);
  };

  const onMessageReceived = async (payload) => {
    await findAndDisplayConnectedUsers();
    const payloadData = JSON.parse(payload.body);
    console.log(payloadData);

    if (
      name === payloadData.recipientId &&
      save_ReiverID === payloadData.senderId
    ) {
      setMessages((prev) => [...prev, payloadData]);
      // console.log(save_Img);
    }
    if (name === payloadData.senderId) {
      setMessages((prev) => [...prev, payloadData]);
      // console.log(save_Img);
    }
    // Dành cho trường hợp tự load đến tin nhắn =)) trông hơi đần tí
    // if (payloadData.senderId !== RECEIVER.admin) {
    //   setReceiverId(payloadData.senderId);
    //   setMessages((prev) => [...prev, payloadData]);
    // }
  };
  const handleSendMessage = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!message.trim() || !stompClient) return;

    const chatMessage = {
      senderId: name,
      senderImage: userImgUrl,
      recipientId: save_ReiverID,
      content: message.trim(),
      timestamp: new Date(),
    };
    stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));

    setMessages((prev) => [...prev, chatMessage]);
    if (receiverId === RECEIVER.chatbot) {
      fetchAndDisplayUserChat();
    }
    setMessage('');
  };

  const handleChangeMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  useEffect(() => {
    if (receiverId) {
      fetchAndDisplayUserChat();
    }
  }, [receiverId]);

  return (
    <div className="fixed bottom-5 right-5">
      <div
        onClick={() => {
          setChatting(true);
          connect();
        }}
        className={`${chatting ? 'invisible opacity-0' : 'visible opacity-100'} flex cursor-pointer items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-white transition-all delay-300 duration-500 ease-in-out hover:bg-stone-600`}
      >
        <IoChatbubbleEllipsesOutline className="text-xl" /> Nhắn tin
      </div>
      <div
        className={`${chatting ? 'h-[850px] w-[1600px]' : 'h-0 w-0'} chatBox absolute bottom-0 right-0 overflow-hidden rounded bg-white text-black`}
      >
        <div className="border-gray flex h-16 items-center justify-between border-b border-solid px-5 py-2">
          <h2 className="ml-1 text-xl font-semibold tracking-wide text-stone-600">
            Nhắn tin
          </h2>
          <div className="flex space-x-2">
            <button
              type="button"
              id="backhome"
              className="flex size-8 items-center justify-center rounded border border-solid border-black text-base text-xs tracking-wide"
              onClick={backhome}
              title="Back To Home"
            >
              <IoMdHome className="text-base" />
            </button>
            <button
              type="button"
              id="contactUs"
              className="flex size-8 items-center justify-center rounded border border-solid border-black text-base text-xs tracking-wide"
              onClick={contactUs}
              title="Contact Us"
            >
              <IoMdMail className="text-base" />
            </button>
            <button
              type="buttonhelp"
              id="guide"
              className="flex size-8 items-center justify-center rounded border border-solid border-black text-base text-xs tracking-wide"
              onClick={guide}
              title="Guide Chat Bot"
            >
              <IoMdHelp className="text-base" />
            </button>
            <button
              type="buttonhelp"
              id="IoIosList"
              className="flex size-8 items-center justify-center rounded border border-solid border-black text-base text-xs tracking-wide"
              onClick={guide}
              title="IoIosList"
            >
              <IoIosList className="text-base" />
            </button>
            <button
              onClick={() => {
                setChatting(false);
                logout();
              }}
              className="flex size-8 items-center justify-center rounded border border-solid border-black"
            >
              <IoIosArrowDown className="text-lg" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(100%-48px)]">
          <div className="border-gray w-[400px] border-r border-solid">
            {receiversList.map((receiver) => (
              <article
                key={receiver.id}
                onClick={() => {
                  setReceiverId(receiver.name);
                  save_ReiverID = receiver.name;
                  save_Img = receiver.img_url;
                }}
                className={`${save_ReiverID === receiver.name ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} flex cursor-pointer gap-2 px-5 py-2 text-[#2c2c2c] transition-all`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-20 items-center justify-center overflow-hidden rounded-full">
                    <img
                      src={
                        receiver.img_url ||
                        'https://i.pinimg.com/564x/de/0a/47/de0a470a4617bb6272ad32dea7c497ce.jpg'
                      }
                      className="max-w-full object-cover"
                      alt={receiver.name}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-lg">{receiver.name}</h4>
                    <p
                      className={`${receiver.status === 'ONLINE' ? 'text-emerald-500' : 'text-slate-600'} text-base`}
                    >
                      {receiver.status.toLowerCase()}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="relative w-[calc(100%-200px)]">
            <div className="display: flex; relative h-[calc(100%-40px)] overflow-x-hidden px-4 py-2">
              <ul className="flex flex-col space-y-1">
                {messages.map((messageItem, index) => {
                  return (
                    <li
                      key={index}
                      className={`flex items-start ${
                        messageItem.senderId === name
                          ? 'ml-auto flex-row-reverse'
                          : 'mr-auto'
                      } max-w-[80%] rounded-lg text-sm`}
                    >
                      <div className="flex flex-col items-start">
                        <img
                          src={
                            messageItem.senderId === name
                              ? userImgUrl
                              : messageItem.senderImage
                          }
                          className="h-[60px] w-[60px] rounded-full"
                          alt="Sender"
                        />
                      </div>
                      {isImageUrl(messageItem.content) ? (
                        <img
                          src={messageItem.content}
                          className={`max-w-[42%] ${
                            messageItem.senderId === name
                              ? 'mt-15 mr-2 bg-stone-700 text-right text-white'
                              : 'mt-15 ml-2 bg-gray-200 text-left'
                          } mt-2 rounded-lg`}
                          alt="Message content"
                        />
                      ) : (
                        <p
                          className={`${
                            messageItem.senderId === name
                              ? 'mt-15 mr-4 bg-stone-700 text-right text-white'
                              : 'mt-15 ml-4 bg-gray-200 text-left'
                          } mt-2 max-w-[85%] whitespace-pre-wrap rounded-lg px-2 py-2 text-base`}
                        >
                          {messageItem.content}
                        </p>
                      )}
                    </li>
                  );
                })}
                <div ref={messagesEndRef} />
              </ul>
            </div>
            <form
              onSubmit={handleSendMessage}
              className="border-gray absolute bottom-0 left-0 right-0 flex h-12 items-center border-t border-solid"
            >
              <input
                value={message}
                onChange={handleChangeMessage}
                className="h-full w-full px-2 py-1 text-sm outline-none"
                placeholder="Nhập tin nhắn..."
              />
              <button
                type="button"
                id="optional2"
                className="w-50px size-15 mx-2 flex h-full items-center justify-center"
                onClick={toggleOptionalList2}
                title="Tìm kiêm thông tin về sản phẩm"
              >
                <IoIosShirt />
              </button>
              <button
                type="button"
                id="optional"
                className="w-50px size-15 mx-2 flex h-full items-center justify-center"
                onClick={toggleOptionalList}
                title="Tìm từ khóa Chat Bot"
              >
                <IoMdSearch />
              </button>
              <button
                type="button"
                id="optional3"
                className="w-50px size-15 mx-2 flex h-full items-center justify-center"
                onClick={toggleOptionalList3}
                title="Chọn nhãn dán"
              >
                <IoLogoPinterest />
              </button>
              <button
                type="button"
                id="emoji-btn"
                className="w-50px size-15 mx-2 flex h-full items-center justify-center"
                onClick={toggleShowEmojiList}
                title="Chọn biểu tượng cảm xúc"
              >
                <IoMdHappy />
              </button>
              <button
                type="submit"
                className="flex size-12 h-full items-center justify-center rounded-full bg-blue-500 px-4 text-xl text-white transition-all hover:bg-blue-400"
                title="Gửi Message"
              >
                <IoIosPaperPlane />
              </button>
            </form>
          </div>
          <div className="border-gray w-[450px] border-r border-solid">
            {optionalListVisible && (
              <div
                className="overflow-auto rounded border border-gray-300 bg-white shadow-lg"
                style={{
                  top: '100%',
                  left: '0',
                  maxHeight: '802px', // Adjust height as needed
                }}
              >
                <input
                  type="text"
                  value={inputFilter}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 px-2 py-1 text-sm"
                  placeholder="Tìm kiếm từ khóa Chat Bot..."
                />
                <ul>
                  {filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-300"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {optionalListVisible2 && (
              <div
                className="overflow-auto rounded border border-gray-300 bg-white shadow-lg"
                style={{
                  top: '100%',
                  left: '0',
                  maxHeight: '802px',
                }}
              >
                <input
                  type="text"
                  value={inputFilter2}
                  onChange={handleInputChange2}
                  className="w-full border-b border-gray-300 px-2 py-1 text-sm"
                  placeholder="Tìm kiếm từ khóa sản phẩm..."
                />
                <ul>
                  {filteredOptions2.map((option, index) => (
                    <li
                      key={index}
                      className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-gray-300"
                      onClick={() => handleOptionClick2(option)}
                    >
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                        <img
                          src={option.imageMain}
                          className="h-full w-full object-cover"
                          alt={`Option ${index}`}
                        />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <p className="hidden text-sm font-medium">
                          {option.sku}
                        </p>
                        <p className="font-family: ui-serif bold text-sm font-medium">
                          {option.name}
                        </p>
                        <p className="text-xs line-through">
                          OriginalPrice: {option.originalPrice} VND
                        </p>
                        <p className="text-xs text-red-700">
                          Sale Price: {option.finalPrice} VND
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {optionalListVisible3 && (
              <div
                className="overflow-auto rounded border border-gray-300 bg-white shadow-lg"
                style={{
                  top: '100%',
                  left: '0',
                  maxHeight: '802px',
                }}
              >
                <ul className="grid grid-cols-3 gap-4 p-1">
                  {' '}
                  {/* Use grid layout with 4 columns */}
                  {filteredOptions3.map((option, index) => (
                    <li
                      key={index}
                      className="flex cursor-pointer flex-col items-center"
                      onClick={() => {
                        handleOptionClick3(option);
                      }}
                    >
                      <img
                        src={option.img_url}
                        alt="option image"
                        className="h-full w-full rounded-sm object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showEmojiPicker && (
              <div id="emoji-picker" className="absolute right-0">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  height="50em"
                  width="19.5em"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
