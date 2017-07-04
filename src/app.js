import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './redux/configure-store';
import Router from './router';

const HISTORY = syncHistoryWithStore(createBrowserHistory(), store);

require('./styles/main.css');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={HISTORY}>
      <Router/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('react')
);
