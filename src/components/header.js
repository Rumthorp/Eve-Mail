import React from 'react';



const Header = ({subject, from, click, timestamp}) => {
  // let months = {1: 'Jan'}
  return (
    <div className='header' onClick={click} >
        <p className='header-sender'>{from}</p>
        <p className='header-subject'>{subject}</p>
        <p className='header-timestamp'>{timestamp}</p>
    </div>
  )
}



export default Header;
