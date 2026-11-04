const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// AI Tutor endpoint
router.post('/tutor', authMiddleware, async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!process.env.CLAUDE_API_KEY) {
      return res.status(500).json({ error: 'Claude API key not configured' });
    }

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-opus-4-1',
        max_tokens: 1024,
        system: `You are an expert DSA and Full-Stack Development tutor. Help students learn effectively.
Context: ${context || 'General tutoring'}`,
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );

    res.json({
      response: response.data.content[0].text,
    });
  } catch (err) {
    console.error('AI error:', err.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

// Mock interview endpoint
router.post('/interview', authMiddleware, async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    if (!process.env.CLAUDE_API_KEY) {
      return res.status(500).json({ error: 'Claude API key not configured' });
    }

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-opus-4-1',
        max_tokens: 512,
        system: `You are conducting a technical interview on ${topic} at ${difficulty} level. Ask one question at a time.`,
        messages: [
          {
            role: 'user',
            content: 'Start the interview',
          },
        ],
      },
      {
        headers: {
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );

    res.json({
      question: response.data.content[0].text,
    });
  } catch (err) {
    console.error('Interview error:', err.message);
    res.status(500).json({ error: 'Failed to generate interview question' });
  }
});

module.exports = router;
