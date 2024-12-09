import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ChakraProviderMain } from '../src/components/ui/provider';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProviderMain>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProviderMain>,
);
