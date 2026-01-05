import Attendance from "../models/Attendance.js";
import XLSX from "xlsx";

/* 1️⃣ Save attendance (manual / auto-save) */
export const saveAttendance = async (req, res) => {
  try {
    const { date, branch, year, records } = req.body;

    if (!branch || !year || !records) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const attendanceDate =
      date || new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      date: attendanceDate,
      branch,
      year
    });

    if (existing) {
      existing.records = records;
      await existing.save();
      return res.json(existing);
    }

    const attendance = await Attendance.create({
      date: attendanceDate,
      branch,
      year,
      records
    });

    res.status(201).json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving attendance" });
  }
};

/* 2️⃣ Upload Excel & store in DB */
export const uploadAttendanceExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    if (!data.length) {
      return res.status(400).json({ message: "Excel sheet is empty" });
    }

    // ✅ Read branch & year from FIRST ROW
    const branch = data[0]["Branch"];
    const year = Number(data[0]["Year"]);

    if (!branch || !year) {
      return res.status(400).json({
        message: "Branch or Year missing in Excel sheet"
      });
    }

    const attendanceDate = new Date().toISOString().split("T")[0];

    const records = data.map(row => ({
      rollNo: String(row["Roll No"]),
      name:String(row["Name"]),
      status: row["Status"] || "Absent"
    }));

    const existing = await Attendance.findOne({
      date: attendanceDate,
      branch,
      year
    });

    if (existing) {
      existing.records = records;
      await existing.save();
      return res.json(existing);
    }

    const attendance = await Attendance.create({
      date: attendanceDate,
      branch,
      year,
      records
    });

    res.status(201).json(attendance);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Excel upload failed" });
  }
};

/* 3️⃣ Get one student monthly attendance */
export const getStudentMonthlyAttendance = async (req, res) => {
  try {
    const { rollNo } = req.params;
    const { month, year } = req.query;

    const data = await Attendance.find({
      year,
      date: {
        $gte: `${year}-${month}-01`,
        $lte: `${year}-${month}-31`
      },
      "records.rollNo": rollNo
    });

    const result = data.map(day => ({
      date: day.date,
      status: day.records.find(r => r.rollNo === rollNo)?.status
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};

/* 4️⃣ Get all students of branch & year */
export const getBranchStudentsAttendance = async (req, res) => {
  try {
    const { branch, year } = req.query;

    if (!branch || !year) {
      return res.status(400).json({ message: "Branch and year required" });
    }

    const data = await Attendance.find({ branch, year });

    const studentMap = {};

    data.forEach(day => {
      day.records.forEach(r => {
        if (!studentMap[r.rollNo]) {
          studentMap[r.rollNo] = {
            rollNo: r.rollNo,
            attendance: []
          };
        }

        studentMap[r.rollNo].attendance.push({
          date: day.date,
          status: r.status
        });
      });
    });

    res.json(Object.values(studentMap));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch branch attendance" });
  }
};
