import React from 'react'

const About2 = () => {
  return (
    <div className="bg-white-50">
      {/* Navbar */}
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-6 px-6">
        
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-blue-100 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Benefits</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>No need to manually check each student’s profile, all data is in one place.</li>
              <li>Students’ coding progress is always up-to-date and visible</li>
              <li>Seeing stars and progress encourages students to practice more.</li>
              <li>Teachers and admins get a single view of all students’ coding activity.</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-100 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">How it Works</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>System fetches student data from LeetCode & HackerRank automatically.</li>
              <li>Stars, rankings, and progress refresh periodically without manual input.</li>
              <li>Student profiles are organized and stored in a database for easy retrieval.</li>
              <li>Teachers/students can view the updated student data anytime through the website.</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-100 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Automatically updates coding stars and achievements from both platforms.</li>
              <li>Compare performance across students in a clear, competitive format.</li>
              <li>Each student’s coding stats, stars, and progress history at a glance.</li>
              <li>Easy-to-use interface for teachers to monitor class performance instantly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About2
