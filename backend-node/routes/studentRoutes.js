const express = require('express');
const auth = require('../middleware/auth');
const Enrollment = require('../models/EnrollmentSchema');
const Course = require('../models/CourseSchema');
const Student = require('../models/StudentSchema');
const Rating = require('../models/RatingSchema');

const router = express.Router();

router.use(auth);

router.get('/profile', async (req, res) => {
  const student = await Student.findOne({ userId: req.user.id });
  if (!student) return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
  res.json(student);
});

router.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.post('/enroll', async (req, res) => {
  const { courseId } = req.body;
  const student = await Student.findOne({ userId: req.user.id });
  const existing = await Enrollment.findOne({ student: student._id, course: courseId });
  if (existing) return res.status(400).json({ error: 'Sudah terdaftar' });

  const enrollment = new Enrollment({ student: student._id, course: courseId });
  await enrollment.save();
  res.status(201).json(enrollment);
});

router.get('/enrollments', async (req, res) => {
  const student = await Student.findOne({ userId: req.user.id });
  const enrollments = await Enrollment.find({ student: student._id }).populate('course');
  res.json(enrollments);
});

router.get('/grades', async (req, res) => {
  const student = await Student.findOne({ userId: req.user.id });
  const data = await Enrollment.find({ student: student._id }).populate('course');
  res.json(data);
});

router.post('/rate', async (req, res) => {
  const student = await Student.findOne({ userId: req.user.id });
  const { lecturerId, score, comment } = req.body;
  const rating = new Rating({ student: student._id, lecturer: lecturerId, score, comment });
  await rating.save();
  res.status(201).json(rating);
});

module.exports = router;