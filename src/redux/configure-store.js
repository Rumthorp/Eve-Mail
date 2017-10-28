import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware} from 'react-router-redux'
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';



export const history = createHistory();
const historyMiddleware = routerMiddleware(history);


const appReducer = combineReducers({
  eveMail: reducer,
  routing: routerReducer
})



const rootReducer = (state, action) => {
  if (action.type === 'logout') {
    state = undefined;
  }

  return appReducer(state, action);
}



export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(historyMiddleware, reduxPromise, reduxThunk))
);
