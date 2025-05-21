const express = require('express');
const auth = require('../middleware/auth');
const Enrollment = require('../models/EnrollmentSchema');
const Lecturer = require('../models/LecturerSchema');
const Course = require('../models/CourseSchema');
const Rating = require('../models/RatingSchema');

const router = express.Router();

router.use(auth);

router.get('/courses', async (req, res) => {
  const lecturer = await Lecturer.findOne({ userId: req.user.id });
  const courses = await Course.find({ lecturer: lecturer._id });
  res.json(courses);
});

router.get('/ratings', async (req, res) => {
  const lecturer = await Lecturer.findOne({ userId: req.user.id });
  const ratings = await Rating.find({ lecturer: lecturer._id });
  res.json(ratings);
});

router.put('/score/:enrollId', async (req, res) => {
  const { score } = req.body;
  const updated = await Enrollment.findByIdAndUpdate(req.params.enrollId, { score }, { new: true });
  res.json(updated);
});

module.exports = router;