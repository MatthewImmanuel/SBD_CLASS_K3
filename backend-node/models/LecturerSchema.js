const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  nip: String
});

module.exports = mongoose.model('Lecturer', lecturerSchema);