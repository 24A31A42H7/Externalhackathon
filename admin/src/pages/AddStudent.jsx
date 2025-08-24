import React, { use, useState } from 'react'

import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const AddStudent = () => {

    const [name,setName]=useState("");
    const [rollNo,setRollNo]=useState("");
    const [year,setYear]=useState("");
    const [branch,setBranch]=useState("");
    const [Leetcode,setLeetcode]=useState("");
    const [Hackerrank,setHackerrank]=useState("");
    const [loading,setLoading]=useState(false);
    

    const onSubmitHandler=async(e)=>{
      e.preventDefault();
      setLoading(true);
      try {
          const studentData = {
            name,
            rollNo,
            year,
            branch,
            leetcode: Leetcode,
            hackerrank: Hackerrank,
          };
        const response=await axios.post(`${url}/api/student/add`,studentData);
        if(response.data.success){
          toast.success("Student added");
          setName("");
          setRollNo("");
          setYear("");
          setBranch("");
          setLeetcode("");
          setHackerrank("");
        }else{
          toast.error("something went wrong")
        }
      } catch (error) {
        toast.error("Error occured")
        
      }
      setLoading(false);
    }
  

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]' >
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>

    </div>

  ):(
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600 '>
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload Student</p>


        </div>
       
      </div>
       <div className='flex flex-col gap-2.5'>
          <p>Student Name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='bg-transparent  outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='type here'required />
        </div>
    
        <div className='flex flex-col gap-2.5'>
          <p>Roll No</p>
          <input onChange={(e)=>setRollNo(e.target.value)} value={rollNo} type="text" className='bg-transparent  outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='type here'required />
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Year</p>
          <input onChange={(e)=>setYear(e.target.value)} value={year} type="text" className='bg-transparent  outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='type here'required />
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Branch</p>
          <input onChange={(e)=>setBranch(e.target.value)} value={branch} type="text" className='bg-transparent  outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='type here'required />
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Leetcode Profile</p>
          <input onChange={(e)=>setLeetcode(e.target.value)} value={Leetcode} type="text" className='bg-transparent  outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='type here'required />
        </div>
        <div className='flex flex-col gap-2.5'>
          <p>Hackerrank Profile</p>
          <input onChange={(e)=>setHackerrank(e.target.value)} value={Hackerrank} type="text" className='bg-transparent  outline-green-600 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='type here'required />
        </div>
        <button type="submit" className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default AddStudent
