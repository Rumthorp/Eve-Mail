import React from 'react';



const NameSearchBarItem = ({name, clickFunction}) => (
  <div onClick={clickFunction}>
    <p>{name}</p>
  </div>
)



export default NameSearchBarItem;
