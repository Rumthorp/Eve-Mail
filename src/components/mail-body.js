import React, { Component } from 'react';
import ReactQuill from 'react-quill';



const MailBody = ({subject, body, backClick, deleteClick}) => (
  <div>
    <button onClick={backClick}>Back</button>
    <button onClick={deleteClick}>Delete</button>
    <h3>{subject}</h3>
    <br/>
    <div>
      <ReactQuill theme={null} readOnly={true} defaultValue={body} />
    </div>
  </div>
)



export default MailBody;
