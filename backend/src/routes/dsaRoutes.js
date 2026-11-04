const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get DSA topics
router.get('/topics', authMiddleware, (req, res) => {
  const topics = [
    { id: 'basics', name: 'Basics & Complexity', module: 1 },
    { id: 'arrays', name: 'Arrays & Strings', module: 2 },
    { id: 'linked-lists', name: 'Linked Lists', module: 3 },
    { id: 'stacks-queues', name: 'Stacks & Queues', module: 4 },
    { id: 'hashing', name: 'Hashing', module: 5 },
    { id: 'trees', name: 'Trees', module: 6 },
    { id: 'graphs', name: 'Graphs', module: 7 },
    { id: 'sorting', name: 'Searching & Sorting', module: 8 },
    { id: 'greedy', name: 'Greedy Algorithms', module: 9 },
    { id: 'dp', name: 'Dynamic Programming', module: 10 },
    { id: 'backtracking', name: 'Backtracking', module: 11 },
  ];
  res.json(topics);
});

// Get topic details
router.get('/topic/:id', authMiddleware, (req, res) => {
  const topic = {
    id: req.params.id,
    name: 'Topic Name',
    description: 'Topic description',
    content: 'Topic content will be loaded here',
  };
  res.json(topic);
});

module.exports = router;
