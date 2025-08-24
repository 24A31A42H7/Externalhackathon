import { v2 as cloudinary } from "cloudinary";
import studentModel from "../models/studentModel.js";
import axios from 'axios'


const addStudent = async (req, res) => {
  try {
    const name = req.body.name;
    const rollNo = req.body.rollNo;
    const branch = req.body.branch;
    const year = req.body.year;
    const leetcode = req.body.leetcode;
    const hackerrank = req.body.hackerrank;
    let leetcodeStats = null;
    if (leetcode) {
      try {
        const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${leetcode}`);
        leetcodeStats = response.data;
      } catch (err) {
        leetcodeStats = { error: "Unable to fetch LeetCode data" };
      }
    }

    // Build HackerRank profile URL
    let hackerrankStats = null;
    if (hackerrank) {
      hackerrankStats = { profileUrl: `https://hackerrank-badges.vercel.app/${hackerrank}` };
    }

    const studentData = {
      name,
      rollNo,
      branch,
      year,
      leetcode,
      hackerrank,
      hackerrankStats,
      leetcodeStats
    };

    const student =new studentModel(studentData);
    await student.save();
    res.json({ success: true, message: "student Added" });

    console.log(name, rollNo, branch, year, leetcode, hackerrank);
  } catch (error) {
    res.json({ success: false });
  }
};

// ✅ List students with LeetCode + HackerRank stats
const listStudent = async (req, res) => {
  
  try {
    const students = await studentModel.find().sort({rollNo:1});
    res.json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

export const filterStudents = async (req, res) => {
  try {
    const { year, branch } = req.body; 
    console.log(year,branch);
   

    const students = await studentModel.find({year,branch}).sort({rollNo:1});

    res.json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error filtering students" });
  }
};

const removeStudent=async(req,res)=>{
    try {
        await studentModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"student removed"});
    } catch (error) {
        res.json({success:false});
    }

};
export { addStudent, listStudent ,removeStudent};
