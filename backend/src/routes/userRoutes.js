const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

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
    // Get user's stored progress from app.locals
    const learningProgress = req.app.locals.learningProgress;
    let userProgress = learningProgress.get(req.userId);

    if (!userProgress) {
      userProgress = {
        userId: req.userId,
        dsaProgress: {
          completedTopics: [],
          totalTopics: 18,
          overallProgress: 0,
          quizAverageScore: 0,
        },
      };
      learningProgress.set(req.userId, userProgress);
    }

    // Return progress data
    res.json({
      userId: req.userId,
      dsaProgress: userProgress.dsaProgress,
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

    // Get user's learning progress from app.locals
    const learningProgress = req.app.locals.learningProgress;

    // Get user progress
    let userProgress = learningProgress.get(req.userId);
    if (!userProgress) {
      userProgress = {
        userId: req.userId,
        dsaProgress: {
          completedTopics: [],
          totalTopics: 18,
          overallProgress: 0,
          quizAverageScore: 0,
        },
      };
    }

    // Add topic to completed if not already there
    if (!userProgress.dsaProgress.completedTopics.includes(topicId)) {
      userProgress.dsaProgress.completedTopics.push(topicId);
    }

    // Calculate overall progress: (completedTopics / totalTopics) * 100
    const totalTopics = 18;
    const completedCount = userProgress.dsaProgress.completedTopics.length;
    userProgress.dsaProgress.overallProgress = (completedCount / totalTopics) * 100;

    // Store updated progress
    learningProgress.set(req.userId, userProgress);

    res.json({
      message: 'Topic marked as completed',
      topicId,
      moduleNumber,
      completedTopics: userProgress.dsaProgress.completedTopics,
      overallProgress: userProgress.dsaProgress.overallProgress,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
