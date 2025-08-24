import React, { useState } from 'react'
import assets from '../assets/asserts'
import Togglebtn from './Togglebtn';

const Hero = () => {
    const[btnbgColor,setbtnbgColor]=useState('white');
  return (
    <div id='hero' className='flex justify-start justify-between  flex-col items-center gap-8 py-20 px-1 sm:jusfity-center sm:px-20 lg:px-40 xl:px-40 text-left w-full overflow-hidden  bg-gradient-to-r from-blue-600 to-emerald-500 text-white sm:flex-row'>
      <div className=' flex flex-col gap-5 justify-evenly text-center sm:flex-col sm:text-xl sm:text-start '>
        <h1 className='text-4xl font-bold text-white mb-4 '>Branch-Wise Student <br/>Performance Prediction</h1>
        <div className='py-5 text-white mb-6'>
        <p>Unlock student potential with our advance machine learning model.get accurate predections and insights to help improve acadamic outcomes.</p>

        </div>
        <div className='flex flex-row pl-10 text-left p-4 gap-8 justify-around space-x-4'>
          <a href="#prediction" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:shadow-lg"> <Togglebtn name=" Start Prediction" /></a>
           
           <a href="#about" className="px-6 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition"><Togglebtn name="Learn More" /></a>
        </div>
      </div>
      <div className='flex flex-row justify-center  w-[800px] sm:flex-col px-40 sm:w-full'>
        <img src={assets.student_image} alt="" className=' h-70 object-cover w-full ' />
      </div>
    </div>
  )
}

export default Hero
