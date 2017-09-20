import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTokens } from '../redux/actions';
const EVE_PIC = require('../assets/eve-login.png');



class Login extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    if (this.props.location.search) {
      let url = this.props.location.search;
      let authCode = url.slice(url.indexOf('=') + 1, url.indexOf('&'));
      this.props.fetchTokens(authCode);
    }
  }

  render () {
    return (
      <div>
        <a href={'https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Flogin&client_id=81577ff7ba9943ca8b95aef5656bc783&scope=esi%2Dmail%2Eorganize%5Fmail%2Ev1%20esi%2Dmail%2Eread%5Fmail%2Ev1%20esi%2Dmail%2Esend%5Fmail%2Ev1&state=uniquestate123'}>
          <img src={EVE_PIC} />
        </a>
      </div>
    );
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchTokens}, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
