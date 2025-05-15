require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./models/UserSchema');
const Student = require('./models/StudentSchema');
const Lecturer = require('./models/LecturerSchema');
const Course = require('./models/CourseSchema');
const Enrollment = require('./models/EnrollmentSchema');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User terdaftar', user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ message: 'Login berhasil', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware: verify JWT & set req.user
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Student CRUD
app.get('/api/students', authMiddleware, async (req, res) => {
  const list = await Student.find();
  res.json(list);
});
app.post('/api/students', authMiddleware, async (req, res) => {
  const stud = new Student(req.body);
  await stud.save();
  res.status(201).json(stud);
});

// Lecturer CRUD
app.get('/api/lecturers', authMiddleware, async (req, res) => {
  const list = await Lecturer.find();
  res.json(list);
});
app.post('/api/lecturers', authMiddleware, async (req, res) => {
  const lec = new Lecturer(req.body);
  await lec.save();
  res.status(201).json(lec);
});

// Course CRUD
app.get('/api/courses', authMiddleware, async (req, res) => {
  const list = await Course.find();
  res.json(list);
});
app.post('/api/courses', authMiddleware, async (req, res) => {
  const crs = new Course(req.body);
  await crs.save();
  res.status(201).json(crs);
});

// Enrollment: Dosen masukkan nilai
app.post('/api/enrollments', authMiddleware, async (req, res) => {
  const enr = new Enrollment(req.body);
  await enr.save();
  res.status(201).json(enr);
});
app.put('/api/enrollments/:id/score', authMiddleware, async (req, res) => {
  const { score } = req.body;
  const enr = await Enrollment.findByIdAndUpdate(req.params.id, { score }, { new: true });
  res.json(enr);
});


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error('MongoDB connection error:', err));