import React, { useEffect } from "react";
import { FiMoreVertical } from 'react-icons/fi'
import { FaCamera, FaGear, FaImage, FaPaperPlane } from "react-icons/fa6";
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import InputTextField from "../../../components/InputTextFiled";
import { useDispatch } from 'react-redux';
import { setInitialUserData } from '../../../redux/commonSlice';

const ChatWindow = ({ currentChat, messages, typeMessage, setTypeMessage, addMessage, currentUser }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const chatElement = document.querySelector(".chat-history");
        if (chatElement) {
        chatElement.scrollTop = chatElement.scrollHeight;
        }
    }, [messages]);

    const enterMessage = (event) => {
        if (event.key === "Enter") {    
        addMessage();
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(setInitialUserData());
    };

    return (
        <>
        <div className="chat">
            <div className="chat-header clearfix">
            <div className="d-flex justify-content-between">
                <div className="chat-user-profile">
                    <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                    />
                    <div className="chat-about">
                        <h6 className="m-b-0">{currentChat.name}</h6>
                        <small>Last seen: 2 hours ago</small>
                    </div>
                </div>
                <div className="d-flex align-items-center hidden-sm text-end">
                    <button className="btn btn-outline-secondary fs-5 me-2 p-3"><i className="fa fa-camera"><FaCamera /></i></button>
                    <button className="btn btn-outline-primary fs-5 me-2 p-3"><i className="fa fa-image"></i><FaImage /></button>
                    <button className="btn btn-outline-info fs-5 me-2 p-3"><i className="fa fa-cogs"></i><FaGear /></button>
                    {/* <button onClick={handleLogout} className="btn btn-outline-warning fs-5 p-3"><i className="fa fa-question"><TbLogout /></i></button> */}
                    <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow FiMoreVertical' color='transparent' size='lg'>
                        <FiMoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu className="dropdownmenu-z-index" >
                        <DropdownItem>
                            <span className="dropdownitem-font-si" onClick={handleLogout}>Log out</span>
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </div>
            </div>
            </div>
            <div className="chat-history">
            <ul className="m-b-0">
                {messages.map((message, index) => (
                <li className="clearfix" key={index}>
                    <div className="message-data">
                    <span className="message-data-time">10:10 AM, Today</span>
                    </div>
                    <div
                    className={`message ${
                        message.fromSelf ? "my-message" : "other-message"
                    }`}
                    >
                    {message.message}
                    </div>
                </li>
                ))}
            </ul>
            </div>
            <div className="chat-message clearfix">
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
                    handleChange={(_, value) => setTypeMessage(value)}
                />
            </div>
            </div>
        </div>
        </>
    );
};

export default ChatWindow;
