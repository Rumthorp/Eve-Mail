import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { refreshMailHeaders, updateComposeView, logout } from '../redux/actions';



class Sidebar extends Component {
  constructor () {
    super();
    this.clickLogout = this.clickLogout.bind(this);
  }

  clickRefresh () {
    this.props.refreshMailHeaders();
  }

  clickCompose () {
    this.props.updateComposeView('opened')
  }

  clickSpecificMailList (str) {

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
    accessToken: state.eveMail.accessToken
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
