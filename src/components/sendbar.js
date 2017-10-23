import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { bindActionCreators } from 'redux';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';

import { removeSendArray } from '../redux/actions';



class SendBar extends Component {
  constructor (props) {
    super(props);
    this.sendBarNameClick = this.sendBarNameClick.bind(this);
  }

  sendBarNameClick (ind) {
    this.props.removeSendArray(ind);
  }

  scrollToBottom () {
    const node = ReactDOM.findDOMNode(this.refs[this.props.sendArray.length - 1]);
    node.scrollIntoView({ block: 'end', behavior: "smooth" });
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.sendArray.length - 1 < this.props.sendArray.length - 1) {
      this.scrollToBottom();
    }
  }

  render () {
    let sendList = null;

    if (this.props.sendArray.length > 0) {
      sendList = this.props.sendArray.map((ele, ind) => {
        return (
          <div key={ind} ref={ind}>
            <button onClick={() => {this.sendBarNameClick(ind)}}>{ele.character_name}</button>
          </div>
        )
      })
    }

    return (
      <div className='send-bar-div'>
        {sendList}
      </div>
    )
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({removeSendArray}, dispatch);
}

function mapStateToProps (state) {
  return {
    sendArray: state.eveMail.sendArray
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendBar)
