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
     const [rollNo,setRollNo]=useState("");
    const [search,setSearch]=useState("");
    const [isvisible,setIsVisible]=useState(false);
    const [activeTab, setActiveTab] = useState("rollNo"); 
    
    const fetchStudents=async()=>{

      try {
        let students=[];
        if(filter){
          // fetch filtred students 
          const response=await axios.post(`${url}/api/student/filter`,filter)
          students=response.data.students; 
        }else{
          // fetch all students 
          const response =await axios.get(`${url}/api/student/list`);
          students=response.data.students; 
        }
        let searchStudents=[];
        if (search) {
          searchStudents = students.filter((stu) => stu.rollNo === search);
          setStudentData(searchStudents);
        }else{

        

          // 🔥 if Leaderboard tab → sort by leetcode score (descending)
          if (activeTab === "leaderboard") {
          students = [...students].sort(
           (a, b) =>
          (b.leetcodeStats?.totalSolved || 0) -
           (a.leetcodeStats?.totalSolved || 0)
          );
          }
          setStudentData(students);
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
 

 
  const submitRollno = () => {
  if (rollNo.trim() === "") {
    // if input is empty → reset search → show all students
    setSearch("");
  } else {
    // set search value
    setSearch(rollNo.trim());
  }

  // clear input box after pressing search
  setRollNo("");
};


    useEffect(()=>{
   
      fetchStudents();
    },[filter,search,activeTab]);
  
  return (
    <div>
      <div className='flex flex-row items-center justify-center p-10 '>
          <input type="text" value={rollNo} onChange={(e)=>setRollNo(e.target.value)} placeholder='enter roll number' className='border border-gray-500 rounded-full w-[300px] pl-2 ' />
         <div className='flex items-center rounded bg-green-500 justify-center w-[75px]'>
           <button onClick={submitRollno}>Search</button>
         </div>
        </div>
      <p className='flex text-4xl font-bold mb-6 text-blue-600 items:center justify-center'>Student Statistics</p>
      <br />
      <div className='flex flex-row'>
        <button onClick={()=>{setActiveTab("rollNo");setSearch("");} }className={` pl-4 outline-none ${
      activeTab === "rollNo" ? "bg-gray-200 font-bold border-b border-black w-[200px] pl-10" : ""}`}> RollNo Wise</button>
          <button onClick={()=>{setActiveTab("leaderboard");setSearch("");}}className={` pl-4 outline-none ${
      activeTab === "leaderboard" ? "bg-gray-200 font-bold border-b border-black w-[200px] pl-10" : ""
    }`} >LeaderBoard</button>

      </div>
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
