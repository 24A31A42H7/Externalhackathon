
import React from 'react'

const Hackerrank = ({url}) => {
  
  if (!url) return <p>No profile</p>;
  console.log({url});
  return (
    <div className='image-container'>
        <img src={url}  alt="" />
        
      
    </div>
  )
}

export default Hackerrank
