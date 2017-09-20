import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';

import ComposeTopbar from './compose-topbar';
import SendBar from './sendbar';
import NameSearchBar from './name-searchbar';



class QuillContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {text: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (value) {
    this.setState({text: value})
  }

  render () {
    let topBar = null;
    let sendBar = null;
    let quill = null;
    let nameSearchBar = null;

    if (this.props.composeView === 'opened' || this.props.composeView === 'minimized') {
      topBar = <ComposeTopbar composeView={this.props.composeView} />
    }

    if (this.props.composeView === 'opened') {
      sendBar = <SendBar />
      quill = <ReactQuill value={this.state.text}
                          onChange={this.handleChange}
                          theme='snow'
                          />
    }

    if (this.props.composeView === 'opened' && this.props.nameSearchVisible) {
      nameSearchBar = <NameSearchBar />
    }

    return (
      <div>
        {topBar}
        {sendBar}
        {quill}
        <div className='nameSearchBarDiv'>
          {nameSearchBar}
        </div>
      </div>
    )
  }
}



function mapStateToProps (state) {
  return {
    composeView: state.eveMail.composeView,
    nameSearchVisible: state.eveMail.nameSearchVisible
  }
}

export default connect(mapStateToProps)(QuillContainer);
