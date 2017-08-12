import React, { Component } from 'react';
import { connect } from 'react-redux';

import Inbox from './inbox';
import Header from './header';



const InboxContainer = (props) => {
  let headerList = props.mailHeaders.map((ele, ind) => {
    if (props.inboxFilter == null) {
      return <Header {...ele} key={ind} />
    } else {
      if (ele.recipients[0].recipient_type == props.eveMail.inboxFilter) {
        return <Header {...ele} key={ind} />
      }
    }
  })
  console.log(headerList)
  return <Inbox headers={headerList} />
}



function mapStateToProps (state) {
  return {
    mailHeaders: state.eveMail.mailHeaders,
    inboxFilter: state.eveMail.inboxFilter
  }
}

export default connect(mapStateToProps)(InboxContainer);
