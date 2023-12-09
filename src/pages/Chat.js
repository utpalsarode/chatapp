import React from 'react'
import '../assets/css/Chat.css'
// import { Link } from 'react-router-dom'
import { FaCamera, FaCircle, FaCircleQuestion, FaGear, FaImage, FaPaperPlane, FaSistrix } from "react-icons/fa6";

const Chat = () => {
  return (
    <>
      {/* <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12"> */}
      <div className="chat-card chat-app">
        <div id="plist" className="people-list">
          <div className="input-group mb-3">
            <span className="input-group-text px-3 py-2 btn"><i className='fs-5'><FaSistrix /></i></span>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <ul className="list-unstyled chat-list mt-2 mb-0">
            <li className="clearfix">
              <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
              <div className="about">
                <div className="name">Vincent Porter</div>
                <div className="status"> <i className="fa fa-circle offline"><FaCircle /></i> left 7 mins ago </div>
              </div>
            </li>
            <li className="clearfix active">
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
            </li>
          </ul>
        </div>
        <div className="chat">
          <div className="chat-header clearfix">
            <div className="row">
              <div className="col-lg-6">
                <a href="https://www.google.com/" data-toggle="modal" data-target="https://www.google.com/view_info">
                  <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                </a>
                <div className="chat-about">
                  <h6 className="m-b-0">Aiden Chavez</h6>
                  <small>Last seen: 2 hours ago</small>
                </div>
              </div>
              <div className="col-lg-6 hidden-sm text-end">
                <a href="https://www.google.com/" className="btn btn-outline-secondary fs-5 me-2 p-3"><i className="fa fa-camera"><FaCamera /></i></a>
                <a href="https://www.google.com/" className="btn btn-outline-primary fs-5 me-2 p-3"><i className="fa fa-image"></i><FaImage /></a>
                <a href="https://www.google.com/" className="btn btn-outline-info fs-5 me-2 p-3"><i className="fa fa-cogs"></i><FaGear /></a>
                <a href="https://www.google.com/" className="btn btn-outline-warning fs-5 p-3"><i className="fa fa-question"><FaCircleQuestion /></i></a>
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
        </div>
      </div>
      {/* </div>
        </div>
      </div> */}
    </>
  )
}

export default Chat