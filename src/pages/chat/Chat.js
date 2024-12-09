import React, { useEffect, useState } from 'react';
import '../../assets/css/Chat.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChatSidebar from './chat_components/ChatSidebar';
import ChatWindow from './chat_components/ChatWindow';
import WelcomeMessage from './chat_components/WelcomeMessage';
import { ApiCall } from '../../helper/axios';
import { setInitialUserData } from '../../redux/commonSlice';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [typeMessage, setTypeMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      setCurrentUser(userData);
    } else {
      navigate('/signin');
    }
  }, []);

  const getAllMessages = async () => {
    const data = {
      from: currentUser.id,
      to: currentChat._id,
    };
    let res = await ApiCall('POST', '/get-messages', data);
    setMessages(res.data.status === 'success' ? res.data.data : []);
  };

  const addMessage = async () => {
    const data = {
      from: currentUser.id,
      to: currentChat._id,
      message: typeMessage,
    };
    let res = await ApiCall('POST', '/add-message', data);
    if (res.data.status === 'success' && res.data.statusCode === 200) {
      setTypeMessage('');
      getAllMessages();
    }
  };

  useEffect(() => {
    if (currentChat) {
      getAllMessages();
    }
  }, [currentChat]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setInitialUserData());
    navigate('/signin');
  };
  console.log('rednering chat.js');
  
  return (
    <div className="chat-app row">
      <ChatSidebar currentChat={currentChat} setCurrentChat={setCurrentChat}/>
      <div className="col-xl-9 col-lg-9 col-md-8">
        {currentChat ? (
          <ChatWindow
            currentChat={currentChat}
            messages={messages}
            typeMessage={typeMessage}
            setTypeMessage={setTypeMessage}
            addMessage={addMessage}
            currentUser={currentUser}
            handleLogout={handleLogout}
          />
        ) : (
          <WelcomeMessage currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export default Chat;
