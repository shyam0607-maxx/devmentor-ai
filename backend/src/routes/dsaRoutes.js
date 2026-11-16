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

// Get interview questions for a topic
router.get('/interview-questions/:topicId', authMiddleware, (req, res) => {
  const topicId = req.params.topicId;

  // Find topic in curriculum
  let topic = null;
  let moduleId = null;

  Object.entries(dsaCurriculum).forEach(([mId, moduleData]) => {
    const foundTopic = moduleData.topics.find(t => t.id === topicId);
    if (foundTopic) {
      topic = foundTopic;
      moduleId = mId;
    }
  });

  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }

  // Generate interview questions from topic
  const questions = [
    {
      id: '1',
      question: `What is ${topic.name} and can you briefly explain its importance?`,
      correctAnswer: `${topic.name} is a fundamental concept in DSA. ${topic.description || 'It is important for understanding data structures and algorithms.'}`
    },
    {
      id: '2',
      question: `What is the time complexity of ${topic.name}? Explain why.`,
      correctAnswer: `The time complexity of ${topic.name} is typically ${topic.timeComplexity}. This is because of the nature of the operations involved in ${topic.name}.`
    },
    {
      id: '3',
      question: `What is the space complexity of ${topic.name}?`,
      correctAnswer: `The space complexity of ${topic.name} is ${topic.spaceComplexity}. This accounts for the memory required to store data structures used in ${topic.name}.`
    },
    {
      id: '4',
      question: `Can you provide a practical use case or real-world example of ${topic.name}?`,
      correctAnswer: `${topic.name} is used in many real-world applications. For example, it can be used in database indexing, caching, and search operations to improve performance.`
    },
    {
      id: '5',
      question: `What is the difficulty level of ${topic.name} and what prerequisites should someone have?`,
      correctAnswer: `${topic.name} is at a ${topic.difficulty} difficulty level. Prerequisites include understanding of basic data structures and algorithmic thinking.`
    }
  ];

  res.json(questions);
});

module.exports = router;
