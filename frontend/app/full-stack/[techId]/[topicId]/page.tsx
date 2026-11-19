'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Copy, Check } from 'lucide-react';

const TOPICS_DATA: Record<string, Record<string, any>> = {
  '1': { // MongoDB
    '1': {
      name: 'MongoDB Basics',
      desc: 'Introduction to NoSQL databases and MongoDB concepts',
      notes: `# MongoDB Basics\n\n## What is MongoDB?\nMongoDB is a NoSQL database that stores data in flexible, JSON-like documents.\n\n## Key Features\n- Document-oriented storage (BSON format)\n- Flexible schema design\n- Horizontal scalability through sharding\n- Built-in replication for high availability`,
      code: {
        javascript: `const mongoose = require('mongoose');\nconst mongoURI = 'mongodb://localhost:27017/myapp';\nmongoose.connect(mongoURI);\nconst userSchema = new mongoose.Schema({\n  name: String,\n  email: String,\n  age: Number\n});\nconst User = mongoose.model('User', userSchema);`,
        python: `from pymongo import MongoClient\nclient = MongoClient('mongodb://localhost:27017/')\ndb = client['myapp']\nusers = db['users']\nuser_doc = {'name': 'John', 'email': 'john@example.com'}\nresult = users.insert_one(user_doc)`,
        node: `const { MongoClient } = require('mongodb');\nconst uri = 'mongodb://localhost:27017';\nconst client = new MongoClient(uri);\nasync function connect() {\n  await client.connect();\n  const db = client.db('myapp');\n  console.log('Connected to MongoDB');\n}`
      }
    },
    '2': {
      name: 'CRUD Operations',
      desc: 'Create, Read, Update, Delete operations in MongoDB',
      notes: `# CRUD Operations\n\n## CREATE - Insert documents\n## READ - Query documents\n## UPDATE - Modify documents\n## DELETE - Remove documents\n\nCommon operators: $eq, $gt, $lt, $in, $and, $or`,
      code: {
        javascript: `// CREATE\nconst user = new User({name: 'Alice', email: 'alice@example.com'});\nawait user.save();\n\n// READ\nconst users = await User.find({age: {$gt: 25}});\n\n// UPDATE\nawait User.updateOne({name: 'Alice'}, {$set: {age: 31}});\n\n// DELETE\nawait User.deleteOne({name: 'Alice'});`,
        python: `# CREATE\nusers.insert_one({'name': 'Bob', 'email': 'bob@example.com'})\n\n# READ\nusers_found = users.find({'age': {'$gt': 25}})\n\n# UPDATE\nusers.update_one({'name': 'Bob'}, {'$set': {'age': 29}})\n\n# DELETE\nusers.delete_one({'name': 'Bob'})`,
        node: `const created = await users.insertOne({name: 'Charlie'});\nconst found = await users.findOne({name: 'Charlie'});\nawait users.updateOne({name: 'Charlie'}, {$set: {age: 33}});\nawait users.deleteOne({name: 'Charlie'});`
      }
    }
  },
  '2': { // Express
    '1': {
      name: 'Express Basics',
      desc: 'Server setup, routing, middleware, and request handling',
      notes: `# Express.js Basics\n\n## What is Express?\nExpress is a minimal Node.js web framework.\n\n## Key Concepts\n- Routing: Define application responses\n- Middleware: Functions that handle requests\n- Request/Response: HTTP handling`,
      code: {
        javascript: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/', (req, res) => {\n  res.json({message: 'Hello World'});\n});\n\napp.post('/users', (req, res) => {\n  res.status(201).json({id: 1, ...req.body});\n});\n\napp.listen(3000, () => console.log('Server running'));`,
        python: `from flask import Flask, request, jsonify\napp = Flask(__name__)\n\n@app.route('/', methods=['GET'])\ndef hello():\n    return jsonify({'message': 'Hello'})\n\n@app.route('/users', methods=['POST'])\ndef create_user():\n    return jsonify(request.get_json()), 201`,
        node: `import express from 'express';\nconst app = express();\napp.use(express.json());\napp.get('/', (req, res) => {\n  res.json({message: 'Hello'});\n});\napp.listen(3000);`
      }
    }
  },
  '3': { // Node.js
    '1': {
      name: 'Node.js Basics',
      desc: 'JavaScript runtime, modules, and async programming',
      notes: `# Node.js Basics\n\n## What is Node.js?\nNode.js is a JavaScript runtime.\n\n## Key Features\n- Event-driven architecture\n- Non-blocking I/O\n- NPM package manager\n- Module system`,
      code: {
        javascript: `const fs = require('fs');\n\n// Sync read\nconst content = fs.readFileSync('file.txt', 'utf-8');\n\n// Async with callback\nfs.readFile('file.txt', 'utf-8', (err, data) => {\n  console.log(data);\n});\n\n// Async/await\nasync function read() {\n  const data = fs.promises.readFile('file.txt');\n  console.log(data);\n}`,
        python: `with open('file.txt', 'r') as f:\n    content = f.read()\n    print(content)\n\nimport asyncio\n\nasync def read_file():\n    with open('file.txt') as f:\n        return f.read()`,
        node: `import fs from 'fs/promises';\n\nasync function main() {\n  const data = await fs.readFile('file.txt');\n  console.log(data);\n}\n\nmain();`
      }
    }
  },
  '4': { // React
    '1': {
      name: 'React Basics',
      desc: 'Components, JSX, hooks, and state management',
      notes: `# React Basics\n\n## What is React?\nReact is a library for UI.\n\n## Key Concepts\n- Components: Reusable UI blocks\n- JSX: JavaScript XML\n- Props: Data passing\n- State: Dynamic data\n- Hooks: useState, useEffect`,
      code: {
        javascript: `import React, {useState} from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n\nexport default Counter;`,
        python: `import streamlit as st\n\nif 'count' not in st.session_state:\n    st.session_state.count = 0\n\nif st.button('Increment'):\n    st.session_state.count += 1\n\nst.write(f\"Count: {st.session_state.count}\")`,
        node: `import React, {useState, FC} from 'react';\n\nconst Counter: FC = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n};\n\nexport default Counter;`
      }
    }
  },
  '5': { // Angular
    '1': {
      name: 'Angular Basics',
      desc: 'Components, services, dependency injection, and RxJS',
      notes: `# Angular Basics\n\n## What is Angular?\nAngular is a complete framework.\n\n## Key Concepts\n- Components: Building blocks\n- Services: Business logic\n- Dependency Injection\n- RxJS: Reactive programming`,
      code: {
        javascript: `import {Component} from '@angular/core';\n\n@Component({\n  selector: 'app-counter',\n  template: '<p>Count: {{ count }}</p>'\n})\nexport class CounterComponent {\n  count = 0;\n  \n  increment() {\n    this.count++;\n  }\n}`,
        python: `from fastapi import FastAPI\n\napp = FastAPI()\n\nclass CounterService:\n    count = 0\n    \n    def increment(self):\n        self.count += 1\n        return self.count`,
        node: `import {Component, OnInit} from '@angular/core';\n\n@Component({\n  selector: 'app-counter',\n  template: 'Count: {{ count }}'\n})\nexport class CounterComponent implements OnInit {\n  count = 0;\n  \n  ngOnInit() {\n    this.count = 0;\n  }\n}`
      }
    }
  }
};

