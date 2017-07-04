import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

const store = createStore(
  combineReducers({
    eveMail: reducer,
    routing: routerReducer
  }),
  composeWithDevTools(applyMiddleware(ReduxPromise))
);

export default store;
