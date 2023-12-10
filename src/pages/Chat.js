import React, { useEffect, useState } from 'react'
import '../assets/css/Chat.css'
// import { Link } from 'react-router-dom'
import welcomUserImage from '../assets/images/welcomeUser.gif'
import { FaCamera, FaCircle, FaGear, FaImage, FaPaperPlane, FaSistrix } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { ApiCall, GetApiCall } from '../helper/axios';
import { useDispatch } from 'react-redux';
import { setInitialUserData } from '../redux/commonSlice';
import { useNavigate } from 'react-router-dom';
import InputTextField from '../components/InputTextFiled';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [activeContacts, setActiveContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const [currentChat, setCurrentChat] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [typeMessage, setTypeMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchContacts = async (id) => {
    let res = await GetApiCall('GET', `/getAllUsers/${id}`);
    if (res.data.status === 'success' && res.data.statusCode === 200) {
      const contactsData = res.data.data;
      setContacts(contactsData);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
      fetchContacts(JSON.parse(localStorage.getItem('user')).id);
    } else {
      navigate('/signin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setInitialUserData());
  };

  const handleSearchUser = (value) => {
    setSearchUser(value);
    if (value && value.length > 2 && contacts.length) {
      var result = contacts.filter(obj => {
        return ((obj.name).toLowerCase()).includes(value)
      })
      setFilteredContacts(result);
    }
  }

  const getAllMessages = async () => {
    const data = {
      from: currentUser.id,
      to: currentChat._id
    }
    let res = await ApiCall('POST', '/get-messages', data);
    if (res.data.status === 'success' && res.data.statusCode === 200) {
      const getMessages = res.data.data;
      setMessages(getMessages);
    }
  }
  console.log('messages', messages);

  useEffect(() => {
    if (currentChat) {
      getAllMessages();
    }
  }, [currentChat]);

  const addMessage = async () => {
    const data = {
      from: currentUser.id,
      to: currentChat._id,
      message: typeMessage
    }
    let res = await ApiCall('POST', '/add-message', data);
    if (res.data.status === 'success' && res.data.statusCode === 200) {
      setTypeMessage('');
    }
  }

  const enterMessage = (event) => {
    if (event.key === 'Enter') {
      addMessage()
    }
  }

  const filteredContactsData = searchUser.length > 2 ? filteredContacts : contacts;
  return (
    <>
      <div className="chat-card chat-app row">
        <div id="plist" className="people-list col-xl-4 col-lg-3 col-md-4 col-sm-4 col-xs-4">
          <div className="input-group input-search-contact mb-3">
            <span className="input-group-text px-3 py-2 btn"><i className='fs-5'><FaSistrix /></i></span>


            <InputTextField
              value={searchUser}
              className={'form-control'}
              type="text"
              id={'searchUser'}
              placeholder='Search...'
              name='searchUser'
              autoComplete='on'
              handleChange={(_, value) => { handleSearchUser(value); }}
            />
          </div>
          <ul className="list-unstyled chat-list mb-0">
            {!loading && filteredContactsData && filteredContactsData.length ? filteredContactsData.map((item, index) => {
              return (
                <li className="clearfix chat-contact-user" key={index} onClick={() => { setCurrentChat(item); }}>
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                  <div className="about">
                    <div className="name">{item.name}</div>
                    <div className="status"> <i className="fa fa-circle offline"><FaCircle /></i> left 7 mins ago </div>
                  </div>
                </li>
              )
            }) : <li className="clearfix active">
              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
              <div className="about">
                <div className="name">Aiden Chavez</div>
                <div className="status"> <i className="fa fa-circle online"><FaCircle /></i> online </div>
              </div>
            </li>}
          </ul>
        </div>
        <div className="chat col-xl-8 col-lg-9 col-md-8 col-sm-8 col-xs-8">
          {currentChat ? <>
            <div className="chat-header clearfix">
              <div className="row">
                <div className="col-lg-6">
                  <a href="https://www.google.com/" data-toggle="modal" data-target="https://www.google.com/view_info">
                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                  </a>
                  <div className="chat-about">
                    <h6 className="m-b-0">{currentChat ? currentChat.name : 'Aiden Chavez'}</h6>
                    <small>Last seen: 2 hours ago</small>
                  </div>
                </div>
                <div className="col-lg-6 hidden-sm text-end">
                  <button className="btn btn-outline-secondary fs-5 me-2 p-3"><i className="fa fa-camera"><FaCamera /></i></button>
                  <button className="btn btn-outline-primary fs-5 me-2 p-3"><i className="fa fa-image"></i><FaImage /></button>
                  <button className="btn btn-outline-info fs-5 me-2 p-3"><i className="fa fa-cogs"></i><FaGear /></button>
                  <button onClick={handleLogout} className="btn btn-outline-warning fs-5 p-3"><i className="fa fa-question"><TbLogout /></i></button>
                </div>
              </div>
            </div>
            <div className="chat-history">
              <ul className="m-b-0">
                {messages && messages.length ? messages.map((message, index) => {
                  console.log('message', message);
                  return (
                    <li className="clearfix" key={index}>
                      <div className="message-data">
                        <span className="message-data-time">10:10 AM, Today</span>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                      </div>
                      <div className={`message ${message.fromSelf ? 'my-message' : 'other-message'}`}>{message.message}</div>
                    </li>
                  )
                }) : <></>}
                {/* <li className="clearfix">
                  <div className="message-data">
                    <span className="message-data-time">10:12 AM, Today</span>
                  </div>
                  <div className="message my-message">Are we meeting today?</div>
                </li>
                <li className="clearfix">
                  <div className="message-data">
                    <span className="message-data-time">10:15 AM, Today</span>
                  </div>
                  <div className="message my-message">Project has been already finished and I have results to show you.</div>
                </li> */}
              </ul>
            </div>
            <div className="chat-message sticky-bottom clearfix col-lg-12">
              <div className="input-group">
                <button className="input-group-text px-3 py-2 btn" onClick={addMessage}><i className="fa fa-send fs-5"><FaPaperPlane /></i></button>
                <InputTextField
                  value={typeMessage}
                  className={'form-control px-2'}
                  type="text"
                  id={'searchUser'}
                  placeholder='Enter text here...'
                  name='searchUser'
                  onKeyDown={enterMessage}
                  autoComplete='on'
                  handleChange={(_, value) => { setTypeMessage(value); }}
                />
                {/* <input type="text" className="form-control px-2" placeholder="Enter text here..." /> */}
              </div>
            </div>
          </> :
            <div className='initalContact'>
              <div>
                <div className='welcomeAvatar'>
                  <img src={welcomUserImage} alt='welcome' />
                </div>
                <div className='welcomeText'>
                  <h1>Welcome, {currentUser ? currentUser.name : ''}!</h1>
                  <p>Please select a chat to start a messaging.</p>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </>
  )
}

export default Chat