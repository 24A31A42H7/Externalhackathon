import React from "react";

const TimetableView = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="mt-4 text-red-500">No timetable found</p>;
  }

  return (
    <table className="w-full mt-6 border">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="border p-2">Time</th>
          <th className="border p-2">Subject</th>
          <th className="border p-2">Faculty</th>
          <th className="border p-2">Room</th>
        </tr>
      </thead>

      <tbody>
        {data.map((period, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{period.time}</td>
            <td className="border p-2">{period.subject}</td>
            <td className="border p-2">{period.faculty}</td>
            <td className="border p-2">{period.room || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimetableView;
