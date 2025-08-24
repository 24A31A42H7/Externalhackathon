import React from 'react'
import Leetcode from './Leetcode';
import Hackerrank from './Hackerrank';

const StudentCards = (props) => {
    

  return (
    <div className='flex flex-row  justify-evenly col-2  w-full h-8'>
      <div className='w-[25%] border border-gray-900 text-center h-32 flex items-center '>
        <h1 className='text-center px-20'>{props.rollno}</h1>
      </div>
      <div className='w-[25%]  border border-gray-900 text-center h-32 flex items-center'>
        <h1 className='text-center px-20'>{props.name}</h1>
        </div>
        <div className='w-[25%] border border-gray-900 text-center h-32'>
            <h1 className='item-cover h-8'>{<Leetcode username={props.leetcode}/>}</h1>
        </div>
        <div  className='w-[25%] border border-gray-900 text-center h-32'>
            <h1 className='item-cover h-8'>{<Hackerrank username={props.hackerrank}/>}</h1>
        </div>

    </div>
  )
}

export default StudentCards
