import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { refreshMailHeaders, updateComposeView, logout } from '../redux/actions';



class Sidebar extends Component {
  constructor () {
    super();
  }

  clickRefresh () {
    this.props.refreshMailHeaders();
  }

  clickCompose () {
    this.props.updateComposeView('opened')
  }

  clickSpecificMailList (str) {

  }

  clickPageRight () {
    if (this.props.location.pathname !== '/mail/inbox' && this.props.initialLoadComplete === true) {
      this.props.history.push('/mail/inbox')
    }
  }

  clickPageLeft () {
    if (this.props.location.pathname !== '/mail/inbox' && this.props.initialLoadComplete === true) {
      this.props.history.push('/mail/inbox')
    }
  }

  clickLogout () {
    this.props.logout()
  }

  render () {
    return (
      <div className='sidebar-content'>
        <div className='sidebar-top-row'>
          <button className='sidebar-top-row-buttons refresh-button' onClick={this.clickRefresh.bind(this)}></button>
          <button className='sidebar-top-row-buttons compose-button' onClick={this.clickCompose.bind(this)}></button>
        </div>
        <div className='sidebar-page-div'>
          <button className='sidebar-page-buttons sidebar-page-button-left' onClick={this.clickPageLeft.bind(this)}></button>
          <h3>Page</h3>
          <button className='sidebar-page-buttons sidebar-page-button-right' onClick={this.clickPageRight.bind(this)}></button>
        </div>
        <button className='sidebar-buttons' onClick={this.clickSpecificMailList.bind(this, 'mailHeadersInbox')}>Inbox</button>
        <button className='sidebar-buttons' onClick={this.clickSpecificMailList.bind(this, 'mailHeadersPersonal')}>Personal</button>
        <button className='sidebar-buttons' onClick={this.clickSpecificMailList.bind(this, 'mailHeadersAlliance')}>Alliance</button>
        <button className='sidebar-buttons' onClick={this.clickSpecificMailList.bind(this, 'mailHeadersCorporation')}>Corporation</button>
        <button className='sidebar-buttons' onClick={this.clickSpecificMailList.bind(this, 'mailHeadersSent')}>Sent</button>
        <div className='sidebar-logout-div'>
          <button className='sidebar-logout-button' onClick={this.clickLogout}>Logout</button>
        </div>
      </div>
    );
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({ refreshMailHeaders, updateComposeView, logout }, dispatch);
}

function mapStateToProps (state, ownProps) {
  return {
    characterId: state.eveMail.characterId,
    accessToken: state.eveMail.accessToken,
    initialLoadComplete: state.eveMail.initialLoadComplete
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
