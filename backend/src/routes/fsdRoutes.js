const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get FSD paths
router.get('/paths', authMiddleware, (req, res) => {
  const paths = [
    { id: 'mern', name: 'MERN Stack', modules: ['MongoDB', 'Express', 'React', 'Node.js'] },
    { id: 'mean', name: 'MEAN Stack', modules: ['MongoDB', 'Express', 'Angular', 'Node.js'] },
  ];
  res.json(paths);
});

// Get path modules
router.get('/:path/modules', authMiddleware, (req, res) => {
  const modules = [
    { id: 'mongo', name: 'MongoDB', topics: [] },
    { id: 'express', name: 'Express.js', topics: [] },
    { id: 'frontend', name: req.params.path === 'mern' ? 'React' : 'Angular', topics: [] },
    { id: 'nodejs', name: 'Node.js', topics: [] },
  ];
  res.json(modules);
});

module.exports = router;
