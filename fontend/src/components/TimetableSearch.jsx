import React, { useState } from "react";

const TimetableSearch = ({ onSearch }) => {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [day, setDay] = useState("");

  const handleSearch = () => {
    if (!year || !branch || !day) {
      alert("Please select all fields");
      return;
    }
    onSearch(year, branch, day);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 rounded-lg">
      
      <input
        type="text"
        placeholder="Year (e.g. 2025-2026)"
        className="border p-2 rounded"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="text"
        placeholder="Branch (e.g. CSE-A)"
        className="border p-2 rounded"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        <option value="">Select Day</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
      </select>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default TimetableSearch;
