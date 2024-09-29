import './init';
import { useEffect, useRef, useState } from 'react';
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
  IoMdTrash,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
} from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker from 'emoji-picker-react';
import { client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import StorageKeys from '~/constants/storage-key';
import { EmojiStyle } from 'emoji-picker-react';
import chatApi from '~/apis/chatApi';
Chatroom.propTypes = {};

const RECEIVER = {
  chatbot: 'Aza Assistant',
  admin: 'ADMIN',
};
let stompClient = null;
const SOCKET_URL = 'http://localhost:8080/ws';
let save_ReiverID = null;
let save_Img = null;
let unreadMessages = 0;
let save_Role = null;
let save_ReiverID_unreadMessages = '';
function Chatroom(props) {
  const token = localStorage.getItem(StorageKeys.TOKEN) || '';
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER)) || {};
  const { id, name, userImgUrl } = user;
  const [chatting, setChatting] = useState(false);
  const [receiverId, setReceiverId] = useState();
  const [receiversList, setReceiversList] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  // --------------------------------------------------------------------------------------
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
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
      const response = await chatApi.getAllQuestions();
      setOptions(response);
    } catch (error) {
      throw new Error('Failed to get options');
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
      const response = await chatApi.getAllProducts();
      setNewOptions(response);
    } catch (error) {
      throw new Error('Failed to get all products');
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

  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editContent, setEditContent] = useState('');
  // const messagesEndRef = useRef(null);

  const handleEditClick = (messageItem) => {
    setEditingMessageId(messageItem.id);
    setEditContent(messageItem.content);
  };

  const handleDeleteClick = (messageItem) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this message?',
    );
    if (isConfirmed) {
      const chatMessage = {
        action: 'DELETE',
        id: messageItem.id,
        senderId: messageItem.senderId,
        recipientId: messageItem.recipientId,
      };

      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));

      console.log('Message deletion initiated.');
    } else {
      console.log('Message deletion canceled.');
    }
    setEditingMessageId(null);
    fetchAndDisplayUserChat();
  };

  const handleConfirmClick = (messageItem) => {
    const chatMessage = {
      action: 'UPDATE',
      id: messageItem.id,
      senderId: messageItem.senderId,
      recipientId: messageItem.recipientId,
      content: editContent.trim(), // Gửi nội dung tin nhắn đã chỉnh sửa
    };

    stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));

    console.log('Message update initiated.');
    setEditingMessageId(null);
    fetchAndDisplayUserChat();
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
  };

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
        role: user.role,
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
          role: user.role,
        }),
      );
      stompClient.disconnect();
      // window.location.reload();
      // setMessage('');
      // setSendTriggered((prev) => !prev);
    }
  };

  const findAndDisplayConnectedUsers = async () => {
    const connectedUsersResponse = await fetch('http://localhost:8080/admin', {
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
  };

  const onError = (err) => {
    // console.log('Lỗi', err);
  };
  const onMessageReceived = async (payload) => {
    await findAndDisplayConnectedUsers();
    const payloadData = JSON.parse(payload.body);
    if (
      name === payloadData.recipientId &&
      save_ReiverID === payloadData.senderId &&
      payloadData.action !== 'UPDATE' &&
      payloadData.action !== 'DELETE'
    ) {
      setMessages((prev) => [...prev, payloadData]);
    } else if (
      name === payloadData.recipientId &&
      save_ReiverID === payloadData.senderId &&
      (payloadData.action === 'UPDATE' || payloadData.action === 'DELETE')
    ) {
      const userChatResponse = await fetch(
        `http://localhost:8080/api/v1/chat-box/messages/${save_ReiverID}/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => response.json());
      setMessages(userChatResponse);
    }
    if (
      name === payloadData.senderId &&
      save_ReiverID === payloadData.recipientId &&
      payloadData.action !== 'UPDATE' &&
      payloadData.action !== 'DELETE'
    ) {
      setMessages((prev) => [...prev, payloadData]);
    } else if (
      name === payloadData.recipientId &&
      save_ReiverID === payloadData.senderId &&
      (payloadData.action === 'UPDATE' || payloadData.action === 'DELETE')
    ) {
      const userChatResponse = await fetch(
        `http://localhost:8080/api/v1/chat-box/messages/${name}/${save_ReiverID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((response) => response.json());
      setMessages(userChatResponse);
    }
    if (
      name === payloadData.recipientId &&
      save_ReiverID !== payloadData.senderId
    ) {
      unreadMessages = unreadMessages + 1;
      save_ReiverID_unreadMessages = payloadData.senderId;
      console.log(save_ReiverID_unreadMessages);
    } else if (save_ReiverID_unreadMessages !== null) {
      // eslint-disable-next-line no-self-assign
      unreadMessages = unreadMessages;
    }
    if (save_ReiverID === payloadData.senderId) {
      unreadMessages = 0;
      save_ReiverID_unreadMessages = '';
    }
  };
  const handleSendMessage = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (!message.trim() || !stompClient) return;

    const chatMessage = {
      action: 'SEND',
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
    <div className="fixed bottom-5 right-5 z-[9999]">
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
        className={`${chatting ? 'h-[550px] w-[900px]' : 'h-0 w-0'} chatBox absolute bottom-0 right-0 rounded border-2 border-solid border-gray-200 bg-white text-black`}
      >
        <div className="border-gray flex h-12 items-center justify-between border-b border-solid px-5 py-2">
          <h2 className="ml-1 text-lg font-semibold tracking-wide text-stone-600">
            Nhắn tin
          </h2>
          <div className="flex space-x-2">
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
          <div className="border-gray w-[320px] border-r border-solid">
            {receiversList.map((receiver) => (
              <article
                key={uuidv4()}
                onClick={() => {
                  setReceiverId(receiver.name);
                  if (save_ReiverID === receiver.name) {
                    fetchAndDisplayUserChat();
                  }
                  save_ReiverID = receiver.name;
                  save_Img = receiver.img_url;
                  save_Role = receiver.role;
                  if (save_ReiverID === save_ReiverID_unreadMessages) {
                    unreadMessages = 0;
                    save_ReiverID_unreadMessages = '';
                  }
                }}
                className={`${save_ReiverID === receiver.name ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} flex cursor-pointer gap-1 px-5 py-1 text-[#2c2c2c] transition-all`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center overflow-hidden rounded-full">
                    <img
                      src={
                        receiver.img_url ||
                        'https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png '
                      }
                      className="max-w-full object-cover"
                      alt={receiver.name}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-base">{receiver.name} </h4>
                    <p className={'text-xs'}>
                      {receiver.role === 'ADMIN' ? 'Manage' : 'Guest'}
                    </p>
                    <p
                      className={`${receiver.status === 'ONLINE' ? 'text-emerald-500' : 'text-slate-600'} text-xs`}
                    >
                      {receiver.status.toLowerCase()}
                    </p>
                  </div>
                  <div className="flex h-[18px] w-[18px] flex-col items-center justify-center">
                    <p
                      className={`${unreadMessages >= 1 && save_ReiverID_unreadMessages === receiver.name && save_ReiverID !== receiver.name ? 'bg-red-600 text-gray-200' : 'hidden text-blue-600'} flex h-4 w-4 flex-col items-center justify-center rounded-full text-xs`}
                    >
                      {unreadMessages}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="relative w-[calc(100%-200px)]">
            <div className="display: flex; relative h-[calc(100%-40px)] overflow-x-hidden px-4 py-2">
              <div
                className={`${save_ReiverID === null ? 'hidden' : ''} flex flex-col items-center justify-center overflow-hidden`}
              >
                <p className="mt-2 text-center text-sm text-gray-500">
                  Hiện tại bạn đã có thể trò chuyện với {save_ReiverID}
                </p>
              </div>
              <ul className="flex flex-col space-y-1">
                {messages.map((messageItem) => (
                  <li
                    key={uuidv4()}
                    className={`flex items-start ${
                      messageItem.senderId === name
                        ? 'ml-auto flex-row-reverse'
                        : 'mr-auto'
                    } max-w-[80%] rounded-lg text-sm`}
                  >
                    {/* <div className="flex flex-col items-start"> */}
                    {/* <img
                      src={
                        messageItem.senderId === name
                          ? userImgUrl ||
                            'https://i.pinimg.com/564x/de/0a/47/de0a470a4617bb6272ad32dea7c497ce.jpg'
                          : messageItem.senderImage ||
                            'https://i.pinimg.com/564x/de/0a/47/de0a470a4617bb6272ad32dea7c497ce.jpg'
                      }
                      className="h-[60px] w-[60px] rounded-full"
                      alt="Sender"
                    /> */}
                    {/* </div> */}
                    {isImageUrl(messageItem.content) ? (
                      <img
                        src={messageItem.content}
                        className={`max-w-[42%] ${
                          messageItem.senderId === name
                            ? 'mt-15 mr-2 bg-stone-400 text-right text-white'
                            : 'mt-15 ml-2 bg-gray-200 text-left'
                        } mt-2 rounded-lg`}
                        alt="Message content"
                      />
                    ) : (
                      <div>
                        <p
                          className={`flex items-start ${
                            messageItem.senderId === name
                              ? 'ml-auto flex-row-reverse'
                              : 'mr-auto'
                          } mt-3 max-w-none rounded-lg px-4 text-xs italic`}
                        >
                          {messageItem.senderId}
                        </p>
                        {editingMessageId === messageItem.id ? (
                          <div className="flex flex-col">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="h-[100px] w-[400px] rounded-lg bg-gray-200 p-2"
                            />
                            <div className="mt-2 flex space-x-2">
                              <button
                                onClick={() => {
                                  handleConfirmClick(messageItem);
                                }}
                                className="rounded bg-blue-500 px-2 py-1 text-white"
                                title="Submit Chỉnh Sửa"
                              >
                                <IoMdCheckmarkCircle />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="rounded bg-gray-500 px-2 py-1 text-white"
                                title="Cancel Chỉnh Sửa"
                              >
                                <IoMdCloseCircle />
                              </button>
                              {messageItem.senderId === name && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      handleDeleteClick(messageItem)
                                    }
                                    className="rounded bg-red-500 px-2 py-1 text-white"
                                    title="Thu Hồi"
                                  >
                                    <IoMdTrash />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <p
                            className={`${
                              messageItem.senderId === name
                                ? 'ml-auto bg-stone-500 text-white'
                                : 'ml-r bg-gray-200'
                            } mt-2 max-w-max rounded-lg px-2 py-2 text-base`}
                            onClick={() =>
                              messageItem.senderId === name &&
                              fetchAndDisplayUserChat() &&
                              handleEditClick(messageItem)
                            }
                          >
                            {messageItem.content}
                          </p>
                        )}
                      </div>
                    )}
                  </li>
                ))}
                <div ref={messagesEndRef} />
              </ul>
            </div>
            <form
              onSubmit={handleSendMessage}
              className="border-gray absolute bottom-0 left-0 right-0 flex items-center border-t border-solid"
            >
              <input
                value={message}
                onChange={handleChangeMessage}
                className="h-11 flex-1 px-2 py-1 text-sm outline-none"
                placeholder="Nhập tin nhắn..."
              />
              <div className="flex items-center px-5">
                <button
                  type="submit"
                  className="flex size-8 items-center justify-center rounded-full bg-blue-500 text-xl text-white transition-all hover:bg-blue-400"
                  title="Gửi Message"
                >
                  <IoIosPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
