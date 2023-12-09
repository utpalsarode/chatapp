import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Chat from './pages/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import PickAvatar from './pages/PickAvatar';
import Test from '../src/Test';
// import LogIn from './pages/LogIn';
// import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        {/* <Route path='/register' element={<Register />} /> */}
        {/* <Route path='/login' element={<LogIn />} /> */}
        <Route path='/' element={<Chat />} />
        <Route path='/pickavatar' element={<PickAvatar />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
