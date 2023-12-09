import React, { useEffect, useState } from 'react'
import '../assets/css/Chat.css'
// import { Link } from 'react-router-dom'
import welcomUserImage from '../assets/images/welcomeUser.gif'
import { FaCamera, FaCircle, FaGear, FaImage, FaPaperPlane, FaSistrix } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { GetApiCall } from '../helper/axios';
import { useDispatch } from 'react-redux';
import { setInitialUserData } from '../redux/commonSlice';
import { useNavigate } from 'react-router-dom';
import InputTextField from '../components/InputTextFiled';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const [currentChat, setCurrentChat] = useState(false);
  const [searchUser, setSearchUser] = useState('');
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
  const filteredContactsData = searchUser.length > 2 ? filteredContacts : contacts;
  return (
    <>
      {/* <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12"> */}
      <div className="chat-card chat-app">
        <div id="plist" className="people-list">
          <div className="input-group mb-3">
            <span className="input-group-text px-3 py-2 btn"><i className='fs-5'><FaSistrix /></i></span>
            {/* <input type="text" className="form-control" placeholder="Search..." /> */}

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
          <ul className="list-unstyled chat-list mt-2 mb-0">
            {!loading && filteredContactsData && filteredContactsData.length ? filteredContactsData.map((item, index) => {
              return (
                <li className="clearfix" key={index} onClick={() => { setCurrentChat(item); }}>
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

            {/* <li className="clearfix active">
              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
              <div className="about">
                <div className="name">Aiden Chavez</div>
                <div className="status"> <i className="fa fa-circle online"><FaCircle /></i> online </div>
              </div>
            </li>
            <li className="clearfix">
              <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
              <div className="about">
                <div className="name">Mike Thomas</div>
                <div className="status"> <i className="fa fa-circle online"><FaCircle /></i> online </div>
              </div>
            </li>
            <li className="clearfix">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
              <div className="about">
                <div className="name">Christian Kelly</div>
                <div className="status"> <i className="fa fa-circle offline"><FaCircle /></i> left 10 hours ago </div>
              </div>
            </li>
            <li className="clearfix">
              <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar" />
              <div className="about">
                <div className="name">Monica Ward</div>
                <div className="status"> <i className="fa fa-circle online"><FaCircle /></i> online </div>
              </div>
            </li>
            <li className="clearfix">
              <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
              <div className="about">
                <div className="name">Dean Henry</div>
                <div className="status"> <i className="fa fa-circle offline"><FaCircle /></i> offline since Oct 28 </div>
              </div>
            </li> */}
          </ul>
        </div>
        <div className="chat">
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
                <li className="clearfix">
                  <div className="message-data text-right">
                    <span className="message-data-time">10:10 AM, Today</span>
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                  </div>
                  <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                </li>
                <li className="clearfix">
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
                </li>
              </ul>
            </div>
            <div className="chat-message sticky-bottom clearfix col-lg-12">
              <div className="input-group">
                <span className="input-group-text px-3 py-2 btn"><i className="fa fa-send fs-5"><FaPaperPlane /></i></span>
                <input type="text" className="form-control px-2" placeholder="Enter text here..." />
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
      {/* </div>
        </div>
      </div> */}
    </>
  )
}

export default Chat