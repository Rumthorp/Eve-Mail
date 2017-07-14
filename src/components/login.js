import React from 'react';

const EVE_PIC = require('../assets/eve-login.png');



const Login = ({ authUrl }) => (
  <div>
    <a href={authUrl}>
      <img src={EVE_PIC} />
    </a>
  </div>
)


export default Login
