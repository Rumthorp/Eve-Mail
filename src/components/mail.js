import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { initialLoad, updateTokenIntervalStatus, getNewAccessTokenWithRefreshToken } from '../redux/actions';
import EveMailHeaderList from './eve-mail-header-list';
const EVE_PIC = require('../assets/eve-login.png');



class EveMail extends Component {
  constructor(props) {
    super(props);
    this.state = {intervalId: null};
  }

  componentDidMount() {
    let tokenData = JSON.parse(localStorage.getItem("tokens"));
    let {accessToken, refreshToken, accessTokenRefreshTime} = tokenData;
    this.props.initialLoad(accessToken, refreshToken);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokensAreReady == 'start interval') {
      let intervalId = setInterval(this.props.getNewAccessTokenWithRefreshToken(this.props.refreshToken), 900000)
      this.setState({intervalId: intervalId});
      this.props.updateTokenIntervalStatus('interval started');
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return <h1>mail</h1>
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({initialLoad, updateTokenIntervalStatus, getNewAccessTokenWithRefreshToken}, dispatch);
}

function mapStateToProps(state, ownProps) {
  return {
    tokenIntervalStatus: state.eveMail.tokenIntervalStatus,
    initialLoadComplete: state.eveMail.initialLoadComplete
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EveMail);
