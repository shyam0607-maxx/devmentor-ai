const mongoose = require('mongoose');

const learningProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dsaProgress: {
    completedTopics: [{
      topicId: String,
      completedAt: Date,
    }],
    totalTopics: Number,
    overallProgress: Number,
    quizAverageScore: Number,
  },
  mernProgress: {
    completedModules: [String],
    totalModules: Number,
    overallProgress: Number,
  },
  meanProgress: {
    completedModules: [String],
    totalModules: Number,
    overallProgress: Number,
  },
  mockInterviewHistory: [{
    topic: String,
    difficulty: String,
    score: Number,
    duration: Number,
    date: Date,
  }],
  codingProblems: {
    attempted: Number,
    solved: Number,
  },
  learningStreak: {
    current: Number,
    longest: Number,
    lastActivityDate: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LearningProgress', learningProgressSchema);
