import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import { initialLoad, updateTokenIntervalStatus, getNewAccessTokenWithRefreshToken } from '../redux/actions';
import SideBar from './sidebar';
import InboxContainer from './inbox-container';
const EVE_PIC = require('../assets/eve-login.png');



class EveMail extends Component {
  constructor(props) {
    super(props);
    this.state = {intervalId: null};
  }

  componentDidMount() {
    this.props.initialLoad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokenIntervalStatus == 'start interval') {
      let intervalId = setInterval(this.props.getNewAccessTokenWithRefreshToken.bind(this, this.props.refreshToken), 900000)
      this.setState({intervalId: intervalId});
      this.props.updateTokenIntervalStatus('interval started');
    }

    if (nextProps.initialLoadComplete == true && this.props.initialLoadComplete == false) {
      this.props.history.push('/mail/inbox');
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <div className='main-div'>
        <div className='sidebar-shell'>
          <SideBar />
        </div>
        <div className='mail-shell'>
          <Route path='/mail/inbox' component={InboxContainer} />
        </div>
      </div>
    )
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({initialLoad, updateTokenIntervalStatus, getNewAccessTokenWithRefreshToken}, dispatch);
}

function mapStateToProps(state) {
  return {
    tokenIntervalStatus: state.eveMail.tokenIntervalStatus,
    initialLoadComplete: state.eveMail.initialLoadComplete,
    refreshToken: state.eveMail.refreshToken
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EveMail));
