import React, { Component } from 'react';



const MailBody = ({subject, body, backClick, deleteClick}) => (
  <div>
    <button onClick={backClick}>Back</button>
    <button onClick={deleteClick}>Delete</button>
    <h3>{subject}</h3>
    <br/>
    <p>{body}</p>
  </div>
)



export default MailBody;
