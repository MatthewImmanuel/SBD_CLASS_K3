// index.js
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const cors = require("cors");

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables
const JWT_SECRET;
const MONGO_URI;

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}
connectDB();

// Define Schemas and Models
const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  npm: { type: String, required: true, unique: true },
  angkatan: { type: Number, required: true },
  programStudi: { type: String, required: true },
  statusAkademik: { type: String, default: "Aktif" },
  totalSKSLulus: { type: Number, default: 0 },
  ipk: { type: Number, default: 0 },
  ips: [
    {
      semester: Number,
      ip: Number,
      courses: [
        {
          courseId: mongoose.Schema.Types.ObjectId,
          nilai: { type: Number, default: null },
          grade: { type: String, default: "-" },
        },
      ],
    },
  ],
});
const Student = mongoose.model("Student", studentSchema);

const lecturerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nip: { type: String, required: true, unique: true },
  taughtCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});
const Lecturer = mongoose.model("Lecturer", lecturerSchema);

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sks: { type: Number, required: true },
  offeredSemester: { type: Number },
  prerequisites: [{ type: String }],
});
const Course = mongoose.model("Course", courseSchema);

const irsSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  semester: { type: Number, required: true },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      approved: { type: Boolean, default: false },
    },
  ],
  totalSKS: { type: Number, default: 0 },
  submitted: { type: Boolean, default: false },
});
const IRS = mongoose.model("IRS", irsSchema);

// Helper Functions
function calculateGrade(score) {
  if (score >= 85) return { grade: "A", point: 4 };
  else if (score >= 70) return { grade: "B", point: 3 };
  else if (score >= 60) return { grade: "C", point: 2 };
  else if (score >= 50) return { grade: "D", point: 1 };
  else return { grade: "E", point: 0 };
}

// Middleware: Auth
function authenticate(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

// Controller: Auth
async function login(req, res) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { username, password } = req.body;

  let user = await Student.findOne({ username });
  let role = "student";

  if (!user) {
    user = await Lecturer.findOne({ username });
    role = "lecturer";
  }

  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: "1d" });

  res.json({ token, role });
}

// Controller: Student
async function getProfile(req, res) {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

// Controller: Course
async function submitIRS(req, res) {
  const { semester, courses } = req.body;

  const courseDocs = await Course.find({ _id: { $in: courses } });
  const totalSKS = courseDocs.reduce((sum, c) => sum + c.sks, 0);

  if (totalSKS > 24)
    return res.status(400).json({ msg: "Total SKS melebihi batas maksimal 24" });

  const irs = new IRS({
    studentId: req.user.id,
    semester,
    courses: courses.map(id => ({ courseId: id })),
    totalSKS,
  });

  await irs.save();
  res.json({ msg: "IRS berhasil diajukan" });
}

async function inputNilai(req, res) {
  const { courseId, studentId, nilai } = req.body;
  const { grade, point } = calculateGrade(nilai);

  const student = await Student.findById(studentId);
  const course = await Course.findById(courseId);

  const latestIPSEntry = student.ips.slice(-1)[0];
  const courseEntry = latestIPSEntry.courses.find(c => c.courseId.toString() === courseId);

  if (!courseEntry) return res.status(400).json({ msg: "Mahasiswa tidak mengambil mata kuliah ini" });

  courseEntry.nilai = nilai;
  courseEntry.grade = grade;

  // Hitung IP dan update
  let totalPoints = 0;
  let totalSKS = 0;
  latestIPSEntry.courses.forEach(c => {
    if (c.nilai !== null) {
      const { point } = calculateGrade(c.nilai);
      totalPoints += point * course.sks;
      totalSKS += course.sks;
    }
  });

  latestIPSEntry.ip = totalPoints / totalSKS;

  // Update IPK
  let totalIPKPoints = 0;
  let totalIPKSemesters = 0;
  student.ips.forEach(s => {
    if (s.ip) {
      totalIPKPoints += s.ip;
      totalIPKSemesters++;
    }
  });
  student.ipk = totalIPKPoints / totalIPKSemesters;

  // Update total sks lulus jika semua nilai diisi
  const allGradesFilled = latestIPSEntry.courses.every(c => c.nilai !== null);
  if (allGradesFilled) {
    student.totalSKSLulus += course.sks;
  }

  await student.save();
  res.json({ msg: "Nilai berhasil dimasukkan", courseEntry });
}

// Check graduation
async function checkGraduation(req, res) {
  const student = await Student.findById(req.user.id);
  if (student.totalSKSLulus >= 144) {
    await Student.findByIdAndDelete(student._id);
    return res.json({ msg: "Selamat! Anda telah lulus." });
  }
  res.json({ msg: "Anda belum memenuhi syarat kelulusan." });
}

// Routes
app.post("/api/auth/login", login);
app.get("/api/student/profile", authenticate, getProfile);
app.post("/api/course/irs", authenticate, submitIRS);
app.post("/api/course/input-nilai", authenticate, inputNilai);
app.get("/api/student/check-graduation", authenticate, checkGraduation);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
