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
    // Return progress data
    res.json({
      userId: req.userId,
      dsaProgress: {
        completedTopics: [],
        totalTopics: 18,
        overallProgress: 0,
        quizAverageScore: 0,
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

// Mark DSA topic as completed
router.post('/complete-topic', authMiddleware, async (req, res) => {
  try {
    const { topicId, moduleNumber } = req.body;

    if (!topicId) {
      return res.status(400).json({ error: 'Topic ID is required' });
    }

    // Calculate progress: 18 total DSA topics across 10 modules
    // Module 1-8: 8 topics, Module 9: 3 topics, Module 10: 3 topics
    // Progress = (completedTopics / 18) * 100
    const totalTopics = 18;
    const topicsPerIncrement = 100 / totalTopics; // ~5.56% per topic

    res.json({
      message: 'Topic marked as completed',
      topicId,
      moduleNumber,
      progressIncrement: topicsPerIncrement,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
