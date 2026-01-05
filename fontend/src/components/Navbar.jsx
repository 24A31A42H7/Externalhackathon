import React, { useState } from 'react'
import assets from '../assets/asserts'
import { NavLink ,useNavigate} from 'react-router-dom'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
    const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className='px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium sm:bg-blue-600'>
      
      {/* Logo Section
      <div className='flex justify-between items-center'>
        <img
          src={assets.logo}
          className='w-15 h-15 rounded-[15px] sm:w-15 py-2'
          alt='logo'
        />
        <p className='flex justify-center items-center py-5 px-2 text-2xl h-15'>
          Student Tracker
        </p>
      </div> */}

      {/* Nav Links */}
      <div
        className={`text-black-500 text-xl
  ${!sidebarOpen ? 'max-sm:w-0 overflow-hidden' : 'max-sm:w-60 max-sm:pl-10'}
  max-sm:fixed max-sm:top-20 max-sm:bottom-0 max-sm:right-0
  max-sm:min-h-screen max-sm:flex-col
  max-sm:bg-blue-500 max-sm:text-black max-sm:pt-20
  flex flex-col sm:flex-row gap-6
  justify-between transition-all`}
      >
        {/* Close Icon */}
        <img
          src={assets.close_icon}
          alt='close'
          className='w-5 absolute right-4 top-4 sm:hidden'
          onClick={() => setSidebarOpen(false)}
        />

        <NavLink
          to="/"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `sm:hover:border-b ${isActive ? 'border-b-2 border-black' : ''}`
          }
        >
          Home
        </NavLink>


        <NavLink
          to="/attendance"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `sm:hover:border-b ${isActive ? 'border-b-2 border-black' : ''}`
          }
        >
          Attendance
        </NavLink>
        <NavLink
          to="/attendance1"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `sm:hover:border-b ${isActive ? 'border-b-2 border-black' : ''}`
          }
        >
          Dashboard
        </NavLink>
          <NavLink
          to="/student"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `sm:hover:border-b ${isActive ? 'border-b-2 border-black' : ''}`
          }
        >
            Student Progress
        </NavLink>
          <NavLink
          to="/time-table"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `sm:hover:border-b ${isActive ? 'border-b-2 border-black' : ''}`
          }
        >
          Time Table
        </NavLink>
        
        <NavLink
          to="/about"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `sm:hover:border-b ${isActive ? 'border-b-2 border-black' : ''}`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `sm:hover:border-b ${isActive ? 'border-b-2 border-black' : ''}`
          }
        >
          Contact Us
        </NavLink>
        {!user ? (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `sm:hover:border-b ${isActive ? "border-b-2 border-black" : ""}`
          }
        >
          Login
        </NavLink>
      ) : (
        <button
          onClick={handleLogout}
          className="sm:hover:border-b border-b-2 border-transparent hover:border-black"
        >
          Logout
        </button>
      )}
      </div>

      {/* Mobile Menu Icon */}
      <div className='flex items-center'>
        <img
          src={assets.menu_icon}
          alt='menu'
          onClick={() => setSidebarOpen(true)}
          className='w-8 sm:hidden'
        />
      </div>
    </div>
  )
}

export default Navbar
