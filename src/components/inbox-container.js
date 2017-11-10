import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Header from './header';
import MailBodyContainer from './mail-body-container';
import { handleMailBody, deleteMail } from '../redux/actions';



class InboxContainer extends Component {
  constructor (props) {
    super(props);
    this.click = this.click.bind(this);
    this.deleteMail = this.deleteMail.bind(this);
  }

  click (mailId, headerIndex) {
    this.props.handleMailBody(mailId, headerIndex);
    this.props.history.push(`/mail/inbox/${ mailId }`)
  }

  deleteMail (mailId, headerIndex) {
    this.props.deleteMail(mailId, headerIndex)
  }

  render () {
    if (this.props.mailHeaders == null) {
      return <Redirect to='/mail' />
    }

    let headerList = null;

    if (this.props.mailHeaders.length > 0) {
      headerList = this.props.mailHeaders.map((ele, ind) => {
        return <Header {...ele}
                       key={ind}
                       click={() => this.click(ele.mail_id, ind)}
                       deleteMail={() => this.deleteMail(ele.mail_id, ind)} />
      })
    }

    return (
      <Switch>
        <Route path='/mail/inbox/:mailId' component={ MailBodyContainer } />
        <Route path='/mail/inbox' render={() => <div className='mail-display'>{ headerList }</div>} />
      </Switch>
    )
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({ handleMailBody, deleteMail }, dispatch)
}

function mapStateToProps (state) {
  return {
    mailHeaders: state.eveMail.mailHeaders,
    inboxFilter: state.eveMail.inboxFilter,
    selectedMailBody: state.eveMail.selectedMailBody
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InboxContainer));
