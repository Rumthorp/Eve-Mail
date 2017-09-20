import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateComposeView } from '../redux/actions';



class ComposeTopbar extends Component {
  constructor (props) {
    super(props);
  }

  handleButtonClick (value) {
    if (this.props.composeView === 'minimized' && value === 'minimized') {
      this.props.updateComposeView('opened');
    } else {
      this.props.updateComposeView(value);
    }
  }

  render () {
    return (
      <div className='compose-topbar'>
        {this.props.composeView === 'opened' && <button>Send</button>}
        <button className='right-buttons' onClick={this.handleButtonClick.bind(this, 'closed')}>X</button>
        <button className='right-buttons' onClick={this.handleButtonClick.bind(this, 'minimized')}>_</button>
      </div>
    )
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators({updateComposeView}, dispatch);
}

export default connect(null, mapDispatchToProps)(ComposeTopbar);
