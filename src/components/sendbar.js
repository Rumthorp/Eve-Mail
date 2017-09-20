import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';

import { updateNameSearchVisible } from '../redux/actions';
import SendBarItem from './sendbar-item';



class SendBar extends Component {
  constructor (props) {
    super(props)
    this.findNameClick = this.findNameClick.bind(this);
  }

  findNameClick () {
    let status = true;
    if (this.props.nameSearchVisible) {
      status = false;
    }
    
    this.props.updateNameSearchVisible(status);
  }

  render () {
    let sendList = null;

    // if (this.props.sendArray.length > 0) {
    //   console.log(this.props.sendArray)
    // }

    return (
      <div>
        <button onClick={this.findNameClick}>Find Name</button>
        {sendList}
      </div>
    )
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({updateNameSearchVisible}, dispatch);
}

function mapStateToProps (state) {
  return {
    sendArray: state.eveMail.sendArray,
    nameSearchVisible: state.eveMail.nameSearchVisible
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendBar)
