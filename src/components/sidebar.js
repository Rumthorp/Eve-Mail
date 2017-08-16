import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {eveMailMailHeaderDisplayChange, eveMailAuxWindowDisplayChange, fetchHeaders} from '../redux/actions';



class Sidebar extends Component {
  constructor() {
    super();
  }
  clickRefresh() {
    let characterId = this.props.eveMail.characterId;
    let accessToken = this.props.eveMail.accessToken;
    this.props.fetchHeaders(characterId, accessToken, 2, true);
  }
  clickCompose() {
    this.props.eveMailAuxWindowDisplayChange('compose');
  }
  clickSpecificMailList(str) {
    this.props.eveMailMailHeaderDisplayChange(str);
    this.props.eveMailAuxWindowDisplayChange(null);
  }
  render() {
    return (
      <div>
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
  return bindActionCreators({eveMailMailHeaderDisplayChange, eveMailAuxWindowDisplayChange, fetchHeaders}, dispatch);
}

function mapStateToProps(state, ownProps) {
  return {
    eveMail: state.eveMail
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
