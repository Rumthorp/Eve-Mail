import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';

import ComposeTopbar from './compose-topbar';
import SendBar from './sendbar';
import SubjectBar from './subjectbar'
import { updateMessage } from '../redux/actions';


class QuillContainer extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (value) {
    this.props.updateMessage(value);
  }

  render () {
    let topBar = null;
    let sendBar = null;
    let subject = null;
    let quill = null;

    if (this.props.composeView === 'opened' || this.props.composeView === 'minimized') {
      topBar = <ComposeTopbar composeView={this.props.composeView} />
    }

    if (this.props.composeView === 'opened') {
      sendBar = <SendBar />
      subject = <SubjectBar />
      quill = <ReactQuill value={this.props.message}
                          onChange={this.handleChange}
                          theme='snow'
                          />
    }

    return (
      <div>
        {topBar}
        {sendBar}
        {subject}
        {quill}
      </div>
    )
  }
}



function mapStateToProps (state) {
  return {
    composeView: state.eveMail.composeView,
    message: state.eveMail.message
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({updateMessage} ,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuillContainer);
