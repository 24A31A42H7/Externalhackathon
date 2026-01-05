import React from 'react'
import assets from '../assets/asserts'

const About1 = () => {
  return (
    <div id='about' className='flex justify-center justify-between flex-col sm:flex-row items-start gap-8 py-12 px-4 p-6 sm:px-20 lg:px-40 xl:px-40 text-left w-full overflow-hidden text-black bg-white'>
      
      <div className=' flex justify-start items-start w-[100%] h-64  px-[50px]  '>
        <img src={assets.about_image} alt="" className='w-full h-full object-cover rounded-lg shadow-lg' />
      </div>
      
      <div className=' flex flex-col gap-5 justify-evenly'>
        <h1 className='text-4xl font-bold text-blue-600 mb-4'>About Our Project</h1>
        <div className='py-5 text-black-700'>
            <p>This project is designed to analyze and predict student performance based on their coding activity on platforms like HackerRank and LeetCode. It collects data such as problem-solving statistics, badges, stars, and difficulty levels of solved problems to provide insights into a students skills, consistency, and growth.
        </p>
        <div className='text-sm py-2'>
            <h2 className='text-xl py-2'>The main aim of this project is to:</h2>
            <div className='text-black text-[16px] py-1 text-700'>
                <p>1.Help students track their progress in competitive programming.</p>
                <p>2.Give teachers and recruiters a clear picture of coding abilities.</p>
                <p>3.Motivate learners by showing strengths and areas for improvement.</p>
            </div>
           
        </div>
          
        </div>
       
        </div>

      </div>
      
      
      
  
    
  )
}

export default About1
