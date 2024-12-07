import React from "react";
import welcomUserImage from "../../../assets/images/welcomeUser.gif";

const WelcomeMessage = ({ currentUser }) => {
  return (
    <div className="initalContact">
      <div>
        <div className="welcomeAvatar">
          <img src={welcomUserImage} alt="welcome" />
        </div>
        <div className="welcomeText">
          <h1>Welcome, {currentUser?.name || ""}!</h1>
          <p>Please select a chat to start messaging.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
