import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';
import Hackerrank from '../components/Hackerrank';
import Leetcode from '../components/Leetcode';




const ListStudent = ({filter,search}) => {

  const [studentData,setStudentData]=useState([]);
  const fetchStuentWithId=async()=>{

  }
  const fetchStudents=async()=>{
    console.log(search);
      try {
        if(filter){
          // fetch filtred students 
          const response=await axios.post(`${url}/api/student/filter`,filter);
          
          // search is rollNO
          let students=response.data.students;
          if(search){
            students=students.filter((stu)=>stu.rollNo===search);
            setStudentData(students);
          }
          setStudentData(students);
          setSerch("");
         

        }else{
          // fetch all students 
          const response =await axios.get(`${url}/api/student/list`);
          let students=response.data.students;
          if(search){
             students=students.filter((stu)=>stu.rollNo===search)
            setStudentData(students);

          }
          setStudentData(students);
          setSerch("");
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

  },[filter,search])

  return (
    <div >
      <p>All Students List</p>
      <br />
      <div>
        <div className='flex flex-col   sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Name</b>
          <b>Roll NO</b>
          <b>Leetcode</b>
          <b>Hackerrank</b>
        </div>
        {

          studentData.map((item,index)=>{
            console.log(item.hackerrankStats)
            return(
              <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                  <p>{item.name}</p>
                  <p>{item.rollNo}</p>
                  <div>
                      <Leetcode stats={item.leetcodeStats} />
                    <p>{item.leetcode}</p>
                  </div>
                  <div>
                  <Hackerrank url={item.hackerrankStats?.profileUrl || ""} />
                  </div>
                  <p className='cursor-pointer pl-15 text-lg' onClick={()=>removeStudent(item._id)}>X</p>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default ListStudent
