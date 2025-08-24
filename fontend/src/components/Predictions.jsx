import React, { useState } from 'react'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'

const Predictions = () => {
  const [filter,setFilter]=useState(null);
  return (
    <div className='flex items-center sm:items-start min-h-screen flex-col sm:flex-row'>
      <Leftbar setFilter={setFilter}/>
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        
            <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
             <Rightbar filter={filter}/>


            </div>

        </div>
    </div>
  )
}

export default Predictions
