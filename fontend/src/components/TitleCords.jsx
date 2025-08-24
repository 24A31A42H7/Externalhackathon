import React from 'react'

const TitleCords = (props) => {
  return (
    <div className='text-black  text-center flex flex-col justify-center items-center gap-2'>
      <h1 className='text-4xl font-bold'>{props.heading}</h1>
      <p className='text-sm text-gray-700'>{props.description}</p>
    </div>
  )
}

export default TitleCords
