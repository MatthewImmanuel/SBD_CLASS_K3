import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeMahasiswa() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:4000/api/students/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const data = await response.json();
        setStudentData(data);

        // Fetch enrollments after student data is fetched
        const enrollResponse = await fetch('http://localhost:4000/api/students/enrollments', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!enrollResponse.ok) {
          throw new Error('Failed to fetch enrollments');
        }

        const enrollData = await enrollResponse.json();
        setEnrollments(enrollData);

      } catch (error) {
        console.error(error);
        alert('Error loading student data.');
      } finally {
        setLoading(false);
        setEnrollmentLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studentData) {
    return <div>No student data available.</div>;
  }

  return (
    <div className="min-h-screen w-screen bg-yellow-100 font-sans">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-700 to-orange-400 text-white py-8 px-8 shadow-lg flex justify-between items-center">
        <h1 className="text-4xl font-bold">Student Dashboard</h1>
        <Link to="/" className="mt-6 block text-center text-lg text-white hover:text-blue-800 font-medium">
          Logout
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row max-w-screen -mt-16 px-4 py-20 pb-12">
        {/* Left Sidebar Info Card */}
        <div className="lg:w-1/4 mx-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-blue-700 text-2xl font-bold">
              {studentData.name.charAt(0)}
            </div>
            <h2 className="text-xl font-semibold text-center">{studentData.name}</h2>
            <p className="text-gray-500 text-sm text-center mb-6">{studentData.nim}</p>

            <div className="space-y-3 text-sm">

              <div className='flex justify-between border-b border-gray-400 pb-2'>
                <span className="text-gray-500">Role</span>
                <span className="font-medium">Mahasiswa</span>
              </div>

              <div className="flex justify-between border-b border-gray-400 pb-2">
                <span className="text-gray-500">Program</span>
                <span className="font-medium">{studentData.major || '-'}</span>
              </div>

              <div className="flex justify-between border-b border-gray-400 pb-2">
                <span className="text-gray-500">Entry Year</span>
                <span className="font-medium">{studentData.year}</span>
              </div>

              <div className="flex justify-between border-b border-gray-400 pb-2">
                <span className="text-gray-500">Status</span>
                <span className={`font-medium ${studentData.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  {studentData.status}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="lg:w-3/4 w-full">
          {/* Course Action Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mt-6 transform hover:-translate-y-1 transition-transform duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Courses</h2>
              <p className="text-gray-600 mb-4">View the list of available courses and enroll.</p>

              <button onClick={() => navigate('/course')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                View Courses
              </button>

              {/* Enrolled Courses Section */}
              <div className="mt-6 pt-4 border-t border-gray-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-500 pb-2 ">Mata Kuliah yang Diambil</h3>

                  {enrollmentLoading ? (<p>Loading...</p>) : enrollments.length === 0 ? (<p className="text-gray-500 italic">Belum mengambil mata kuliah</p>) : (
                    <ul className="space-y-2">
                      {enrollments.map((enroll, index) => (
                        <li key={index} className="border-b border-gray-500 pb-2 mb-2">
                          <div className="font-medium">{enroll.course?.name || 'Unknown Course'}</div>
                          <div className="text-sm text-gray-600">Nilai: <span className="font-semibold">{enroll.score ?? '-'}</span></div>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>

            </div>
        </div>

      </div>
    </div>
  );
}