const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const Student = require('../models/StudentSchema');
const Lecturer = require('../models/LecturerSchema');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    if (user.role === 'mahasiswa') {
      await new Student({ userId: user._id, name: req.body.name, nim: req.body.nim, year: req.body.year, major: req.body.major, status: req.body.status }).save();
    } else {
      await new Lecturer({ userId: user._id, name: req.body.name, nip: req.body.nip }).save();
    }

    res.status(201).json({ message: 'Registrasi berhasil', id: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Username atau password salah' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router;