import { useState } from "react";
import AttendanceSearch from "../components/AttendanceSearch";
import StudentTable from "../components/StudentTable";
import { getBranchStudentsAttendance  } from "../services/api";

const Attendance1 = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (year, branch) => {
    setLoading(true);
    try {
      const res = await getBranchStudentsAttendance(branch,year);
      setStudents(res.data);
      console.log("student");
      console.log(res.data);
    } catch {
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Attendance Dashboard</h1>

      <AttendanceSearch onSearch={handleSearch} />

      {loading ? <p>Loading...</p> : <StudentTable students={students} />}
    </div>
  );
};

export default Attendance1;
