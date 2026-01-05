import { CheckCircle, XCircle, Users, Trash2 } from "lucide-react";

export const AttendanceTable = ({
  students,
  presentRollNumbers,
  onDeleteStudent,
}) => {
  if (!students || students.length === 0) {
    return (
      <div className="border rounded-xl p-8 text-center shadow">
        <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Students Enrolled</h3>
        <p className="text-gray-500 text-sm">
          Add students to start tracking attendance.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-gray-100">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5" />
          Enrolled Students ({students.length})
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-center">Status</th>
              {onDeleteStudent && (
                <th className="p-3 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {students.map((student) => {
              const isPresent = presentRollNumbers.has(student.rollNo);
              const initials = student.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2);

              return (
                <tr
                  key={student.rollNo}
                  className="border-t hover:bg-gray-50"
                >
                  {/* Avatar */}
                  <td className="p-3">
                    {student.imageUrl ? (
                      <img
                        src={student.imageUrl}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                        {initials}
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-medium">{student.rollNo}</td>
                  <td className="p-3">{student.name}</td>

                  {/* Gender */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded border ${
                        student.gender === "Male"
                          ? "border-blue-500 text-blue-600 bg-blue-50"
                          : "border-pink-500 text-pink-600 bg-pink-50"
                      }`}
                    >
                      {student.gender}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3 text-center">
                    {isPresent ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                        <XCircle className="w-4 h-4" />
                        Absent
                      </span>
                    )}
                  </td>

                  {/* Delete */}
                  {onDeleteStudent && (
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          const ok = window.confirm(
                            `Delete ${student.name} (${student.rollNo})?`
                          );
                          if (ok) onDeleteStudent(student.rollNo);
                        }}
                        className="text-red-600 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
