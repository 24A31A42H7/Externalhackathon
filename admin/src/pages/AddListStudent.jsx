import axios from 'axios';
import React, { useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const AddListStudent = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitFile = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file before submitting");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file); // "file" should match your backend field name

      const response = await axios.post(`
        ${url}/api/student/addlist`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      if (response.data.success) {
        toast.success("Added list of students successfully");
        setFile(null);
      } else {
        toast.error("Failed to upload");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submitFile} className="flex sm:flex-col p-10 justify-center items-center">
      <div className="flex p-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept=".xlsx, .xls, .csv"
          className="border border-gray-600"
        />
      </div>
      <div className="flex items-center justify-center bg-green-500 rounded-full p-2 w-[200px] ml-4">
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddListStudent;
