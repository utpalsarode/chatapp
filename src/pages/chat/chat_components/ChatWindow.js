import React, { useEffect, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { FaCamera, FaGear, FaImage, FaPaperPlane } from 'react-icons/fa6';
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Button } from 'reactstrap';
import InputTextField from '../../../components/InputTextFiled';
import { useDispatch } from 'react-redux';
import { setInitialUserData } from '../../../redux/commonSlice';
import { ChatState } from '../../ChatProvider';
import LazyImage from '../../../components/LazyImage';
import { ApiCall, GetApiCall } from '../../../helper/axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getMessageDate } from '../../../helper/commonFunction';
import ScrollableChat from './ScrollableChat';
import { IoMdArrowBack } from 'react-icons/io';
import typingAnimeImage from '../../../assets/images/typingAnime.gif';

import { nodeApi } from '../../../helper/commonApi';
import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

const ChatWindow = ({ fetchDataAgain, setFetchDataAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();
  const token = localStorage.getItem('access-token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeMessage, setTypeMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('message', 'hello world.');
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('message received', (newMessage) => {
        if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
          if (!notification.includes(newMessage)) {
            setNotification((notification) => [newMessage, ...notification]);
            setFetchDataAgain((fetchDataAgain) => !fetchDataAgain);
          }
        } else {
          setMessages((messages) => [...messages, newMessage]);
        }
      });
    }
  }, []);

  useEffect(() => {
    const chatElement = document.querySelector('.chat-history');
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  }, [messages]);

  const getAllMessages = async () => {
    setLoading(true);
    let res = await GetApiCall('GET', `/messages?chatId=${selectedChat._id}`, { authentication: token });
    setMessages(res.data.status === 'success' && res.data.statusCode === 200 ? res.data.data : []);
    socket.emit('Join Chat', selectedChat._id);
    setLoading(false);
  };

  const addMessage = async () => {
    if (!typeMessage) return;
    socket.emit('stop typing', selectedChat._id);
    const data = {
      chatId: selectedChat._id,
      message: typeMessage,
    };
    let res = await ApiCall('POST', '/messages', data, { authentication: token });
    if (res.data.status === 'success' && res.data.statusCode === 200) {
      setTypeMessage('');
      setMessages((messages) => [...messages, res.data.data]);
      socket.emit('new message', res.data.data);
    }
  };

  useEffect(() => {
    if (selectedChat && Object.keys(selectedChat).length) {
      getAllMessages();
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  const enterMessage = (event) => {
    if (event.key === 'Enter') {
      addMessage();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setInitialUserData());
    navigate('/signin');
  };

  const handleTyping = (value) => {
    setTypeMessage(value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    debounceStopTyping();
  };

  const debounceStopTyping = (() => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setTyping(false);
        socket.emit('stop typing', selectedChat._id);
      }, 2000);
    };
  })();

  return (
    <>
      {/* <div className="chat"> */}
      <div className="chat-header clearfix">
        <div className="d-flex justify-content-between">
          <div className="chat-user-profile">
            <Button className="back-button" onClick={() => setSelectedChat({})}>
              <IoMdArrowBack size={20} />
            </Button>
            <LazyImage src={'https://bootdey.com/img/Content/avatar/avatar2.png'} alt="avatar" height={'40px'} width={'40px'} />
            {/* <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" /> */}
            <div className="chat-about">
              <h6 className="mb-0">{selectedChat?.chatName}</h6>
              <small>Last seen: 2 hours ago</small>
            </div>
          </div>
          <div className="d-flex align-items-center hidden-sm text-end">
            <button className="btn btn-outline-secondary fs-5 me-2 p-3">
              <i className="fa fa-camera">
                <FaCamera />
              </i>
            </button>
            <button className="btn btn-outline-primary fs-5 me-2 p-3">
              <i className="fa fa-image"></i>
              <FaImage />
            </button>
            <button className="btn btn-outline-info fs-5 me-2 p-3">
              <i className="fa fa-cogs"></i>
              <FaGear />
            </button>
            {/* <button onClick={handleLogout} className="btn btn-outline-warning fs-5 p-3"><i className="fa fa-question"><TbLogout /></i></button> */}
            <UncontrolledDropdown>
              <DropdownToggle className="icon-btn hide-arrow FiMoreVertical" color="transparent" size="lg">
                <FiMoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu className="dropdownmenu-z-index">
                <DropdownItem>
                  <span className="dropdownitem-font-si" onClick={handleLogout}>
                    Log out
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      {/* {!loading ? (
          <div className="chat-history">
            <ul className="m-b-0">
              {messages.length ? (
                messages.map((message, index) => (
                  <li className="clearfix" key={index}>
                    <div className="message-data">
                      <span className="message-data-time">{getMessageDate(message.createdAt)}</span>
                    </div>
                    <div className={`message ${message.fromSelf ? 'my-message' : 'other-message'}`}>{message.message}</div>
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          </div>
        ) : (
          <div className="chat-history-loader">
            <Spinner />
          </div>
        )} */}
      <div className={`messages chat-history ${!messages.length ? 'no-message-box' : ''}`}>
        <ScrollableChat messages={messages} loading={loading} />
      </div>
      <div className={`typing-indicator ${isTyping ? 'show' : ''}`}>
        <img src={typingAnimeImage} alt="typing" />
      </div>
      <div className="chat-message">
        <div className="input-group">
          <button className="input-group-text btn" onClick={addMessage}>
            <FaPaperPlane className="fs-5" />
          </button>
          <InputTextField
            value={typeMessage}
            className="form-control px-2"
            type="text"
            placeholder="Enter text here..."
            name="message"
            onKeyDown={enterMessage}
            autoComplete="on"
            handleChange={(_, value) => handleTyping(value)}
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ChatWindow;
