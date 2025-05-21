const express = require('express');
const auth = require('../middleware/auth');
const Enrollment = require('../models/EnrollmentSchema');
const Lecturer = require('../models/LecturerSchema');
const Course = require('../models/CourseSchema');
const Rating = require('../models/RatingSchema');

const router = express.Router();

router.use(auth);

router.get('/profile', async (req, res) => {
  const lecturer = await Lecturer.findOne({ userId: req.user.id });
  if (!lecturer) return res.status(404).json({ error: 'Dosen tidak ditemukan' });
  res.json(lecturer);
});

router.get('/profile/:id', async (req, res) => {
  const lecturer = await Lecturer.findById(req.params.id);
  if (!lecturer) return res.status(404).json({ error: 'Dosen tidak ditemukan' });
  res.json(lecturer);
});

router.get('/courses/:lecturerId', async (req, res) => {
  const courses = await Course.find({ lecturer: req.params.lecturerId });
  if (!courses) return res.status(404).json({ error: 'Kursus tidak ditemukan' });
  res.json(courses);
});

router.get('/ratings', async (req, res) => {
  const lecturer = await Lecturer.findOne({ userId: req.user.id });
  const ratings = await Rating.find({ lecturer: lecturer._id });
  res.json(ratings);
});

router.put('/editScore/:enrollmentId', async (req, res) => {
  const { enrollmentId } = req.params;
  const { score } = req.body;

  try {
    // Find the enrollment by ID
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    // Update the score
    enrollment.score = score;
    await enrollment.save();
    res.status(200).json({ message: 'Score updated successfully', enrollment });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;