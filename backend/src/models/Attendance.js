import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split("T")[0] // YYYY-MM-DD
  },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  records: [
    {
      rollNo: { type: String, required: true },
      name:{type:String,required:true},
      status: { type: String, enum: ["Present", "Absent"], required: true }
    }
  ]
});

attendanceSchema.index({ date: 1, branch: 1, year: 1 });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
