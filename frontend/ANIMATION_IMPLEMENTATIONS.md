# Complete Module-Specific Animation Implementations

## Overview
This file contains 25 module-specific mind-map visualizations (5 technologies × 5 modules each).

## MongoDB Animations (techId === '1')

### Module 1: mongodb-intro
Center: "Setup" → Branches: Install, Atlas, Verify, Connect

### Module 2: crud
Center: "CRUD" → Branches: Create (top-left), Read (top-right), Update (bottom-left), Delete (bottom-right)

### Module 3: indexing  
Center: "Index" → Branches: Single, Compound, TTL, Text indexes

### Module 4: pipeline
Center: "Pipeline" → Branches: $match, $group, $sort, $project

### Module 5: replication
Center: "Replica" → Branches: Primary, Secondary, Arbiter, Sync

---

## Express Animations (techId === '2')

### Module 1: express-setup
Center: "Express" → Branches: Install, Setup, Config, Middleware

### Module 2: routing
Center: "Routes" → Branches: GET, POST, PUT, DELETE

### Module 3: middleware-chain
Center: "Chain" → Branches: Auth, Logging, Parsing, Validation

### Module 4: error-flow
Center: "Errors" → Branches: 404, 500, Handling, Recovery

### Module 5: mvc
Center: "MVC" → Branches: Model, View, Controller, Routes

---

## Node.js Animations (techId === '3')

### Module 1: nodejs-runtime
Center: "Runtime" → Branches: V8, Libuv, Event Loop, Async

### Module 2: async-flow
Center: "Async" → Branches: Callback, Promise, Async/Await, Error

### Module 3: file-io
Center: "FileIO" → Branches: Read, Write, Stream, Sync

### Module 4: streams
Center: "Streams" → Branches: Readable, Writable, Transform, Duplex

### Module 5: performance
Center: "Perf" → Branches: Profiling, Optimization, Clustering, Caching

---

## React Animations (techId === '4')

### Module 1: jsx-structure
Center: "JSX" → Branches: Elements, Components, Props, Children

### Module 2: hooks-state
Center: "Hooks" → Branches: useState, useEffect, useContext, Custom

### Module 3: effect-lifecycle
Center: "Lifecycle" → Branches: Mount, Update, Unmount, Cleanup

### Module 4: context-flow
Center: "Context" → Branches: Provider, Consumer, useContext, Hooks

### Module 5: optimization
Center: "Optimize" → Branches: Memo, useMemo, useCallback, Lazy

---

## Angular Animations (techId === '5')

### Module 1: ng-setup
Center: "Angular" → Branches: Install, CLI, Setup, Module

### Module 2: templates
Center: "Template" → Branches: Binding, Directives, Events, Forms

### Module 3: services
Center: "Service" → Branches: Injectable, DI, HTTP, Singleton

### Module 4: routing
Center: "Route" → Branches: Navigation, Guards, Params, Lazy

### Module 5: rxjs
Center: "RxJS" → Branches: Observable, Subject, Operators, Subscription

---

## SVG Mind-Map Template

```jsx
{getAnimationType() === 'MODULE_TYPE' && (
  <>
    {/* Center Node */}
    <circle cx="500" cy="300" r="45" fill="url(#primary)" filter="url(#mindmapGlow)"/>
    <text x="500" y="310" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Center</text>
    
    {/* Top-Left Branch */}
    <line x1="460" y1="265" x2="280" y2="130" stroke="#10b981" strokeWidth="2.5" opacity="0.7"/>
    <circle cx="280" cy="130" r="30" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2"/>
    <text x="280" y="138" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Item1</text>
    
    {/* Top-Right Branch */}
    <line x1="540" y1="265" x2="720" y2="130" stroke="#06b6d4" strokeWidth="2.5" opacity="0.7"/>
    <circle cx="720" cy="130" r="30" fill="#06b6d4" fillOpacity="0.4" stroke="#06b6d4" strokeWidth="2"/>
    <text x="720" y="138" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="bold">Item2</text>
    
    {/* Bottom-Left Branch */}
    <line x1="460" y1="340" x2="280" y2="470" stroke="#8b5cf6" strokeWidth="2.5" opacity="0.7"/>
    <circle cx="280" cy="470" r="30" fill="#8b5cf6" fillOpacity="0.4" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="280" y="478" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Item3</text>
    
    {/* Bottom-Right Branch */}
    <line x1="540" y1="340" x2="720" y2="470" stroke="#f59e0b" strokeWidth="2.5" opacity="0.7"/>
    <circle cx="720" cy="470" r="30" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2"/>
    <text x="720" y="478" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Item4</text>
    
    {/* Title */}
    <text x="500" y="670" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">Module Title</text>
  </>
)}
```

---

## Color Scheme

| Technology | Primary Color | Secondary | Accent | Highlight |
|-----------|---------------|-----------|--------|-----------|
| MongoDB | #10b981 | #06b6d4 | #8b5cf6 | #f59e0b |
| Express | #f59e0b | #10b981 | #06b6d4 | #8b5cf6 |
| Node.js | #6ee7b7 | #10b981 | #f59e0b | #8b5cf6 |
| React | #8b5cf6 | #06b6d4 | #10b981 | #f59e0b |
| Angular | #f97316 | #06b6d4 | #10b981 | #8b5cf6 |

---

## Important Notes

1. **Line Coordinates**: All lines connect center (500, 300) to outer circles
   - Top-Left: (280, 130)
   - Top-Right: (720, 130)
   - Bottom-Left: (280, 470)
   - Bottom-Right: (720, 470)

2. **Text Positioning**: Text y-coordinate = circle cy + 8

3. **Animation Classes**: 
   - `.mindmap-node` - glow animation
   - `.mindmap-line` - draw animation
   - Use `animationDelay` for staggered effects

4. **Line Points**: Always check that x2 and y2 match circle cx and cy
