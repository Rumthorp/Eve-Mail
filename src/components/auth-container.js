import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Login from './login';
import Loading from './loading';
import EveMail from './eve-mail';



const AuthContainer = (props) => {
  
}

mapStateToProps(state) {
  return {
    eveMail: state.eveMail
  }
}

export default connect(mapStateToProps)(AuthContainer)
