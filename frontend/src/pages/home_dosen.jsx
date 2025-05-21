// src/pages/home_dosen.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeDosen() {
  // Example static data – replace with API call later
  const lecturerData = {
    name: 'Dr. Budi Santoso',
    nip: '198001012010011001',
    role: 'Dosen',
    courses: [
      {
        id: 'CS101',
        name: 'Introduction to Computer Science',
        studentsEnrolled: [
          { id: '202101010101', name: 'Andi Saputra' },
          { id: '202101010102', name: 'Siti Aminah' },
          { id: '202101010103', name: 'Rizky Praditha' },
        ],
      },
      {
        id: 'CS202',
        name: 'Data Structures and Algorithms',
        studentsEnrolled: [
          { id: '202101010104', name: 'Dewi Anggraini' },
          { id: '202101010105', name: 'Fajar Setiawan' },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen w-screen bg-yellow-100 font-sans">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-400 text-white py-8 px-8 shadow-lg flex justify-between items-center">
        <div className="px-0 mx-0">
          <h1 className="text-4xl font-bold">Lecturer Dashboard</h1>
        </div>
        
        <Link to="/" className="mt-6 block text-center text-lg text-white hover:text-blue-800 font-medium">
          Logout
        </Link>
      </div>

      <div className="max-w-full mx-20 my-8 bg-white shadow-md rounded-lg py-10">
        {/* Lecturer Info */}
        <div className="mb-20 border-b border-gray-400 pb-2">
          <h2 className="text-3xl font-semibold text-gray-700">Profile</h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{lecturerData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">NIP</p>
              <p className="font-medium">{lecturerData.nip}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{lecturerData.role}</p>
            </div>
          </div>
        </div>

        {/* Courses Taught */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4 ">Courses Taught</h2>
        <div className="space-y-8 mx-8">
          {lecturerData.courses.map((course) => (
            <div key={course.id} className="border border-gray-500 rounded-md p-4">
              
              <Link to={`/course/${course.id}`} className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                {course.name}
              </Link>

              <p className="text-sm text-gray-600 mt-1">Course ID: <span className="font-mono">{course.id}</span></p>

              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">Enrolled Students ({course.studentsEnrolled.length})</p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                  {course.studentsEnrolled.map((student) => (
                    <li key={student.id} className="text-sm">
                      {student.name} <span className="text-gray-500">({student.id})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}