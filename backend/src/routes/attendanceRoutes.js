import express from "express";
import multer from "multer";

import {
  saveAttendance,
  uploadAttendanceExcel,
  getStudentMonthlyAttendance,
  getBranchStudentsAttendance
} from "../controllers/attendanceController.js";

const AttendanceRouter = express.Router();

/* Multer setup */
const upload = multer({ dest: "uploads/" });

/* 1️⃣ Save attendance (from frontend form / auto-save) */
AttendanceRouter.post("/", saveAttendance);

/* 2️⃣ Upload Excel & store in DB */
AttendanceRouter.post(
  "/upload-excel",
  upload.single("file"),
  uploadAttendanceExcel
);

/* 3️⃣ Get one student monthly attendance */
AttendanceRouter.get(
  "/student/:rollNo",
  getStudentMonthlyAttendance
);

/* 4️⃣ Get all students of a branch & year */
AttendanceRouter.get(
  "/branch",
  getBranchStudentsAttendance
);

export default AttendanceRouter;
