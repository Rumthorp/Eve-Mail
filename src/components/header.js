import React from 'react';



const Header = ({subject, from}) => (
  <div>
    <p className='header'>{subject} from: {from}</p>
  </div>
)



export default Header;
