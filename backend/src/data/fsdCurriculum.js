const fsdCurriculum = {
  1: {
    name: 'MongoDB',
    description: 'NoSQL Database for scalable applications',
    color: 'green',
    topics: [
      {
        id: 'mongodb-intro',
        name: 'MongoDB Basics',
        description: 'Introduction to MongoDB and NoSQL databases',
        difficulty: 'beginner',
        timeComplexity: 'O(1) - O(n)',
        spaceComplexity: 'O(n)',
        notes: `
## What is MongoDB?

MongoDB is a NoSQL document database that stores data in JSON-like documents.

### Key Features:
- **Document-based**: Stores data as BSON documents
- **Flexible schema**: No strict table structure required
- **Scalability**: Easily horizontal scaling with sharding
- **High performance**: Optimized for fast read/write operations

### MongoDB vs SQL:
- **Flexible**: No predefined schema
- **Developer-friendly**: Data structure matches code objects
- **Scalable**: Built-in horizontal scaling

### Collections & Documents:
- **Collections**: Similar to tables in SQL
- **Documents**: JSON-like data structures
- **Fields**: Data elements within documents

### Installation:
1. Download MongoDB from mongodb.com
2. Install Community Edition
3. Run MongoDB server
4. Connect using MongoDB client

### First Query:
\`\`\`
use myDatabase
db.users.insertOne({ name: "John", age: 25 })
db.users.find()
\`\`\`

### Common Use Cases:
- Web applications with flexible data models
- Real-time big data applications
- IoT applications
- Content management systems
- Mobile applications
`,
        codeExamples: {
          javascript: `
// MongoDB with Node.js (using mongoose)
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb');

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create model
const User = mongoose.model('User', userSchema);

// Insert document
const user = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
});
user.save();

// Find documents
User.find({ age: { $gt: 20 } }, (err, users) => {
  console.log(users);
});

// Update document
User.updateOne({ name: 'John' }, { age: 26 });

// Delete document
User.deleteOne({ name: 'John' });
          `,
          python: `
# MongoDB with Python (using pymongo)
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mydb']
users = db['users']

# Insert document
user = {
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
result = users.insert_one(user)

# Find documents
found_users = users.find({"age": {"$gt": 20}})
for user in found_users:
  print(user)

# Update document
users.update_one({"name": "John"}, {"$set": {"age": 26}})

# Delete document
users.delete_one({"name": "John"})
          `,
          node: `
// Node.js with MongoDB (native driver)
const { MongoClient } = require('mongodb');

async function main() {
  const client = new MongoClient('mongodb://localhost:27017/');

  try {
    await client.connect();
    const database = client.db('mydb');
    const users = database.collection('users');

    // Insert
    await users.insertOne({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25
    });

    // Find
    const result = await users.findOne({ name: 'John Doe' });
    console.log(result);

    // Update
    await users.updateOne({ name: 'John' }, { $set: { age: 26 } });

    // Delete
    await users.deleteOne({ name: 'John Doe' });
  } finally {
    await client.close();
  }
}

main().catch(console.error);
          `
        }
      },
      {
        id: 'mongodb-crud',
        name: 'CRUD Operations',
        description: 'Create, Read, Update, Delete operations in MongoDB',
        difficulty: 'beginner',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        notes: `
## CRUD Operations

CRUD stands for Create, Read, Update, Delete - the four basic operations.

### Create (Insert)
- insertOne(): Insert single document
- insertMany(): Insert multiple documents

### Read (Find)
- find(): Find all matching documents
- findOne(): Find first matching document
- Queries with filters and operators

### Update
- updateOne(): Update single document
- updateMany(): Update multiple documents
- Replace entire document or specific fields

### Delete
- deleteOne(): Delete single document
- deleteMany(): Delete multiple documents
- Bulk delete operations

### Query Operators:
- $eq: Equal
- $ne: Not equal
- $gt: Greater than
- $gte: Greater than or equal
- $lt: Less than
- $lte: Less than or equal
- $in: In array
- $nin: Not in array

### Example Queries:
\`\`\`
// Find users older than 25
db.users.find({ age: { $gt: 25 } })

// Find users with specific names
db.users.find({ name: { $in: ["John", "Jane"] } })

// Update with filter
db.users.updateMany({ status: "active" }, { $set: { verified: true } })
\`\`\`
        `,
        codeExamples: {
          javascript: `
// CRUD Operations Example
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  status: String
});

const User = mongoose.model('User', userSchema);

// CREATE
async function createUser(userData) {
  const user = new User(userData);
  return await user.save();
}

// READ
async function getUsers(filter = {}) {
  return await User.find(filter);
}

async function getUserById(id) {
  return await User.findById(id);
}

// UPDATE
async function updateUser(id, updateData) {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
}

// DELETE
async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

// Usage
(async () => {
  // Create
  const newUser = await createUser({ name: 'John', email: 'john@email.com', age: 25 });
  console.log('Created:', newUser);

  // Read
  const users = await getUsers({ age: { $gt: 20 } });
  console.log('Found users:', users);

  // Update
  const updated = await updateUser(newUser._id, { status: 'active' });
  console.log('Updated:', updated);

  // Delete
  await deleteUser(newUser._id);
  console.log('Deleted');
})();
          `,
          python: `
# CRUD Operations with PyMongo
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb://localhost:27017/')
db = client['myapp']
users = db['users']

# CREATE
def create_user(user_data):
  result = users.insert_one(user_data)
  return result.inserted_id

# READ
def get_users(filter_query={}):
  return list(users.find(filter_query))

def get_user_by_id(user_id):
  return users.find_one({"_id": ObjectId(user_id)})

# UPDATE
def update_user(user_id, update_data):
  return users.update_one(
    {"_id": ObjectId(user_id)},
    {"$set": update_data}
  )

# DELETE
def delete_user(user_id):
  return users.delete_one({"_id": ObjectId(user_id)})

# Usage
if __name__ == "__main__":
  # Create
  user_id = create_user({
    "name": "John",
    "email": "john@email.com",
    "age": 25
  })
  print(f"Created user: {user_id}")

  # Read
  user = get_user_by_id(user_id)
  print(f"Found user: {user}")

  # Update
  update_user(user_id, {"status": "active"})
  print("Updated user")

  # Delete
  delete_user(user_id)
  print("Deleted user")
          `,
          node: `
// CRUD with Express.js and MongoDB
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  status: String
});

const User = mongoose.model('User', userSchema);

// CREATE - POST /users
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - GET /users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - GET /users/:id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
});

// UPDATE - PUT /users/:id
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
          `
        }
      }
    ]
  },
  2: {
    name: 'Express.js',
    description: 'Fast, unopinionated web framework for Node.js',
    color: 'yellow',
    topics: [
      {
        id: 'express-basics',
        name: 'Express Basics',
        description: 'Introduction to Express.js framework',
        difficulty: 'beginner',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        notes: `
## Express.js Basics

Express is a minimal and flexible Node.js web application framework.

### Why Express?
- Minimal and flexible
- Fast request routing
- Middleware support
- Easy error handling
- Template engine support

### Installation:
\`\`\`
npm init
npm install express
\`\`\`

### Hello World:
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

### Core Concepts:
- **Routes**: Define request handlers
- **Middleware**: Functions that process requests
- **Request/Response**: Handle HTTP requests and responses
- **Static files**: Serve CSS, JS, images
- **Routing**: URL path to handler mapping

### HTTP Methods:
- GET: Retrieve data
- POST: Create data
- PUT: Update data
- DELETE: Remove data
- PATCH: Partial update

### Routing Examples:
\`\`\`javascript
// GET route
app.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// POST route
app.post('/users', (req, res) => {
  res.status(201).json({ created: true });
});
\`\`\`
        `,
        codeExamples: {
          javascript: `
// Express.js Basic Server
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: 'User ' + userId });
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({
    message: 'User created',
    user: newUser
  });
});

app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  res.json({
    message: 'User updated',
    id: userId,
    data: updatedData
  });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: 'User deleted', id: userId });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
          `,
          python: `
# Similar Express concept with Flask (Python)
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Welcome to Flask!'

@app.route('/api/users', methods=['GET'])
def get_users():
    users = [
        {'id': 1, 'name': 'John'},
        {'id': 2, 'name': 'Jane'}
    ]
    return jsonify(users)

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return jsonify({'id': user_id, 'name': f'User {user_id}'})

@app.route('/api/users', methods=['POST'])
def create_user():
    new_user = request.json
    return jsonify({
        'message': 'User created',
        'user': new_user
    }), 201

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    updated_data = request.json
    return jsonify({
        'message': 'User updated',
        'id': user_id,
        'data': updated_data
    })

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return jsonify({'message': 'User deleted', 'id': user_id})

if __name__ == '__main__':
    app.run(debug=True, port=3000)
          `,
          node: `
// Advanced Express Example with Middleware
const express = require('express');
const app = express();

// Custom middleware
const logRequest = (req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Apply middleware
app.use(logRequest);
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express' });
});

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is protected' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(3000, () => {
  console.log('Express server running on port 3000');
});
          `
        }
      }
    ]
  },
  3: {
    name: 'Node.js',
    description: 'JavaScript runtime for server-side development',
    color: 'blue',
    topics: [
      {
        id: 'nodejs-basics',
        name: 'Node.js Basics',
        description: 'Introduction to Node.js runtime',
        difficulty: 'beginner',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(n)',
        notes: `
## Node.js Basics

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

### Why Node.js?
- Run JavaScript on server
- Non-blocking I/O
- Event-driven architecture
- NPM - package manager
- Fast and scalable

### Installation:
1. Download from nodejs.org
2. Install Node.js and npm
3. Verify: \`node -v\` and \`npm -v\`

### First Program:
\`\`\`javascript
console.log('Hello from Node.js');
\`\`\`

Run with: \`node filename.js\`

### Core Modules:
- **fs**: File system operations
- **http**: HTTP server
- **path**: Path utilities
- **events**: Event emitter
- **util**: Utility functions

### Asynchronous Nature:
Node.js uses callbacks, promises, and async/await for async operations.

### Package Management:
- npm install: Install packages
- package.json: Project configuration
- node_modules: Installed packages

### File System:
\`\`\`javascript
const fs = require('fs');

// Read file
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data);
});

// Write file
fs.writeFile('file.txt', 'content', (err) => {
  console.log('File written');
});
\`\`\`
        `,
        codeExamples: {
          javascript: `
// Node.js Basic Examples

// 1. File System Operations
const fs = require('fs');

// Read file synchronously
const content = fs.readFileSync('file.txt', 'utf8');
console.log(content);

// Read file asynchronously
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Write file
fs.writeFile('output.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('File saved');
});

// 2. HTTP Server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World from HTTP Server');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// 3. Event Emitter
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
  console.log('Hello ' + name);
});

emitter.emit('greet', 'John');

// 4. Promises and Async/Await
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// Using async/await
async function readAndLog(filename) {
  try {
    const data = await readFilePromise(filename);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
          `,
          python: `
# Similar concepts in Python

import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler

# 1. File System
# Read file
with open('file.txt', 'r') as f:
    content = f.read()
    print(content)

# Write file
with open('output.txt', 'w') as f:
    f.write('Hello Python')

# 2. HTTP Server
class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write(b'Hello from HTTP Server')

server = HTTPServer(('localhost', 3000), RequestHandler)
print('Server running on port 3000')
server.serve_forever()

# 3. Async/Await
import asyncio

async def read_file_async(filename):
    # Simulate async file read
    await asyncio.sleep(1)
    with open(filename, 'r') as f:
        return f.read()

async def main():
    data = await read_file_async('file.txt')
    print(data)

asyncio.run(main())
          `,
          node: `
// Advanced Node.js Examples

// 1. Stream Processing (for large files)
const fs = require('fs');

const readStream = fs.createReadStream('large_file.txt', {
  encoding: 'utf8',
  highWaterMark: 16 * 1024 // 16KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Chunk received:', chunk.length);
});

readStream.on('end', () => {
  console.log('File reading complete');
});

// 2. Buffer (binary data)
const buffer = Buffer.from('Hello Node.js');
console.log(buffer);
console.log(buffer.toString());

// 3. Path utilities
const path = require('path');
const filePath = path.join(__dirname, 'files', 'data.txt');
console.log('Full path:', filePath);
console.log('Filename:', path.basename(filePath));
console.log('Directory:', path.dirname(filePath));

// 4. Working with JSON
const data = {
  name: 'John',
  age: 25,
  skills: ['JavaScript', 'Node.js']
};

// Convert to JSON string
const jsonString = JSON.stringify(data, null, 2);
fs.writeFileSync('data.json', jsonString);

// Parse JSON
const jsonData = JSON.parse(jsonString);
console.log(jsonData);
          `
        }
      }
    ]
  },
  4: {
    name: 'React',
    description: 'JavaScript library for building user interfaces',
    color: 'cyan',
    topics: [
      {
        id: 'react-basics',
        name: 'React Basics',
        description: 'Introduction to React components and JSX',
        difficulty: 'beginner',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        notes: `
## React Basics

React is a JavaScript library for building user interfaces with reusable components.

### Why React?
- Component-based architecture
- Virtual DOM for performance
- Reusable components
- One-way data binding
- Large ecosystem

### Installation:
\`\`\`
npx create-react-app my-app
cd my-app
npm start
\`\`\`

### JSX Syntax:
JSX allows you to write HTML-like code in JavaScript.

\`\`\`jsx
const element = <h1>Hello World</h1>;

const name = 'John';
const greeting = <h1>Hello, {name}!</h1>;
\`\`\`

### Components:
- **Functional Components**: JavaScript functions
- **Class Components**: ES6 classes
- **Props**: Pass data to components
- **State**: Component data that can change

### Functional Component Example:
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

### Hooks:
- **useState**: Manage component state
- **useEffect**: Handle side effects
- **useContext**: Access context values
- **useReducer**: Complex state management

### Component Lifecycle:
- **Mount**: Component created
- **Update**: Component re-renders
- **Unmount**: Component removed
        `,
        codeExamples: {
          javascript: `
// React Functional Component Example
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  // Run after render
  useEffect(() => {
    console.log('Component rendered, count:', count);
    setMessage(\`Current count: \${count}\`);
  }, [count]); // Dependency array

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <p>{message}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;

// Reusable Component
function UserCard({ user }) {
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

// Using the Component
function App() {
  const users = [
    { id: 1, name: 'John', email: 'john@example.com', age: 25 },
    { id: 2, name: 'Jane', email: 'jane@example.com', age: 28 }
  ];

  return (
    <div>
      <Counter />
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
          `,
          python: `
# Similar component concept with Django
from django.shortcuts import render
from django.http import JsonResponse
from django.views import View

class CounterView(View):
    def get(self, request):
        count = int(request.GET.get('count', 0))
        return JsonResponse({
            'count': count,
            'message': f'Current count: {count}'
        })

class UserCardView(View):
    def get(self, request):
        users = [
            {'id': 1, 'name': 'John', 'email': 'john@example.com', 'age': 25},
            {'id': 2, 'name': 'Jane', 'email': 'jane@example.com', 'age': 28}
        ]
        return render(request, 'users.html', {'users': users})
          `,
          node: `
// React with Server-Side Rendering (Node.js)
import React from 'react';
import ReactDOMServer from 'react-dom/server';

function Counter({ initialCount = 0 }) {
  const [count, setCount] = React.useState(initialCount);

  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Server-side rendering
const html = ReactDOMServer.renderToString(<Counter initialCount={5} />);
console.log(html);

// In an Express server:
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const component = ReactDOMServer.renderToString(<Counter />);
  res.send(\`
    <!DOCTYPE html>
    <html>
      <body>
        <div id="root">\${component}</div>
      </body>
    </html>
  \`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
          `
        }
      }
    ]
  },
  5: {
    name: 'Angular',
    description: 'Complete framework for building web applications',
    color: 'red',
    topics: [
      {
        id: 'angular-basics',
        name: 'Angular Basics',
        description: 'Introduction to Angular framework and components',
        difficulty: 'beginner',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        notes: `
## Angular Basics

Angular is a complete framework for building single-page applications with TypeScript.

### Why Angular?
- Full-featured framework
- TypeScript support
- Dependency injection
- Two-way data binding
- Strong CLI tools
- RxJS for reactive programming

### Installation:
\`\`\`
npm install -g @angular/cli
ng new my-app
cd my-app
ng serve
\`\`\`

### Project Structure:
- **src/**: Source code
- **app/**: Main application code
- **components/**: Reusable components
- **services/**: Business logic
- **modules/**: Feature modules

### Components:
Components are the building blocks of Angular applications.

\`\`\`typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {
  name = 'World';
}
\`\`\`

### Templates:
\`\`\`html
<h1>Hello {{ name }}!</h1>
<button (click)="greet()">Greet</button>
\`\`\`

### Directives:
- **ngIf**: Conditional rendering
- **ngFor**: Loop through arrays
- **ngClass**: Add CSS classes
- **ngModel**: Two-way binding

### Services and Dependency Injection:
Services provide shared functionality across components.

\`\`\`typescript
@Injectable()
export class UserService {
  getUsers() { return users; }
}
\`\`\`
        `,
        codeExamples: {
          javascript: `
// Angular TypeScript Component
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== id);
      }
    );
  }
}

// User Service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(\`\${this.apiUrl}/\${id}\`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(\`\${this.apiUrl}/\${id}\`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(\`\${this.apiUrl}/\${id}\`);
  }
}
          `,
          python: `
# Similar concept with Django REST Framework
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'age']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        users = self.get_queryset()
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
          `,
          node: `
// Angular Module and Component Setup
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Component Template (user-list.component.html)
/*
<div class="container">
  <h1>Users</h1>

  <div *ngIf="users.length === 0" class="alert">
    No users found
  </div>

  <table *ngIf="users.length > 0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let user of users"
          [class.active]="selectedUser === user"
          (click)="selectUser(user)">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.age }}</td>
        <td>
          <button (click)="deleteUser(user.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div *ngIf="selectedUser" class="user-detail">
    <h2>{{ selectedUser.name }}</h2>
    <p>Email: {{ selectedUser.email }}</p>
    <p>Age: {{ selectedUser.age }}</p>
  </div>
</div>
*/
          `
        }
      }
    ]
  }
};

module.exports = fsdCurriculum;
