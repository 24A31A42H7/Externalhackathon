import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

/* ✅ Attendance dashboard API */
export const getBranchStudentsAttendance = (branch, year) =>
  API.get(`/attendance/branch?branch=${branch}&year=${year}`);

/* ✅ Single student monthly attendance (already correct) */
export const getStudentMonthlyAttendance = (rollNo, month, year) =>
  API.get(`/attendance/student/${rollNo}?month=${month}&year=${year}`);
