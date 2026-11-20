export const MODULE_DATA_COMPLETE: Record<string, Record<string, any>> = {
  '1': { // MongoDB
    '3': {
      title: 'Querying & Indexing',
      description: 'Advanced querying techniques and performance optimization with indexes',
      notes: `# Querying & Indexing in MongoDB

## Query Operators
- Comparison: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin
- Logical: $and, $or, $not, $nor
- Element: $exists, $type
- Array: $all, $elemMatch, $size

## Projection
Control which fields to return in results.
- Include fields: { field: 1 }
- Exclude fields: { field: 0 }
- Cannot mix includes/excludes (except _id)

## Sorting & Pagination
- sort({ field: 1 }) - ascending
- sort({ field: -1 }) - descending
- limit(n) - return n documents
- skip(n) - skip n documents

## Indexes
Speed up queries by creating indexes on frequently searched fields.
- Single field: db.users.createIndex({ email: 1 })
- Compound: db.users.createIndex({ status: 1, age: -1 })
- Text search: db.users.createIndex({ description: "text" })
- Unique: db.users.createIndex({ email: 1 }, { unique: true })`,
      examples: [
        {
          title: 'Advanced Queries',
          code: `// Find users aged 25-35 with status active
db.users.find({
  age: { $gte: 25, $lte: 35 },
  status: 'active'
}).sort({ age: 1 }).limit(10);

// Find users by tag array
db.posts.find({ tags: { $in: ['mongodb', 'database'] } });

// Find with OR condition
db.products.find({
  $or: [
    { price: { $lt: 100 } },
    { onSale: true }
  ]
});`,
          output: `Results: 10 documents sorted by age ascending`
        },
        {
          title: 'Creating Indexes',
          code: `// Create index for email field
db.users.createIndex({ email: 1 });

// Create compound index
db.orders.createIndex({
  customerId: 1,
  orderDate: -1
});

// View indexes
db.users.getIndexes();

// Drop index
db.users.dropIndex({ email: 1 });`,
          output: `Index created successfully
Indexes: [_id, email, (customerId, orderDate)]`
        }
      ],
      faqs: [
        { q: 'What is an index?', a: 'Data structure that speeds up query operations' },
        { q: 'When should I create an index?', a: 'On fields frequently used in queries or filters' },
        { q: 'What is a compound index?', a: 'Index on multiple fields together' },
        { q: 'How many indexes should I have?', a: 'Only necessary ones - each slows writes' },
        { q: 'What is query plan?', a: 'How MongoDB executes a query' },
        { q: 'How do I optimize slow queries?', a: 'Use explain(), add indexes, optimize $lookup' },
        { q: 'What is COLLSCAN?', a: 'Full collection scan without index' },
        { q: 'What is IXSCAN?', a: 'Index scan - fast query execution' },
        { q: 'Can I delete an index?', a: 'Yes with dropIndex()' },
        { q: 'What is unique index?', a: 'Ensures field values are unique in collection' }
      ]
    },
    '4': {
      title: 'Aggregation Pipeline',
      description: 'Process data through multiple stages of transformation',
      notes: `# MongoDB Aggregation Pipeline

## Stages
- $match: Filter documents (like find)
- $project: Select fields to include
- $group: Group documents and aggregate
- $sort: Sort results
- $limit: Limit results
- $skip: Skip documents
- $unwind: Deconstruct array field
- $lookup: Join with another collection
- $addFields: Add computed fields

## Operators
- $sum: Sum values
- $avg: Calculate average
- $max/$min: Max/min values
- $push: Create array
- $first/$last: Get first/last value
- $concat: Concatenate strings`,
      examples: [
        {
          title: 'Aggregation Example',
          code: `db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: {
    _id: '$customerId',
    totalAmount: { $sum: '$amount' },
    orderCount: { $sum: 1 },
    avgAmount: { $avg: '$amount' }
  }},
  { $sort: { totalAmount: -1 } },
  { $limit: 10 }
]);`,
          output: `Top 10 customers by total order amount with stats`
        },
        {
          title: 'Aggregation with $lookup',
          code: `db.orders.aggregate([
  { $match: { status: 'pending' } },
  { $lookup: {
    from: 'customers',
    localField: 'customerId',
    foreignField: '_id',
    as: 'customer'
  }},
  { $project: {
    orderId: 1,
    'customer.name': 1,
    amount: 1
  }}
]);`,
          output: `Orders with customer details joined`
        }
      ],
      faqs: [
        { q: 'What is aggregation pipeline?', a: 'Multi-stage data processing framework' },
        { q: 'How many stages can I have?', a: 'Unlimited, but performance decreases' },
        { q: 'What is $group?', a: 'Groups documents and aggregates data' },
        { q: 'What is $lookup?', a: 'Performs join with another collection' },
        { q: 'Can I use aggregation for reporting?', a: 'Yes, perfect for reports' },
        { q: 'What is $unwind?', a: 'Deconstructs array into individual documents' },
        { q: 'How do I debug aggregation?', a: 'Use $addFields to see intermediate values' },
        { q: 'Is aggregation faster than find?', a: 'Depends on query, aggregation more flexible' },
        { q: 'What is cursor in aggregation?', a: 'Result set from pipeline' },
        { q: 'Can I limit memory usage?', a: 'Yes, enable allowDiskUse for large datasets' }
      ]
    },
    '5': {
      title: 'Replication & Sharding',
      description: 'Scale MongoDB with replication and horizontal partitioning',
      notes: `# MongoDB Replication & Sharding

## Replication
Creates redundant copies of data across servers.
- Primary: Receives writes
- Secondary: Copies data from primary
- Failover: Secondary becomes primary if primary fails
- Replica Set: Group of replicas

## Sharding
Distributes data across multiple servers (horizontal scaling).
- Shard Key: Field that determines data distribution
- Chunk: Range of shard key values
- Config servers: Metadata storage
- Mongos: Query router

## High Availability
- Automatic failover
- Read preference settings
- Write concern levels
- Read concern levels`,
      examples: [
        {
          title: 'Replica Set Setup',
          code: `// Initialize replica set
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "server1:27017" },
    { _id: 1, host: "server2:27017" },
    { _id: 2, host: "server3:27017" }
  ]
});

// Check replica set status
rs.status();`,
          output: `Replica set initialized and running`
        },
        {
          title: 'Sharding Example',
          code: `// Enable sharding on database
sh.enableSharding("mydb");

// Create index on shard key
db.users.createIndex({ userId: 1 });

// Shard collection
sh.shardCollection("mydb.users", { userId: 1 });

// Check shard status
sh.status();`,
          output: `Collection sharded successfully`
        }
      ],
      faqs: [
        { q: 'What is replication?', a: 'Creating data copies for redundancy' },
        { q: 'What is sharding?', a: 'Horizontal partitioning across servers' },
        { q: 'When should I use replication?', a: 'Always for production (HA)' },
        { q: 'When should I use sharding?', a: 'When data exceeds single server capacity' },
        { q: 'What is a good shard key?', a: 'High cardinality, even distribution' },
        { q: 'What is a bad shard key?', a: 'Low cardinality, skewed distribution' },
        { q: 'Can I change shard key?', a: 'No, must recreate collection' },
        { q: 'What is chunk migration?', a: 'Moving data between shards for balance' },
        { q: 'What is write concern?', a: 'Acknowledgment level for writes' },
        { q: 'What is read preference?', a: 'Which replica to read from' }
      ]
    }
  },
  '2': { // Express.js
    '2': {
      title: 'Routing & Handlers',
      description: 'Master routing patterns and request handlers',
      notes: `# Express Routing & Handlers

## HTTP Methods
- GET: Retrieve data
- POST: Create data
- PUT: Replace data
- PATCH: Update data
- DELETE: Remove data
- HEAD: Like GET without body
- OPTIONS: Describe communication options

## Route Parameters
- URL parameters: /users/:id
- Query strings: ?name=john&age=30
- Request body: JSON, form data

## Route Handlers
Functions that process requests and send responses.
- Single handler: app.get('/path', handler)
- Multiple handlers: Middleware chain
- Error handlers: (err, req, res, next)

## Route Patterns
- Exact: /users
- Wildcard: /users/*
- Regex: /users/:id(\\d+)
- Optional: /users/:id?`,
      examples: [
        {
          title: 'Route Parameters',
          code: `app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, name: 'John' });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: 1, name, email });
});

app.get('/search', (req, res) => {
  const { q, limit } = req.query;
  res.json({ search: q, limit });
});`,
          output: `GET /users/123 => { "userId": "123", "name": "John" }
POST /users => { "id": 1, "name": "John", "email": "john@example.com" }
GET /search?q=test&limit=10 => { "search": "test", "limit": "10" }`
        }
      ],
      faqs: [
        { q: 'What is req.params?', a: 'URL parameters like /users/:id' },
        { q: 'What is req.query?', a: 'Query string parameters after ?' },
        { q: 'What is req.body?', a: 'Request body (JSON, form data)' },
        { q: 'How do I get headers?', a: 'req.headers or req.get(header)' },
        { q: 'What is res.json()?', a: 'Send JSON response' },
        { q: 'What is res.status()?', a: 'Set HTTP status code' },
        { q: 'Can routes use regex?', a: 'Yes, with /pattern/' },
        { q: 'What is optional parameter?', a: '/users/:id? makes id optional' },
        { q: 'How do I return error?', a: 'res.status(400).json({ error })' },
        { q: 'What is route chaining?', a: 'app.route().get().post().put()' }
      ]
    },
    '3': {
      title: 'Middleware',
      description: 'Build middleware functions and middleware chains',
      notes: `# Express Middleware

## What is Middleware?
Functions that process requests before reaching handlers.
- Access to req, res, next
- Can modify request/response
- Can end request-response cycle
- Can pass control to next middleware

## Types
- Application: app.use()
- Router: router.use()
- Error-handling: (err, req, res, next)
- Built-in: express.json(), express.static()
- Third-party: cors, helmet, morgan

## Middleware Order
Top to bottom - order matters!
Order affects which middleware runs first.`,
      examples: [
        {
          title: 'Custom Middleware',
          code: `// Logging middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
};

// Authentication middleware
const auth = (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.use(logger);
app.use(auth);

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});`,
          output: `GET /
{ "message": "Hello" }`
        }
      ],
      faqs: [
        { q: 'What is next()?', a: 'Passes control to next middleware' },
        { q: 'What if I don\'t call next()?', a: 'Middleware chain stops' },
        { q: 'Can middleware modify req?', a: 'Yes, commonly done' },
        { q: 'What is app.use()?', a: 'Register middleware for all routes' },
        { q: 'What is router.use()?', a: 'Register middleware for specific router' },
        { q: 'What is CORS?', a: 'Cross-Origin Resource Sharing' },
        { q: 'What is helmet?', a: 'Security middleware' },
        { q: 'What is morgan?', a: 'Request logging middleware' },
        { q: 'Can I skip middleware?', a: 'No, all matching middleware runs' },
        { q: 'What is middleware scope?', a: 'All routes after middleware definition' }
      ]
    },
    '4': {
      title: 'Error Handling',
      description: 'Handle errors gracefully and implement error middleware',
      notes: `# Error Handling in Express

## Error Types
- Synchronous errors: throw
- Async errors: catch Promise rejections
- Operational: Predictable errors
- Programmer: Bug in code

## Error Middleware
4-parameter function: (err, req, res, next)

## Best Practices
- Catch all errors
- Log errors securely
- Send appropriate status codes
- Don't expose internals
- Use error messages wisely
- Implement retry logic when needed`,
      examples: [
        {
          title: 'Error Handling',
          code: `app.get('/user/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error('ID required');
    }
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message
  });
});`,
          output: `Error: ID required
{ "error": "ID required" }`
        }
      ],
      faqs: [
        { q: 'What is error middleware?', a: '4-parameter middleware for errors' },
        { q: 'When should I throw?', a: 'Synchronous error conditions' },
        { q: 'How handle async errors?', a: 'Try-catch or .catch(next)' },
        { q: 'What status for not found?', a: '404' },
        { q: 'What status for bad request?', a: '400' },
        { q: 'What status for server error?', a: '500' },
        { q: 'Should I log errors?', a: 'Yes, always' },
        { q: 'Should I send stack trace?', a: 'No, security risk' },
        { q: 'What is error recovery?', a: 'Continuing after handling error' },
        { q: 'Should I retry failed requests?', a: 'Yes, with exponential backoff' }
      ]
    },
    '5': {
      title: 'Advanced Patterns',
      description: 'Learn advanced Express patterns and architectures',
      notes: `# Advanced Express Patterns

## MVC Architecture
- Models: Data layer
- Views: Presentation (templates)
- Controllers: Business logic

## Service Layer
Separate business logic from routes.
Reusable across endpoints.

## Validation
- Input validation
- Data sanitization
- Error messages

## Scaling
- Horizontal scaling with clustering
- Load balancing
- API versioning
- Caching strategies

## Security
- Helmet for headers
- Rate limiting
- Input validation
- Authentication/Authorization
- HTTPS enforcement`,
      examples: [
        {
          title: 'MVC Pattern',
          code: `// routes/users.js
const userController = require('../controllers/userController');
router.get('/:id', userController.getUser);

// controllers/userController.js
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// models/User.js
const userSchema = new mongoose.Schema({ ... });
module.exports = mongoose.model('User', userSchema);`,
          output: `GET /users/1 => { "id": "1", "name": "John" }`
        }
      ],
      faqs: [
        { q: 'What is MVC?', a: 'Architecture pattern for organizing code' },
        { q: 'What is service layer?', a: 'Reusable business logic' },
        { q: 'Why separate concerns?', a: 'Maintainability and reusability' },
        { q: 'What is middleware chaining?', a: 'Multiple middleware handling one request' },
        { q: 'What is dependency injection?', a: 'Passing dependencies instead of importing' },
        { q: 'How validate input?', a: 'Use joi, yup, or express-validator' },
        { q: 'What is rate limiting?', a: 'Restricting requests per time' },
        { q: 'What is caching?', a: 'Storing responses to serve faster' },
        { q: 'What is clustering?', a: 'Using multiple processes' },
        { q: 'What is load balancing?', a: 'Distributing requests across servers' }
      ]
    }
  },
  '3': { // Node.js
    '1': {
      title: 'Core Concepts',
      description: 'Understand Node.js fundamentals and architecture',
      notes: `# Node.js Core Concepts

## What is Node.js?
JavaScript runtime built on V8 engine.
- Server-side JavaScript
- Event-driven
- Non-blocking I/O
- Single-threaded

## Event Loop
Processes callbacks in order:
1. Timers (setTimeout, setInterval)
2. Pending callbacks
3. Idle, prepare
4. Poll (I/O)
5. Check (setImmediate)
6. Close callbacks

## Module System
- CommonJS: require/module.exports
- ES Modules: import/export

## npm
Node Package Manager
- Install packages: npm install
- Run scripts: npm run
- Publish: npm publish`,
      examples: [
        {
          title: 'Basic Module',
          code: `// math.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// app.js
const math = require('./math');
console.log(math.add(5, 3));
console.log(math.subtract(10, 4));`,
          output: `8
6`
        }
      ],
      faqs: [
        { q: 'What is V8?', a: 'JavaScript engine powering Node.js' },
        { q: 'Is Node.js single-threaded?', a: 'Yes, single thread for JS' },
        { q: 'What is event-driven?', a: 'Responding to events asynchronously' },
        { q: 'What is non-blocking?', a: 'Not waiting for I/O operations' },
        { q: 'What is package.json?', a: 'Project configuration file' },
        { q: 'What is node_modules?', a: 'Directory containing dependencies' },
        { q: 'What is package-lock.json?', a: 'Locks exact dependency versions' },
        { q: 'How do I run Node?', a: 'node filename.js' },
        { q: 'What is REPL?', a: 'Read-Eval-Print Loop (node prompt)' },
        { q: 'What is nvm?', a: 'Node Version Manager' }
      ]
    },
    '2': {
      title: 'Async Programming',
      description: 'Master async/await, promises, and callbacks',
      notes: `# Async Programming in Node.js

## Callbacks
Function called after operation completes.
- Simple but can nest (callback hell)

## Promises
Better way to handle async operations.
- Pending, Resolved, Rejected states
- .then() for success
- .catch() for errors
- .finally() runs always

## Async/Await
Modern async syntax.
- Cleaner than promises
- Try/catch for errors
- Must return promise

## Common Patterns
- Promise.all() - wait for all
- Promise.race() - wait for first
- Promise.allSettled() - wait for all (no fail)`,
      examples: [
        {
          title: 'Async/Await',
          code: `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log('Data:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

fetchData();`,
          output: `Data: { ... response data ... }`
        }
      ],
      faqs: [
        { q: 'What is async/await?', a: 'Syntactic sugar for promises' },
        { q: 'What is a promise?', a: 'Object for eventual async result' },
        { q: 'What is .then()?', a: 'Handle resolved promise' },
        { q: 'What is .catch()?', a: 'Handle rejected promise' },
        { q: 'Can I use await without async?', a: 'No, await only in async' },
        { q: 'What is Promise.all()?', a: 'Wait for all promises' },
        { q: 'What is Promise.race()?', a: 'Wait for first promise' },
        { q: 'What is microtask?', a: 'High-priority task' },
        { q: 'How handle multiple errors?', a: 'Try-catch wraps all awaits' },
        { q: 'What is finally?', a: 'Runs after then/catch' }
      ]
    },
    '3': {
      title: 'File System',
      description: 'Work with files and directories',
      notes: `# Node.js File System

## Common Operations
- readFile: Read file content
- writeFile: Write to file
- appendFile: Append to file
- unlink: Delete file
- mkdir: Create directory
- readdir: List files
- stat: Get file info
- rename: Rename/move file

## Sync vs Async
- Sync: Blocks execution
- Async: Non-blocking
- Use Async for server apps

## Streams
Process large files efficiently.
- Readable: Read data
- Writable: Write data
- Transform: Modify data`,
      examples: [
        {
          title: 'File Operations',
          code: `const fs = require('fs');

// Read file
fs.readFile('file.txt', 'utf-8', (err, data) => {
  if (err) console.error(err);
  console.log('Content:', data);
});

// Write file
fs.writeFile('output.txt', 'Hello', (err) => {
  if (err) console.error(err);
  console.log('Written');
});`,
          output: `Content: Hello World
Written`
        }
      ],
      faqs: [
        { q: 'What is fs module?', a: 'File system operations' },
        { q: 'Should I use sync?', a: 'No, blocks event loop' },
        { q: 'What is readFile?', a: 'Async read entire file' },
        { q: 'What is appendFile?', a: 'Add content to file' },
        { q: 'How delete file?', a: 'fs.unlink()' },
        { q: 'How list files?', a: 'fs.readdir()' },
        { q: 'What is stream?', a: 'Processing data in chunks' },
        { q: 'When use streams?', a: 'For large files' },
        { q: 'What is encoding?', a: 'utf-8 for text' },
        { q: 'How check file exists?', a: 'fs.existsSync()' }
      ]
    },
    '4': {
      title: 'Streams & Buffers',
      description: 'Handle large data with streams and buffers',
      notes: `# Streams and Buffers

## Buffers
Fixed-size memory area for binary data.
- Create: Buffer.alloc(size)
- From string: Buffer.from(string)
- Operations: concatenation, conversion

## Streams
Process data in chunks.
- Readable: Reading streams
- Writable: Writing streams
- Transform: Modifying streams
- Duplex: Both read and write

## Events
- data: Data available
- end: Stream finished
- error: Error occurred
- drain: Ready for more data`,
      examples: [
        {
          title: 'Stream Example',
          code: `const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt');

readStream.on('data', (chunk) => {
  console.log('Chunk size:', chunk.length);
});

readStream.on('end', () => {
  console.log('Done');
});`,
          output: `Chunk size: 65536
Done`
        }
      ],
      faqs: [
        { q: 'What is stream?', a: 'Processing data in chunks' },
        { q: 'What is buffer?', a: 'Fixed-size memory' },
        { q: 'When use streams?', a: 'Large files or continuous data' },
        { q: 'What is backpressure?', a: 'Reading faster than writing' },
        { q: 'How pipe streams?', a: 'Use .pipe() method' },
        { q: 'What is data event?', a: 'Data chunk received' },
        { q: 'What is end event?', a: 'Stream finished' },
        { q: 'What is error event?', a: 'Error occurred' },
        { q: 'What is transform stream?', a: 'Modifies data while piping' },
        { q: 'How handle backpressure?', a: 'Check return value of write()' }
      ]
    },
    '5': {
      title: 'Performance',
      description: 'Optimize Node.js applications',
      notes: `# Node.js Performance

## Profiling
- CPU profiling: Where time spent
- Memory profiling: Memory usage
- Benchmarking: Compare implementations

## Optimization
- Clustering: Multiple processes
- Caching: Store computed values
- Compression: gzip responses
- Connection pooling: Reuse connections
- Indexing: Database optimization

## Monitoring
- Memory usage
- CPU usage
- Event loop lag
- Request latency`,
      examples: [
        {
          title: 'Clustering',
          code: `const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  require('./server.js');
}`,
          output: `Server running on 4 processes (CPU cores)`
        }
      ],
      faqs: [
        { q: 'What is profiling?', a: 'Measuring performance' },
        { q: 'What is clustering?', a: 'Using multiple processes' },
        { q: 'When use clustering?', a: 'On multi-core servers' },
        { q: 'What is memory leak?', a: 'Unreleased memory' },
        { q: 'How detect leaks?', a: 'Memory profilers' },
        { q: 'What is caching?', a: 'Storing frequent results' },
        { q: 'What is compression?', a: 'gzip responses' },
        { q: 'What is connection pool?', a: 'Reusing DB connections' },
        { q: 'How improve speed?', a: 'Profile, cache, optimize' },
        { q: 'What is event loop lag?', a: 'Delay in processing' }
      ]
    }
  },
  '4': { // React
    '1': {
      title: 'Components & JSX',
      description: 'Master React components and JSX',
      notes: `# React Components and JSX

## Components
- Functional: Functions returning JSX
- Class: ES6 classes (older)
- Hooks: Modern functional components

## JSX
JavaScript XML syntax.
- Looks like HTML
- Compiles to React.createElement()
- Must have single root

## Props
- Pass data to components
- Read-only
- Render different based on props

## Rendering
- ReactDOM.render()
- React 18: createRoot()

## Keys
- Unique identifier for lists
- Helps React identify changes`,
      examples: [
        {
          title: 'Functional Component',
          code: `function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

export default Greeting;`,
          output: `<h1>Hello, Alice!</h1>
<p>Age: 30</p>`
        }
      ],
      faqs: [
        { q: 'What is JSX?', a: 'JavaScript XML syntax' },
        { q: 'What is a component?', a: 'Reusable UI block' },
        { q: 'What are props?', a: 'Data passed to components' },
        { q: 'Can I modify props?', a: 'No, read-only' },
        { q: 'What is key prop?', a: 'Unique identifier for lists' },
        { q: 'Why use keys?', a: 'Help React identify changes' },
        { q: 'What is fragment?', a: 'Wrapper to avoid extra divs' },
        { q: 'What is children prop?', a: 'Nested content' },
        { q: 'Can I use if in JSX?', a: 'No, use ternary/&&' },
        { q: 'What is spread operator?', a: 'Pass all props: {...props}' }
      ]
    },
    '2': {
      title: 'Hooks & State',
      description: 'Use React Hooks for state management',
      notes: `# React Hooks

## Common Hooks
- useState: State management
- useEffect: Side effects
- useContext: Access context
- useReducer: Complex state
- useCallback: Memoize functions
- useMemo: Memoize values
- useRef: Reference to DOM

## Rules
- Only call in components
- Only in render phase
- No conditional calls

## Custom Hooks
Create reusable logic by combining hooks.`,
      examples: [
        {
          title: 'useState Hook',
          code: `import { useState } from 'react';

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
}`,
          output: `Count: 0
[Increment button]
(Click: Count: 1)`
        }
      ],
      faqs: [
        { q: 'What is useState?', a: 'Hook for state management' },
        { q: 'What is useEffect?', a: 'Hook for side effects' },
        { q: 'What is useContext?', a: 'Access context values' },
        { q: 'When call useEffect?', a: 'After render' },
        { q: 'What is dependency array?', a: 'When to re-run effect' },
        { q: 'Empty array means?', a: 'Run once on mount' },
        { q: 'No array means?', a: 'Run on every render' },
        { q: 'What is custom hook?', a: 'Reusable logic function' },
        { q: 'Can I break hook rules?', a: 'No, linter will warn' },
        { q: 'What is useReducer?', a: 'For complex state logic' }
      ]
    },
    '3': {
      title: 'Effect & Lifecycle',
      description: 'Manage component lifecycle with effects',
      notes: `# Component Lifecycle

## useEffect Phases
- Mount: Component added
- Update: State/props change
- Unmount: Component removed

## Common Patterns
- Fetch data on mount
- Cleanup subscriptions
- Update title
- Track mouse position

## Cleanup
Return function to cleanup:
- Cancel requests
- Remove listeners
- Clear timers`,
      examples: [
        {
          title: 'useEffect Example',
          code: `import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(r => r.json())
      .then(d => setData(d));
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}`,
          output: `Loading...
[After fetch: { ... data ... }]`
        }
      ],
      faqs: [
        { q: 'What is useEffect?', a: 'Hook for side effects' },
        { q: 'When does effect run?', a: 'After render' },
        { q: 'How run once?', a: 'Empty dependency array' },
        { q: 'What is cleanup?', a: 'Function to cleanup after' },
        { q: 'When cleanup runs?', a: 'On unmount or before rerun' },
        { q: 'Can I return in effect?', a: 'Only return cleanup function' },
        { q: 'What is mounting?', a: 'Adding component to DOM' },
        { q: 'What is updating?', a: 'Re-render on change' },
        { q: 'What is unmounting?', a: 'Removing from DOM' },
        { q: 'Can I use async in effect?', a: 'No, create async inside' }
      ]
    },
    '4': {
      title: 'Context API',
      description: 'Share data with Context API',
      notes: `# React Context API

## Usage
- Create context
- Provide value
- Consume in components

## When to Use
- Global state (theme, auth)
- Avoid prop drilling
- Not for frequently changing data

## useContext
Hook to access context values.`,
      examples: [
        {
          title: 'Context Example',
          code: `import { createContext, useContext } from 'react';

const ThemeContext = createContext();

function Provider({ children }) {
  const [theme, setTheme] = useContext('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Component() {
  const { theme } = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}`,
          output: `Theme: light`
        }
      ],
      faqs: [
        { q: 'What is Context?', a: 'Share data across components' },
        { q: 'What is createContext?', a: 'Create context object' },
        { q: 'What is Provider?', a: 'Provide value to consumers' },
        { q: 'What is useContext?', a: 'Hook to use context' },
        { q: 'When use Context?', a: 'For global state' },
        { q: 'When not use?', a: 'Frequently changing data' },
        { q: 'Can Context replace Redux?', a: 'For simple cases yes' },
        { q: 'How update context?', a: 'Create update function' },
        { q: 'What is Consumer?', a: 'Old way to use context' },
        { q: 'Can I nest Providers?', a: 'Yes, they stack' }
      ]
    },
    '5': {
      title: 'Performance & Optimization',
      description: 'Optimize React applications',
      notes: `# React Performance

## Techniques
- Code splitting
- Lazy loading
- Memoization
- useCallback
- useMemo
- React.memo

## Profiling
- React DevTools Profiler
- Identify slow components
- Check re-renders

## Best Practices
- Avoid unnecessary renders
- Use key prop correctly
- Break into smaller components`,
      examples: [
        {
          title: 'useMemo Example',
          code: `import { useMemo } from 'react';

function Component({ items }) {
  const sortedItems = useMemo(() => {
    return [...items].sort();
  }, [items]);

  return (
    <ul>
      {sortedItems.map(i => <li key={i}>{i}</li>)}
    </ul>
  );
}`,
          output: `<li>Apple</li>
<li>Banana</li>
<li>Cherry</li>`
        }
      ],
      faqs: [
        { q: 'What is React.memo?', a: 'Memoize components' },
        { q: 'What is useMemo?', a: 'Memoize values' },
        { q: 'What is useCallback?', a: 'Memoize functions' },
        { q: 'When optimize?', a: 'Only if slow' },
        { q: 'What is code splitting?', a: 'Load code on demand' },
        { q: 'What is lazy loading?', a: 'Defer component loading' },
        { q: 'How use React.lazy?', a: 'Dynamic import' },
        { q: 'What is Suspense?', a: 'Boundary for async' },
        { q: 'How profile?', a: 'React DevTools Profiler' },
        { q: 'What causes re-renders?', a: 'State/prop changes' }
      ]
    }
  },
  '5': { // Angular
    '1': {
      title: 'Setup & Components',
      description: 'Set up Angular and create components',
      notes: `# Angular Setup and Components

## Project Structure
- app.component.ts: Root component
- app.module.ts: Root module
- app.routing.ts: Routes
- services/: Business logic

## Decorators
- @Component: Define component
- @NgModule: Define module
- @Injectable: Mark as service
- @Input/@Output: Component communication

## Component Lifecycle
- ngOnInit: Initialize
- ngOnDestroy: Cleanup
- ngOnChanges: Input changes
- ngAfterViewInit: View ready`,
      examples: [
        {
          title: 'Angular Component',
          code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: '<h1>Hello {{ name }}</h1>',
  styles: ['h1 { color: blue; }']
})
export class HelloComponent {
  name = 'Angular';
}`,
          output: `<h1 style="color: blue;">Hello Angular</h1>`
        }
      ],
      faqs: [
        { q: 'What is decorator?', a: 'Function that marks class' },
        { q: 'What is module?', a: 'Collection of components' },
        { q: 'What is service?', a: 'Shared business logic' },
        { q: 'What is dependency injection?', a: 'Automatic service injection' },
        { q: 'What is TypeScript?', a: 'Typed JavaScript' },
        { q: 'What is ng cli?', a: 'Command line tool' },
        { q: 'How create component?', a: 'ng generate component' },
        { q: 'What is app module?', a: 'Root module' },
        { q: 'What is selector?', a: 'Component tag name' },
        { q: 'What is template?', a: 'Component HTML' }
      ]
    },
    '2': {
      title: 'Templates & Binding',
      description: 'Master Angular templates',
      notes: `# Angular Templates

## Bindings
- Interpolation: {{ data }}
- Property: [property]="value"
- Event: (event)="handler()"
- Two-way: [(ngModel)]="value"

## Directives
- *ngIf: Conditional
- *ngFor: Loops
- *ngSwitch: Switch
- [ngClass]: Dynamic class
- [ngStyle]: Dynamic style

## Pipes
- {{ date | date }}
- {{ price | currency }}
- {{ text | uppercase }}`,
      examples: [
        {
          title: 'Two-way Binding',
          code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  template: '<input [(ngModel)]="text"> {{ text }}'
})
export class InputComponent {
  text = '';
}`,
          output: `[input field] [user types 'hello'] hello`
        }
      ],
      faqs: [
        { q: 'What is interpolation?', a: '{{ }} for showing data' },
        { q: 'What is property binding?', a: '[property]="value"' },
        { q: 'What is event binding?', a: '(event)="handler()"' },
        { q: 'What is two-way binding?', a: '[(ngModel)]="value"' },
        { q: 'What is *ngIf?', a: 'Conditional rendering' },
        { q: 'What is *ngFor?', a: 'Loop through array' },
        { q: 'What is pipe?', a: 'Transform data display' },
        { q: 'What is [ngClass]?', a: 'Dynamic class binding' },
        { q: 'What is [ngStyle]?', a: 'Dynamic style binding' },
        { q: 'What is template ref?', a: '#refName for element' }
      ]
    },
    '3': {
      title: 'Services & DI',
      description: 'Create services and use dependency injection',
      notes: `# Angular Services and DI

## Service Pattern
- Create service class
- Mark with @Injectable
- Inject into components

## Dependency Injection
- Constructor injection
- Module providers
- Component providers
- Hierarchical injectors`,
      examples: [
        {
          title: 'Service Example',
          code: `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return { id: 1, name: 'John' };
  }
}

// In component
constructor(private dataService: DataService) {}
data = this.dataService.getData();`,
          output: `{ "id": 1, "name": "John" }`
        }
      ],
      faqs: [
        { q: 'What is service?', a: 'Class with business logic' },
        { q: 'What is @Injectable?', a: 'Mark service as injectable' },
        { q: 'What is dependency injection?', a: 'Automatic service injection' },
        { q: 'What is provider?', a: 'Registration instruction' },
        { q: 'What is HttpClient?', a: 'Service for HTTP requests' },
        { q: 'What is Observable?', a: 'Async data stream' },
        { q: 'How call API?', a: 'Use HttpClient in service' },
        { q: 'How unsubscribe?', a: 'Call unsubscribe()' },
        { q: 'What is providedIn?', a: 'Where to register' },
        { q: 'What is hierarchical?', a: 'Injector scope levels' }
      ]
    },
    '4': {
      title: 'Routing',
      description: 'Set up routing in Angular',
      notes: `# Angular Routing

## Routes
- Path: URL segment
- Component: Component to display
- Children: Sub-routes
- Redirects: URL redirects

## Router
- navigate(): Programmatic
- routerLink: Template directive
- ActivatedRoute: Current route info
- Router Guards: Access control`,
      examples: [
        {
          title: 'Route Configuration',
          code: `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }`,
          output: `Routes configured for /, /about, /user/:id`
        }
      ],
      faqs: [
        { q: 'What is routing?', a: 'Navigation between pages' },
        { q: 'What is router module?', a: 'Module for routing' },
        { q: 'What is router outlet?', a: '<router-outlet> displays component' },
        { q: 'What is routerLink?', a: '[routerLink] navigation' },
        { q: 'What is route params?', a: ':param in path' },
        { q: 'What is ActivatedRoute?', a: 'Current route info' },
        { q: 'What is guard?', a: 'Access control' },
        { q: 'What is resolver?', a: 'Pre-fetch data' },
        { q: 'How navigate?', a: 'router.navigate()' },
        { q: 'What is lazy loading?', a: 'Load module on demand' }
      ]
    },
    '5': {
      title: 'RxJS & Observables',
      description: 'Master RxJS and reactive programming',
      notes: `# RxJS and Observables

## Observable
- Lazy evaluation
- Multiple values over time
- Cancellable

## Subjects
- Multicast observable
- Acts as both observable and observer

## Operators
- map: Transform values
- filter: Filter values
- merge: Combine observables
- switchMap: Switch to new observable`,
      examples: [
        {
          title: 'Observable Example',
          code: `import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next('Hello');
  subscriber.next('RxJS');
  subscriber.complete();
});

observable.subscribe(value => {
  console.log(value);
});`,
          output: `Hello
RxJS`
        }
      ],
      faqs: [
        { q: 'What is Observable?', a: 'Async data stream' },
        { q: 'What is subscribe?', a: 'Listen to Observable' },
        { q: 'What is operator?', a: 'Transform data' },
        { q: 'What is map?', a: 'Transform values' },
        { q: 'What is filter?', a: 'Filter values' },
        { q: 'What is Subject?', a: 'Observable and Observer' },
        { q: 'What is mergeMap?', a: 'Combine observables' },
        { q: 'What is switchMap?', a: 'Switch to new observable' },
        { q: 'What is takeUntil?', a: 'Stop on condition' },
        { q: 'What is async pipe?', a: 'Subscribe in template' }
      ]
    }
  }
};
