import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { store, history } from './redux/configure-store';
import TopRouter from './top-router';



require('./styles/main.less');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <TopRouter/>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('react')
);
