import React, {Component} from 'react';
import {connect} from 'react-redux';
import {eveMailWriteTokens, eveMailGetNewAccessTokenWithRefreshToken, eveMailWriteTokensFromLocalStorage} from '../redux/actions';
import {bindActionCreators} from 'redux';



class EveToken extends Component {
  componentDidMount(){
    if (this.props.updateStage == 0) {
      let url = window.location.href;
      let authToken = url.slice(url.indexOf('=') + 1, url.indexOf('&'));
      this.props.eveMailWriteTokens(authToken, 1);
    }
  }
  render(){
    return (
      <div>
        Grabbing Token...
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({eveMailWriteTokens, eveMailGetNewAccessTokenWithRefreshToken, eveMailWriteTokensFromLocalStorage}, dispatch);
}

function mapStateToProps(state, ownProps) {
  return {
    updateStage: state.eveMail.updateStage
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EveToken);
