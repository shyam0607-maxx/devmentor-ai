const express = require('express');
const authMiddleware = require('../middleware/auth');
const fsdCurriculum = require('../data/fsdCurriculum');

const router = express.Router();

// Get all FSD technologies
router.get('/technologies', authMiddleware, (req, res) => {
  const technologies = Object.entries(fsdCurriculum).map(([id, tech]) => ({
    id,
    name: tech.name,
    description: tech.description,
    color: tech.color,
    topicCount: tech.topics.length
  }));
  res.json(technologies);
});

// Get specific technology
router.get('/technology/:techId', authMiddleware, (req, res) => {
  const techId = req.params.techId;
  const tech = fsdCurriculum[techId];

  if (!tech) {
    return res.status(404).json({ error: 'Technology not found' });
  }

  res.json({
    id: techId,
    name: tech.name,
    description: tech.description,
    color: tech.color,
    topics: tech.topics
  });
});

// Get specific topic details
router.get('/technology/:techId/topic/:topicId', authMiddleware, (req, res) => {
  const { techId, topicId } = req.params;
  const tech = fsdCurriculum[techId];

  if (!tech) {
    return res.status(404).json({ error: 'Technology not found' });
  }

  const topic = tech.topics.find(t => t.id === topicId);

  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  res.json(topic);
});

// Get code example for a topic
router.get('/technology/:techId/topic/:topicId/code/:language', authMiddleware, (req, res) => {
  const { techId, topicId } = req.params;
  const language = req.params.language.toLowerCase();

  const tech = fsdCurriculum[techId];
  if (!tech) {
    return res.status(404).json({ error: 'Technology not found' });
  }

  const topic = tech.topics.find(t => t.id === topicId);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  const code = topic.codeExamples[language];
  if (!code) {
    return res.status(400).json({ error: 'Language not supported' });
  }

  res.json({
    language,
    code
  });
});

// Get FSD paths (legacy)
router.get('/paths', authMiddleware, (req, res) => {
  const paths = [
    { id: 'mern', name: 'MERN Stack', modules: ['MongoDB', 'Express', 'React', 'Node.js'] },
    { id: 'mean', name: 'MEAN Stack', modules: ['MongoDB', 'Express', 'Angular', 'Node.js'] },
  ];
  res.json(paths);
});

// Get path modules (legacy)
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
