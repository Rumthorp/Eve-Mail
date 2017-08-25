import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MailBody from './mail-body';
import { makeSelectedMailBodyNull } from '../redux/actions';


class MailBodyContainer extends Component {
  constructor(props) {
    super(props)
    this.backButtonClick = this.backButtonClick.bind(this);
  }

  backButtonClick() {
    this.props.makeSelectedMailBodyNull();
    this.props.history.push('/mail/inbox');
  }

  render() {
    if (this.props.selectedMailBody) {
      return <MailBody
              {...this.props.selectedMailBody.header}
              {...this.props.selectedMailBody.body}
              click={() => this.backButtonClick()}
              />
    }

    return null;

  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({makeSelectedMailBodyNull}, dispatch);
}

function mapStateToProps (state) {
  return {
    selectedMailBody: state.eveMail.selectedMailBody
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MailBodyContainer);
