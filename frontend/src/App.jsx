import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import HomeMahasiswa from './pages/home_mahasiswa';
import HomeDosen from './pages/home_dosen';
import CourseDetail from './pages/course_detail';
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mahasiswa" element={<HomeMahasiswa />} />
        <Route path="/dosen" element={<HomeDosen />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App
