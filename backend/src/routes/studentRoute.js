import { 
  addStudent,
  filterStudents,
  listStudent,
  removeStudent,
  AddListStudent 
} from "../controllers/studentControllers.js";

import express from 'express';
import multer from 'multer';

const studentRouter = express.Router();

// Configure multer (files will be saved in "uploads" folder)
const upload = multer({ dest: "uploads/" });

studentRouter.post('/add', addStudent);

// ✅ This must use multer middleware
studentRouter.post('/addlist', upload.single("file"), AddListStudent);

studentRouter.get('/list', listStudent);
studentRouter.post('/remove', removeStudent);
studentRouter.post('/filter', filterStudents);

export default studentRouter;
