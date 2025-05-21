import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const REACT_URL = import.meta.env.VITE_API_URL;

export default function HomeDosen() {
  const [lecturerData, setLecturerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchLecturerData = async () => {
        const token = localStorage.getItem('token');
  
        try {
          {/* Fetch lecturer data */}
          const response = await fetch(`${REACT_URL}/api/lecturers/profile`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch lecturer data');
          }
  
          const data = await response.json();
          setLecturerData(data);

          {/* Fetch courses taught by the lecturer */}
          const coursesResponse = await fetch(`${REACT_URL}/api/lecturers/courses/${data._id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!coursesResponse.ok) {
            throw new Error('Failed to fetch courses');
          }

          const courseData = await coursesResponse.json();
          setCourses(courseData);

        } catch (error) {
          console.error(error);
          alert('Error loading lecturer data.');
        } finally {
          setLoading(false);
          setCoursesLoading(false);
        }
      };
  
      fetchLecturerData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!lecturerData) {
      return <div>No lecturer data available.</div>;
    }

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
              <p className="font-medium">Dosen</p>
            </div>
          </div>
        </div>

        {/* Courses Taught */}
        <div className="mb-10">
          <h2 className="text-2x1 font-semibold text-gray-700 mb-4">Courses Taught</h2>

            {coursesLoading ? (<p>Loading courses...</p>) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-medium">{course.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{course.code}</p>
                    <button onClick={() => navigate(`/manage/${course._id}`)} className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                      Detail
                    </button>
                  </div>
              ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Belum mengampu mata kuliah.</p>
            )}
        </div>

      </div>
    </div>
  );
}