import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CourseManage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`http://localhost:4000/api/courses/enrollments/${courseId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load enrollments');
        }

        const data = await response.json();
        setEnrollments(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [courseId]);

  const handleScoreChange = async (enrollmentId, newScore) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:4000/api/lecturers/editScore/${enrollmentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: newScore }),
      });

      if (!response.ok) {
        throw new Error('Failed to update score');
      }

      const updated = await response.json();

      setEnrollments((prev) =>
        prev.map((e) =>
          e._id === enrollmentId ? updated : e
        )
      );

      alert('Nilai berhasil diubah');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading enrollments...</div>;

  return (
    <div className="min-h-screen w-screen bg-yellow-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Kelola Nilai Mahasiswa</h1>

      {enrollments.length === 0 ? (
        <p className="text-gray-600">Tidak ada mahasiswa yang terdaftar dalam kursus ini.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Nama Mahasiswa</th>
              <th className="px-6 py-3 text-left">NIM</th>
              <th className="px-6 py-3 text-left">Nilai</th>
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((enroll) => (
                <tr key={enroll._id} className="border-t">
                    <td className="px-6 py-4">{enroll.student?.name || '-'}</td>
                    <td className="px-6 py-4">{enroll.student?.nim || '-'}</td>
                    <td className="px-6 py-4">
                        <input type="number" defaultValue={enroll.score} className="w-20 px-2 py-1 border rounded score-input"/>
                    </td>
                    <td className="px-6 py-4">
                        <button onClick={(e) => { const row = e.currentTarget.closest('tr'); const input = row.querySelector('.score-input');
                            if (!input) {
                                alert('Input tidak ditemukan');
                                return;
                            }
                            const newScore = parseFloat(input.value);
                            handleScoreChange(enroll._id, newScore);}}className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                            Simpan
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>

        </table>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Kembali
      </button>
    </div>
  );
}