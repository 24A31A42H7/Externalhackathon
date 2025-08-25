import React, { useState,useEffect } from 'react'
import StudentCards from './StudentCards'
import HeadingCards from './HeadingCards'
import Leftbar from './Leftbar'

import axios from 'axios'
import Hackerrank from './Hackerrank'
import Leetcode from './Leetcode'

const Rightbar = ({filter}) => {
  const url='https://trackmygrade-backend.onrender.com';
  
    const [studentData,setStudentData]=useState([]);
   
    
    const fetchStudents=async()=>{
      try {
        if(filter){
          // fetch filtred students 
          const response=await axios.post(`${url}/api/student/filter`,filter)
          setStudentData(response.data.students);
        }else{
          // fetch all students 
          const response =await axios.get(`${url}/api/student/list`);
          setStudentData(response.data.students);
        }
      } catch (error) {
        console.error("Error fetching students",error);
        
      }

    }
    
   
    const removeStudent=async(id)=>{
      try {
      
        const response=await axios.post(`${url}/api/student/remove`,{id});
          if(response.data.success){
            toast.success(response.data.message);
            await fetchStudents();
          }
      
        } catch (error) {
          toast.error("error occured");
      
        }

  }



    useEffect(()=>{
   
      fetchStudents();
    },[filter]);
  
  return (
    <div>
      <p className='flex text-2xl font-bold mb-6 text-blue-600 items:center justify-center'>Student Statistics</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_1fr_1fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Name</b>
          <b>Roll NO</b>
          <b>Leetcode</b>
          <b>Hackerrank</b>
        </div>
        {
          studentData.map((item,index)=>{
            return(
              <div key={index} className='grid grid-cols-[0.5fr_1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 border-t hover:bg-gray-400'>
                  <p>{item.name}</p>
                  <p>{item.rollNo}</p>
                  <div>
                    <Leetcode stats={item.leetcodeStats}/>
                  </div>
                  
                  <div><Hackerrank url={item.hackerrankStats?.profileUrl || ""}/></div>
                  
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default Rightbar
