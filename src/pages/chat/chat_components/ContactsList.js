import React from "react";
import { FaCircle } from "react-icons/fa6";

const ContactsList = React.memo(({ contacts, setCurrentChat, loading }) => {
  console.log("Rendering ContactsList");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contacts.length) {
    return (
      <li className="clearfix py-4">
        <div className="text-center">No results found</div>
      </li>
    );
  }

  return (
    <ul className="list-unstyled chat-list mb-0">
      {contacts.map((item, index) => (
        <li className="clearfix chat-contact-user" key={index} onClick={() => setCurrentChat(item)}>
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="avatar"
          />
          <div className="about">
            <div className="name">{item.name}</div>
            <div className="status">
              <FaCircle className="fa-circle offline" /> left 7 mins ago
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});

export default ContactsList;
