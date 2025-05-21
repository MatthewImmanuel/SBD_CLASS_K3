// src/pages/CourseDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function CourseDetail() {
    const { id } = useParams(); // Get dynamic course ID from URL

  // In real app, fetch data based on `id`
    const sampleData = {
        CS101: {
            name: 'Introduction to Computer Science',
            description: 'An introductory course covering programming basics using Python.',
            instructor: 'Dr. Budi Santoso',
            enrolledStudents: 35,
            schedule: 'Mon/Wed 10:00 - 11:30',
        },
        CS202: {
            name: 'Data Structures and Algorithms',
            description: 'In-depth study of algorithms and efficient data handling techniques.',
            instructor: 'Dr. Budi Santoso',
            enrolledStudents: 28,
            schedule: 'Tue/Thu 13:00 - 14:30',
        }
    };

    const course = sampleData[id];

    if (!course) {
        return <div className="p-6 text-red-600">Course not found</div>;
    }

    return (
        <div className="min-h-screen w-screen bg-yellow-100 font-sans">        
            <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{course.name}</h1>
                <p className="text-gray-700 mb-6">{course.description}</p>

                <div className="space-y-2">       
                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Schedule:</strong> {course.schedule}</p>
                    <p><strong>Enrolled Students:</strong> {course.enrolledStudents}</p>
                </div>

                <div className="mt-6">
                    <Link to="/dosen" className="text-blue-600 hover:underline">&larr; Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}