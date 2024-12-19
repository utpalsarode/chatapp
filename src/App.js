import React from 'react';
import Router from './routes/userRoutes';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ChatProvider from './pages/ChatProvider';

function App() {
  return (
    <ChatProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </ChatProvider>
  );
}

export default App;
