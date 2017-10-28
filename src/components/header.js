import React from 'react';



const Header = ({subject, from, click, timestamp}) => {
  let mailSendDate = new Date(timestamp);
  let currentTime = new Date().getTime();
  let time;

  if (currentTime - 86400000 < mailSendDate.getTime()) {
    time = mailSendDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  } else {
    time = mailSendDate.toLocaleString('en-US', { month: 'short', day: '2-digit' })
  }

  return (
    <div className='header' onClick={click} >
        <p className='header-sender'>{from}</p>
        <p className='header-subject'>{subject}</p>
        <p className='header-timestamp'>{time}</p>
    </div>
  )
}



export default Header;
