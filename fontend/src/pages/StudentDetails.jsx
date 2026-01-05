import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentMonthlyAttendance } from "../services/api";

const StudentDetails = () => {
  const { rollNo } = useParams();
  const [month, setMonth] = useState("1");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);
  
  const fetchData = async () => {
    const res = await getStudentMonthlyAttendance(rollNo, month, 2026);
    setData(res.data);
    console.log(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-lg">Roll No: {rollNo}</h2>

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border p-2 my-4"
      >
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i + 1}>
            Month {i + 1}
          </option>
        ))}
      </select>

      <table className="border w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.date}</td>
              <td
                className={
                  d.status === "Present"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {d.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
