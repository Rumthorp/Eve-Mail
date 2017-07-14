import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Login from './login';
import EveMail from './eve-mail'


class AuthContainer extends Component {
  constuctor() {
    super()
  }

  render() {
    return (

    )
  }
}



}

mapStateToProps(state) {
  return {
    eveMail: state.eveMail
  }
}

connect(mapStateToProps)(AuthContainer)
