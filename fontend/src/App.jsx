import React from 'react'
import Navbar from './components/Navbar'
import Pec from './components/Pec'
import {Toaster}from 'react-hot-toast'
import Footer from './components/Footer'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import StudentDashboard from './pages/studentDashboard'
import Contact from './pages/Contact'
import About from './pages/About'
import Attendance from './pages/Attendance'
import TimeTable from './pages/TimeTable'
import Attendance1 from "./pages/Attendance1";
import StudentDetails from "./pages/StudentDetails";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
   
  return (
    <div className='relative'>
      <Toaster/>
      <Pec/>
      <Navbar/>
     
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/student" element={<StudentDashboard/>}/>
          <Route path="/attendance" element={<Attendance/>}/>
          <Route path="/attendance1" element={<Attendance1 />} />
          <Route path="/student/:rollNo" element={<StudentDetails />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/time-table" element={<TimeTable/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      <Footer/>
    </div>
  )
}

export default App
