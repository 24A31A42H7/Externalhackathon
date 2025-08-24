import React from 'react'

const Hackerrank = ({url}) => {

  if (!url) return <p>No profile</p>;
  console.log({url});
  
  return (
    <div>
      <img src={url} alt="Hackerrank Badges" />
        
    </div>
  )
}

export default Hackerrank
