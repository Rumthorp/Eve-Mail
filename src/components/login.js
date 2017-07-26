import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTokens } from '../redux/actions';
const EVE_PIC = require('../assets/eve-login.png');



class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    if (this.props.location.search) {
      let url = this.props.location.search;
      let authCode = url.slice(url.indexOf('=') + 1, url.indexOf('&'));
      this.props.fetchTokens(authCode);
    }
  }

  render(){
    return (
      <div>
        <a href={this.props.authUrl}>
          <img src={EVE_PIC} />
        </a>
      </div>
    );
  }
}



function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchTokens}, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
