import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CourseDetail() {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:4000/api/courses/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching courses: ${response.statusText}`);
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

    const handleEnroll = async (courseId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:4000/api/students/enroll', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseId }), // Send courseId in the body
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to enroll');
            }

            alert('Berhasil mendaftar ke kursus!');

        } catch (err) {
            alert(err.message);
            console.error('Enrollment error:', err);
        }
    };

  // Fetch lecturer by ID
  const fetchLecturer = async (lecturerId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:4000/api/lecturers/profile/${lecturerId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching lecturer: ${response.statusText}`);
      }

      const data = await response.json();
      setLecturers((prev) => ({
        ...prev,
        [lecturerId]: data.name, // Save lecturer name by ID
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch lecturers for all courses
  useEffect(() => {
    if (courses.length > 0) {
      courses.forEach((course) => {
        if (course.lecturer && !lecturers[course.lecturer]) {
          fetchLecturer(course.lecturer);
        }
      });
    }
  }, [courses]);

  if (loading) {
    return <div className="p-6 text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600 text-center">Failed to load courses: {error}</div>;
  }

  if (!courses.length) {
    return <div className="p-6 text-gray-600 text-center">No courses found.</div>;
  }

  return (
    <div className="min-h-screen w-screen bg-yellow-100 font-sans">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Courses</h1>

        <div className="space-y-6">
          {courses.map((course, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800">{course.name || 'Unnamed Course'}</h2>
              <p className="text-gray-600">{course.code || 'No description available'}</p>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <strong>Instructor:</strong>{' '}
                  {lecturers[course.lecturer] ? lecturers[course.lecturer] : 'Loading...'}
                </p>
                <p><strong>Schedule:</strong> {course.schedule || 'Not specified'}</p>

                {/* Enroll Button */}
                <button onClick={() => handleEnroll(course._id)} className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
                    Enroll
                </button>

              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/mahasiswa" className="text-blue-600 hover:underline">&larr; Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}