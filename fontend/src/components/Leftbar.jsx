import React, { useState } from 'react'
import axios from 'axios'

const Leftbar = ({setFilter}) => {
 
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [branches, setBranches] = useState([]);
 

  // Define branches for each year
  const yearBranches = {
    "1 YEAR": ["CSE", "ECE", "ME", "CE"],
    "2 YEAR": ["CSE", "ECE", "ME", "CE","AIML-C"],
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
  setFilter({year,branch})
};


  return (
    <div className="p-4 bg-[#2563eb] flex flex-col justify-center mt-30 pl-10">
      <div>
        <label className="mr-2">Year:</label>
        <select
          value={year}
          onChange={handleYearChange}
          className="border px-2 py-1 rounded flex flex-row sm:flex-col"
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit} 
          
        >
          Fetch Students
        </button>
        
      )}
    </div>
  )
}

export default Leftbar
