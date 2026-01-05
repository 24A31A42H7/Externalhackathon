import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, unique: true, required: true },
  name: String,
  branch: String,
  year: Number
});

const StudentAttendeceModel = mongoose.model("StudentAttendence", studentSchema);
export default StudentAttendeceModel;