const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../models/CourseSchema');
const Enrollment = require('../models/EnrollmentSchema');

const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).json(course);
});

router.get('/', async (req, res) => {
  const list = await Course.find();
  res.json(list);
});

router.get('/enrollments/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find all enrollments for this course
    const enrollments = await Enrollment.find({ course: courseId }).populate('student', 'name nim');
    console.log("Found enrollments:", enrollments);
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;