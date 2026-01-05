import axios from "axios";

const API = axios.create({
  baseURL: "https://externalhackathon.onrender.com/api"
});

/* ✅ Attendance dashboard API */
export const getBranchStudentsAttendance = (branch, year) =>
  API.get(`/attendance/branch?branch=${branch}&year=${year}`);

/* ✅ Single student monthly attendance (already correct) */
export const getStudentMonthlyAttendance = (rollNo, month, year) =>
  API.get(`/attendance/student/${rollNo}?month=${month}&year=${year}`);
