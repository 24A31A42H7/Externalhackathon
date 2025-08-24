import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-6 text-center bg-gray-900 text-gray-300">
      <p className="text-lg font-semibold">📊 Student Performance Prediction Project</p>
      <p className="text-sm text-gray-400">Analyze coding data from HackerRank & LeetCode</p>
      
      <div className="mt-3 space-x-4">
        <a href="#" className="text-blue-400 hover:underline">Home</a>
        <a href="#about" className="text-blue-400 hover:underline">About</a>
        <a href="#contact-us" className="text-blue-400 hover:underline">Contact</a>
      </div>
      
      <p className="mt-4 text-gray-500 text-sm">
       © 2025 Pragati Engineering College - Student Tracker. Built with ❤️ by Mahesh
      </p>
       </footer>
    </div>
  )
}

export default Footer
