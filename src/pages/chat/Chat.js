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
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  ListGroup,
  ListGroupItem,
  Spinner,
} from 'reactstrap';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../../src/components/ui/menu';
import ProfileModal from '../../components/Modal';
import { ChatState } from '../ChatProvider';
import { getSender } from '../../helper/commonFunction';

export const Chat = () => {
  const token = localStorage.getItem('access-token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedChat, setSelectedChat, user, setUser, notification, setNotification, chats, setChats } = ChatState();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [fetchDataAgain, setFetchDataAgain] = useState(false);

  // Search and New Chat Drawer States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggle = () => setIsProfileOpen(!isProfileOpen);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearchUsers = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    try {
      let res = await GetApiCall('GET', `/getAllUsers?search=${query.toLowerCase()}`, {
        authentication: token,
      });
      if (res.data.status === 'success' && res.data.statusCode === 200) {
        setSearchResults(res.data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    }
    setSearchLoading(false);
  };

  const handleAccessChat = async (userId) => {
    try {
      const data = { user_id: userId };
      let res = await ApiCall('POST', '/chat', data, { authentication: token });
      if (res.data.status === 'success' && res.data.statusCode === 200) {
        const chatData = res.data.data;
        setChats((prevChats) => {
          if (!prevChats) return [chatData];
          if (!prevChats.some((c) => c._id === chatData._id)) {
            return [chatData, ...prevChats];
          }
          return prevChats;
        });
        setSelectedChat(chatData);
        toggleDrawer();
      }
    } catch (error) {
      console.error('Error accessing chat:', error);
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    if (!userInfo) {
      navigate('/signin');
    } else {
      setUser(userInfo);
    }
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
            <Button onClick={toggleDrawer}>
              <FaSearch />
            </Button>
            <Input
              className="user-search-header"
              placeholder="Find new users..."
              onClick={toggleDrawer}
              readOnly
              style={{ cursor: 'pointer' }}
            />
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
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
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

      {/* Slide-out Left Drawer for Finding & Starting Chats with New Users */}
      <Offcanvas isOpen={isDrawerOpen} toggle={toggleDrawer} direction="start" className="bg-dark text-white border-end border-secondary" style={{ width: '350px' }}>
        <OffcanvasHeader toggle={toggleDrawer} className="text-white border-bottom border-secondary">
          Find New Users
        </OffcanvasHeader>
        <OffcanvasBody>
          <InputGroup className="mb-3">
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearchUsers(e.target.value)}
              className="bg-transparent text-white border-secondary"
            />
          </InputGroup>
          {searchLoading ? (
            <div className="d-flex justify-content-center my-4">
              <Spinner color="warning" />
            </div>
          ) : searchResults.length ? (
            <ListGroup flush>
              {searchResults.map((searchUser) => (
                <ListGroupItem
                  key={searchUser._id}
                  onClick={() => handleAccessChat(searchUser._id)}
                  className="bg-transparent text-white border-secondary d-flex align-items-center gap-3 py-2 cursor-pointer"
                  style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2b36'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Avatar size="sm" name={searchUser.name} src={searchUser.user_image} />
                  <div className="d-flex flex-column">
                    <span className="font-weight-bold">{searchUser.name}</span>
                    <small className="text-muted">{searchUser.email}</small>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          ) : searchQuery ? (
            <div className="text-center my-4 text-muted">No users found</div>
          ) : (
            <div className="text-center my-4 text-muted">Search for someone to chat with!</div>
          )}
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};
