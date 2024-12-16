import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import { Chat } from '../pages/chat/Chat';
import PickAvatar from '../pages/PickAvatar';
import Test from '../Test';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Chat />} />
        <Route path="/pickavatar" element={<PickAvatar />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
