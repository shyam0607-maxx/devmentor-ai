'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

const MODULE_DATA: Record<string, Record<string, any>> = {
  '1': {
    '1': {
      title: 'Introduction & Setup',
      description: 'Get started with MongoDB - installation, basic concepts, and configuration',
      notes: `# MongoDB Introduction & Setup

## What is MongoDB?
MongoDB is a NoSQL database that stores data in JSON-like documents. It provides:
- Flexible schema design
- Horizontal scalability
- High performance and availability
- Easy integration with JavaScript/Node.js

## Installation

### Windows
1. Download MongoDB Community Edition from mongodb.com
2. Run the installer
3. Choose "Install MongoDB as a Service"
4. Access mongosh (MongoDB Shell)

### Mac
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
\`\`\`

### Linux
\`\`\`bash
sudo apt-get install mongodb
sudo systemctl start mongod
\`\`\`

## Connecting to MongoDB

Using Mongoose (Node.js):
- Provides schema-based modeling
- Built-in validation and casting
- Middleware and hooks support

Using MongoDB Driver:
- Low-level direct database access
- Maximum flexibility
- Requires manual schema management`,

      examples: [
        {
          title: 'Basic Connection with Mongoose',
          code: `const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/myapp';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});`,
          output: `Connected to MongoDB successfully!`
        },
        {
          title: 'Connection with MongoDB Driver',
          code: `const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('myapp');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections);

  } finally {
    await client.close();
  }
}

connect();`,
          output: `Connected to MongoDB
Collections: [ { name: 'users', type: 'collection' } ]`
        }
      ],

      faqs: [
        {
          q: 'What is the difference between MongoDB and SQL databases?',
          a: 'MongoDB is document-based (NoSQL) with flexible schemas, while SQL databases use structured tables. MongoDB is better for unstructured data, SQL is better for relational data.'
        },
        {
          q: 'What is a collection in MongoDB?',
          a: 'A collection is like a table in SQL - it stores multiple documents. Unlike SQL tables, collections have no fixed schema.'
        },
        {
          q: 'What is a document in MongoDB?',
          a: 'A document is a record with key-value pairs stored in BSON format. Similar to a JSON object or a row in SQL.'
        },
        {
          q: 'How do I create a new MongoDB database?',
          a: 'Simply insert a document into a collection. MongoDB automatically creates the database if it doesn\'t exist.'
        },
        {
          q: 'Is MongoDB free?',
          a: 'Yes, MongoDB Community Edition is free and open-source. MongoDB Atlas (cloud) also has a free tier.'
        },
        {
          q: 'What is ObjectId in MongoDB?',
          a: 'ObjectId is a 12-byte unique identifier automatically generated for each document as the _id field if not specified.'
        },
        {
          q: 'Can MongoDB replace MySQL?',
          a: 'It depends on your use case. MongoDB is good for flexible schemas and scalability; MySQL is better for structured relational data.'
        },
        {
          q: 'What are indexes in MongoDB?',
          a: 'Indexes improve query performance by creating optimized data structures. MongoDB supports single-field and compound indexes.'
        },
        {
          q: 'How do I backup MongoDB?',
          a: 'Use mongodump to export data and mongorestore to import. For MongoDB Atlas, automated backups are available.'
        },
        {
          q: 'What is replication in MongoDB?',
          a: 'Replication creates copies of data across multiple servers for high availability and disaster recovery.'
        }
      ]
    },
    '2': {
      title: 'CRUD Operations',
      description: 'Master Create, Read, Update, and Delete operations in MongoDB',
      notes: `# CRUD Operations in MongoDB

## CREATE - Insert Documents

### insertOne()
Inserts a single document and returns the inserted ID.

### insertMany()
Inserts multiple documents at once.

## READ - Query Documents

### find()
Returns all matching documents as a cursor.

### findOne()
Returns the first matching document.

### Query Operators
- $eq: Equal
- $ne: Not equal
- $gt: Greater than
- $lt: Less than
- $in: Value in array
- $and: Logical AND
- $or: Logical OR

## UPDATE - Modify Documents

### updateOne()
Updates the first matching document.

### updateMany()
Updates all matching documents.

### Operators
- $set: Set field value
- $inc: Increment value
- $push: Add to array
- $pull: Remove from array
- $rename: Rename field
- $unset: Remove field

## DELETE - Remove Documents

### deleteOne()
Deletes the first matching document.

### deleteMany()
Deletes all matching documents.`,

      examples: [
        {
          title: 'Create Documents',
          code: `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// INSERT ONE
const user1 = await User.create({
  name: 'Alice',
  email: 'alice@example.com',
  age: 25
});

// INSERT MANY
const users = await User.insertMany([
  { name: 'Bob', email: 'bob@example.com', age: 30 },
  { name: 'Charlie', email: 'charlie@example.com', age: 28 }
]);

console.log('Created users:', users);`,
          output: `Created users: [
  { _id: ObjectId(...), name: 'Bob', email: 'bob@example.com', age: 30, ... },
  { _id: ObjectId(...), name: 'Charlie', email: 'charlie@example.com', age: 28, ... }
]`
        },
        {
          title: 'Read Documents',
          code: `// FIND ALL
const allUsers = await User.find();

// FIND WITH CONDITION
const adults = await User.find({ age: { $gte: 18 } });

// FIND ONE
const alice = await User.findOne({ name: 'Alice' });

// FIND WITH MULTIPLE CONDITIONS
const result = await User.find({
  $and: [
    { age: { $gte: 25 } },
    { age: { $lte: 30 } }
  ]
});

console.log('Adults:', adults);
console.log('Alice:', alice);`,
          output: `Adults: [
  { _id: ObjectId(...), name: 'Alice', age: 25 },
  { _id: ObjectId(...), name: 'Bob', age: 30 },
  { _id: ObjectId(...), name: 'Charlie', age: 28 }
]
Alice: { _id: ObjectId(...), name: 'Alice', email: 'alice@example.com', age: 25 }`
        },
        {
          title: 'Update Documents',
          code: `// UPDATE ONE
const updated = await User.updateOne(
  { name: 'Alice' },
  { $set: { age: 26 } }
);

// UPDATE MANY
await User.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: 'young' } }
);

// INCREMENT
await User.updateOne(
  { name: 'Bob' },
  { $inc: { age: 1 } }
);

// PUSH TO ARRAY
await User.updateOne(
  { name: 'Alice' },
  { $push: { tags: 'developer' } }
);

console.log('Updated successfully');`,
          output: `Updated successfully
Acknowledged: true
Modified count: 1`
        },
        {
          title: 'Delete Documents',
          code: `// DELETE ONE
const deleted = await User.deleteOne({ name: 'Charlie' });

// DELETE MANY
const result = await User.deleteMany({ age: { $lt: 20 } });

// DELETE ALL (use with caution!)
// await User.deleteMany({});

console.log('Deleted one:', deleted);
console.log('Deleted many:', result);`,
          output: `Deleted one: { acknowledged: true, deletedCount: 1 }
Deleted many: { acknowledged: true, deletedCount: 0 }`
        }
      ],

      faqs: [
        {
          q: 'What is the difference between insertOne and insertMany?',
          a: 'insertOne adds a single document, insertMany adds multiple documents. insertMany is more efficient for bulk operations.'
        },
        {
          q: 'How do I update multiple fields at once?',
          a: 'Use $set operator with multiple fields: { $set: { field1: value1, field2: value2 } }'
        },
        {
          q: 'What does $set do?',
          a: '$set updates specified fields. Fields not mentioned remain unchanged. Without $set, the entire document is replaced.'
        },
        {
          q: 'How do I upsert a document?',
          a: 'Use { upsert: true } option. If document exists, it updates; if not, it creates one.'
        },
        {
          q: 'Can I delete all documents in a collection?',
          a: 'Yes, with deleteMany({}), but use carefully! It permanently removes all data.'
        },
        {
          q: 'What is the return value of create()?',
          a: 'It returns the created document with the _id field set by MongoDB.'
        },
        {
          q: 'How do I find documents with multiple conditions?',
          a: 'Use $and, $or operators: { $and: [ condition1, condition2 ] } or { $or: [ condition1, condition2 ] }'
        },
        {
          q: 'What is projection in MongoDB?',
          a: 'Projection selects which fields to return: find({}, { name: 1, age: 1, _id: 0 })'
        },
        {
          q: 'How do I count matching documents?',
          a: 'Use countDocuments(): await User.countDocuments({ age: { $gte: 18 } })'
        },
        {
          q: 'Can I perform conditional updates?',
          a: 'Yes, use query conditions to select documents, then apply operators: updateMany(condition, { $set: {...} })'
        }
      ]
    }
  },
  '2': {
    '1': {
      title: 'Getting Started with Express',
      description: 'Set up your first Express server and learn the basics',
      notes: `# Getting Started with Express.js

## What is Express?
Express is a minimal Node.js web framework providing:
- Routing
- Middleware support
- Built-in request/response handling
- Template engine integration

## Installation

\`\`\`bash
npm install express
\`\`\`

## Basic Server Structure

1. Import Express
2. Create an app instance
3. Define routes
4. Add middleware
5. Start the server

## Middleware

Functions with access to request, response, and next middleware.
Can modify request/response or end request-response cycle.`,

      examples: [
        {
          title: 'Basic Express Server',
          code: `const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, name: 'John Doe' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
          output: `Server running on http://localhost:3000
GET / => { "message": "Hello World" }
GET /user/123 => { "userId": "123", "name": "John Doe" }`
        },
        {
          title: 'POST, PUT, DELETE Methods',
          code: `app.post('/users', (req, res) => {
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
  res.json({
    id,
    name,
    updated: true
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    deleted: true,
    message: 'User deleted successfully'
  });
});`,
          output: `POST /users { "name": "Alice", "email": "alice@example.com" }
=> { "id": 1, "name": "Alice", "email": "alice@example.com", "created": true }

PUT /users/1 { "name": "Alice Updated" }
=> { "id": 1, "name": "Alice Updated", "updated": true }

DELETE /users/1
=> { "id": 1, "deleted": true }`
        }
      ],

      faqs: [
        { q: 'How do I create a route in Express?', a: 'Use app.get(), app.post(), app.put(), or app.delete() methods.' },
        { q: 'What is middleware?', a: 'Functions that process requests before they reach route handlers.' },
        { q: 'How do I access URL parameters?', a: 'Use req.params: app.get(\'/users/:id\', (req, res) => { req.params.id })' },
        { q: 'How do I access query strings?', a: 'Use req.query: app.get(\'/search\', (req, res) => { req.query.q })' },
        { q: 'How do I send JSON response?', a: 'Use res.json(data) method.' },
        { q: 'What is the difference between req.body and req.params?', a: 'req.body is POST data, req.params is URL parameters.' },
        { q: 'How do I set HTTP status codes?', a: 'Use res.status(code) before sending response.' },
        { q: 'How do I handle 404 errors?', a: 'Use app.use() at the end to catch unmatched routes.' },
        { q: 'Can I use async/await in Express?', a: 'Yes, wrap in try-catch or use middleware for error handling.' },
        { q: 'How do I enable CORS?', a: 'Use npm install cors and app.use(cors())' }
      ]
    }
  }
};

function ModuleContent() {
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const techId = (params?.techId as string) || '';
  const moduleId = (params?.moduleId as string) || '';

  let module = MODULE_DATA[techId]?.[moduleId];

  // Fallback for missing modules
  if (!module) {
    module = {
      title: `Module ${moduleId} - Coming Soon`,
      description: 'Comprehensive learning content coming soon',
      notes: `# Module Content\n\n## Coming Soon\n\nThis module is being prepared with detailed explanations, code examples, and interview questions.`,
      examples: [{
        title: 'Example',
        code: `console.log('Learning in progress');`,
        output: `Learning in progress`
      }],
      faqs: [
        { q: 'When ready?', a: 'Soon with full content' },
        { q: 'What includes?', a: 'Notes, code, FAQs' },
        { q: 'Is free?', a: 'Yes' },
        { q: 'Mobile friendly?', a: 'Yes' },
        { q: 'Updates?', a: 'Regular content' },
        { q: 'Examples?', a: 'Interactive code' },
        { q: 'Download?', a: 'Available' },
        { q: 'Certificates?', a: 'Yes' },
        { q: 'Help?', a: 'Community support' },
        { q: 'Contribute?', a: 'Help build content' }
      ]
    };
  }


  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href={`/fs-learning/${techId}`} className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">← Back to Modules</Link>

        <h1 className="text-5xl font-bold text-white mb-2">{module.title}</h1>
        <p className="text-xl text-slate-400 mb-8">{module.description}</p>

        {/* 3D Visualization */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">3D Visualization</h2>
          <div className="w-full h-80 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
                </linearGradient>
                <style>{`
                  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
                  .float-box { animation: float 3s ease-in-out infinite; }
                  @keyframes rotate { 0% { transform: rotateZ(0deg); } 100% { transform: rotateZ(360deg); } }
                  .rotate-circle { animation: rotate 4s linear infinite; }
                `}</style>
              </defs>
              <circle cx="200" cy="150" r="100" fill="url(#grad)" opacity="0.3" className="rotate-circle" />
              <rect x="150" y="100" width="100" height="100" fill="url(#grad)" stroke="#06b6d4" strokeWidth="2" rx="10" className="float-box" />
              <circle cx="200" cy="150" r="40" fill="none" stroke="#34d399" strokeWidth="2" />
              <text x="200" y="260" textAnchor="middle" fill="#cbd5e1" fontSize="16" fontWeight="bold">
                {module.title}
              </text>
            </svg>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📚 Detailed Notes</h2>
          <div className="text-slate-200 leading-relaxed whitespace-pre-wrap font-normal">{module.notes}</div>
        </div>

        {/* Code Examples */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">💻 Code Examples</h2>
          <div className="space-y-8">
            {module.examples.map((example: any, idx: number) => (
              <div key={idx} className="border border-slate-700 rounded-lg overflow-hidden">
                <div className="bg-slate-900 p-4 border-b border-slate-700">
                  <h3 className="text-lg font-bold text-cyan-400">{example.title}</h3>
                </div>

                <div className="bg-slate-900 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-sm">Code</span>
                    <button
                      onClick={() => handleCopy(example.code)}
                      className="p-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center gap-2 text-slate-300"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-slate-300 font-mono text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>

                <div className="bg-slate-800 border-t border-slate-700 p-6">
                  <p className="text-slate-400 text-sm mb-2">Expected Output:</p>
                  <pre className="text-green-400 font-mono text-sm bg-slate-900 p-4 rounded overflow-x-auto">
                    <code>{example.output}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview FAQs */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 Top 10 Interview FAQs</h2>
          <div className="space-y-4">
            {module.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="border border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full bg-slate-700 hover:bg-slate-600 p-4 flex justify-between items-center transition"
                >
                  <span className="text-white font-semibold text-left">{faq.q}</span>
                  {expandedFAQ === idx ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-cyan-400" />
                  )}
                </button>
                {expandedFAQ === idx && (
                  <div className="bg-slate-800 p-4 text-slate-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Link href={`/fs-learning/${techId}`} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold">
            ← Back to Modules
          </Link>
          <button
            onClick={() => alert('Module completed! 🎉')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition font-semibold"
          >
            Mark as Complete ✓
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ModulePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading module...</div>
      </div>
    }>
      <ModuleContent />
    </Suspense>
  );
}
