import React, { useEffect, useState } from 'react';
import '../../assets/css/Chat.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChatSidebar from './chat_components/ChatSidebar';
import ChatWindow from './chat_components/ChatWindow';
import WelcomeMessage from './chat_components/WelcomeMessage';
import { ApiCall, GetApiCall } from '../../helper/axios';
import { Avatar, AvatarGroup } from '../../components/ui/avatar';
import { setChatState, setInitialUserData } from '../../redux/commonSlice';
import { FaAngleDown, FaSearch, FaBell } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
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
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../src/components/ui/menu';
import ProfileModal from '../../components/Modal';
import { ChatState } from '../ChatProvider';
import { getSender } from '../../helper/commonFunction';

export const Chat = () => {
  const token = localStorage.getItem('access-token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [fetchDataAgain, setFetchDataAgain] = useState(false);

  const toggle = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    if (!userInfo) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getAllMessages = async () => {
  //   let res = await GetApiCall('GET', `/messages?chatId=${selectedChat._id}`, { authentication: token });
  //   setMessages(res.data.status === 'success' ? res.data.data : []);
  // };

  // const addMessage = async () => {
  //   const data = {
  //     chatId: selectedChat._id,
  //     message: typeMessage,
  //   };
  //   let res = await ApiCall('POST', '/messages', data);
  //   if (res.data.status === 'success' && res.data.statusCode === 200) {
  //     setTypeMessage('');
  //     getAllMessages();
  //   }
  // };

  // useEffect(() => {
  //   if (selectedChat && Object.keys(selectedChat).length) {
  //     getAllMessages();
  //   }
  // }, [selectedChat]);

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
        <div className="prof-notification">
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
              <NavbarText data-count={notification?.length ? notification?.length : 0} className={`nav-notification-bar ${notification?.length ? 'active' : ''}`}>
              <IoMdNotifications className='nav-notification-badge' size="30" name={user?.name} />
              </NavbarText>
            </DropdownToggle>
            {notification && notification.length ? (
              notification.map((not) => (
                <DropdownMenu
                  end
                  key={not._id}
                  onClick={() => {
                    setSelectedChat(not.chat);
                    setNotification((notification) => notification.filter((n) => n._id !== not._id));
                  }}
                >
                  {not.chat.isGroupChat ? `New Message in ${not.chat.chatName}` : `New Message from ${getSender(user, not.chat.users)}`}
                </DropdownMenu>
              ))
            ) : (
              <DropdownMenu end className="empty-notifications">
                No New Messages
              </DropdownMenu>
            )}
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
              <NavbarText>
                <Avatar size="sm" name={user?.name} />
              </NavbarText>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem onClick={toggle}>Open Profile</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Navbar>
      <div className={`chat-app ${selectedChat && Object.keys(selectedChat).length ? 'show-chat' : ''}`}>
        <ChatSidebar fetchDataAgain={fetchDataAgain} />
        <div className="chat-content chat">
          {selectedChat && Object.keys(selectedChat).length ? (
            <ChatWindow fetchDataAgain={fetchDataAgain} setFetchDataAgain={setFetchDataAgain} />
          ) : (
            <WelcomeMessage />
          )}
        </div>
      </div>

      <ProfileModal open={isProfileOpen} handleChange={toggle} title={'My Profile'} email={user?.email} src={user?.user_image} />
    </div>
  );
};
