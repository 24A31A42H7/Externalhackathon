import React, { useState } from 'react'
import assets from '../assets/asserts'
import Togglebtn from './Togglebtn';

const Hero = () => {


  /*
   <div className='flex flex-row justify-center  w-[800px] sm:flex-col px-40 sm:w-full'>
        <img src={assets.student_image} alt="" className=' h-70 object-cover w-full ' />

      </div>
  */
    const[btnbgColor,setbtnbgColor]=useState('white');
  return (
    <div id='hero' className='flex justify-start justify-between  flex-col items-center gap-8 py-20 px-1 sm:jusfity-center sm:px-20 lg:px-40 xl:px-40 text-left w-full overflow-hidden  bg-gradient-to-r from-blue-600 to-emerald-500 text-white sm:flex-row'>
      <div className=' flex flex-col gap-5 justify-evenly text-center sm:flex-col sm:text-xl sm:text-start '>
        <h1 className='text-4xl font-bold text-white mb-4 '>Track Your Coding Journey</h1>
        <div className='py-5 text-white mb-6'>
        <p>Unlock student potential with our advanced platform, providing accurate attendance tracking and coding insights to help improve academic and technical outcomes.</p>
        </div>
        <div className='flex flex-col w-[150px]'>
          
           
           <a href="#about" className="px-2 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition"><Togglebtn name="Learn More" /></a>
        </div>
      </div>
<iframe
  className="w-full max-w-4xl h-[500px] rounded-lg shadow-lg"
  src="https://www.youtube.com/embed/zBosKGlTHPA?autoplay=1&mute=1&loop=1&playlist=zBosKGlTHPA&modestbranding=1&controls=0&showinfo=0"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>


    
     
    
    </div>
  )
}

export default Hero
