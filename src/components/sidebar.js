import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateComposeView, logout, setPage, updateFilterAndFilteredArrayChain, fetchHeaderChain } from '../redux/actions';



class Sidebar extends Component {
  constructor () {
    super();
  }

  clickRefresh () {
    if (this.props.fetchHeaderCycleStatus === 'ready') {
      this.props.fetchHeaderChain();
    }
  }

  clickCompose () {
    this.props.updateComposeView('opened');
  }

  clickSpecificMailList (str) {
    this.props.updateFilterAndFilteredArrayChain(str);
  }

  clickPageRight () {
    if (this.props.location.pathname !== '/mail/inbox' && this.props.initialLoadComplete === true) {
      this.props.history.push('/mail/inbox');
    }

    this.props.setPage(1);
  }

  clickPageLeft () {
    if (this.props.location.pathname !== '/mail/inbox' && this.props.initialLoadComplete === true) {
      this.props.history.push('/mail/inbox');
    }

    this.props.setPage(-1);
  }

  clickLogout () {
    this.props.logout();
  }

  render () {
    let filterTable = {inbox: 'sidebar-buttons', character: 'sidebar-buttons', alliance: 'sidebar-buttons', corporation: 'sidebar-buttons'};
    filterTable[this.props.filter] = 'sidebar-buttons-active';

    return (
      <div className='sidebar-content'>
        <div className='sidebar-top-row'>
          <button className='sidebar-top-row-buttons refresh-button' onClick={this.clickRefresh.bind(this)}></button>
          <button className='sidebar-top-row-buttons compose-button' onClick={this.clickCompose.bind(this)}></button>
        </div>
        <div className='sidebar-page-div'>
          <button className='sidebar-page-buttons sidebar-page-button-left' onClick={this.clickPageLeft.bind(this)}></button>
          <div className='sidebar-page-number-div'>
            <p>{ this.props.page }</p>
            <p>-</p>
            <p>{ this.props.maxPage }</p>
          </div>
          <button className='sidebar-page-buttons sidebar-page-button-right' onClick={this.clickPageRight.bind(this)}></button>
        </div>
        <button className={ filterTable.inbox } onClick={this.clickSpecificMailList.bind(this, 'inbox')}>Inbox</button>
        <button className={ filterTable.character } onClick={this.clickSpecificMailList.bind(this, 'character')}>Character</button>
        <button className={ filterTable.alliance } onClick={this.clickSpecificMailList.bind(this, 'alliance')}>Alliance</button>
        <button className={ filterTable.corporation } onClick={this.clickSpecificMailList.bind(this, 'corporation')}>Corporation</button>
        <button className='sidebar-buttons' >Sent</button>
        <div className='sidebar-logout-div'>
          <button className='sidebar-logout-button' onClick={this.clickLogout.bind(this)}>Logout</button>
        </div>
      </div>
    );
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({ updateComposeView, logout, setPage, updateFilterAndFilteredArrayChain, fetchHeaderChain }, dispatch);
}

function mapStateToProps (state, ownProps) {
  return {
    fetchHeaderCycleStatus: state.eveMail.fetchHeaderCycleStatus,
    filter: state.eveMail.filter,
    page: state.eveMail.page,
    maxPage: state.eveMail.maxPage,
    characterId: state.eveMail.characterId,
    accessToken: state.eveMail.accessToken,
    initialLoadComplete: state.eveMail.initialLoadComplete
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
