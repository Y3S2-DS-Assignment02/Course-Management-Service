const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  lecNotes: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const quizQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswerIndex: Number,
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [quizQuestionSchema],
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  resources: [resourceSchema],
  quizzes: [quizSchema],
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, // By default, courses are not approved
  },
  isRejected: {
    type: Boolean,
    default: false, // By default, courses are not approved
  },
  // learners: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User' // Reference to the User model representing learners
  // }],
  lessons: [lessonSchema],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
