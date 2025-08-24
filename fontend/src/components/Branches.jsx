import React, { useState, useSyncExternalStore } from 'react'
import { year1,year2,year3,year4 } from '../assets/asserts'
import Year from './Year'
import Rightbar from './Rightbar'

const Branches = (props) => {
  let res=[]
  if(props.year==="1 YEAR"){
    res=year1
  }else if(props.year==="2 YEAR"){
    res=year2
  }else if(props.year==="3 YEAR"){
    res=year3
  }else{
    res=year4
  }
 

   const[branch,setBranch]=useState("")
   console.log(branch,props.year);
   <Rightbar year={props.year} branch={branch} />
  return (
   
    
    <div>
      {res.map((item,index)=>{
       
        return <Year onClick={()=>setBranch(item)} key={index} value={item}/>
       
    })}
  
    </div>
  )
}

export default Branches