function TopicContent() {
  const params = useParams();
  const techId = (params?.techId as string) || '';
  const topicId = (params?.topicId as string) || '';

  const topic = TOPICS_DATA[techId]?.[topicId];
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [copied, setCopied] = useState(false);

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Topic Not Found</h1>
          <Link href="/full-stack" className="text-cyan-400 hover:text-cyan-300">Back to Full Stack</Link>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    const code = topic.code[selectedLanguage as keyof typeof topic.code];
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href={`/full-stack/${techId}`} className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">← Back</Link>

        <h1 className="text-5xl font-bold text-white mb-2">{topic.name}</h1>
        <p className="text-xl text-slate-400 mb-12">{topic.desc}</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">📚 Notes</h2>
          <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">{topic.notes}</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">💻 Code Examples</h2>

          <div className="flex gap-4 mb-6 border-b border-slate-700 overflow-x-auto pb-4">
            {Object.keys(topic.code).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 font-semibold transition whitespace-nowrap ${
                  selectedLanguage === lang
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>

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
              <code>{topic.code[selectedLanguage as keyof typeof topic.code]}</code>
            </pre>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <Link href={`/full-stack/${techId}`} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold">
            ← Back to Topics
          </Link>
          <button
            onClick={() => alert('Topic marked as complete! 🎉')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold"
          >
            Mark as Complete ✓
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopicPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading topic...</div>
      </div>
    }>
      <TopicContent />
    </Suspense>
  );
}
