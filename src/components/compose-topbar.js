import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateComposeView, updateNameSearchVisible, sendMailChain } from '../redux/actions';



class ComposeTopbar extends Component {
  constructor (props) {
    super(props);
    this.findNameClick = this.findNameClick.bind(this);
    this.sendClick = this.sendClick.bind(this);
  }

  handleButtonClick (value) {
    if (this.props.composeView === 'minimized' && value === 'minimized') {
      this.props.updateComposeView('opened');
    } else {
      this.props.updateComposeView(value);
    }
  }

  findNameClick () {
    let status = true;
    if (this.props.nameSearchVisible) {
      status = false;
    }

    this.props.updateNameSearchVisible(status);
  }

  sendClick () {
    this.props.sendMailChain()
  }

  render () {
    return (
      <div className='compose-topbar'>
        {this.props.composeView === 'opened' && <button onClick={ this.findNameClick }>Find Name</button>}
        {this.props.composeView === 'opened' && <button onClick={ this.sendClick }>Send</button>}
        <button className='right-buttons' onClick={ this.handleButtonClick.bind(this, 'closed') }>X</button>
        <button className='right-buttons' onClick={ this.handleButtonClick.bind(this, 'minimized') }>_</button>
      </div>
    )
  }
}



function mapStateToProps (state) {
  return {
    nameSearchVisible: state.eveMail.nameSearchVisible
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ updateComposeView, updateNameSearchVisible, sendMailChain }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeTopbar);
