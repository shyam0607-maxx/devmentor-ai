'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const TOPICS_DATA: Record<string, Record<string, any>> = {
  '1': { // MongoDB
    '1': {
      name: 'MongoDB Basics',
      desc: 'Introduction to NoSQL databases and MongoDB concepts',
      notes: `# MongoDB Basics

## What is MongoDB?
MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional SQL databases with fixed schemas, MongoDB allows you to store varying types of data.

## Key Features
- Document-oriented storage (BSON format)
- Flexible schema design
- Horizontal scalability through sharding
- Built-in replication for high availability
- Rich query language

## Collections and Documents
- Database contains Collections
- Collections contain Documents
- Documents contain Fields

## Installation
Install MongoDB Community Edition and MongoDB Shell for local development.`,
      code: {
        javascript: `// Connect to MongoDB using Mongoose
const mongoose = require('mongoose');

// Connection string
const mongoURI = 'mongodb://localhost:27017/myapp';

// Connect
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// Create a model
const User = mongoose.model('User', userSchema);

console.log('MongoDB connected successfully');`,
        python: `# Connect to MongoDB using PyMongo
from pymongo import MongoClient
from datetime import datetime

# Connection string
client = MongoClient('mongodb://localhost:27017/')

# Access database
db = client['myapp']

# Access collection
users = db['users']

# Example document
user_doc = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'age': 25,
    'createdAt': datetime.now()
}

# Insert document
result = users.insert_one(user_doc)
print(f"Inserted ID: {result.inserted_id}")`,
        node: `// Using mongodb npm package directly
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();

    const database = client.db('myapp');
    const users = database.collection('users');

    const doc = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 28
    };

    const result = await users.insertOne(doc);
    console.log('Document inserted:', result.insertedId);

  } finally {
    await client.close();
  }
}

connect();`
      }
    },
    '2': {
      name: 'CRUD Operations',
      desc: 'Create, Read, Update, Delete operations in MongoDB',
      notes: `# CRUD Operations

## CREATE (Insert)
Insert new documents into collections using insertOne() or insertMany().

## READ (Query)
Retrieve documents using find(), findOne(), or query operators.

## UPDATE (Modify)
Update documents using updateOne(), updateMany(), or replaceOne().

## DELETE (Remove)
Delete documents using deleteOne() or deleteMany().

## Common Query Operators
- $eq: Equal to
- $gt: Greater than
- $lt: Less than
- $in: In array
- $and: Logical AND
- $or: Logical OR`,
      code: {
        javascript: `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// CREATE - Insert a new user
async function createUser() {
  const user = new User({
    name: 'Alice',
    email: 'alice@example.com',
    age: 30
  });
  await user.save();
  console.log('User created:', user);
}

// READ - Find users
async function readUsers() {
  const users = await User.find({ age: { $gt: 25 } });
  console.log('Users found:', users);
}

// UPDATE - Update a user
async function updateUser() {
  const result = await User.updateOne(
    { name: 'Alice' },
    { $set: { age: 31 } }
  );
  console.log('Updated:', result);
}

// DELETE - Delete a user
async function deleteUser() {
  const result = await User.deleteOne({ name: 'Alice' });
  console.log('Deleted:', result);
}`,
        python: `from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['myapp']
users = db['users']

# CREATE - Insert
def create_user():
    result = users.insert_one({
        'name': 'Bob',
        'email': 'bob@example.com',
        'age': 28
    })
    print('User ID:', result.inserted_id)

# READ - Find
def read_users():
    users_found = users.find({'age': {'$gt': 25}})
    for user in users_found:
        print(user)

# UPDATE - Update
def update_user():
    result = users.update_one(
        {'name': 'Bob'},
        {'$set': {'age': 29}}
    )
    print('Modified:', result.modified_count)

# DELETE - Delete
def delete_user():
    result = users.delete_one({'name': 'Bob'})
    print('Deleted:', result.deleted_count)`,
        node: `const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function crudOperations() {
  try {
    await client.connect();

    const db = client.db('myapp');
    const users = db.collection('users');

    // CREATE
    const created = await users.insertOne({
      name: 'Charlie',
      email: 'charlie@example.com',
      age: 32
    });
    console.log('Created:', created.insertedId);

    // READ
    const found = await users.findOne({ name: 'Charlie' });
    console.log('Found:', found);

    // UPDATE
    const updated = await users.updateOne(
      { name: 'Charlie' },
      { $set: { age: 33 } }
    );
    console.log('Updated:', updated.modifiedCount);

    // DELETE
    const deleted = await users.deleteOne({ name: 'Charlie' });
    console.log('Deleted:', deleted.deletedCount);

  } finally {
    await client.close();
  }
}

crudOperations();`
      }
    }
  },
  '2': { // Express
    '1': {
      name: 'Express Basics',
      desc: 'Server setup, routing, middleware, and request handling',
      notes: `# Express.js Basics

## What is Express?
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web APIs and applications.

## Key Concepts
- Routing: Define how your application responds to client requests
- Middleware: Functions that have access to request and response objects
- Request/Response: Handle HTTP requests and send responses

## Installation
npm install express

## Basic Setup
Create a server, define routes, and listen on a port.`,
      code: {
        javascript: `const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id, name: 'John Doe' });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    id: 1,
    name,
    email,
    created: true
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  res.json({ id, name, updated: true });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, deleted: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
        python: `# Express equivalent in Python using Flask
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello World'})

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return jsonify({'userId': user_id, 'name': 'John Doe'})

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    return jsonify({
        'id': 1,
        'name': data.get('name'),
        'email': data.get('email'),
        'created': True
    }), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    return jsonify({
        'id': user_id,
        'name': data.get('name'),
        'updated': True
    })

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return jsonify({'id': user_id, 'deleted': True})

if __name__ == '__main__':
    app.run(port=3000, debug=True)`,
        node: `// Using Express with TypeScript
import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

app.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ userId: id, name: 'John Doe' });
});

