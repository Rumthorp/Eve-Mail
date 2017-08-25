import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { refreshMailHeaders } from '../redux/actions';



class Sidebar extends Component {
  constructor() {
    super();
  }
  clickRefresh() {
    this.props.refreshMailHeaders();
  }
  clickCompose() {
    
  }
  clickSpecificMailList(str) {

  }
  render() {
    return (
      <div className='sidebar-content'>
        <button onClick={this.clickRefresh.bind(this)}>Refresh</button>
        <br/>
        <button onClick={this.clickCompose.bind(this)}>Compose</button>
        <br/>
        <button onClick={this.clickSpecificMailList.bind(this, 'mailHeadersInbox')}>Inbox</button>
        <br/>
        <button onClick={this.clickSpecificMailList.bind(this, 'mailHeadersPersonal')}>Personal</button>
        <br/>
        <button onClick={this.clickSpecificMailList.bind(this, 'mailHeadersAlliance')}>Alliance</button>
        <br/>
        <button onClick={this.clickSpecificMailList.bind(this, 'mailHeadersCorporation')}>Corporation</button>
        <br/>
        <button onClick={this.clickSpecificMailList.bind(this, 'mailHeadersSent')}>Sent</button>
        <br/>
        <button>Trash</button>
      </div>
    );
  }
}



function mapDispatchToProps(dispatch){
  return bindActionCreators({refreshMailHeaders}, dispatch);
}

function mapStateToProps(state, ownProps) {
  return {
    characterId: state.eveMail.characterId,
    accessToken: state.eveMail.accessToken
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
