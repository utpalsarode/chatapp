import React from 'react';
import Router from './routes/userRoutes';
import ChatProvider from './pages/ChatProvider';

function App() {
  return (
    <ChatProvider>
      <Router />
    </ChatProvider>
  );
}

export default App;
