const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../models/CourseSchema');

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

module.exports = router;