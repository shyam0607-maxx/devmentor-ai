const express = require('express');
const authMiddleware = require('../middleware/auth');
const dsaCurriculum = require('../data/dsaCurriculum');

const router = express.Router();

// Get all DSA topics (returns actual topics from curriculum)
router.get('/topics', authMiddleware, (req, res) => {
  const allTopics = [];

  // Extract all topics from curriculum with module info
  Object.entries(dsaCurriculum).forEach(([moduleId, moduleData]) => {
    moduleData.topics.forEach(topic => {
      allTopics.push({
        id: topic.id,
        name: topic.name,
        module: parseInt(moduleId),
        progress: 0,
        description: topic.description
      });
    });
  });

  res.json(allTopics);
});

// Get module content
router.get('/module/:moduleId', authMiddleware, (req, res) => {
  const moduleId = req.params.moduleId;
  const module = dsaCurriculum[moduleId];

  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  res.json(module);
});

// Get specific topic details
router.get('/topic/:moduleId/:topicId', authMiddleware, (req, res) => {
  const moduleId = req.params.moduleId;
  const topicId = req.params.topicId;

  const module = dsaCurriculum[moduleId];
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  const topic = module.topics.find(t => t.id === topicId);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  res.json(topic);
});

// Get code example for a topic
router.get('/code/:moduleId/:topicId/:language', authMiddleware, (req, res) => {
  const moduleId = req.params.moduleId;
  const topicId = req.params.topicId;
  const language = req.params.language.toLowerCase();

  const module = dsaCurriculum[moduleId];
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  const topic = module.topics.find(t => t.id === topicId);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  const code = topic.codeExamples[language];
  if (!code) {
    return res.status(404).json({ error: `Code not available in ${language}` });
  }

  res.json({
    topic: topic.name,
    language,
    code,
  });
});

// Get complexity analysis
router.get('/complexity/:moduleId/:topicId', authMiddleware, (req, res) => {
  const moduleId = req.params.moduleId;
  const topicId = req.params.topicId;

  const module = dsaCurriculum[moduleId];
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  const topic = module.topics.find(t => t.id === topicId);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  res.json({
    topic: topic.name,
    timeComplexity: topic.timeComplexity,
    spaceComplexity: topic.spaceComplexity,
    difficulty: topic.difficulty,
  });
});

module.exports = router;
