import React from 'react';



const Loading = ({updateStage}) => {
  let dots = '';
  for (let i = 1; i < updateStage; i ++) {
    dots += '.'
  }
  let loading = 'Loading' + dots;

  return (
    <div>
      <h3>{loading}</h3>
    </div>
  )
}

export default Loading
