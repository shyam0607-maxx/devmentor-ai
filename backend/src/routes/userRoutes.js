const express = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const LearningProgress = require('../models/LearningProgress');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get learning progress
router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const progress = await LearningProgress.findOne({ userId: req.userId });
    if (!progress) {
      return res.status(404).json({ error: 'No progress data found' });
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update learning path
router.post('/update-path', authMiddleware, async (req, res) => {
  try {
    const { learningPath } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, { learningPath }, { new: true });
    res.json({ message: 'Learning path updated', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
