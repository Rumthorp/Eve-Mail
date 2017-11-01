import React, { Component } from 'react';
import ReactQuill from 'react-quill';



const MailBody = ({subject, body, backClick, deleteClick}) => (
  <div className='mail-display'>
    <div className='mail-body-buttons-div'>
      <button className='mail-display-buttons' onClick={backClick}>Back</button>
      <button className='mail-display-buttons' onClick={deleteClick}>Delete</button>
    </div>
    <h3>{subject}</h3>
    <br/>
    <div>
      <ReactQuill theme={null} readOnly={true} defaultValue={body} />
    </div>
  </div>
)



export default MailBody;
