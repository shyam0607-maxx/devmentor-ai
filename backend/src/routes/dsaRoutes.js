const express = require('express');
const authMiddleware = require('../middleware/auth');
const dsaCurriculum = require('../data/dsaCurriculum');

const router = express.Router();

// Get all DSA topics
router.get('/topics', authMiddleware, (req, res) => {
  const topics = [
    { id: 'basics', name: 'Basics & Complexity', module: 1, progress: 9 },
    { id: 'arrays', name: 'Arrays & Strings', module: 2, progress: 0 },
    { id: 'linked-lists', name: 'Linked Lists', module: 3, progress: 0 },
    { id: 'stacks-queues', name: 'Stacks & Queues', module: 4, progress: 0 },
    { id: 'hashing', name: 'Hashing', module: 5, progress: 0 },
    { id: 'trees', name: 'Trees', module: 6, progress: 0 },
    { id: 'graphs', name: 'Graphs', module: 7, progress: 0 },
    { id: 'sorting', name: 'Searching & Sorting', module: 8, progress: 0 },
    { id: 'greedy', name: 'Greedy Algorithms', module: 9, progress: 0 },
    { id: 'dp', name: 'Dynamic Programming', module: 10, progress: 0 },
    { id: 'backtracking', name: 'Backtracking', module: 11, progress: 0 },
  ];
  res.json(topics);
});

// Get module content
router.get('/module/:moduleId', authMiddleware, (req, res) => {
  const moduleId = parseInt(req.params.moduleId);
  const module = dsaCurriculum[moduleId];

  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }

  res.json(module);
});

// Get specific topic details
router.get('/topic/:moduleId/:topicId', authMiddleware, (req, res) => {
  const moduleId = parseInt(req.params.moduleId);
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
  const moduleId = parseInt(req.params.moduleId);
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
  const moduleId = parseInt(req.params.moduleId);
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
