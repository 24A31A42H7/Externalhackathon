import cron from "node-cron";
import axios from "axios";
import studentModel from "./src/models/studentModel.js"; // import your model


// Cron job to update student stats every day at 2:00 AM
cron.schedule("*/5 * * * *", async () => {
  console.log("Cron job started: Updating student stats");

  try {
    const students = await studentModel.find({});

    for (const student of students) {
      if (student.leetcode) {
        try {
          const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${student.leetcode}`);
          student.leetcodeStats = response.data;
        } catch (err) {
          student.leetcodeStats = { error: "Unable to fetch LeetCode data" };
        }
      }

      if (student.hackerrank) {
        student.hackerrankStats = { profileUrl: `https://hackerrank-badges.vercel.app/${student.hackerrank}` };
      }

      await student.Save();
      console.log(`Updated stats for ${student.name}`);
    }

    console.log("All student stats updated successfully!");
  } catch (err) {
    console.error("Error updating student stats:", err);
  }
});