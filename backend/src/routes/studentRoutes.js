import express from 'express'

import { addStudent,getStudentsByBranch } from '../controllers/studentController.js';

const StudentRouteForAttendence = express.Router();

StudentRouteForAttendence.post("/", addStudent);
StudentRouteForAttendence.get("/", getStudentsByBranch);

export default StudentRouteForAttendence;
