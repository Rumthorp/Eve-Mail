import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

const store = createStore(
  combineReducers({
    eveMail: reducer,
    routing: routerReducer
  }),
  composeWithDevTools(applyMiddleware(reduxPromise, reduxThunk))
);

export default store;
