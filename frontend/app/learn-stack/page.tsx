'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CURRICULUM = [
  {
    tech: 'MongoDB',
    topics: [
      {
        name: 'MongoDB Basics',
        code: `const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/myapp';
mongoose.connect(mongoURI);
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
const User = mongoose.model('User', userSchema);`
      }
    ]
  },
  {
    tech: 'Express.js',
    topics: [
      {
        name: 'Express Basics',
        code: `const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.json({message: 'Hello World'});
});
app.post('/users', (req, res) => {
  res.status(201).json({...req.body});
});
app.listen(3000);`
      }
    ]
  },
  {
    tech: 'Node.js',
    topics: [
      {
        name: 'Node.js Basics',
        code: `const fs = require('fs');
// Sync read
const content = fs.readFileSync('file.txt', 'utf-8');
// Async with callback
fs.readFile('file.txt', 'utf-8', (err, data) => {
  console.log(data);
});
// Async/await
async function read() {
  const data = await fs.promises.readFile('file.txt');
  console.log(data);
}`
      }
    ]
  },
  {
    tech: 'React',
    topics: [
      {
        name: 'React Basics',
        code: `import React, {useState} from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
export default Counter;`
      }
    ]
  },
  {
    tech: 'Angular',
    topics: [
      {
        name: 'Angular Basics',
        code: `import {Component} from '@angular/core';
@Component({
  selector: 'app-counter',
  template: '<p>Count: {{ count }}</p>'
})
export class CounterComponent {
  count = 0;
  increment() {
    this.count++;
  }
}`
      }
    ]
  }
];

export default function LearnStackPage() {
  const [selectedTech, setSelectedTech] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [copied, setCopied] = useState(false);

  const tech = CURRICULUM[selectedTech];
  const topic = tech.topics[selectedTopic];

  const handleCopy = () => {
    navigator.clipboard.writeText(topic.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-2">Full Stack Development</h1>
        <p className="text-xl text-slate-400 mb-8">Learn 5 technologies with integrated code examples</p>

        {/* Technology Selector */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Select Technology</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {CURRICULUM.map((item, idx) => (
              <button
                key={idx}
                onClick={() => { setSelectedTech(idx); setSelectedTopic(0); }}
                className={`p-4 rounded-lg font-semibold transition ${
                  selectedTech === idx
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {item.tech}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Display */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">{tech.tech}</h2>
          <p className="text-slate-400 mb-6">{topic.name}</p>

          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center gap-2 text-slate-300 z-10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy
                </>
              )}
            </button>

            <pre className="bg-slate-900 p-6 rounded overflow-x-auto text-slate-300 font-mono text-sm">
              <code>{topic.code}</code>
            </pre>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4 text-slate-300">
            <div>
              <h3 className="font-bold text-cyan-400 mb-2">Frontend</h3>
              <ul className="space-y-1 text-sm">
                <li>✓ React - Component-based UI</li>
                <li>✓ Angular - Full framework</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-cyan-400 mb-2">Backend</h3>
              <ul className="space-y-1 text-sm">
                <li>✓ Node.js - JavaScript runtime</li>
                <li>✓ Express - Web framework</li>
                <li>✓ MongoDB - Database</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
