import React,{useState} from 'react'
import { asserts } from '../assets/assets'
import { NavLink } from 'react-router-dom';

const Sidebar = ({setFilter,setSearch}) => {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [branches, setBranches] = useState([]);
 

  // Define branches for each year
  const yearBranches = {
    "1 YEAR": ["CSE", "ECE", "ME", "CE"],
    "2 YEAR": ["CSE", "ECE", "ME", "CE","AIML-A","AIML-B","AIML-C"],
    "3 YEAR": ["CSE", "ECE", "ME", "CE"],
    "4 YEAR": ["CSE", "ECE", "ME", "CE"],
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setBranch(""); // reset branch selection
    setBranches(yearBranches[selectedYear] || []);
  };

  const handleSubmit = async () => {
  if (!year || !branch) {
    alert("Please select both year and branch");
    return;
  }
  setFilter({year,branch});

};


  return (
    <div className='bg-[#3B82F6] min-h-screen pl-[4vw]'>
        <img src={asserts.logo} className='mt-5 w-[max(10vw,100px)] hidden sm:block rounded-full pl-1 ml-1' alt="" />
        <h3 className='mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block'>TrackMyGrade</h3>
      
     
      <div className='flex flex-col gap-5 mt-10'>
        <NavLink to='/add-student' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
          <p className='sm:block'>Add Student</p>
        </NavLink>
         <NavLink to='/addlist-student' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
          <p className='sm:block'>Add List of Student</p>
        </NavLink>
        
        <NavLink to='/list-student' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
          <p className='sm:block'>List Student</p>
        </NavLink>
       
        

      </div>
      <div className="p-4 bg-[#EF4444]">
      <div>
        <label className="mr-2">Year:</label>
        <select
          value={year}
          onChange={handleYearChange}
          className="border px-2 py-1 rounded"
        >
          <option value="">Select Year</option>
          <option value="1 YEAR">1 Year</option>
          <option value="2 YEAR">2 Year</option>
          <option value="3 YEAR">3 Year</option>
          <option value="4 YEAR">4 Year</option>
        </select>
      </div>

      {year && (
        <div className="mt-2">
          <label className="mr-2">Branch:</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      )}

      {year && branch && (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => {
      handleSubmit();
      // only works if setSearch is passed as prop from parent
      setSearch("");
    }}
          
        >
          Fetch Students
        </button>
        
      )}
    </div>
     
    </div>

  )
}

export default Sidebar
