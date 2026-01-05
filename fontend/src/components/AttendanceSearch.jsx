import { useState } from "react";
import { Search } from "lucide-react";

const AttendanceSearch = ({ onSearch }) => {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");

  return (
    <div className="flex gap-3 items-center">
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2"
      />

      <input
        type="text"
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className="border p-2"
      />

      <button
        onClick={() => onSearch(year, branch)}
        className="bg-black text-white p-2"
      >
        <Search />
      </button>
    </div>
  );
};

export default AttendanceSearch;
