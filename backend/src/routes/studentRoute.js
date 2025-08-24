import { addStudent,filterStudents,listStudent, removeStudent } from "../controllers/studentControllers.js";

import express from 'express'

const studentRouter=express.Router();

studentRouter.post('/add',addStudent);
studentRouter.get('/list',listStudent);
studentRouter.post('/remove',removeStudent);
studentRouter.post('/filter',filterStudents);

export default studentRouter;
