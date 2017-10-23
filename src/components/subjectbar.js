import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSubject } from '../redux/actions';



class SubjectBar extends Component {
  constructor (props) {
    super(props);
    this.dispatchUpdateSubject = this.dispatchUpdateSubject.bind(this);
  }

  dispatchUpdateSubject (event) {
    this.props.updateSubject(event.currentTarget.value);
  }

  render () {
    return (
      <div>
        <form>
          <input type='text' onChange={this.dispatchUpdateSubject}></input>
        </form>
      </div>
    )
  }
}



function mapStateToProps (state) {
  return {
    subject: state.eveMail.subject
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ updateSubject } ,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectBar)
