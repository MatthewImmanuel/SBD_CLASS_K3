const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
  score: { type: Number, min: 1, max: 5 },
  comment: String
});

module.exports = mongoose.model('Rating', ratingSchema);