app.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(201).json({
    id: 1,
    name,
    email,
    created: true
  });
});

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
      }
    }
  },
  '3': { // Node.js
    '1': {
      name: 'Node.js Basics',
      desc: 'JavaScript runtime, modules, and async programming',
      notes: `# Node.js Basics

## What is Node.js?
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server side.

## Key Features
- Event-driven architecture
- Non-blocking I/O operations
- NPM package manager
- Module system (CommonJS and ES6)

## CommonJS Modules
- require() to import modules
- module.exports to export functionality

## Async Programming
- Callbacks
- Promises
- Async/await`,
      code: {
        javascript: `// File operations with Node.js
const fs = require('fs');
const path = require('path');

// Read file synchronously
const content = fs.readFileSync('file.txt', 'utf-8');
console.log('Content:', content);

// Read file asynchronously with callback
fs.readFile('file.txt', 'utf-8', (err, data) => {
  if (err) console.error(err);
  else console.log('Async read:', data);
});

// Using Promises
const readFilePromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// Using async/await
async function readAndProcess() {
  try {
    const data = await readFilePromise('file.txt');
    console.log('Data:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

readAndProcess();`,
        python: `# Node.js equivalent file operations in Python
import os
import asyncio

# Read file synchronously
with open('file.txt', 'r') as f:
    content = f.read()
    print('Content:', content)

# Read file asynchronously
async def read_file_async(filepath):
    # Python requires aiofiles for true async file I/O
    with open(filepath, 'r') as f:
        return f.read()

# Using async/await
async def main():
    try:
        data = await read_file_async('file.txt')
        print('Data:', data)
    except Exception as e:
        print('Error:', e)

asyncio.run(main())`,
        node: `// Module system and async patterns in Node.js

// Exporting a module
// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Importing and using
const math = require('./math');

console.log('5 + 3 =', math.add(5, 3));

// Promise-based operations
function fetchData(url) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      resolve({ data: 'Result from ' + url });
    }, 1000);
  });
}

// Using async/await
async function main() {
  try {
    const result = await fetchData('https://api.example.com');
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`
      }
    }
  },
  '4': { // React
    '1': {
      name: 'React Basics',
      desc: 'Components, JSX, hooks, and state management',
      notes: `# React Basics

## What is React?
React is a JavaScript library for building user interfaces with reusable components.

## Key Concepts
- Components: Reusable UI building blocks
- JSX: JavaScript XML syntax
- Props: Pass data to components
- State: Dynamic data that affects rendering
- Hooks: Functions to use React features in functional components

## Common Hooks
- useState: Manage component state
- useEffect: Side effects and lifecycle
- useContext: Share data across components
- useReducer: Complex state management`,
      code: {
        javascript: `import React, { useState, useEffect } from 'react';

// Functional component
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');

  useEffect(() => {
    console.log('Counter updated to:', count);
  }, [count]);

  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </div>
  );
}

// Using the component
export default Counter;`,
        python: `# React pattern equivalent in Python using Streamlit
import streamlit as st

def counter_app():
    # Initialize session state
    if 'count' not in st.session_state:
        st.session_state.count = 0

    if 'name' not in st.session_state:
        st.session_state.name = 'React'

    # UI elements
    st.title(f'Hello {st.session_state.name}!')

    col1, col2 = st.columns(2)

    with col1:
        if st.button('Increment'):
            st.session_state.count += 1

    with col2:
        st.session_state.name = st.text_input(
            'Enter name',
            st.session_state.name
        )

    st.write(f'Count: {st.session_state.count}')

if __name__ == '__main__':
    counter_app()`,
        node: `// React component with TypeScript
import React, { useState, useEffect, FC } from 'react';

interface CounterProps {
  initialCount?: number;
}

const Counter: FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);
  const [name, setName] = useState<string>('React');

  useEffect(() => {
    console.log('Counter updated to:', count);
  }, [count]);

  const increment = (): void => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </div>
  );
};

export default Counter;`
      }
    }
  },
  '5': { // Angular
    '1': {
      name: 'Angular Basics',
      desc: 'Components, services, dependency injection, and RxJS',
      notes: `# Angular Basics

## What is Angular?
Angular is a complete framework for building dynamic web applications with TypeScript.

## Key Concepts
- Components: Building blocks of Angular applications
- Services: Reusable business logic
- Dependency Injection: Automatic dependency management
- RxJS: Reactive programming library
- Modules: Organize components and services

## Component Structure
- TypeScript class decorated with @Component
- Template (HTML)
- Styles (CSS)
- Logic (TypeScript methods)`,
      code: {
        javascript: `import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  template: \`
    <div>
      <h1>Hello {{ name }}!</h1>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
      <input
        [(ngModel)]="name"
        placeholder="Enter name"
      />
    </div>
  \`,
  styles: [\`
    p { font-size: 18px; }
    button { padding: 10px; }
  \`]
})
export class CounterComponent implements OnInit {
  count: number = 0;
  name: string = 'Angular';

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.count = this.counterService.getCount();
  }

  increment() {
    this.count = this.counterService.increment();
  }
}`,
        python: `# Angular pattern equivalent in Python using FastAPI
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class CounterState(BaseModel):
    count: int = 0
    name: str = 'Angular'

counter_state = CounterState()

@app.get('/counter')
def get_counter():
    return counter_state.dict()

@app.post('/counter/increment')
def increment_counter():
    counter_state.count += 1
    return counter_state.dict()

@app.put('/counter/name/{new_name}')
def update_name(new_name: str):
    counter_state.name = new_name
    return counter_state.dict()`,
        node: `import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

interface Counter {
  count: number;
  name: string;
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  counter$: Observable<Counter>;
  count: number = 0;
  name: string = 'Angular';

  constructor(private counterService: CounterService) {}

  ngOnInit(): void {
    this.counter$ = this.counterService.getCounter();
    this.counter$.subscribe(data => {
      this.count = data.count;
      this.name = data.name;
    });
  }

  increment(): void {
    this.counterService.increment().subscribe(data => {
      this.count = data.count;
    });
  }
}`
      }
    }
  }
};

export default function TopicPage() {
  const params = useParams();
  const techId = params?.techId as string;
  const topicId = params?.topicId as string;
  const router = useRouter();

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
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
