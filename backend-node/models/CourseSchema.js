const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
  schedule: String
});

module.exports = mongoose.model('Course', courseSchema);