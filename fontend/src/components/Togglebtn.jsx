import React,{useState} from 'react'

const Togglebtn = (props) => {
    
   // create a state to track toggle
    const[btnbgColor,setbtnbgColor]=useState(false);
    const handleToggle=()=>{
        setbtnbgColor(!btnbgColor);
    };

    
  return (
    <div>
        <button onClick={handleToggle} className={`${!btnbgColor?'bg-white text-black':'bg-white text-black'} w-full rounded-full border  border-gray-400 p-2 `}>{props.name}</button>

    </div>
  )
}

export default Togglebtn
