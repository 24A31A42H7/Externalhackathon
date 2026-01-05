import StudentAttendeceModel from '../models/Student.js'

const addStudent = async (req, res) => {
  try {
    const student = await StudentAttendeceModel.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getStudentsByBranch = async (req, res) => {
  const { branch } = req.query;
  const students = await StudentAttendeceModel.find({ branch });
  res.json(students);
};

export {addStudent,getStudentsByBranch};