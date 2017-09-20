import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MailBody from './mail-body';
import { makeSelectedMailBodyNull, deleteMail } from '../redux/actions';



class MailBodyContainer extends Component {
  constructor (props) {
    super(props)
    this.backButtonClick = this.backButtonClick.bind(this);
    this.deleteButtonClick = this.deleteButtonClick.bind(this);
  }

  backButtonClick () {
    this.props.makeSelectedMailBodyNull();
    this.props.history.push('/mail/inbox');
  }

  deleteButtonClick () {
    this.props.deleteMail(this.props.selectedMailBody.mailId, this.props.selectedMailBody.headerIndex);
    this.props.makeSelectedMailBodyNull();
    this.props.history.push('/mail/inbox');
  }

  render () {
    if (this.props.selectedMailBody) {
      return <MailBody
              {...this.props.selectedMailBody.header}
              {...this.props.selectedMailBody.body}
              backClick={() => this.backButtonClick()}
              deleteClick={() => this.deleteButtonClick()}
              />
    }
    return null;
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({makeSelectedMailBodyNull, deleteMail}, dispatch);
}

function mapStateToProps (state) {
  return {
    selectedMailBody: state.eveMail.selectedMailBody
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MailBodyContainer);
