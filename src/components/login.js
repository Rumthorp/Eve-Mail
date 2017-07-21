import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTokens, fetchHeaders, fetchCharacterNames, sortMailHeaders } from '../redux/actions';
const EVE_PIC = require('../assets/eve-login.png');



class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    if (this.props.location.search) {
      let url = this.props.location.search;
      let authCode = url.slice(url.indexOf('=') + 1, url.indexOf('&'));
      this.props.fetchTokens(authCode, this.props.updateStage + 1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateStage == 1) {
      this.props.fetchHeaders(nextProps.characterId, nextProps.accessToken, nextProps.updateStage + 1, true);
    }

    if (nextProps.updateStage == 2) {
      this.props.fetchCharacterNames(nextProps.mailHeaders, nextProps.updateStage + 1);
    }

    if (nextProps.updateStage == 3) {
      this.props.sortMailHeaders(nextProps.mailHeaders, nextProps.updateStage + 1);
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
  return bindActionCreators({fetchTokens, fetchHeaders, fetchCharacterNames, sortMailHeaders}, dispatch);
}

function mapStateToProps(state) {
  return {
    updateStage: state.eveMail.updateStage,
    authUrl: state.eveMail.authUrl,
    characterId: state.eveMail.characterId,
    accessToken: state.eveMail.accessToken,
    mailHeaders: state.eveMail.mailHeaders
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
