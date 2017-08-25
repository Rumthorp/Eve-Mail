import React, { Component } from 'react';



const MailBody = ({subject, body, click}) => (
  <div>
    <button onClick={click}>Back</button>
    <h3>{subject}</h3>
    <br/>
    <p>{body}</p>
  </div>
)



export default MailBody;
