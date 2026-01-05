import React, { useState } from 'react'

const Navbar = ({onSearch}) => {
  const [rollNo,setRollNo]=useState("");

  const submitRollno=async(e)=>{
    console.log(e.target.value);
    
    onSearch(rollNo);

  }

  return (
    <div className='navbar w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg'>
        <div><p>Admin Panel</p></div>
        <div className='flex flex-row items-center justify-center p-10 '>
          <input type="text" value={rollNo} onChange={(e)=>setRollNo(e.target.value)} placeholder='enter roll number' className='border border-gray-500 rounded-full w-[300px] pl-2 ' />
         <div className='flex items-center rounded bg-green-500 justify-center w-[75px]'>
           <button onClick={submitRollno}>Search</button>
         </div>
        </div>

      
    </div>
  )
}

export default Navbar
