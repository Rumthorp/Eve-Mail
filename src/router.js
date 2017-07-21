import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from './components/login';
import EveMail from './components/mail';
import SideBar from './components/sidebar'

const Router = (props) => (
  <div>
    <Route path='/mail' render={() => {
      if (JSON.parse(localStorage.getItem('tokens'))) {
        return (
          <div>
            <SideBar/>
            <EveMail/>
          </div>
        )
      } else {
        return <Redirect to='/login'/>
      }

    }}/>
    <Route path='/login' render={() => {
      if (JSON.parse(localStorage.getItem('tokens'))) {
        return <Redirect to='/mail'/>
      } else {
        return <Route path='/login' component={Login}/>
      }
    }}/>
  </div>
)

function mapStateToProps(state) {
  return {
    updateStage: state.eveMail.updateStage
  }
}

export default withRouter(connect(mapStateToProps)(Router));
