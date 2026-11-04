const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// In-memory storage (shared from authRoutes)
// For this demo, we'll use module-level storage
const usersStore = new Map();
const progressStore = new Map();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // For demo, just return mock user
    res.json({
      id: req.userId,
      name: 'Demo Student',
      email: 'demo@example.com',
      learningPath: 'dsa',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get learning progress
router.get('/progress', authMiddleware, async (req, res) => {
  try {
    // Return mock progress data
    res.json({
      userId: req.userId,
      dsaProgress: {
        completedTopics: [{ topicId: 'basics', completedAt: new Date() }],
        totalTopics: 11,
        overallProgress: 9,
        quizAverageScore: 85,
      },
      mernProgress: {
        completedModules: [],
        totalModules: 4,
        overallProgress: 0,
      },
      meanProgress: {
        completedModules: [],
        totalModules: 4,
        overallProgress: 0,
      },
      mockInterviewHistory: [
        {
          topic: 'Arrays & Strings',
          difficulty: 'beginner',
          score: 78,
          duration: 45,
          date: new Date(),
        },
      ],
      codingProblems: {
        attempted: 15,
        solved: 12,
      },
      learningStreak: {
        current: 5,
        longest: 12,
        lastActivityDate: new Date(),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update learning path
router.post('/update-path', authMiddleware, async (req, res) => {
  try {
    const { learningPath } = req.body;
    res.json({
      message: 'Learning path updated',
      user: { id: req.userId, learningPath },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
