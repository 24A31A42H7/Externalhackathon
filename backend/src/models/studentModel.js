import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    rollNo:{type:String,required:true,unique:true},
    branch:{type:String,required:true},
    year:{type:String,required:true},
    leetcode:{type:String,required:true},
    hackerrank:{type:String,required:true},
    leetcodeStats: Object,   // full LeetCode stats
    hackerrankStats: Object
})

const studentModel=mongoose.models.student || mongoose.model("Student",studentSchema);

export default studentModel;