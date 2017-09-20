import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactQuill from 'react-quill';

import { nameSearchChain } from '../redux/actions.js';



class NameSearchBar extends Component {
  constructor (props) {
    super(props);
    this.state = {search: null};
    this.updateSearchField = this.updateSearchField.bind(this);
    this.runSearch = this.runSearch.bind(this);
  }

  updateSearchField (value) {
    this.setState({search: value});
  }

  runSearch () {
    nameSearchChain(this.state.search);
  }

  render () {
    let results = this.props.nameSearchResults;

    return(
      <div>
        <button onClick={this.runSearch}>Search</button>
        <ReactQuill theme='bubble'
                    onChange={this.updateSearchField}
                    />
      </div>
    )
  }
}



function mapStateToProps (state) {
  return {
    nameSearchBusy: state.eveMail.nameSearchBusy,
    nameSearchResults: state.eveMail.nameSearchResults
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({nameSearchChain} ,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NameSearchBar);
