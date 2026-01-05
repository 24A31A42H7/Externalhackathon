import React, { useState } from "react";
import timetableData from "../assets/timetableData"
import TimetableSearch from "../components/TimetableSearch";
import TimetableView from "../components/TimetableView";

const TimeTable = () => {
    const [result, setResult] = useState([]);

  const handleSearch = (year, branch, day) => {
    const data =
      timetableData?.[year]?.[branch]?.[day] || [];
    setResult(data);
  };
  return (
      <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Student Timetable</h1>

      <TimetableSearch onSearch={handleSearch} />
      <TimetableView data={result} />
    </div>
  )
}

export default TimeTable
