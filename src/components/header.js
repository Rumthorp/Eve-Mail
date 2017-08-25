import React from 'react';



const Header = ({subject, from, click}) => (
  <div onClick={click}>
    <p className='header'>{subject} from: {from}</p>
  </div>
)



export default Header;
