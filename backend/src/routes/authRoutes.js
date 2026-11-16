const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Initialize storage on first request (middleware)
router.use((req, res, next) => {
  if (!req.app.locals.users) {
    req.app.locals.users = new Map();
    req.app.locals.learningProgress = new Map();

    // Demo user
    const demoUser = {
      id: 'demo-user-1',
      name: 'Demo Student',
      email: 'demo@example.com',
      password: bcrypt.hashSync('demo123', 10),
      role: 'student',
      learningPath: 'dsa',
    };
    req.app.locals.users.set('demo@example.com', demoUser);

    req.app.locals.learningProgress.set('demo-user-1', {
      userId: 'demo-user-1',
      dsaProgress: {
        completedTopics: [],
        totalTopics: 18,
        overallProgress: 0,
        quizAverageScore: 0,
      },
    fullStackProgress: {
      completedTopics: [],
      totalTopics: 15,
      overallProgress: 0,
    },
    mockInterviewHistory: [],
    codingProblems: {
      attempted: 0,
      solved: 0,
    },
    });
  }
  next();
});

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, learningPath } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const users = req.app.locals.users;
    const learningProgress = req.app.locals.learningProgress;

    if (users.has(email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const userId = 'user-' + Date.now();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      role: 'student',
      learningPath: learningPath || 'dsa',
    };

    users.set(email, user);

    // Create learning progress
    learningProgress.set(userId, {
      userId,
      dsaProgress: { totalTopics: 18, overallProgress: 0, completedTopics: [] },
      fullStackProgress: { totalTopics: 15, overallProgress: 0, completedTopics: [] },
      mockInterviewHistory: [],
      codingProblems: { attempted: 0, solved: 0 },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret-key', { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const users = req.app.locals.users;
    const user = users.get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret-key', { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
