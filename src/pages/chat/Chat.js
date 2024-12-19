import React, { useEffect, useState } from 'react';
import '../../assets/css/Chat.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChatSidebar from './chat_components/ChatSidebar';
import ChatWindow from './chat_components/ChatWindow';
import WelcomeMessage from './chat_components/WelcomeMessage';
import { ApiCall } from '../../helper/axios';
import { Avatar, AvatarGroup } from '../../components/ui/avatar';
import { setChatState, setInitialUserData } from '../../redux/commonSlice';
import { FaAngleDown, FaSearch, FaBell } from 'react-icons/fa';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  InputGroup,
  Button,
  Input,
} from 'reactstrap';
import ProfileModal from '../../components/Modal';
import { ChatState } from '../ChatProvider';

export const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = ChatState();
  const [selectedChat, setSelectedChat] = useState('');
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [typeMessage, setTypeMessage] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggle = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    if (!userInfo) navigate('/');
    dispatch(
      setChatState({
        selectedChat,
        user: userInfo,
        notification,
        chats,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat, user, notification, chats]);

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      setCurrentUser(JSON.parse(localStorage.getItem('userData')));
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

  return (
    <div>
      <Navbar expand={true} className="main-header" color="light">
        <Nav className="me-auto" navbar>
          <InputGroup>
            <Button>
              <FaSearch />
            </Button>
            <Input className="user-search-header" />
          </InputGroup>
        </Nav>
        <Nav className="me-auto" navbar>
          <NavbarBrand onClick={() => navigate('/')}>Let's Chat</NavbarBrand>
        </Nav>
        {/* <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse> */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
            <NavbarText>
              <Avatar size="sm" name={currentUser?.name} />
            </NavbarText>
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem onClick={toggle}>Open Profile</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>
      <div className="chat-app row">
        <ChatSidebar
          currentUser={currentUser}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />
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

      <ProfileModal
        open={isProfileOpen}
        handleChange={toggle}
        title={'My Profile'}
        email={currentUser?.email}
        src={currentUser?.user_image}
      />
    </div>
  );
};
