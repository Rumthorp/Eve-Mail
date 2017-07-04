import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SideBar from './components/eve-mail-sidebar';
import EveMail from './components/eve-mail';
import EveToken from './components/eve-token';

const Router = () => (
  <div>
    <SideBar/>
    <Switch>
      <Route path='/' component={EveMail} />
      <Route path='eveToken' component={EveToken} />
    </Switch>
  </div>
)

export default Router;
