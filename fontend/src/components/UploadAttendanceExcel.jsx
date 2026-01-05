import { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";

const UploadAttendanceExcel = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select Excel file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post(
        "https://externalhackathon.onrender.com/api/attendance/upload-excel",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Attendance saved to DB");
      onSuccess && onSuccess();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded mt-6">
      <h3 className="font-semibold mb-2">Upload Attendance Excel</h3>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 mt-3"
      >
        <Upload size={16} />
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadAttendanceExcel;
