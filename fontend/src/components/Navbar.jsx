import React, { useState } from 'react'
import assets from '../assets/asserts'

const Navbar = () => {
    const [sidebarOpen,setSidebarOpen]=useState(false)
  return (
    <div className='flex justify-between items-center px-4  sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium  sm:bg-blue-600'>
        <div className='flex justify-between item-center'>
            <img src={assets.logo} className='w-15 h-15 rounded-full sm:w-15 py-2' alt='' />
            <p className='flex justify-center item-center py-5 px-2 text-2xl h-15'>Performance Predictor</p>

        </div>
        <div className={`text-black-500 text-2xl justify-center sm:items-end sm:justify-end sm:text-xl ${!sidebarOpen ?'max-sm:w-0 overflow-hidden':'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-blue-500 max-sm:top-20 max-sm:text-black max-sm:pt-20 flex sm:items-end sm:justify-end gap-5 transition-all`}>
            <img src={assets.close_icon} alt="" className='w-5 absolute right-4 top-4 sm:hidden' onClick={()=>setSidebarOpen(false)}/>

            <a onClick={()=>setSidebarOpen(false)} href="#" className='sm:hover:border-b'>Home </a>
            <a  onClick={()=>setSidebarOpen(false)} href="#performance" className='sm:hover:border-b'>Predict</a>
            <a  onClick={()=>setSidebarOpen(false)} href="#about" className='sm:hover:border-b'>About</a>
            <a  onClick={()=>setSidebarOpen(false)} href="#contact-us" className='sm:hover:border-b'>Contact Us</a>
        </div>
        <div className='flex items-center'>
            <img src={assets.menu_icon} alt="" onClick={()=>setSidebarOpen(true)} className='w-8 sm:hidden'/>
        </div>
      
    </div>
  )
}

export default Navbar
