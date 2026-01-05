import React from "react";
import AttendanceSystem from '../components/AttendanceSystem'
import { Helmet } from "react-helmet";
const Attendance = () => {
  return (
    <div>
      <Helmet>
        <title>Face Recognition Attendance System | Group Detection</title>
        <meta
          name="description"
          content="Automated attendance system using face recognition technology. Detect multiple faces simultaneously, track gender-wise statistics, and generate Excel reports."
        />
      </Helmet>
      <AttendanceSystem/>
      
    </div>
  )
}

export default Attendance
