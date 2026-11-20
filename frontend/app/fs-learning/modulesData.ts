export const MODULE_DATA_COMPLETE: Record<string, Record<string, any>> = {
  '1': { // MongoDB
    '1': {
      title: 'Introduction & Setup',
      description: 'Get started with MongoDB - installation, basic concepts, and configuration',
      notes: `# MongoDB Introduction & Setup

## What is MongoDB?
MongoDB is a NoSQL database that stores data in JSON-like documents. It provides flexible schema design, horizontal scalability, high performance and availability, and easy integration with JavaScript/Node.js. Unlike traditional SQL databases with rigid table structures, MongoDB allows you to store data in a more natural, hierarchical format that closely matches how your application objects are structured.

## Why Choose MongoDB?
- Document-oriented: Data stored as flexible JSON-like documents
- Flexible schema: Add fields without altering structure for all documents
- Scalability: Built-in support for horizontal scaling through sharding
- Performance: Optimized for read/write operations with indexing support
- Developer-friendly: JSON format is intuitive for developers

## Installation

### Windows
1. Download MongoDB Community Edition from mongodb.com
2. Run the installer
3. Choose "Install MongoDB as a Service"
4. Access mongosh (MongoDB Shell)
5. MongoDB will start automatically as a Windows service

### Mac
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
mongosh  # Launch MongoDB Shell
\`\`\`

### Linux
\`\`\`bash
sudo apt-get install mongodb
sudo systemctl start mongod
mongosh  # Launch MongoDB Shell
\`\`\`

## Connecting to MongoDB

### Using Mongoose (Recommended for Node.js)
Provides schema-based modeling, built-in validation and casting, middleware and hooks support. Mongoose is an ODM (Object Document Mapper) that adds structure and validation to MongoDB.

### Using MongoDB Driver
Direct, low-level database access with maximum flexibility. Requires manual schema management but offers more control. Use when you need direct access to MongoDB features.

### Using MongoDB Atlas (Cloud)
Fully managed cloud service with automated backups, security, and scaling. No installation needed - just create an account and get a connection string.`,
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
        { q: 'What is the difference between MongoDB and SQL databases?', a: 'MongoDB is a document-based NoSQL database that stores data in flexible JSON-like documents, while SQL databases use structured tables with predefined schemas. MongoDB is better suited for unstructured or semi-structured data, rapid development where schemas evolve frequently, and horizontal scaling. SQL databases excel at complex relationships, transactions, and data that fits a relational model well. The choice depends on your specific use case and data structure requirements.' },
        { q: 'What is a collection in MongoDB?', a: 'A collection is similar to a table in SQL databases, but with important differences. It stores multiple documents without requiring a fixed schema, meaning different documents in the same collection can have different field structures. Collections are created automatically when you insert the first document, and you can have as many collections as needed. Collections are flexible by design, allowing you to evolve your data model without migrations.' },
        { q: 'What is a document in MongoDB?', a: 'A document is a single record in MongoDB stored in BSON (Binary JSON) format, which is similar to a JSON object or a row in a SQL table. Each document has a unique _id field that serves as the primary key. Documents can contain nested objects and arrays, allowing for complex data structures to be stored in a single document. This hierarchical structure matches how most programming languages represent objects.' },
        { q: 'How do I create a new MongoDB database?', a: 'In MongoDB, databases are created implicitly when you first insert a document into a collection. Simply connect to MongoDB, select a database using `use dbname`, and insert your first document. MongoDB will automatically create the database if it doesn\'t exist. You don\'t need to run a CREATE DATABASE command like in SQL. You can also use `db.createCollection()` to explicitly create a collection.' },
        { q: 'Is MongoDB free?', a: 'Yes, MongoDB Community Edition is completely free and open-source under the SSPL license. MongoDB Atlas, the cloud-hosted version, offers a free tier with 512MB storage, shared resources, and limited backups - perfect for learning and small projects. Enterprise version is commercial but includes enterprise support, advanced security, and features for large-scale deployments.' },
        { q: 'What is ObjectId in MongoDB?', a: 'ObjectId is a 12-byte unique identifier automatically generated for each document as the _id field if you don\'t provide one. It\'s constructed from a timestamp, machine identifier, process ID, and a random counter, making it globally unique across different machines and MongoDB instances. ObjectIds are sortable by creation time and require no central coordination, making them ideal for distributed systems.' },
        { q: 'Can MongoDB replace MySQL?', a: 'It depends entirely on your use case and requirements. MongoDB is excellent for flexible schemas, rapid development, horizontal scaling, and handling unstructured data. MySQL is better for complex transactions, complex relationships between data, enforcing data integrity, and established SQL ecosystem tools. Many modern applications use both - MongoDB for flexible document storage and MySQL for transactional data.' },
        { q: 'What are indexes in MongoDB?', a: 'Indexes are special data structures that improve query performance by creating optimized storage for field values. MongoDB supports single-field indexes for queries on one field, compound indexes for queries on multiple fields, and specialized indexes like text indexes for full-text search. Without indexes, MongoDB must perform a collection scan examining every document. Proper indexing is crucial for application performance.' },
        { q: 'How do I backup MongoDB?', a: 'For self-hosted MongoDB, use mongodump to export all data to files and mongorestore to import them back. For MongoDB Atlas cloud service, automated backups are included automatically with point-in-time recovery. You should implement regular backup strategies, store backups in a separate location, and test restoration procedures regularly to ensure data recovery capability.' },
        { q: 'What is replication in MongoDB?', a: 'Replication creates copies of data across multiple MongoDB servers (a replica set) for high availability and disaster recovery. If the primary server fails, one of the secondary servers automatically becomes the new primary. Replication ensures data durability, enables read scaling by allowing reads from secondary nodes, and provides automatic failover without manual intervention.' }
      ]
    },
    '2': {
      title: 'CRUD Operations',
      description: 'Master Create, Read, Update, Delete operations in MongoDB',
      notes: `# MongoDB CRUD Operations

## Create Operations
Insert new documents into collections using insertOne() for single documents or insertMany() for multiple documents. Each insert automatically generates an _id field if not provided. You can specify custom _id values or let MongoDB generate them.

## Read Operations
Query documents using find() with various filters and options. Use findOne() to get a single document, find() for multiple, or findById() for documents with specific IDs. Apply projections to select specific fields and use various query operators for complex conditions.

## Update Operations
Modify existing documents with updateOne() for single document or updateMany() for multiple documents. Use update operators like $set, $inc, $push, $pull to modify specific fields. Use replaceOne() to replace entire documents.

## Delete Operations
Remove documents with deleteOne() to remove one or deleteMany() to remove multiple. Be careful with deleteMany() as it removes all matching documents permanently.`,
      examples: [
        {
          title: 'Create: Insert Documents',
          code: `const user = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
};

// Insert single document
db.users.insertOne(user);

// Insert multiple documents
db.users.insertMany([
  { name: 'Jane', email: 'jane@example.com', age: 25 },
  { name: 'Bob', email: 'bob@example.com', age: 35 }
]);`,
          output: `Inserted 1 document
Inserted 2 documents`
        },
        {
          title: 'Read: Query Documents',
          code: `// Find all documents
db.users.find();

// Find with filter
db.users.find({ age: { $gt: 25 } });

// Find one document
db.users.findOne({ email: 'john@example.com' });

// Find with projection
db.users.find({}, { name: 1, email: 1 });`,
          output: `All users returned
Users aged > 25
{ name: 'John Doe', email: 'john@example.com', ... }
Only name and email fields`
        },
        {
          title: 'Update: Modify Documents',
          code: `// Update single document
db.users.updateOne(
  { email: 'john@example.com' },
  { $set: { age: 31 } }
);

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 25 } },
  { $set: { status: 'young' } }
);

// Replace entire document
db.users.replaceOne(
  { _id: ObjectId('...') },
  { name: 'John', age: 32 }
);`,
          output: `Updated 1 document
Updated 2 documents
Replaced 1 document`
        },
        {
          title: 'Delete: Remove Documents',
          code: `// Delete single document
db.users.deleteOne({ email: 'bob@example.com' });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 20 } });

// Delete all documents (be careful!)
db.users.deleteMany({});`,
          output: `Deleted 1 document
Deleted 2 documents
Deleted all documents`
        }
      ],
      faqs: [
        { q: 'What is the difference between insertOne and insertMany?', a: 'insertOne() inserts a single document and returns the ID of the inserted document. insertMany() inserts multiple documents at once and returns an array of inserted IDs. insertMany() is more efficient for bulk operations as it reduces network round-trips. Use insertMany() when you need to insert many documents at once for better performance.' },
        { q: 'How do I handle errors during CRUD operations?', a: 'All CRUD operations can throw errors like duplicate key errors if _id already exists. Use try-catch blocks to handle these errors gracefully. For insertMany(), use the ordered option: false to continue inserting even if some documents fail. MongoDB also provides detailed error codes and messages that help identify the specific issue that occurred.' },
        { q: 'What is an update operator and why do I need it?', a: 'Update operators like $set, $inc, $push, $pull define how to modify specific fields without replacing the entire document. $set updates field values, $inc increments numbers, $push adds to arrays, $pull removes from arrays. Without operators, updateOne() with the new document replaces the entire record. Using operators is more efficient as they only modify specified fields.' },
        { q: 'Can I update multiple fields at once?', a: 'Yes, you can update multiple fields in a single operation by using multiple update operators. For example, { $set: { name: "New Name", age: 30 }, $inc: { credits: 10 } } updates name and age, and increments credits all in one operation. This is atomic and efficient, ensuring all updates happen together or not at all.' },
        { q: 'What is the difference between update and replace operations?', a: 'updateOne() with operators modifies specific fields while keeping other fields intact. replaceOne() removes the entire document and replaces it with a new one, except for the _id field which is preserved. Use update for partial changes and replace when you want to swap out the entire document structure. Update is safer for preserving existing data you don\'t want to touch.' },
        { q: 'How do I delete multiple documents safely?', a: 'Always use filters carefully with deleteMany() to avoid accidentally deleting all documents. Test your filter with find() first to see which documents match. Use the most specific filter possible and consider archiving data instead of deleting for audit trails. Implement a soft delete pattern using a flag field instead of permanent deletion for important data.' },
        { q: 'What happens if I update a document that does not exist?', a: 'By default, updateOne() and updateMany() do nothing if no matching document exists - they return a result with modifiedCount: 0. You can use the upsert option: true to automatically insert a new document if no match is found, creating it with the provided filters and update fields combined.' },
        { q: 'Can I perform conditional updates based on document content?', a: 'Yes, you can use filters with complex operators like $gt, $lt, $in, $regex to find documents matching specific conditions, then update only those documents. Aggregation pipelines in updates allow even more complex logic. For simple conditional logic, use find() to get documents first, then decide whether to update.' },
        { q: 'What is bulk operations and when should I use them?', a: 'Bulk operations allow you to send multiple insert, update, or delete operations in a single request. initializeOrderedBulkOp() processes operations in order and stops on first error, while initializeUnorderedBulkOp() continues despite errors. Use bulk operations for better performance with large numbers of operations, reducing network overhead significantly.' },
        { q: 'How do I ensure write safety in MongoDB?', a: 'Use write concern options to specify durability level. { w: 1 } acknowledges write to primary (default), { w: "majority" } waits for majority of replicas, { j: true } ensures journal persistence. Higher write concern means slower writes but greater safety. For critical operations, use majority write concern; for non-critical data, use the default.' }
      ]
    },
    '3': {
      title: 'Querying & Indexing',
      description: 'Master advanced querying techniques and performance optimization with indexes',
      notes: `# MongoDB Querying & Indexing - Advanced Techniques

## Query Operators for Filtering

MongoDB provides comprehensive query operators for filtering documents. Comparison operators ($eq, $ne, $gt, $gte, $lt, $lte, $in, $nin) compare field values to specified values. Logical operators ($and, $or, $not, $nor) combine multiple conditions. Element operators ($exists, $type) check field existence and type. Array operators ($all, $elemMatch, $size) query array fields. Text operators enable full-text search across text indexes.

## Projection: Selecting Fields

Projections control which fields appear in query results. Use { field: 1 } to include fields or { field: 0 } to exclude fields. The _id field is included by default; explicitly set { _id: 0 } to exclude it. You cannot mix inclusion and exclusion in the same projection except for _id. Use projection to reduce network bandwidth and improve performance by only returning necessary fields.

## Sorting and Pagination

Sort results with sort({ field: 1 }) for ascending or sort({ field: -1 }) for descending. Use limit(n) to return at most n documents and skip(n) to skip the first n documents. Implement pagination by combining skip and limit: skip((page-1)*pageSize).limit(pageSize). Always sort before pagination for consistent results, as unsorted documents can be in unpredictable order.

## Indexing Fundamentals

Indexes dramatically improve query performance by pre-organizing data. Without indexes, MongoDB performs collection scans examining every document. Single-field indexes index one field for queries on that field alone. Compound indexes index multiple fields for queries on combined fields - field order matters. Text indexes enable full-text search. Unique indexes ensure field values are unique. Sparse indexes only index documents with the indexed field.

## Understanding Query Plans

MongoDB's explain() method shows the query plan - how MongoDB executes your query. COLLSCAN means MongoDB scanned the entire collection (bad), requiring optimization. IXSCAN means MongoDB used an index (good). The number of examined documents should equal returned documents for optimal queries. Use explain() to identify slow queries and determine where to add indexes.

## Best Practices for Indexing

Create indexes on fields used frequently in queries and filters. Compound indexes should follow the ESR rule: Equality fields first, then Sort fields, then Range fields. Too many indexes slow down write operations, so balance read and write performance. Monitor index usage and remove unused indexes. Test performance before and after adding indexes to confirm they help.`,
      examples: [
        {
          title: 'Advanced Query Operators',
          code: `// Comparison operators
db.users.find({ age: { $gte: 25, $lte: 35 } });  // Between 25-35
db.users.find({ status: { $in: ['active', 'pending'] } }); // In array

// Logical operators
db.products.find({
  $or: [
    { price: { $lt: 100 } },
    { onSale: true }
  ]
});

// Array operators
db.posts.find({ tags: { $all: ['mongodb', 'database'] } });
db.students.find({ scores: { $elemMatch: { $gte: 90 } } });

// Element operators
db.users.find({ phone: { $exists: true } });`,
          output: `Users aged 25-35 returned
Products matching either condition
Posts with both tags
Students with scores >= 90`
        },
        {
          title: 'Projection and Sorting',
          code: `// Project specific fields only
db.users.find(
  { age: { $gt: 25 } },
  { name: 1, email: 1, _id: 0 }  // Only name and email
);

// Sort and limit
db.users.find({ status: 'active' })
  .sort({ createdAt: -1 })  // Newest first
  .limit(10);

// Pagination example
const pageSize = 20;
const page = 2;
db.users.find()
  .skip((page - 1) * pageSize)
  .limit(pageSize);`,
          output: `Only name and email fields returned
10 newest active users
20 users for page 2`
        },
        {
          title: 'Creating and Managing Indexes',
          code: `// Single field index
db.users.createIndex({ email: 1 });

// Compound index (order matters!)
db.orders.createIndex({
  customerId: 1,
  orderDate: -1
});

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// View all indexes
db.users.getIndexes();

// Drop specific index
db.users.dropIndex({ email: 1 });

// Drop all indexes except _id
db.users.dropIndexes();`,
          output: `Indexes created successfully
[_id, email, (customerId, orderDate)]`
        },
        {
          title: 'Using explain() for Query Optimization',
          code: `// Analyze query plan
db.users.find({ email: 'test@example.com' }).explain('executionStats');

// Output shows:
// - executionStages: What MongoDB did
// - totalDocsExamined: Docs examined (should equal returned)
// - executionTimeMillis: Execution time
// - IXSCAN: Used index (good)
// - COLLSCAN: Full scan (bad, needs index)

// Slow query - no index
db.users.find({ phone: '555-1234' });

// Fast query - with index
db.users.createIndex({ phone: 1 });`,
          output: `Query plan analysis returned
IXSCAN: Used index for email
Execution time reduced from 500ms to 2ms`
        }
      ],
      faqs: [
        { q: 'What is an index and why is it critical for performance?', a: 'An index is a special data structure that stores field values in a sorted, organized way, similar to a book\'s index pointing to pages. Without indexes, MongoDB must scan every document in a collection (COLLSCAN) to find matches, which is very slow for large datasets. With indexes, MongoDB can quickly locate matching documents using binary search or B-tree algorithms. Proper indexing can improve query performance from seconds to milliseconds, making it essential for production applications.' },
        { q: 'When should I create an index on a field?', a: 'Create indexes on fields that are frequently used in query filters, sort operations, or join conditions. Analyze your application\'s query patterns and identify the most common queries. Create indexes on equality fields (used in $eq), sort fields (used in sort()), and range fields (used in $gt, $lt). However, indexes also slow down write operations, so balance read and write performance needs. Monitor index usage with MongoDB\'s index statistics to remove unused indexes.' },
        { q: 'What is a compound index and why does field order matter?', a: 'A compound index indexes multiple fields together, useful when queries filter on multiple fields. Field order matters tremendously - the index structure follows the order you specify. For optimal performance, follow the ESR rule: Equality fields first (exact match), Sort fields second (sorting), Range fields third (comparison operators). For example, an index on (customerId, orderDate, amount) works best for queries filtering on customerId, sorting by orderDate, and filtering on amount ranges.' },
        { q: 'How many indexes should a collection have and why?', a: 'There\'s no fixed number, but fewer is better than more. Each index takes storage space and slows write operations slightly. Typically, collections have 3-10 indexes depending on query patterns. Analyze which queries run most frequently and create indexes for those. Remove duplicate or redundant indexes - a compound index on (a, b) partially covers queries on just (a). Monitor index usage statistics and remove unused indexes regularly to maintain optimal performance.' },
        { q: 'What is COLLSCAN versus IXSCAN and why do I care?', a: 'COLLSCAN means MongoDB performed a collection scan, examining every single document in the collection to find matches - this is slow. IXSCAN means MongoDB used an index to quickly locate documents - this is fast. When you see COLLSCAN in explain() output, it\'s a red flag indicating your query needs an index. The goal is IXSCAN for all commonly run queries. The number of "totalDocsExamined" should roughly equal "totalDocsReturned" for efficient queries.' },
        { q: 'How do I optimize slow queries effectively?', a: 'First, use explain("executionStats") to understand how MongoDB executes the query and identify bottlenecks. If COLLSCAN appears, create appropriate indexes. Check query selectivity - does the filter reduce the result set significantly? Use projections to return only needed fields. Consider query structure - reorder conditions so most selective conditions come first. For complex queries, try aggregation pipeline which can be more efficient. After changes, verify improvement with explain() again.' },
        { q: 'What is a unique index and when should I use it?', a: 'A unique index ensures that all values in the indexed field are unique across the collection - no duplicates allowed. Use unique indexes on fields that must be unique like email addresses, usernames, or account numbers. Unique indexes enforce data integrity at the database level, preventing invalid data before it\'s inserted. The _id field always has a unique index by default. You can create unique indexes with { unique: true } option, with optional sparse indexing for handling null values.' },
        { q: 'What is the difference between regular index and sparse index?', a: 'A regular index includes all documents in the collection, even those missing the indexed field. A sparse index only includes documents that have the indexed field, excluding documents where the field is missing or null. Sparse indexes use less storage and are faster when the field is sparse (exists in few documents). However, sparse indexes can\'t be used for all query types. Use sparse indexes for optional fields that don\'t exist in many documents to reduce index size.' },
        { q: 'How do I monitor which indexes are actually being used?', a: 'MongoDB provides statistics on index usage through the aggregate pipeline with $indexStats stage. Tools like MongoDB Compass visually show index performance. The mongotop and mongostat utilities show real-time index activity. Query explain() results show if an index was used. Remove indexes that never appear in queries or slow down writes more than helping reads. Regularly audit indexes in production to maintain optimal performance and clean up technical debt.' },
        { q: 'Can I delete an index and how does it affect queries?', a: 'Yes, use dropIndex() to delete a specific index or dropIndexes() to delete all non-_id indexes. Deleting an index frees storage and speeds up write operations, but queries that relied on that index will slow down significantly, potentially causing COLLSCAN. Always plan index deletion carefully - review query patterns first to understand impact. After deletion, monitor application performance to confirm no queries become too slow. The _id index cannot be deleted as it\'s automatically maintained.' }
      ]
    },
    '4': {
      title: 'Aggregation Pipeline',
      description: 'Process and transform data through multiple stages of transformation',
      notes: `# MongoDB Aggregation Pipeline - Data Processing & Transformation

## Understanding the Aggregation Pipeline

The aggregation pipeline is a framework for processing data records from a collection through multiple stages, transforming them step by step. Each stage takes input documents and produces output documents that feed into the next stage. The pipeline is processed sequentially, with each stage operating on results from the previous stage. This is powerful for analytics, reporting, and complex data transformations that would be difficult or impossible with simple queries.

## Pipeline Stages Overview

$match stage filters documents like find(), reducing dataset early. $project selects which fields to include/exclude and can create computed fields. $group aggregates documents by a key, computing totals, averages, counts, etc. $sort orders results. $limit restricts output size. $skip skips initial documents. $unwind deconstructs array fields into separate documents. $lookup performs joins with other collections. $addFields adds new computed fields. $facet creates multiple sub-pipelines in parallel. $out writes results to a new collection.

## Grouping and Aggregation

The $group stage is fundamental for analysis. Use _id to specify grouping key - set to null to group all documents. Use aggregation operators like $sum, $avg, $max, $min, $push, $addToSet, $first, $last to compute values across group. For example, grouping sales by customer and summing amounts shows total spending per customer. Grouping by date and counting shows activity per day. Complex grouping on multiple fields reveals multi-dimensional patterns.

## Joining Collections

$lookup performs a left outer join with another collection. Specify localField from current collection, foreignField from other collection, and new field name for joined data. The joined data appears as an array. Use $unwind to flatten arrays after joining. Pipeline after lookup continues processing joined data. This enables relationships between collections without denormalizing data into single documents.

## Advanced Pipeline Patterns

Combine multiple stages for complex transformations. Pipeline efficiency matters - use $match early to reduce data. Avoid $group before $match when possible. Use $facet to create multiple analytics views in parallel, computed once from the same input. Use $bucket to categorize numeric values into ranges. Use $graphLookup for hierarchical/recursive data. Pipeline stages can process large datasets that don't fit in memory.

## Performance Considerations

Index-aware stages like $match can use indexes before pipeline execution. Stages that require sorting ($sort, $group) may need indexes or memory. Each stage builds temporary collections in memory, so early filtering is crucial. Monitor with explain("executionStats") to understand execution. Aggregate computations are done server-side, reducing network traffic compared to fetching all data to application.`,
      examples: [
        {
          title: 'Basic Aggregation with $match and $group',
          code: `// Find total sales per customer in 2024
db.orders.aggregate([
  { $match: {
    orderDate: { $gte: new Date('2024-01-01') },
    status: 'completed'
  }},
  { $group: {
    _id: '$customerId',
    totalAmount: { $sum: '$amount' },
    orderCount: { $sum: 1 },
    avgAmount: { $avg: '$amount' },
    lastOrder: { $max: '$orderDate' }
  }},
  { $sort: { totalAmount: -1 }},
  { $limit: 10 }
]);`,
          output: `Top 10 customers by total spending with order stats
_id: customerId, totalAmount, orderCount, avgAmount`
        },
        {
          title: 'Aggregation with $lookup (Join)',
          code: `// Join orders with customer details
db.orders.aggregate([
  { $match: { status: 'pending' }},
  { $lookup: {
    from: 'customers',
    localField: 'customerId',
    foreignField: '_id',
    as: 'customerDetails'
  }},
  { $unwind: '$customerDetails' },
  { $project: {
    orderId: 1,
    'customerDetails.name': 1,
    'customerDetails.email': 1,
    amount: 1,
    orderDate: 1
  }},
  { $sort: { orderDate: -1 }}
]);`,
          output: `Pending orders with customer info
Customer name and email included`
        },
        {
          title: 'Complex Analysis with Multiple Stages',
          code: `// Daily revenue analysis with product details
db.sales.aggregate([
  { $match: { saleDate: { $gte: new Date('2024-01-01') }}},
  { $lookup: {
    from: 'products',
    localField: 'productId',
    foreignField: '_id',
    as: 'product'
  }},
  { $unwind: '$product' },
  { $group: {
    _id: {
      date: { $dateToString: { format: '%Y-%m-%d', date: '$saleDate' }},
      category: '$product.category'
    },
    revenue: { $sum: '$amount' },
    units: { $sum: '$quantity' },
    avgPrice: { $avg: '$price' }
  }},
  { $sort: { '_id.date': -1, revenue: -1 }}
]);`,
          output: `Daily revenue by category
Shows trends and category performance`
        },
        {
          title: 'Using $facet for Multiple Analytics',
          code: `// Generate multiple analytics simultaneously
db.users.aggregate([
  { $facet: {
    byAge: [
      { $group: {
        _id: { $floor: { $divide: ['$age', 10] }},
        count: { $sum: 1 }
      }},
      { $sort: { _id: 1 }}
    ],
    byStatus: [
      { $group: {
        _id: '$status',
        count: { $sum: 1 }
      }}
    ],
    topCities: [
      { $group: {
        _id: '$city',
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 }},
      { $limit: 5 }
    ]
  }}
]);`,
          output: `Age distribution, status breakdown, top 5 cities
All computed in single pipeline execution`
        }
      ],
      faqs: [
        { q: 'What is an aggregation pipeline and how does it differ from find()?', a: 'An aggregation pipeline processes documents through multiple sequential stages, transforming data step by step. Each stage takes the output of the previous stage as input. Unlike find() which simply retrieves documents and applies basic filtering, aggregation pipeline can perform complex transformations, grouping, joining, and calculations. Aggregation pipeline is more powerful for analytics and reporting but slightly more complex to write. Use find() for simple queries and aggregation pipeline for complex data processing and analysis.' },
        { q: 'What is the $group stage and how do I use aggregation operators?', a: 'The $group stage aggregates documents by a grouping key specified in the _id field. Set _id to null to group all documents together, or to a field like "$category" to group by that field. Use aggregation operators with $group: $sum adds values, $avg calculates average, $count counts documents, $max finds maximum, $min finds minimum, $push creates array of values, $first/$last gets first/last value. For example, { _id: "$category", totalAmount: { $sum: "$price" }} groups by category and totals prices.' },
        { q: 'How do I join data from multiple collections using $lookup?', a: '$lookup performs a left outer join with another collection. Specify "from" (other collection name), "localField" (field in current collection), "foreignField" (field in other collection), and "as" (output field name). The joined data appears as an array in the output field. If you want single objects instead of arrays, use $unwind after $lookup to flatten the array. Performance improves when localField is indexed. Use $lookup for relationships between normalized collections.' },
        { q: 'Why should I use $match early in my pipeline?', a: 'Using $match as early as possible in your pipeline dramatically improves performance. If $match comes before $group, MongoDB can use indexes to quickly filter documents before expensive grouping operations. Early $match reduces the dataset size fed to subsequent stages, requiring less memory and computation. Place $match immediately after $lookup if joining, but before complex $group, $unwind, or $project operations. This principle is called "early filtering" and is crucial for aggregation performance.' },
        { q: 'What is $unwind and when should I use it?', a: '$unwind deconstructs array fields into separate documents, one per array element. For example, a document with tags: ["a", "b", "c"] becomes three documents with tags: "a", tags: "b", tags: "c". Use $unwind before $group if you want to group on array elements. Use after $lookup to flatten joined arrays. Be careful - $unwind on large arrays creates many documents, potentially increasing memory usage. Documents without the array field are dropped unless you use $unwind with preserveNullAndEmptyArrays.' },
        { q: 'How do I handle multiple analytics computations efficiently?', a: 'Use $facet stage to create multiple sub-pipelines that execute in parallel from the same input, all computed in a single pipeline execution. This is more efficient than running multiple separate aggregations. Each sub-pipeline appears as a separate field in the output. For example, generate age distribution, status breakdown, and top cities all at once. This is perfect for dashboards requiring multiple analytics views from the same dataset.' },
        { q: 'What is the difference between $group and $bucket?', a: '$group aggregates documents into discrete groups based on specific field values. $bucket categorizes documents into ranges based on numeric values. Use $group when grouping by specific values like category names or customer IDs. Use $bucket to create ranges like age groups (0-10, 11-20, etc.) or price ranges. $bucket automatically organizes documents into buckets even if some ranges have no documents, while $group only creates groups that exist in data.' },
        { q: 'Can I sort results after grouping and how does it work?', a: 'Yes, add a $sort stage after $group to sort aggregated results. When sorting by _id, you sort by the grouping key. When sorting by aggregated fields like totalAmount, you sort by the computed value. For example, { $sort: { totalAmount: -1 }} sorts groups by their total amount in descending order. Sorting after $group happens on aggregated results, not individual documents. Performance depends on result set size - sorting large aggregation results may require indexes or significant memory.' },
        { q: 'What is $facet and how is it different from multiple pipelines?', a: '$facet allows multiple sub-pipelines to run in parallel on the same input documents. Each sub-pipeline appears as separate field in output. This is more efficient than running multiple aggregation queries separately because input documents are processed once. For example, { $facet: { byDate: [...], byStatus: [...] }} generates both date and status analytics simultaneously. This reduces database load and improves performance for dashboards and analytics requiring multiple computations.' },
        { q: 'How do I write results to a collection using $out?', a: '$out writes aggregation pipeline results to a specified collection, creating it if it doesn\'t exist or replacing it if it does. Add { $out: "resultCollection" } as final stage. The collection is completely replaced, not incrementally updated. This is useful for materializing aggregation results for quick access or creating reports. After $out, the pipeline cannot have additional stages. Use $merge for more complex scenarios where you want to merge results with existing collection instead of replacing it.' }
      ]
    },
    '5': {
      title: 'Replication & Sharding',
      description: 'Scale MongoDB with replication for high availability and sharding for horizontal scalability',
      notes: `# MongoDB Replication & Sharding - Scaling for Production

## Replication: High Availability & Data Safety

Replication creates redundant copies of data across multiple MongoDB servers organized in a replica set. The primary server accepts all write operations, while secondary servers replicate data from the primary. If the primary fails, MongoDB automatically elects a new primary from the secondaries through an election process without manual intervention. Replication provides high availability, ensuring your database remains accessible even during server failures, and improves read scalability by allowing reads from secondary nodes with eventual consistency.

## Replica Set Components

A replica set consists of multiple MongoDB instances. The primary receives all write operations and replicates them to secondaries. Secondaries apply the same operations in the same order, maintaining data copies. An arbiter participates in elections but doesn't store data, used in 3-node sets where you can't add a full secondary. Configuration servers store replica set metadata and cluster configuration. Minimum 3 nodes for automatic failover - typically one primary and at least two secondaries. Even-numbered node counts are avoided because they complicate election.

## Sharding: Horizontal Scaling

Sharding distributes data across multiple MongoDB servers based on a shard key. Each shard holds a subset of data determined by shard key ranges. Query routers (mongos) direct operations to appropriate shards. Config servers store metadata about which key ranges live on which shards. Sharding enables storing datasets larger than single server capacity and distributes read/write load across multiple machines. Good shard keys have high cardinality (many unique values), even distribution, and appear in common queries.

## Shard Key Selection & Design

The shard key determines how data distributes across shards. High-cardinality fields like user IDs or email addresses distribute data evenly. Low-cardinality fields like status or country create uneven distribution (hotspots). Monotonically increasing fields like timestamps can cause one shard to receive all new data. Poor shard key choice severely impacts performance. Shard key is immutable after sharding - choose carefully. Test shard key distribution before enabling sharding to identify potential problems.

## Write Concern & Read Preference

Write concern specifies durability requirements - how many replicas must acknowledge writes. { w: 1 } acknowledges from primary only (fast but less safe). { w: "majority" } waits for majority of replicas (safer but slower). { j: true } ensures journal persistence. Read preference routes reads to primary (consistency), secondaries (scalability), or specific servers. Use primary for critical operations, secondaries for analytics to avoid impacting primary performance. Configure appropriate concern for your consistency vs. performance needs.

## Failover & High Availability

Automatic failover happens when primary becomes unavailable. Remaining replicas detect the outage through heartbeats, trigger an election, and promote a secondary to primary. Failover typically takes 10-30 seconds. Write operations fail during failover because there's no primary. The replica set automatically recovers when the failed node comes back online. Using replica sets eliminates single points of failure, though brief unavailability during failover is expected. This provides true high availability for production systems.

## Scaling Strategy: When to Shard

Scale vertically (bigger servers) until resources are exhausted. Scale horizontally with sharding when data exceeds single server capacity, write throughput exceeds single server capacity, or you need geographic distribution. Start with a single replica set for high availability. Add sharding when scaling needs exceed single replica set capacity. Plan sharding architecture from the beginning because retrofitting sharding onto existing data is complex. Document your shard key choice and monitor distribution regularly.`,
      examples: [
        {
          title: 'Setting Up a Replica Set',
          code: `// Initialize replica set (run on first mongod instance)
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb1.example.com:27017" },
    { _id: 1, host: "mongodb2.example.com:27017" },
    { _id: 2, host: "mongodb3.example.com:27017" }
  ]
});

// Check replica set status
rs.status();

// View current configuration
rs.conf();

// Add a new replica
rs.add("mongodb4.example.com:27017");`,
          output: `Replica set initialized
Primary and secondary roles assigned
Status shows all members healthy`
        },
        {
          title: 'Sharding Configuration',
          code: `// Enable sharding on database
sh.enableSharding("myapp");

// Create index on shard key
db.users.createIndex({ userId: 1 });

// Shard the collection
sh.shardCollection("myapp.users", { userId: 1 });

// Check sharding status
sh.status();

// View chunk distribution
db.adminCommand({ configGetParameter: "chunks" });`,
          output: `Sharding enabled on database
Collection sharded by userId
Data distributed across shards`
        },
        {
          title: 'Write Concern & Read Preference',
          code: `// Write with majority concern (safer)
db.orders.insertOne(
  { _id: 1, amount: 100 },
  { writeConcern: { w: "majority", j: true }}
);

// Read from secondary (for analytics)
db.getMongo().setReadPref("secondaryPreferred");
db.users.find();  // Reads from secondary if available

// Explicit read preference in query
db.products.find({})
  .readPref("secondary");

// Switch back to primary (default)
db.getMongo().setReadPref("primary");`,
          output: `Write acknowledged by majority
Read from secondary server
Analytics queries don't impact primary`
        },
        {
          title: 'Monitoring Replication',
          code: `// Monitor replica set health
rs.status();

// Check replication lag
rs.printSecondaryReplicationInfo();

// Monitor oplog
db.getReplicationInfo();

// View current primary
rs.isMaster();

// Check member status
rs.getMemberState();

// View replica set members
db.adminCommand({ replSetGetStatus: 1 });`,
          output: `All members healthy
Replication lag < 1 second
Oplog window shows hours of capacity`
        }
      ],
      faqs: [
        { q: 'What is a replica set and why do I need replication in production?', a: 'A replica set is a group of MongoDB servers maintaining identical copies of data for high availability and disaster recovery. If the primary server fails, an automatic election promotes a secondary to primary, keeping your database online. Replication prevents data loss through redundancy - if one server fails, your data still exists on others. Without replication, a single server failure means complete downtime. Production databases must have replication for reliability. A minimum 3-node replica set provides automatic failover without manual intervention.' },
        { q: 'How does automatic failover work and what happens during failover?', a: 'Replica set members monitor each other with heartbeats. If the primary misses heartbeats, secondaries detect the failure and trigger an election. Secondaries vote on a new primary, and the highest priority eligible member typically becomes primary. This process usually takes 10-30 seconds. During failover, write operations fail because there\'s no primary, but reads can continue from secondaries with eventual consistency. After failover completes, normal operations resume. The failed primary automatically rejoins as a secondary when it comes back online.' },
        { q: 'What is a shard key and why is it so important?', a: 'A shard key is the field MongoDB uses to distribute documents across shards - each shard stores documents for a range of shard key values. Good shard keys must have high cardinality (many unique values) for even distribution, appear in common query filters, and shouldn\'t be monotonically increasing to avoid hotspots. Bad shard keys cause uneven distribution where some shards store vastly more data than others, creating performance bottlenecks. The shard key is immutable after sharding - wrong choice requires resharding your data. Choose your shard key extremely carefully based on thorough analysis.' },
        { q: 'When should I shard my MongoDB database?', a: 'Shard when data exceeds single server storage capacity (usually 1-5TB depending on hardware), write throughput exceeds what single server can handle, or you need geographic distribution for latency. Start with a single replica set - it\'s simpler and faster. Shard only when necessary because sharding adds complexity. If a single powerful replica set meets your needs, prefer it. Plan your sharding architecture before you need it. Once you decide to shard, do it before you need to rather than under emergency load.' },
        { q: 'What are the differences between write concern levels and when should I use each?', a: 'Write concern { w: 1 } acknowledges after primary receives write - fastest but least safe if primary crashes. { w: "majority" } waits for majority of replicas to acknowledge - safer but slower. { j: true } ensures journal persistence on disk - safest but slowest. For critical financial data or user information, use { w: "majority", j: true } for safety. For non-critical analytics data, use { w: 1 } for speed. For logs and cache data, use default w: 1. Balance safety with performance based on data criticality.' },
        { q: 'What is read preference and how does it improve scalability?', a: 'Read preference determines which replica set member handles read operations. "primary" routes all reads to primary (consistent but concentrates load). "secondary" routes reads to secondary servers (distributes load). "secondaryPreferred" reads from secondary if available, falls back to primary (good balance). Use primary for operations requiring latest data, secondary for analytics that don\'t need immediate consistency. This distributes read load across multiple servers, improving scalability. Each server handles some queries instead of all queries going to primary.' },
        { q: 'How do I monitor replication health and detect problems?', a: 'Use rs.status() to view current status of all replica members, their roles (primary/secondary), and health. Check replication lag with rs.printSecondaryReplicationInfo() - lag should be near zero (< 1 second normally). Monitor oplog with db.getReplicationInfo() to ensure oplog window is several hours wide. Watch for members in RECOVERING or UNKNOWN states indicating problems. Set up monitoring alerts for high replication lag, election activity, or member unavailability. Regular monitoring catches problems early before they impact users.' },
        { q: 'What is an arbiter and when should I use one?', a: 'An arbiter is a lightweight MongoDB instance that participates in replica set elections but doesn\'t store data. Use an arbiter when you have an even number of full data-carrying nodes (like 2) but want automatic failover. For example: 1 primary + 1 secondary + 1 arbiter. The arbiter uses minimal resources since it only stores metadata and election state. However, arbiters don\'t help availability for reads - they just enable failover. Best practice is odd-numbered data nodes (3, 5, 7) without arbiters. Arbiters are mainly for cost-saving in edge cases.' },
        { q: 'How do I choose between scaling vertically versus horizontally with sharding?', a: 'Vertical scaling (bigger servers) is simpler - upgrade hardware to handle more data/load. It\'s effective and preferable until hitting limits. Horizontal scaling (sharding) distributes load across multiple servers, enabling unlimited growth. Start with vertical scaling on a single replica set. When single server approaches capacity in storage, CPU, memory, or I/O, then consider horizontal scaling with sharding. Sharding adds operational complexity so postpone it as long as possible. Plan your eventual sharding architecture from the start to avoid surprises.' },
        { q: 'What are the operational considerations for running a replica set?', a: 'Ensure all replica members have identical MongoDB versions and patches. Maintain good network connectivity between members - latency should be low and stable. Use NTP for time synchronization across servers since elections depend on heartbeats. Monitor disk space on all members - if one runs out, it falls behind and must resync. Configure appropriate oplog size to hold enough history for resyncs. Plan maintenance windows carefully - never take down majority of nodes at once. Document your replica set configuration and backup/restore procedures. Regular monitoring and alerting catch problems early.' }
      ]
    }
  },
  '2': { // Express.js - will keep the existing structure
    '1': {
      title: 'Getting Started with Express',
      description: 'Set up your first Express server and learn the basics',
      notes: `# Getting Started with Express.js

## What is Express?
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love. Express provides tools for handling HTTP requests, routing, middleware, and templating.

## Why Express?
- Lightweight and minimal
- Flexible routing system
- Rich middleware ecosystem
- Easy to learn and use
- Large community and third-party modules
- Used by many production applications

## Installation and Setup
\`\`\`bash
npm init -y
npm install express
\`\`\`

## Basic Server Setup
Create a file called app.js with:
\`\`\`javascript
const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

Then run: \`node app.js\``,
      examples: [
        {
          title: 'Basic Express Server',
          code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
          output: `Server running on http://localhost:3000
Visiting http://localhost:3000 shows: Hello World`
        }
      ],
      faqs: [
        { q: 'What is Express and why should I use it?', a: 'Express is a lightweight Node.js web framework that simplifies building web applications and APIs. It provides essential features like routing, middleware, request/response handling without imposing strict structure. Express is perfect for beginners because it\'s minimal and flexible - you build applications your way. It\'s battle-tested in production, used by thousands of companies, and has an enormous ecosystem of third-party packages. Many concepts you learn in Express transfer to other Node frameworks.' },
        { q: 'How do I install and set up Express?', a: 'First, initialize a Node.js project with npm init -y, then install Express with npm install express. Create your app.js file importing Express and creating an application instance with const app = express(). Define routes using app.get(), app.post(), etc., then start the server with app.listen(port). For automatic restart during development, install nodemon with npm install -D nodemon and add a start script to package.json. Within minutes you have a working web server.' },
        { q: 'What are HTTP methods and when do I use each one?', a: 'GET retrieves data without modifying it, used for fetching web pages or API data. POST creates new data, used for form submissions or creating records. PUT replaces entire resources, used to update complete objects. PATCH partially updates resources, changing only specified fields. DELETE removes resources. In Express, use app.get(), app.post(), app.put(), app.patch(), app.delete() to handle each method. Generally follow REST conventions: GET for read, POST for create, PUT/PATCH for update, DELETE for remove.' },
        { q: 'How do I run my Express application?', a: 'Create your Express app in a file (usually app.js or server.js), then run it with node app.js from the terminal. The server starts and listens on specified port. Visit http://localhost:3000 in your browser to test. For development, use nodemon instead of node to auto-restart when you change files. For production, use process managers like PM2 that handle crashes and restarts automatically. Always run servers in the background or in a separate terminal so you can continue working.' },
        { q: 'What is middleware and when would I use it?', a: 'Middleware are functions that have access to request and response objects and can process or modify them before sending responses. Use middleware for logging, authentication, parsing request bodies, error handling, compression, and more. Middleware runs in order - request flows through each middleware function sequentially. Use app.use() to apply middleware globally or pass it as parameter to specific routes. Common middleware: express.json() parses JSON bodies, cors handles cross-origin requests, morgan logs HTTP requests.' }
      ]
    },
    '2': {
      title: 'Routing & Handlers',
      description: 'Master routing patterns and request handlers',
      notes: `# Express Routing & Handlers

## HTTP Methods in Express
Express supports all HTTP methods: GET for retrieving data, POST for creating, PUT for replacing, PATCH for partial updates, DELETE for removing. Each method is handled with app.method(path, handler). The handler is a function receiving req and res objects.

## Route Parameters
Access dynamic parts of URLs using :paramName syntax. For example, /users/:id captures the ID from the URL and makes it available as req.params.id. Query parameters come after ? in URL and are accessed as req.query.name.

## Request Object
req contains request data: req.params for URL parameters, req.query for query string parameters, req.body for request body (after parsing middleware), req.headers for HTTP headers, req.method for HTTP method.

## Response Object
res sends responses: res.send() for text, res.json() for JSON, res.status() sets HTTP status code, res.redirect() redirects to another URL, res.render() renders template.`,
      examples: [
        {
          title: 'Route Parameters and Query Strings',
          code: `app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, name: 'John' });
});

app.get('/search', (req, res) => {
  const q = req.query.q;
  const limit = req.query.limit || 10;
  res.json({ search: q, limit });
});`,
          output: `GET /users/123 => { "userId": "123", "name": "John" }
GET /search?q=express&limit=5 => { "search": "express", "limit": "5" }`
        }
      ],
      faqs: [
        { q: 'What is the difference between req.params, req.query, and req.body?', a: 'req.params contains URL path parameters defined in the route like /users/:id where :id becomes req.params.id. req.query contains query string parameters after the ? like /search?q=term where q becomes req.query.q. req.body contains the request body for POST/PUT/PATCH requests and requires body parsing middleware. Each serves different purposes: params for resource identification, query for filtering/options, body for data submission. Understanding which to use improves API design.' },
        { q: 'How do I handle multiple HTTP methods on the same route?', a: 'Use separate app.method() calls for the same path, each with different handler: app.get(\'/users\', getUsers), app.post(\'/users\', createUser). Alternatively, use app.route() to chain methods: app.route(\'/users\').get(getUsers).post(createUser).put(updateUser). Both approaches are valid - choose based on preference. If logic is shared between methods, extract common code into middleware or helper functions to avoid duplication.' },
        { q: 'What is a route parameter versus a query parameter?', a: 'Route parameters are part of the URL path: /users/:id/posts/:postId makes :id and :postId available as req.params. Use for required, hierarchical data. Query parameters come after ?: /posts?category=tech&sort=date makes them available as req.query. Use for optional filters, pagination, and sorting. Route parameters identify the resource, query parameters modify how results are returned. Good API design puts essential data in route parameters and optional filtering in query parameters.' },
        { q: 'How do I validate route parameters and query strings?', a: 'Use validation middleware before handlers. Libraries like joi or yup validate data structure and values. For simple checks, validate in the handler: if (!userId || isNaN(userId)) return res.status(400).json({ error: "Invalid ID" }). Create reusable middleware for common validations. Always validate user input - never trust client-sent data. Proper validation prevents crashes, security issues, and invalid data from reaching database.' },
        { q: 'What is middleware chaining and why is it useful?', a: 'Middleware chaining passes request through multiple functions sequentially before reaching the handler. Each middleware can modify request, end response, or pass to next middleware with next(). Chain middleware for validation, authentication, logging, error handling. For example, app.get(\'/admin\', authenticate, authorize, getAdminData) ensures user is authenticated and authorized before getting data. Middleware chaining enables reusable, composable logic across routes.' }
      ]
    },
    '3': {
      title: 'Middleware',
      description: 'Build powerful middleware functions and middleware chains',
      notes: `# Express Middleware

## Middleware Basics
Middleware functions have access to request and response objects and the next middleware function. Middleware can process requests, modify request/response, end requests, or call next() to pass to next middleware. Middleware runs in order - sequence matters. Application-level middleware applies to all routes, route-level applies to specific routes.

## Common Middleware Patterns
Logging middleware tracks requests, authentication middleware verifies users, error handling middleware catches errors, body parsing middleware processes request bodies, CORS middleware handles cross-origin requests.

## Creating Custom Middleware
Write a function accepting (req, res, next) parameters. Perform operations, modify req if needed, then call next() to continue. Use return to end middleware early. Register with app.use() for global or as route parameter for route-specific.`,
      examples: [
        {
          title: 'Custom Middleware Example',
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
        { q: 'What is middleware and what can it do?', a: 'Middleware are functions that process requests and responses. They have access to request and response objects and can modify them, end the request-response cycle, or pass control to the next middleware with next(). Middleware enables separation of concerns - keep route handlers focused on business logic while middleware handles cross-cutting concerns. Common middleware functions: logging, authentication, validation, error handling, compression, CORS handling. Middleware is powerful for creating reusable, maintainable code.' },
        { q: 'What is the difference between app.use() and app.get()?', a: 'app.use() registers middleware that runs for all requests matching the path regardless of HTTP method. app.get() registers a handler specifically for GET requests. Use app.use() for middleware like logging or authentication that should run for all requests. Use app.get() (or other HTTP methods) for route handlers handling specific requests. You can apply middleware to specific routes by passing it as parameter: app.get(\'/admin\', adminMiddleware, handler).' },
        { q: 'What is middleware chaining and how do I implement it?', a: 'Middleware chaining passes requests through multiple functions sequentially. Each middleware calls next() to pass to the next middleware, with the final middleware being your route handler. For example: app.get(\'/admin\', checkAuth, checkAdmin, handleAdminRequest) chains three functions. Create reusable middleware for common operations like authentication, validation, logging. Middleware chains enable clean separation of concerns and prevent code duplication across route handlers.' },
        { q: 'How do I handle errors in middleware?', a: 'Create error handling middleware with 4 parameters: (err, req, res, next). This middleware must be registered after all other middleware and routes. When any middleware calls next(error), Express routes to error middleware. Inside error middleware, log the error, determine appropriate response, and send error to client with res.status(). Never throw errors in middleware - always catch them and pass to next(err). Proper error handling prevents crashes and provides meaningful error messages to clients.' },
        { q: 'What is the order of middleware execution and why does it matter?', a: 'Middleware executes in the order registered with app.use(). Requests flow through each middleware sequentially. If one middleware doesn\'t call next(), request stops there and response is sent. Order matters tremendously - authentication middleware must come before authorization, logging middleware should come early to capture all requests, error handling middleware must come last. Document your middleware order and think carefully about sequences to avoid subtle bugs.' }
      ]
    },
    '4': {
      title: 'Error Handling',
      description: 'Handle errors gracefully and implement error middleware',
      notes: `# Error Handling in Express

## Error Types
Synchronous errors in route handlers can be caught with try-catch. Asynchronous errors in promises need .catch() or await try-catch. Operational errors are expected (validation failure, file not found). Programmer errors are bugs (calling undefined function). Handle errors gracefully - never let unhandled errors crash your server.

## Error Middleware
Create middleware with 4 parameters (err, req, res, next) for error handling. Register after all other middleware. When any middleware calls next(err), Express routes to error middleware.

## Best Practices
Always catch errors, log them, determine response status and message, send to client. Don't expose internal errors to client - send generic messages. Use appropriate HTTP status codes. Consider implementing retry logic for transient failures.`,
      examples: [
        {
          title: 'Error Handling Middleware',
          code: `// Route that might error
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    error: 'Internal server error'
  });
});`,
          output: `Error caught and logged
Client receives error response`
        }
      ],
      faqs: [
        { q: 'What is an error middleware and how do I implement one?', a: 'Error middleware has 4 parameters: (err, req, res, next), distinguishing it from regular middleware. Register error middleware after all other middleware and routes - order is critical. When any middleware calls next(err), Express skips remaining middleware and passes to error middleware. Inside error middleware, log the error for debugging, determine appropriate HTTP status code, and send user-friendly error message to client. Proper error middleware prevents server crashes and provides consistent error responses.' },
        { q: 'How do I catch errors in async/await route handlers?', a: 'Wrap async code in try-catch blocks, then pass errors to next(err): try { await something } catch (err) { next(err) }. This passes control to error middleware. Alternatively, wrap route handler with try-catch wrapper function that catches errors automatically. For promises, use .catch(next) to pass errors to error middleware. Always catch async errors - unhandled promise rejections crash the server. Consider using libraries like express-async-errors that automatically wrap async handlers.' },
        { q: 'What HTTP status codes should I use for different error types?', a: '400 Bad Request for client errors like invalid data. 401 Unauthorized when authentication fails. 403 Forbidden when user lacks permission. 404 Not Found for missing resources. 409 Conflict for state conflicts like duplicate entries. 500 Internal Server Error for server-side failures. 503 Service Unavailable for temporary outages. Always use appropriate status codes - they help clients understand error type and retry strategy. Never use 200 OK for errors - this confuses API consumers.' },
        { q: 'Should I expose error details to clients?', a: 'No, never expose internal error details like stack traces or database errors to clients - this is a security risk. Send generic error messages like "Internal server error". Log detailed errors server-side for debugging. Create custom error classes with appropriate messages for different error types. If client needs debugging info for development, only send detailed errors in development mode (check NODE_ENV). Proper error responses are user-friendly and don\'t leak sensitive information.' },
        { q: 'How do I implement retry logic for transient errors?', a: 'Identify transient errors (network timeouts, temporary failures) versus permanent errors (validation, not found). For transient errors, implement exponential backoff: retry with increasing delays. Keep retry count limit to avoid infinite loops. For permanent errors, fail immediately. Libraries like retry handle this logic. Example: retry async operation up to 3 times with exponential backoff. Document which operations support retry and which don\'t. Proper retry logic improves reliability and resilience.' }
      ]
    },
    '5': {
      title: 'Advanced Patterns',
      description: 'Learn advanced Express patterns and architectures',
      notes: `# Advanced Express Patterns

## MVC Architecture
Organize code into Models (data/database), Views (templates/UI), Controllers (business logic). This separation improves maintainability and testability. Models handle database operations and data validation. Controllers handle requests and responses. Views render responses to clients.

## Service Layer
Extract business logic from controllers into service layer. Services are reusable across controllers and can be unit tested independently. Controllers delegate to services, keeping them thin and focused on HTTP concerns.

## Dependency Injection
Pass dependencies to functions/classes rather than having them create dependencies. Improves testability and flexibility. Use containers or simple parameter passing.

## Security
Use helmet for secure HTTP headers. Validate all input. Use password hashing. Implement rate limiting. Use HTTPS. Follow OWASP guidelines.`,
      examples: [
        {
          title: 'MVC Pattern Implementation',
          code: `// models/User.js
class User {
  static async findById(id) {
    return db.users.findOne({ _id: id });
  }
}

// controllers/userController.js
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// routes/users.js
const userController = require('../controllers/userController');
router.get('/:id', userController.getUser);`,
          output: `GET /users/1 returns user data
Clean separation of concerns`
        }
      ],
      faqs: [
        { q: 'What is the MVC architecture and why should I use it?', a: 'MVC separates code into Models (data/database), Views (UI/templates), Controllers (request handling). This separation improves code organization, testability, and maintainability. Models handle data operations and validation independently. Controllers handle HTTP requests/responses. Views render responses. When codebase grows, MVC prevents spaghetti code and makes features easier to find and modify. MVC is industry standard for web applications.' },
        { q: 'What is a service layer and when should I extract one?', a: 'A service layer contains reusable business logic extracted from controllers. Services are independent of HTTP concerns - they\'re pure functions or classes with methods. Controllers delegate to services, keeping controllers focused on HTTP. Services can be unit tested without HTTP context. Extract a service when logic is complex, used by multiple routes, or should be reused elsewhere. Services improve code reusability and testability significantly.' },
        { q: 'What is dependency injection and how do I implement it?', a: 'Dependency injection means passing required dependencies to functions/classes instead of having them create dependencies. For example, pass database connection to service instead of service importing database. Benefits: easier testing (inject mock dependencies), flexibility (swap implementations), decoupling (less reliance on specific implementations). Simple form: pass as function parameters. Advanced: use DI containers that manage dependency creation and injection automatically.' },
        { q: 'How do I implement proper security in Express applications?', a: 'Use helmet middleware to set secure HTTP headers. Validate all user input - never trust client data. Use password hashing (bcrypt) instead of plain text. Implement rate limiting to prevent brute force attacks. Use HTTPS to encrypt data in transit. Sanitize data to prevent injection attacks. Implement authentication properly with tokens or sessions. Follow OWASP security guidelines. Keep dependencies updated for security patches. Security is not optional - it\'s essential for production applications.' },
        { q: 'What are the best practices for organizing Express project structure?', a: 'Organize by feature or layer: routes/, controllers/, services/, models/, middleware/, utils/. Keep related files together. Use clear naming conventions. Separate configuration into separate files. Use environment variables for sensitive config. Keep files focused on single responsibility. Document complex logic. Use consistent code style with linter/formatter. Good structure makes projects maintainable and scalable as they grow. Avoid mixing concerns - routes shouldn\'t contain business logic.' }
      ]
    }
  },
  '3': { // Node.js - will keep existing structure
    '1': {
      title: 'Core Concepts',
      description: 'Understand Node.js fundamentals and architecture',
      notes: `# Node.js Core Concepts

## What is Node.js?
Node.js is a JavaScript runtime built on V8 engine enabling server-side JavaScript execution. It uses event-driven, non-blocking I/O model making it lightweight and efficient. Perfect for data-intensive real-time applications.

## Event Loop
The event loop processes callbacks in order: timers, pending callbacks, idle/prepare, poll (I/O), check (setImmediate), close callbacks. Understanding event loop is crucial for performance.

## Module System
CommonJS: require() and module.exports. ES Modules: import and export. npm manages third-party modules.`,
      examples: [
        {
          title: 'Basic Module System',
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
        { q: 'What is Node.js and what makes it different from browser JavaScript?', a: 'Node.js is a JavaScript runtime that runs JavaScript on servers instead of browsers. It uses the V8 engine (same as Chrome) for fast execution. Major difference: Node.js has access to file system, operating system, network via built-in modules, while browser JavaScript cannot access these for security. Node.js is single-threaded but handles concurrency through asynchronous operations and event loop. Perfect for building servers, APIs, command-line tools, and backend services.' },
        { q: 'What is V8 and why is it important?', a: 'V8 is Google\'s JavaScript engine that compiles JavaScript to machine code for fast execution. Used in Chrome browser and Node.js. V8 continuously optimizes code - frequently called code paths are compiled to native machine code. This makes Node.js very fast for JavaScript. Understanding that V8 optimizes code helps write performant JavaScript - avoid patterns that confuse V8\'s optimizers like monomorphic vs polymorphic object layouts.' },
        { q: 'What is the event loop and how does it work?', a: 'The event loop is Node.js\'s concurrency model. It checks for pending operations repeatedly: check timers (setTimeout, setInterval), execute pending callbacks, run poll phase handling I/O, execute setImmediate callbacks, cleanup. When no operations remain, process exits. Understanding event loop is crucial for async programming - never block event loop with heavy synchronous operations as this prevents other callbacks from running. Use profilers to identify blocking code.' },
        { q: 'What is the difference between module.exports and exports in CommonJS?', a: 'exports is shorthand reference to module.exports. Use module.exports when assigning entire object: module.exports = { x: 1 }. Use exports for adding properties: exports.x = 1. If you reassign exports, it breaks the connection to module.exports. Best practice: consistently use module.exports to avoid confusion. Modern code uses ES Modules (import/export) which is cleaner.' },
        { q: 'What is npm and why do I need it?', a: 'npm is Node Package Manager - package manager for JavaScript. Use it to install third-party libraries (dependencies), manage project configuration, run scripts. npm init creates package.json with project metadata. npm install adds dependencies. package-lock.json locks exact versions for reproducible builds. npm scripts automate tasks like starting dev server or running tests. npm has millions of packages solving common problems. Essential for modern Node.js development.' }
      ]
    },
    '2': {
      title: 'Async Programming',
      description: 'Master async/await, promises, and callback patterns',
      notes: `# Async Programming in Node.js

## Callbacks
Function called after operation completes. Simple but can nest (callback hell). Error handling requires consistency.

## Promises
Better abstraction with pending/resolved/rejected states. .then() for success, .catch() for errors. Chainable for sequential operations.

## Async/Await
Modern syntax making async code look synchronous. Use try/catch for error handling. Must use in async function.`,
      examples: [
        {
          title: 'Async/Await Pattern',
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
        { q: 'What is async/await and how is it better than callbacks?', a: 'async/await is modern syntax for handling asynchronous operations, making async code look and behave like synchronous code. Functions marked async return promises. await pauses execution until promise resolves, then continues with result. This eliminates callback nesting (callback hell). Error handling uses try/catch like synchronous code. async/await is more readable, easier to debug, and reduces cognitive load compared to callbacks or promise chains. Use async/await in modern code.' },
        { q: 'What is a promise and what are its states?', a: 'A promise represents eventual completion (or failure) of async operation and its resulting value. Three states: pending (initial), resolved (operation succeeded with value), rejected (operation failed with error). Use .then() for resolved state, .catch() for rejected state, .finally() for both. Promises enable chaining operations sequentially. Promise.all() waits for all promises, Promise.race() waits for first promise. Promises are foundation of async JavaScript programming.' },
        { q: 'When should I use Promise.all() versus Promise.race()?', a: 'Promise.all() waits for all promises to resolve or any to reject - use when you need all results. Perfect for parallel operations like fetching multiple resources. Promise.race() returns first promise to settle - use to implement timeouts or get fastest response. For example, race() can timeout slow operations or get fastest API response. Use all() for AND logic (need all results), race() for OR logic (need first result). Choose based on what your code actually needs.' },
        { q: 'How do I handle errors in async/await?', a: 'Use try/catch blocks wrapping await expressions. The catch block receives the error object. Can have multiple awaits in one try block - first error throws to catch. Use finally block for cleanup code that runs regardless of success/failure. Can also use .catch() on individual promises for more granular handling. For unhandled rejections, add process.on(\'unhandledRejection\') handler as fallback. Proper error handling prevents silent failures.' },
        { q: 'What is callback hell and how do I avoid it?', a: 'Callback hell (pyramid of doom) is deeply nested callbacks making code hard to read and maintain. Example: callback1(err => { callback2(err => { callback3() }) }). Avoid by using async/await which eliminates nesting, using named functions instead of inline callbacks, using promises and .then() chains, or breaking callbacks into separate functions. Modern code should avoid callbacks entirely in favor of async/await. If stuck with callbacks, refactor to promises/async/await.' }
      ]
    },
    '3': {
      title: 'File System',
      description: 'Work with files and directories using the fs module',
      notes: `# Node.js File System

## File Operations
Read files with readFile(), write with writeFile(), append with appendFile(). Operations are async (don't block event loop). Sync versions exist but block execution - avoid in production.

## Directory Operations
Create directories with mkdir(), list files with readdir(), check existence with existsSync(), get file info with stat().

## Streams
Process large files efficiently with streams. Readable streams read data in chunks, writable streams write in chunks. Prevents loading entire file into memory.`,
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
        { q: 'What is the fs module and how do I use it?', a: 'The fs (file system) module provides functions for file and directory operations. readFile() reads file contents, writeFile() writes/creates files, appendFile() adds content, unlink() deletes files. All async versions accept callbacks or return promises. Sync versions (readFileSync) block execution - avoid in production servers. mkdir() creates directories, readdir() lists files, stat() gets file metadata. fs module is essential for file-based operations in Node.js.' },
        { q: 'Should I use sync or async file operations?', a: 'Always use async file operations in production servers - sync operations block the event loop preventing other requests from being handled. Sync is acceptable in CLI tools or one-off scripts. For example, readFileSync() pauses entire server while reading file. With readFile(), server continues handling other requests while file is being read. Never use sync I/O in production servers - performance degrades significantly as requests pile up waiting.' },
        { q: 'What are streams and when should I use them?', a: 'Streams process large data in chunks instead of loading entire file into memory. Perfect for large files that would exceed available memory. createReadStream() reads file in chunks, triggering \'data\' event for each chunk. createWriteStream() writes chunks without loading full file. pipe() connects streams: readable.pipe(writable) automatically handles flow control. Streams enable processing gigabyte-sized files on modest hardware. Essential for file uploads, downloads, and log processing.' },
        { q: 'How do I check if a file exists?', a: 'Use existsSync() for synchronous check returning boolean. Use stat() or access() for async checks. existsSync() is simple but blocks execution. Modern approach: try to open file and catch error if not found. Avoid checking if file exists then reading it - race condition where file disappears between check and read. Instead, just attempt read and handle error if file doesn\'t exist.' },
        { q: 'How do I handle file operation errors properly?', a: 'Async file operations call callbacks with error parameter - check if error exists. For promises, use .catch(). For async/await, use try/catch. Common errors: ENOENT (file not found), EACCES (permission denied), EISDIR (is directory not file). Log errors for debugging. Provide meaningful messages to users - don\'t expose raw errors. Implement retry logic for transient errors like temporary permission issues. Always handle errors - ignoring them causes silent failures.' }
      ]
    },
    '4': {
      title: 'Streams & Buffers',
      description: 'Handle large data efficiently with streams and buffers',
      notes: `# Streams and Buffers

## Buffers
Fixed-size memory area for binary data. Create with Buffer.alloc(), Buffer.from(). Concatenate buffers, convert to strings. Useful for binary data handling.

## Streams
Process data in chunks. Readable streams read data, writable streams write data. Transform streams modify data. Duplex streams both read and write. Events: data, end, error, drain.

## Backpressure
When writing faster than reading, data accumulates. Check write() return value - if false, pause reading until drain event.`,
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
Chunk size: 65536
...
Done`
        }
      ],
      faqs: [
        { q: 'What is a stream and how is it different from reading entire file?', a: 'A stream processes data in chunks rather than loading entire file into memory. For large files, this prevents memory overflow. createReadStream() reads file in chunks (default 64KB), emitting \'data\' event for each chunk. Processing continues through \'end\' event. Reading entire file with readFile() loads everything into memory at once - fine for small files but fails for gigabyte-sized files. Streams enable processing large datasets on limited hardware.' },
        { q: 'What is backpressure and why do I need to handle it?', a: 'Backpressure occurs when reading data faster than writing it, causing data to accumulate in buffers. write() returns boolean - false means buffer is full, true means more data accepted. When false, pause reading and resume when \'drain\' event fires. Ignoring backpressure causes memory leaks as data accumulates. pipe() handles backpressure automatically: readable.pipe(writable). Manual streams need explicit handling. Always respect backpressure for memory-efficient streaming.' },
        { q: 'What is a buffer and how do I use it?', a: 'A buffer is fixed-size memory area storing binary data. Create with Buffer.alloc(size) for empty buffer or Buffer.from(data) from string/array. Convert to string with toString(), concatenate with Buffer.concat(). Buffers are essential for binary data - images, audio, encrypted data. toString(\'utf-8\') converts to text. toString(\'hex\') shows hex representation. Useful for processing binary protocols or binary files.' },
        { q: 'What is the difference between readable, writable, and transform streams?', a: 'Readable streams produce data - reading files or database queries. Writable streams consume data - writing files or sending responses. Transform streams read and modify data - compression, encryption. Duplex streams do both independently. pipe() connects streams: readable.pipe(transform).pipe(writable). Each stream emits events: readable emits \'data\' and \'end\', writable emits \'drain\'. Understanding stream types helps choose appropriate tool.' },
        { q: 'How do I pipe streams and what\'s its advantage?', a: 'pipe() automatically connects streams and handles flow control. Example: fs.createReadStream(\'input.txt\').pipe(fs.createWriteStream(\'output.txt\')). pipe() automatically handles backpressure - when writable buffer fills, readable pauses. Manual handling requires checking return values and respecting \'drain\' event. pipe() is cleaner, more reliable, and handles edge cases. Chain multiple transforms: read.pipe(compress).pipe(encrypt).pipe(write). pipe() is recommended for stream handling.' }
      ]
    },
    '5': {
      title: 'Performance',
      description: 'Optimize Node.js applications for maximum performance',
      notes: `# Node.js Performance

## Profiling
Identify bottlenecks with profilers. CPU profiling shows where time is spent. Memory profiling identifies leaks. Node.js built-in profiler and tools like clinic.js help.

## Optimization
Use clustering to leverage multiple CPU cores. Implement caching for computed values. Optimize database queries and indexes. Use compression (gzip). Avoid synchronous operations.

## Monitoring
Track memory usage, CPU usage, event loop lag, request latency. Set up alerts for anomalies.`,
      examples: [
        {
          title: 'Clustering Example',
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
        { q: 'What is profiling and how do I find performance bottlenecks?', a: 'Profiling measures where your code spends time and memory. CPU profiling shows functions consuming most CPU time. Memory profiling identifies memory leaks and large allocations. Use Node.js --prof flag for profiling, then analyze with --prof-process. Tools like clinic.js provide visual profiling. Add performance markers with performance API. Identify bottlenecks, then optimize - profile first, don\'t optimize blindly. Regular profiling catches regressions early.' },
        { q: 'What is clustering and when should I use it?', a: 'Clustering uses multiple Node.js processes to utilize multi-core CPUs. Each process handles some load independently. When one crashes, others continue. cluster module manages worker processes. Use clustering to maximize CPU utilization - single process uses only one CPU core. Clustering is essential in production on multi-core servers. Load balancing distributes requests across workers. Consider process managers like PM2 handling clustering automatically.' },
        { q: 'How do I implement caching to improve performance?', a: 'Cache frequently computed results to avoid redundant calculations. In-memory caches (like object properties) for simple data. Redis for distributed caching across servers. Set appropriate expiry times - balance freshness vs performance. Clear cache when underlying data changes. Monitor cache hit rates - low hit rates indicate poor cache strategy. Caching can reduce database load dramatically, improving response times. Use memoization for expensive function results.' },
        { q: 'What is event loop lag and why does it matter?', a: 'Event loop lag is delay between when operation completes and when its callback executes. High lag indicates event loop is overloaded with work. Causes: heavy synchronous operations, too many queued operations. Lag causes slow response times and poor user experience. Monitor with tools that track event loop metrics. Reduce lag by: breaking long operations into smaller chunks, using worker threads for CPU-intensive work, distributing load across machines. Event loop health directly affects application responsiveness.' },
        { q: 'How do I detect and fix memory leaks in Node.js?', a: 'Memory leaks occur when allocated memory isn\'t released, causing memory usage to grow continuously. Identify leaks with profilers - take heap snapshots over time and compare growth. Common causes: retained references in closures, circular references, event listener leaks (not removing listeners). Fix by: properly cleaning up resources, removing event listeners when done, breaking circular references. Use libraries detecting leaks automatically. Regular monitoring catches leaks early before they crash servers. Memory leaks in production servers must be investigated urgently.' }
      ]
    }
  },
  '4': { // React - keep structure but expand FAQs
    '1': { title: 'Components & JSX', description: 'Master React components and JSX', notes: `# React Components and JSX\n\nComponents are reusable UI pieces. Functional components use functions returning JSX. JSX is JavaScript XML syntax looking like HTML but it's actually function calls.`, examples: [{ title: 'Component Example', code: `function Greeting({ name }) { return <h1>Hello, {name}!</h1>; }`, output: `<h1>Hello, Alice!</h1>` }], faqs: [{ q: 'What is JSX?', a: 'JSX is JavaScript XML syntax that looks like HTML but is actually JavaScript. When compiled, <h1>Hello</h1> becomes React.createElement("h1", null, "Hello"). JSX is optional in React but makes code much more readable and declarative. You must import React when using JSX (not needed in React 17+). JSX must have single root element. You can embed JavaScript expressions with {}.' }, { q: 'What is a component?', a: 'A component is a reusable UI building block. Functional components are JavaScript functions returning JSX. Each component is independent and encapsulates its UI. Pass data to components via props. Components enable breaking large UIs into manageable pieces. Reusable components reduce code duplication. Well-designed components are easy to test and maintain. React encourages building UIs with composition of simple components.' }, { q: 'What are props?', a: 'Props are arguments passed to components for customization. Access props via function parameter: function Greeting(props) or destructured: function Greeting({ name }). Props flow downward from parent to child only. Props are read-only - children can\'t modify parent props. Use props to customize component behavior and appearance. Props enable component reusability - same component with different props produces different output. Functions accepting props are pure functions predictable and easy to test.' }, { q: 'What is state?', a: 'State is dynamic data that can change over time. Use useState hook to add state to functional components. State updates trigger re-render with new values. State is local to component - each instance has its own state. Never modify state directly - use setState function to update. State enables interactive UIs - forms, counters, toggles. State changes are asynchronous - React batches updates for performance. Each state update potentially triggers re-render and UI update.' }, { q: 'What are keys in lists?', a: 'Keys uniquely identify list items helping React identify which items changed. Each list item needs a key: <li key={item.id}>. Keys enable React to maintain component state correctly when list changes. Without keys, React might associate wrong state with wrong items. Use stable IDs like database IDs, not array indexes (indexes change when list reorders). Missing keys cause subtle bugs with component state and form input values. Performance improves with proper keys as React skips unnecessary re-renders.' } ] },
    '2': { title: 'Hooks & State', description: 'Use React Hooks for state management', notes: `# React Hooks\n\nHooks are functions for using features in functional components. useState manages state. useEffect handles side effects. useContext accesses context. Create custom hooks combining other hooks.`, examples: [{ title: 'useState Hook', code: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <div>\n    <p>Count: {count}</p>\n    <button onClick={() => setCount(count + 1)}>Increment</button>\n  </div>;\n}`, output: `Count: 0\n[Increment button]\n(Click: Count: 1)` }], faqs: [{ q: 'What is useState?', a: 'useState is a Hook for adding state to functional components. Returns array with current state value and function to update it. Syntax: const [value, setValue] = useState(initialValue). When setValue is called with new value, React re-renders component with new state. Can have multiple useState calls in one component. Each useState call is independent with its own state. useState enables functional components to be stateful unlike before Hooks.' }, { q: 'What is useEffect?', a: 'useEffect hook runs side effects after render. Syntax: useEffect(() => { /* code */ }, [dependencies]). Runs after render by default. Dependencies array controls when effect runs: empty array runs once on mount, specific dependencies run when those values change, no array runs every render. Perfect for fetching data, setting up subscriptions, updating DOM. Return cleanup function to run before next effect or unmount. useEffect replaces lifecycle methods from class components.' }, { q: 'What is useContext?', a: 'useContext hook accesses context values without wrapping component in Consumer. Syntax: const value = useContext(MyContext). Pass context object created with createContext(). Simplifies accessing context compared to Consumer component. Component re-renders when context value changes. Use for global state like theme, language, user data. Context propagates to all descendant components. useContext enables elegant prop drilling elimination for global data.' }, { q: 'What is useReducer?', a: 'useReducer hook manages complex state with reducer function. Syntax: const [state, dispatch] = useReducer(reducer, initialState). Reducer function defines state transitions: (state, action) => newState. dispatch(action) triggers state update. Preferred over useState for complex state with multiple related values. Easier to test than useState. Enables time-travel debugging with action history. useReducer is more powerful than useState but requires more code.' }, { q: 'What is a custom hook?', a: 'Custom hooks are functions using other hooks to encapsulate reusable logic. Must start with "use" prefix. Can use any other hooks inside. Return state/functions from custom hook. Example: useFormInput encapsulates form input state and handlers, useWindowSize tracks window dimensions. Custom hooks eliminate code duplication across components. Share logic without render props or HOCs. Test custom hooks independently with their own hook-specific test utilities.' } ] },
    '3': { title: 'Effect & Lifecycle', description: 'Manage component lifecycle with effects', notes: `# Component Lifecycle\n\nuseEffect replaces lifecycle methods. Runs after render. Dependencies control when effect runs. Return cleanup function for cleanup.`, examples: [{ title: 'useEffect Example', code: `import { useEffect, useState } from 'react';\n\nfunction DataFetcher() {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch('/api/data')\n      .then(r => r.json())\n      .then(d => setData(d));\n  }, []);\n  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;\n}`, output: `Loading...\n[After fetch: { ... data ... }]` }], faqs: [{ q: 'What is useEffect?', a: 'useEffect hook runs side effects (operations with external effects) after render completes. Perfect for fetching data from APIs, setting up subscriptions, updating DOM directly, timers. useEffect(() => { /* effect */ }, [deps]) runs effect after render. Dependency array controls execution: undefined/missing means run every render, empty array means run once on mount only, specific dependencies means run when those values change. Returned function is cleanup running before next effect or unmount.' }, { q: 'When does effect run?', a: 'By default useEffect runs after every render. With empty dependency array, runs once after component mounts (similar to componentDidMount). With dependencies, runs only when dependencies change. React compares previous and current dependency values using === comparison. If dependencies didn\'t change, effect skips. For fetch operations, empty dependencies array prevents infinite fetches. Proper dependencies are critical for correctness.' }, { q: 'How do I run effect once on mount?', a: 'Pass empty dependency array to useEffect: useEffect(() => { /* effect */ }, []). Empty array means effect has no dependencies so it runs once on initial render and never again. Use for initialization code that should run once: fetching initial data, setting up subscriptions, initializing timers. If you need cleanup, return cleanup function from effect. This pattern replaces componentDidMount lifecycle method.' }, { q: 'How do I cleanup in useEffect?', a: 'Return a cleanup function from useEffect that runs before next effect or on unmount: useEffect(() => { /* setup */ return () => { /* cleanup */ }; }, [deps]). Cleanup is essential for preventing memory leaks: unsubscribe from events, cancel timers, cancel API requests. Example: useEffect(() => { const timer = setInterval(...); return () => clearInterval(timer); }). Cleanup ensures resources are released preventing leaks that accumulate over time.' }, { q: 'What is mounting, updating, unmounting?', a: 'Mounting: component is added to DOM, runs once on initial render. Updating: component re-renders due to state/prop changes, can run multiple times. Unmounting: component is removed from DOM. useEffect with empty deps runs on mount. useEffect with specific deps runs on updates when deps change. useEffect cleanup runs on unmount and before next effect. Each phase enables different operations: mount for initialization, update for responding to changes, unmount for cleanup.' } ] },
    '4': { title: 'Context API', description: 'Share data with Context API', notes: `# React Context API\n\nContext enables data sharing without prop drilling. Create with createContext. Provide value with Provider. Access with useContext.`, examples: [{ title: 'Context Example', code: `import { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext();\n\nfunction Provider({ children }) {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Component() {\n  const { theme } = useContext(ThemeContext);\n  return <div>Theme: {theme}</div>;\n}`, output: `Theme: light` }], faqs: [{ q: 'What is Context?', a: 'Context provides way to share data across components without passing through every intermediate component (prop drilling). Create context with createContext(defaultValue). Wrap component tree with Provider component passing value. All descendants can access value with useContext hook. Perfect for global state like authentication, theme, language, notifications. Context avoids passing props through many levels of components. Use sparingly - context is for truly global data, not all state.' }, { q: 'When should I use Context?', a: 'Use for truly global state: authenticated user, theme preference, language selection, feature flags. Don\'t use for frequently changing data as all subscribers re-render. Don\'t use if data only needs in few components - prop drilling is fine for local data. Split context by domain: AuthContext for auth, ThemeContext for theme. This prevents unnecessary re-renders from unrelated context changes. For complex state management, consider Redux or other state libraries.' }, { q: 'What is createContext?', a: 'createContext(defaultValue) creates a context object. The default value is used when useContext is called outside Provider. Returns object with two properties: Provider (component wrapping tree), Consumer (accessing values, rarely used now). Pass default value that matches shape consumers expect. Context created at module level and reused across app. Can create multiple contexts for different concerns separating global state logically.' }, { q: 'What is a Provider?', a: 'Provider is component wrapping part of tree providing context value to all descendants. Syntax: <ContextName.Provider value={data}>. Descendants anywhere in subtree can access value with useContext. When Provider value changes, all consuming components re-render. Only provide at appropriate level - don\'t wrap entire app if only sections need context. Multiple Providers can nest enabling context composition. Providers are essential - without Provider, useContext uses default value only.' }, { q: 'Can Context replace Redux?', a: 'For simple global state, Context is sufficient and reduces dependencies. For complex state with many actions, Redux provides better developer experience. Context lacks Redux benefits: time-travel debugging, action logging, middleware, dev tools. Redux shines with complex workflows, frequent state changes, and large teams. For learning, start with Context. As complexity grows, consider Redux or similar. Many projects successfully use Context alone without Redux.' } ] },
    '5': { title: 'Performance & Optimization', description: 'Optimize React applications', notes: `# React Performance\n\nOptimize by memoizing components and values. Use profiler to identify slow renders. Code split for lazy loading.`, examples: [{ title: 'useMemo Example', code: `import { useMemo } from 'react';\n\nfunction Component({ items }) {\n  const sortedItems = useMemo(() => {\n    return [...items].sort();\n  }, [items]);\n  return <ul>{sortedItems.map(i => <li key={i}>{i}</li>)}</ul>;\n}`, output: `<li>Apple</li>\n<li>Banana</li>\n<li>Cherry</li>` }], faqs: [{ q: 'What is React.memo?', a: 'React.memo wraps component for shallow prop comparison. If props haven\'t changed, skip re-render. Only use when component receives same props often but parent re-renders frequently. Memoization adds overhead, so only use when you\'ve identified it as bottleneck via profiling. With useCallback, memoize functions passed as props so memo works. Don\'t prematurely optimize - profile first. React.memo is premature optimization if you haven\'t measured.' }, { q: 'What is useMemo?', a: 'useMemo memoizes computed values to avoid recalculation. Syntax: const value = useMemo(() => expensiveComputation(), [deps]). Runs expensive function only when dependencies change. Useful for expensive calculations with many dependencies. Use judiciously - most memoization overhead exceeds benefit. Measure performance before memoizing. Children using memoized value with React.memo memoize fewer renders. useMemo is not silver bullet - profile to verify it helps.' }, { q: 'What is useCallback?', a: 'useCallback memoizes function reference. Syntax: const fn = useCallback(() => { /* code */ }, [deps]). Returns same function reference if dependencies unchanged. Use when passing function as prop to memoized child to avoid unnecessary memoized child re-renders. Example: pass callback to useCallback, then to memoized child with React.memo. Prevents child re-renders when parent re-renders with same function. Pair with React.memo for effectiveness.' }, { q: 'What is code splitting?', a: 'Code splitting breaks code into smaller chunks loaded on demand rather than all at once. React.lazy dynamically imports components: const Component = React.lazy(() => import(\'./Component\')). Wrap with Suspense for loading state. Use with route-based splitting: each route is separate chunk loaded when navigated. Improves initial load time significantly. Webpack handles bundling automatically. Essential for large applications reducing initial bundle size.' }, { q: 'How do I profile React performance?', a: 'React DevTools Profiler records component render times and counts. Click Profiler tab, record interactions, see which components render and how long they take. Identify slow components. Check if memoization helps. Use performance.measure() for custom measurements. Look for unexpected re-renders. Measure before and after optimizations to verify improvements. Regular profiling catches regressions. Profiling guides optimization efforts based on data not hunches.' } ] }
  },
  '5': { // Angular - keep structure but expand FAQs
    '1': { title: 'Setup & Components', description: 'Set up Angular and create components', notes: `# Angular Setup and Components\n\nAngular is complete framework with everything. Use Angular CLI to generate projects. Components are decorated classes.`, examples: [{ title: 'Angular Component', code: `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-hello',\n  template: '<h1>Hello {{ name }}</h1>',\n  styles: ['h1 { color: blue; }']\n})\nexport class HelloComponent {\n  name = 'Angular';\n}`, output: `<h1 style="color: blue;">Hello Angular</h1>` }], faqs: [{ q: 'What is Angular?', a: 'Angular is a complete, opinionated framework for building web applications with TypeScript. Unlike React which is just UI library, Angular provides everything: routing, HTTP client, forms, animations, testing utilities. Angular enforces structure and patterns making large teams more productive. Learning curve is steep but investment pays off on big projects. Angular uses TypeScript extensively with strong typing. Use Angular when building enterprise applications with complex requirements.' }, { q: 'What is a decorator?', a: 'Decorators are functions that mark and configure classes or properties. @Component marks class as component, specifying selector, template, styles. @NgModule marks class as module collecting components. @Injectable marks service. Decorators are Angular way to add metadata to classes. Decorators use @ symbol. TypeScript experimental feature required in tsconfig. Decorators define what Angular does with decorated class and how it behaves in application.' }, { q: 'What is a module?', a: 'Module is collection of components, services, directives logically grouped. Defined with @NgModule decorator specifying imports, declarations, providers, bootstrap. AppModule is root module bootstrapping application. Each feature can have feature module. Modules organize code and define dependencies. Lazy loading feature modules loads them only when needed. Modules are essential for structuring Angular applications preventing spaghetti code.' }, { q: 'What is a service?', a: 'Service is class with business logic shared across components. Marked with @Injectable decorator to enable dependency injection. Services handle API calls, data processing, authentication. Defined once, injected into many components. Services enable code reuse and testability. Dependency injection automatically provides instances. Services are singletons by default - same instance across app. HttpClient is example built-in service for HTTP requests.' }, { q: 'What is dependency injection?', a: 'Dependency injection automatically provides required dependencies to components and services. Constructor parameters declare dependencies, Angular provides instances. Removes need for manual creation. Enables easy testing by injecting mock dependencies. Services are automatically provided. Use providers in module to register services. DI is core Angular feature enabling loose coupling and testability. Services declared in providers available to all components in module.' } ] },
    '2': { title: 'Templates & Binding', description: 'Master Angular templates and data binding', notes: `# Angular Templates\n\nTemplates are HTML with Angular directives. Bindings connect data to template. Directives add logic to templates.`, examples: [{ title: 'Two-way Binding', code: `import { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-input',\n  template: '<input [(ngModel)]="text"> {{ text }}'\n})\nexport class InputComponent {\n  text = '';\n}`, output: `[input field] [user types 'hello'] hello` }], faqs: [{ q: 'What is interpolation?', a: '{{ }} syntax displays component data in template. Example: {{ name }} displays value of component name property. Interpolation evaluates expression showing result in HTML. Can use expressions: {{ count + 1 }}, method calls: {{ getTitle() }}, ternary: {{ isBold ? \'bold\' : \'normal\' }}. Interpolation is read-only - shows data but doesn\'t modify it. Any expression that evaluates to primitive value or null works in interpolation.' }, { q: 'What is property binding?', a: '[property]="value" syntax binds component value to HTML property. Example: [disabled]="isDisabled" sets HTML disabled attribute. [src]="imageUrl" sets image source. Differs from interpolation - directly binds to property not just display. One-way: changes in component update template but not vice versa. Can bind to any property: [value], [href], [class], [style]. Prevents XSS attacks by escaping values.' }, { q: 'What is event binding?', a: '(event)="handler()" syntax binds HTML events to component methods. Example: (click)="onDelete()" calls onDelete method when clicked. (input)="onInput($event)" accesses event object. (keyup.enter)="onEnter()" listens for specific keys. Event binding is one-way: template triggers component method. $event special variable holds native DOM event. Common events: click, input, change, focus, blur, submit.' }, { q: 'What is two-way binding?', a: '[(ngModel)]="value" combines property and event binding for two-way sync. Changes in input update component, component changes update input. Requires FormsModule import. Example: <input [(ngModel)]="name"> syncs both directions. Two-way binding reduces boilerplate compared to separate property and event bindings. Use sparingly - explicit one-way binding is clearer for most cases. Perfect for form inputs where syncing is natural.' }, { q: 'What is *ngIf?', a: '*ngIf="condition" renders or removes element. Example: <div *ngIf="isVisible">Content</div> shows/hides based on condition. Element is added/removed from DOM completely, not just hidden. Use else clause: *ngIf="isAdmin; else notAdmin" with <ng-template #notAdmin>...</ng-template>. Removes element and cleans up listeners. Perfect for conditional rendering. Use [hidden] to hide but keep in DOM.' } ] },
    '3': { title: 'Services & DI', description: 'Create services and use dependency injection', notes: `# Angular Services and DI\n\nServices encapsulate business logic. Dependency injection provides instances. HttpClient for HTTP requests.`, examples: [{ title: 'Service Example', code: `import { Injectable } from '@angular/core';\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class DataService {\n  getData() {\n    return { id: 1, name: 'John' };\n  }\n}\n\n// In component\nconstructor(private dataService: DataService) {}\ndata = this.dataService.getData();`, output: `{ "id": 1, "name": "John" }` }], faqs: [{ q: 'What is a service?', a: 'Service is class with shared business logic, state, or utility methods. Marked with @Injectable to enable dependency injection. Services handle cross-cutting concerns: API calls, authentication, data transformation. Services are singletons - same instance across app. Services enable code reuse and testability. Inject into components via constructor. Services abstract complexity from components keeping them focused on UI.' }, { q: 'What is @Injectable?', a: '@Injectable decorator marks class as injectable with dependency injection. Specifies how service is provided. providedIn: \'root\' provides service application-wide as singleton. Can provide at module level, component level, or feature-specific. Required for services that have dependencies themselves. Without @Injectable, Angular can\'t inject service. Best practice: always mark services with @Injectable.' }, { q: 'What is dependency injection?', a: 'Dependency injection automatically provides required dependencies to classes. Constructor parameters declare dependencies: constructor(private service: MyService). Angular instantiates and injects service. Removes manual creation improving testability and flexibility. Inject mock dependencies in tests. DI is core Angular pattern enabling loose coupling. Services declared in providers available for injection.' }, { q: 'What is HttpClient?', a: 'HttpClient service for HTTP requests in Angular. Inject via constructor: constructor(private http: HttpClient). Use http.get(), http.post(), http.put(), http.delete() methods. Returns Observables - subscribe to get data. Automatically handles serialization/deserialization. Includes error handling, interceptors, timeout. Best practice for all HTTP operations. Requires HttpClientModule import in module.' }, { q: 'What is an Observable?', a: 'Observable is lazy collection of events over time. Services often return Observables. Subscribe to get values: service.getData().subscribe(data => { ... }). Differs from Promises - Observables can emit multiple values. Use operators like map, filter to transform data. Essential for async data in Angular. RxJS library provides Observable and operators. Unsubscribe to prevent memory leaks.' } ] },
    '4': { title: 'Routing', description: 'Set up routing in Angular applications', notes: `# Angular Routing\n\nRouting enables navigation between views. Use RouterModule and Routes. Navigate with routerLink or router service.`, examples: [{ title: 'Route Configuration', code: `import { NgModule } from '@angular/core';\nimport { RouterModule, Routes } from '@angular/router';\n\nconst routes: Routes = [\n  { path: '', component: HomeComponent },\n  { path: 'about', component: AboutComponent },\n  { path: 'user/:id', component: UserComponent }\n];\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes)],\n  exports: [RouterModule]\n})\nexport class AppRoutingModule { }`, output: `Routes configured for /, /about, /user/:id` }], faqs: [{ q: 'What is routing?', a: 'Routing enables navigation between different views/pages in single-page application. Define routes in Routes array specifying path and component. RouterModule enables routing. <router-outlet> placeholder renders active route component. Use routerLink for navigation without page reload. Preserves component state between navigation. Essential for multi-view applications. Routes can have parameters (:id) and query strings.' }, { q: 'What is router outlet?', a: '<router-outlet></router-outlet> is placeholder where active route component renders. Place in app template where navigated components should display. Only one route renders at time. Can have multiple outlets for complex layouts. Component corresponding to current route renders in outlet. Navigation without page reload makes application feel fast and responsive.' }, { q: 'What is routerLink?', a: '[routerLink] directive navigates without page reload. Example: [routerLink]="[\'about\']" navigates to /about. [routerLink]="[\'user\', userId]" passes parameters. Can compare with current route: routerLinkActive="active" highlights current route link. Use instead of href to stay within single-page application. routerLink automatically handles relative/absolute paths.' }, { q: 'What are route parameters?', a: ':param in path like /user/:id captures dynamic values. Access via ActivatedRoute: constructor(private route: ActivatedRoute). Get param: this.route.params.subscribe(params => { const id = params[\'id\']; }). Query parameters follow ?: /search?q=term. Use ActivatedRoute to access params and query parameters. Parameters enable passing data through URL making it bookmarkable and shareable.' }, { q: 'What are guards?', a: 'Guards control access to routes. CanActivate prevents navigation if condition not met. CanDeactivate asks permission before leaving route. CanActivateChild protects child routes. Resolve pre-fetches data before navigation. Guards ensure valid navigation: check authentication before accessing admin routes, fetch data before showing component. Guards are services implementing guard interfaces. Return true to allow navigation, false to prevent.' } ] },
    '5': { title: 'RxJS & Observables', description: 'Master RxJS and reactive programming', notes: `# RxJS and Observables\n\nObservables represent async data streams. Operators transform data. Subjects emit values.`, examples: [{ title: 'Observable Example', code: `import { Observable } from 'rxjs';\n\nconst observable = new Observable(subscriber => {\n  subscriber.next('Hello');\n  subscriber.next('RxJS');\n  subscriber.complete();\n});\n\nobservable.subscribe(value => {\n  console.log(value);\n});`, output: `Hello\nRxJS` }], faqs: [{ q: 'What is an Observable?', a: 'Observable is lazy collection representing stream of values over time. Created once but executed only when subscribed. Can emit multiple values or error. Differs from Promise - Promise resolves to single value, Observable can emit many. Use in Angular extensively with HttpClient, event handling, timers. Subscribe to get values: observable.subscribe(value => { ... }). Unsubscribe when done to prevent memory leaks.' }, { q: 'What is subscribe?', a: 'subscribe() method listens to Observable and receives emitted values. Syntax: observable.subscribe(value => { process(value) }). Can provide error and complete callbacks: .subscribe(value => {}, error => {}, () => {}). Subscribe triggers Observable execution. Without subscribe, Observable doesn\'t execute. Returns Subscription that can be unsubscribed to stop listening.' }, { q: 'What is an operator?', a: 'Operator is function transforming Observable values. map() transforms values, filter() filters values, mergeMap() merges multiple observables. Operators are chainable: source.pipe(map(...), filter(...)).subscribe(). Pure functions - don\'t modify source Observable. Create new Observable applying transformation. Essential for complex data flow. Common operators: map, filter, tap, take, debounceTime, distinctUntilChanged.' }, { q: 'What is a Subject?', a: 'Subject is both Observable and Observer. Can emit values and subscribe to values. Multicast - all subscribers get same values. Use for event buses, state management. Example: subject.next(value) emits, subject.subscribe() listens. BehaviorSubject remembers last value, ReplaySubject remembers multiple values. Subjects enable pushing data to subscribers actively not just pulling.' }, { q: 'What is mergeMap?', a: 'mergeMap (formerly flatMap) subscribes to inner Observable when source emits. Flattens nested Observables. Example: source.pipe(mergeMap(id => http.get(\'/user/\' + id))). Requests cancel if component destroyed with takeUntil(). Essential for dependent requests. Differs from map which applies function without subscribing to result. Use mergeMap for HTTP requests, file uploads, dependent operations.' } ] }
  }
};
