import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactQuill from 'react-quill';

import NameSearchBarItem from './name-searchbar-item';
import { nameSearchChain, pushSendArrayThunk } from '../redux/actions.js';



class NameSearchBar extends Component {
  constructor (props) {
    super(props);
    this.state = {search: null};
    this.updateSearchField = this.updateSearchField.bind(this);
    this.runSearch = this.runSearch.bind(this);
    this.nameClick = this.nameClick.bind(this);
  }

  updateSearchField (event) {
    this.setState({search: event.currentTarget.value});
  }

  runSearch () {
    this.props.nameSearchChain(this.state.search);
  }

  nameClick (ele) {
    this.props.pushSendArrayThunk(ele);
  }

  render () {
    let results = null;

    if (this.props.nameSearchResults) {
      results = this.props.nameSearchResults.map((ele, ind) => {
        return <NameSearchBarItem name={ele.character_name} clickFunction={() => {this.nameClick(ele)}} key={ind} />
      })
    }

    if (this.props.nameSearchVisible && this.props.composeView === 'opened') {
      return(
        <div className='name-searchbar-div'>
          <div>
            <button onClick={this.runSearch}>Search</button>
          </div>
          <div>
            <form>
              <input autoFocus onChange={this.updateSearchField} type='text'></input>
            </form>
          </div>
          <div>
            {results}
          </div>
        </div>
      )
    }

  return null;

  }
}



function mapStateToProps (state) {
  return {
    composeView: state.eveMail.composeView,
    nameSearchVisible: state.eveMail.nameSearchVisible,
    nameSearchBusy: state.eveMail.nameSearchBusy,
    nameSearchResults: state.eveMail.nameSearchResults
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({nameSearchChain, pushSendArrayThunk} ,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NameSearchBar);
