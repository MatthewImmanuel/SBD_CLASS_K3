// src/pages/home_mahasiswa.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeMahasiswa() {
  const studentData = {
    name: 'Andi Saputra',
    studentId: '202101010101',
    role: 'Mahasiswa',
    entryYear: 2021,
    program: 'Teknik Informatika',
    status: 'Aktif',
    totalCredits: 96,
    gpa: 3.78,
  };

  return (
    <div className="min-h-screen w-screen bg-yellow-100 font-sans">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-700 to-orange-400 text-white py-8 px-8 shadow-lg flex justify-between items-center">
        <div className="px-0 mx-0">
          <h1 className="text-4xl font-bold">Student Dashboard</h1>
        </div>

        <Link to="/" className="mt-6 block text-center text-lg text-white hover:text-blue-800 font-medium">
          Logout
        </Link>
      </div>

      {/* Main Content */}
      <div className=" flex flex-col lg:flex-row max-w-screen -mt-16 px-4 py-20 pb-12">
          {/* Left Sidebar Info Card */}
          <div className="lg:w-1/4 mx-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-blue-700 text-2xl font-bold">
                AS
              </div>
              {/* student name % npm */}
              <h2 className="text-xl font-semibold text-center">{studentData.name}</h2>
              <p className="text-gray-500 text-sm text-center mb-6">{studentData.studentId}</p>

              <div className="space-y-3 text-sm">
                {/* role (student) */}
                <div className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="text-gray-500">Role</span>
                  <span className="font-medium">{studentData.role}</span>
                </div>

                {/* bachelor program */}
                <div className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="text-gray-500">Program</span>
                  <span className="font-medium">{studentData.program}</span>
                </div>

                {/* academic status */}
                <div className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-green-500">{studentData.status}</span>
                </div>

                {/* entry year */}
                <div className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="text-gray-500">Entry Year</span>
                  <span className="font-medium">{studentData.entryYear}</span>
                </div>

                {/* IPK */}
                <div className="flex justify-between border-b border-gray-400 pb-2">
                  <span className="text-gray-500">IPK</span>
                  <span className="font-medium">{studentData.gpa}</span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Side Cards */}
          <div className="lg:w-3/4 w-full">
            {/* Course Action Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mt-6 transform hover:-translate-y-1 transition-transform duration-300">
              
            </div>
          </div>
      </div>
    </div>
  );
}