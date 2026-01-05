import { useNavigate } from "react-router-dom";

const StudentTable = ({ students }) => {
  const navigate = useNavigate();

  if (!students || students.length === 0) {
    return <p className="mt-4">No attendance data found</p>;
  }

  return (
    <table className="w-full mt-6 border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Roll No</th>
          <th className="border p-2">Present Days</th>
          <th className="border p-2">Absent Days</th>
          <th className="border p-2">Attendance %</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => {
          const totalDays = s.attendance.length;

          const presentDays = s.attendance.filter(
            (a) => a.status === "Present"
          ).length;

          const absentDays = totalDays - presentDays;

          const percentage =
            totalDays === 0
              ? 0
              : Math.round((presentDays / totalDays) * 100);

          return (
            <tr
              key={s.rollNo}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/student/${s.rollNo}`)}
            >
              <td className="border p-2">{s.rollNo}</td>

              <td className="border p-2 text-green-600 font-semibold">
                {presentDays}
              </td>

              <td className="border p-2 text-red-600 font-semibold">
                {absentDays}
              </td>

              <td
                className={`border p-2 font-bold ${
                  percentage >= 75 ? "text-green-700" : "text-red-700"
                }`}
              >
                {percentage}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StudentTable;
