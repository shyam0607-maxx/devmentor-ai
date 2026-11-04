# DevMentor AI - AI-Powered DSA & Full-Stack Development Learning Platform

A comprehensive, production-quality web application that helps students learn Data Structures, Algorithms, and Full-Stack Development through interactive visualizations, AI-powered tutoring, and mock interviews.

## 🎯 Features

### Phase 1 ✅ (Complete)
- ✅ User authentication (Sign up, Login, JWT)
- ✅ Landing page with learning paths
- ✅ Main dashboard with progress tracking
- ✅ DSA topics listing
- ✅ Backend API setup with MongoDB

### Phase 2 (DSA Module)
- 🔄 Interactive DSA visualizations
- 🔄 Multi-language code examples (Java, C++, Python)
- 🔄 Topic-wise learning materials
- 🔄 Complexity analysis

### Phase 3 (Full-Stack Module)
- 🔄 MERN Stack learning path
- 🔄 MEAN Stack learning path
- 🔄 Architecture visualizations

### Phase 4 (AI Tutor)
- 🔄 Context-aware AI tutoring
- 🔄 Explanation generation
- 🔄 Code analysis

### Phase 5 (Mock Interviews)
- 🔄 Topic-wise interviews
- 🔄 AI-powered question generation
- 🔄 Interview feedback and scoring

### Phase 6+ (Advanced Features)
- 🔄 Coding practice module
- 🔄 Comprehensive dashboards
- 🔄 Admin management

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom with Lucide React icons
- **Animations**: Framer Motion (Phase 3+)
- **Charts**: Recharts (Phase 6+)
- **Code Editor**: Monaco Editor (Phase 2+)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **AI**: Claude API for tutoring & interviews
- **HTTP Client**: Axios

## 📋 Project Structure

```
devmentor-ai/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages
│   │   ├── page.tsx         # Landing page
│   │   ├── signup/          # Sign up page
│   │   ├── login/           # Login page
│   │   ├── dashboard/       # Main dashboard
│   │   ├── dsa/            # DSA learning paths
│   │   └── fullstack/      # Full-stack paths
│   ├── lib/
│   │   └── api.ts          # API client utilities
│   ├── components/         # Reusable components
│   ├── public/             # Static assets
│   └── package.json
│
├── backend/                # Express.js backend
│   ├── src/
│   │   ├── index.js        # Entry point
│   │   ├── models/         # MongoDB schemas
│   │   │   ├── User.js
│   │   │   └── LearningProgress.js
│   │   ├── routes/         # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── dsaRoutes.js
│   │   │   ├── fsdRoutes.js
│   │   │   └── aiRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── services/       # Business logic
│   │   └── config/         # Configuration
│   ├── .env.example        # Environment template
│   ├── package.json
│   └── seed/               # Database seeding
│       └── seed.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Claude API key (from Anthropic)

### 1. Clone and Setup

```bash
cd devmentor-ai
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add:
# - MONGODB_URI=mongodb://localhost:27017/devmentor-ai
# - JWT_SECRET=your-secret-key
# - CLAUDE_API_KEY=your-claude-api-key
# - PORT=5000

# Start the backend server
npm run dev
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies (should already be done by create-next-app)
npm install

# Create .env.local (should already exist)
# Verify NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the frontend development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 4. Database Setup (Optional - Seeding)

```bash
cd backend
node seed/seed.js
```

This creates demo users and initial curriculum data.

## 👤 Demo Credentials

After seeding or signup:
- **Email**: demo@example.com
- **Password**: demo123

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user

### User
- `GET /api/users/profile` - Get user profile (auth required)
- `GET /api/users/progress` - Get learning progress (auth required)
- `POST /api/users/update-path` - Update learning path (auth required)

### DSA
- `GET /api/dsa/topics` - List all DSA topics
- `GET /api/dsa/topic/:id` - Get topic details

### Full-Stack
- `GET /api/fsd/paths` - List FSD paths (MERN, MEAN)
- `GET /api/fsd/:path/modules` - Get modules for a path

### AI
- `POST /api/ai/tutor` - Ask AI tutor (auth required)
- `POST /api/ai/interview` - Start mock interview (auth required)

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devmentor-ai
JWT_SECRET=your-secret-key-change-in-production
CLAUDE_API_KEY=your-claude-api-key
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes
- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Server-side Claude API calls (no keys exposed to frontend)

## 🧪 Testing the App

### 1. Signup Flow
1. Visit `http://localhost:3000`
2. Click "Sign Up"
3. Fill in credentials
4. Select learning path
5. Submit
6. Redirected to dashboard

### 2. Login Flow
1. Visit `http://localhost:3000/login`
2. Use demo credentials or your created account
3. Login
4. See dashboard with progress stats

### 3. Dashboard Features
- View DSA, MERN, MEAN progress
- See learning streak
- Access learning paths
- View recent mock interview scores

### 4. DSA Learning Path
1. Click "DSA Learning" from dashboard
2. Browse 11 modules with topics
3. Click any topic to view details (Phase 2)

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongod`
- Verify MONGODB_URI in .env
- Check port 5000 is available

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Ensure CORS is enabled in backend

### JWT errors after login
- Clear localStorage and try again
- Check JWT_SECRET is set in backend .env
- Verify token format in Authorization header

### MongoDB connection errors
- Start MongoDB: `mongod`
- Or use MongoDB Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/devmentor-ai`

## 📚 Learning Roadmap

### Phase 1: Foundation (✅ Complete)
- User authentication
- Basic dashboard
- Landing page
- API setup

### Phase 2: DSA Core
- 60+ interactive visualizations
- Multi-language code
- Complexity analysis
- Practice problems

### Phase 3: Full-Stack
- MERN curriculum
- MEAN curriculum
- Architecture diagrams

### Phase 4: AI Tutor
- Context-aware explanations
- Code analysis
- Custom problem generation

### Phase 5: Mock Interviews
- Topic-wise interviews
- Performance scoring
- Feedback generation

### Phase 6: Advanced
- Coding practice
- Dashboards & analytics
- Admin panel
- Performance optimization

## 🤝 Contributing

This is a learning platform project. Future contributions can focus on:
- Adding more DSA visualizations
- Implementing code execution
- Creating interactive challenges
- Adding more full-stack content
- Performance optimization

## 📄 License

MIT License - Feel free to use this for learning and development.

## 🎓 Educational Purpose

DevMentor AI is designed as an educational tool to help students:
- Master Data Structures and Algorithms
- Learn Full-Stack Development
- Practice coding with AI assistance
- Prepare for technical interviews
- Track learning progress

---

**Status**: Phase 1 Complete ✅ | Working on Phase 2: DSA Visualizations 🔄

For questions or issues, check the troubleshooting section or review the code comments.
