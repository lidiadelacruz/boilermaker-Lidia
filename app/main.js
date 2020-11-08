import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import './style.css';
import { User } from './components';

ReactDOM.render(
  <Provider store={store}>
    <User />
  </Provider>,
  document.getElementById('main')
);
