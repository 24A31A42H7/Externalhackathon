import React from 'react'

const HeadingCards = () => {
  return (
   <div className='flex flex-row justify-evenly col-2  w-full h-8'>
      <div className='w-[25%] border border-gray-900 text-center'>
        <h1>Roll No</h1>
      </div>
      <div className='w-[25%]  border border-gray-900 text-center'>
        <h1>Name</h1>
        </div>
        <div  className='w-[25%] border border-gray-900 text-center'>
            <h1>Leetcode</h1>
        </div>
        <div  className='w-[25%] border border-gray-900 text-center'>
            <h1>HackerRank</h1>
        </div>


    </div>
  )
}

export default HeadingCards
