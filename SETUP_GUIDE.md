# DevMentor AI - Complete Setup Guide

This guide walks you through setting up and running the DevMentor AI platform on your local machine.

## 🎯 Prerequisites

Before starting, ensure you have:

1. **Node.js** (18.0 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **MongoDB** (Local or Cloud)
   - **Option A**: Local MongoDB
     - Download: https://www.mongodb.com/try/download/community
     - Verify: `mongod --version`
   - **Option B**: MongoDB Atlas (Cloud)
     - Create free account: https://www.mongodb.com/cloud/atlas
     - Create cluster and get connection string

3. **Claude API Key** (Optional - for AI features)
   - Get from: https://console.anthropic.com/
   - Create new API key for the application

4. **Git** (Optional - for version control)
   - Download: https://git-scm.com/

## 📁 Project Structure

```
devmentor-ai/
├── backend/         # Express.js server
├── frontend/        # Next.js application
├── README.md        # Main documentation
├── SETUP_GUIDE.md   # This file
└── PHASE_1_SUMMARY.md
```

## 🚀 Step-by-Step Setup

### STEP 1: Start MongoDB

#### Option A: Local MongoDB

**Windows:**
```bash
# If MongoDB is installed via chocolatey or installer
mongod

# You should see: "waiting for connections on port 27017"
```

**macOS:**
```bash
# Using Homebrew
brew services start mongodb-community

# Verify it's running
brew services list | grep mongodb
```

**Linux:**
```bash
# Ubuntu/Debian
sudo systemctl start mongod
sudo systemctl status mongod
```

#### Option B: MongoDB Atlas (Cloud)

1. Log in to https://www.mongodb.com/cloud/atlas
2. Create a cluster (free tier available)
3. Click "Connect"
4. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/devmentor-ai`
5. Note this for the .env file

### STEP 2: Setup Backend

**Navigate to backend directory:**
```bash
cd devmentor-ai/backend
```

**Install dependencies:**
```bash
npm install
```

**Configure environment variables:**

Edit or create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devmentor-ai
JWT_SECRET=devmentor-secret-key-change-this-in-production
CLAUDE_API_KEY=sk-your-claude-api-key-here
NODE_ENV=development
```

**For MongoDB Atlas, use:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devmentor-ai
```

**Verify setup by testing the server:**
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

**Stop the server** (Ctrl+C) for now.

### STEP 3: Seed Database (Optional but Recommended)

**In the backend directory:**
```bash
node seed/seed.js
```

You should see:
```
✓ Connected to MongoDB
✓ Cleared existing data
✓ Created demo user
✓ Created admin user
✓ Created learning progress for demo user
✓ Created learning progress for admin

✅ Database seeded successfully!

Demo Credentials:
  Email: demo@example.com
  Password: demo123

Admin Credentials:
  Email: admin@example.com
  Password: admin123
```

### STEP 4: Setup Frontend

**In a new terminal, navigate to frontend directory:**
```bash
cd devmentor-ai/frontend
```

**Install dependencies** (might already be installed from create-next-app):
```bash
npm install
```

**Verify .env.local exists:**

Check if `devmentor-ai/frontend/.env.local` contains:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

If not, create it with the above content.

### STEP 5: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd devmentor-ai/backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected
✓ Backend is running
```

**Terminal 2 - Frontend:**
```bash
cd devmentor-ai/frontend
npm run dev
```

Expected output:
```
   ▲ Next.js 14.0.0
   - Local:        http://localhost:3000
   - Environments: .env.local
```

## 🌐 Access the Application

1. **Open your browser** and visit: `http://localhost:3000`

2. **You should see:**
   - DevMentor AI landing page
   - "Learn. Visualize. Practice. Master." headline
   - Two learning path cards (DSA and Full-Stack)
   - Navigation buttons

## 🔐 Test the Authentication

### Test Signup Flow:

1. Click **"Sign Up"** button
2. Fill in form:
   - **Full Name**: Your Name
   - **Email**: your.email@example.com
   - **Password**: Test@123
   - **Confirm Password**: Test@123
   - **Learning Path**: Select "Data Structures & Algorithms"
3. Click **"Create Account"**
4. You should be redirected to the **Dashboard**

### Test Login Flow:

1. From any page, click **"Login"**
2. Use demo credentials:
   - **Email**: demo@example.com
   - **Password**: demo123
3. Click **"Sign In"**
4. You should see the **Main Dashboard** with:
   - Progress stats (DSA, MERN, MEAN)
   - Learning streak
   - Learning path cards
   - Recent interview history

### Test Navigation:

1. From Dashboard, click **"DSA Learning"**
2. You should see **11 modules** with topics
3. Click any topic to view details (Phase 2)

## 🧪 Testing Features

### Test 1: User Registration
- [ ] Sign up with new email
- [ ] Verify redirect to dashboard
- [ ] Check localStorage has token and user data

### Test 2: User Login
- [ ] Login with demo credentials
- [ ] Verify dashboard shows correct name
- [ ] Verify progress data displays

### Test 3: Protected Routes
- [ ] Open developer console
- [ ] Remove token from localStorage
- [ ] Refresh page - should redirect to login

### Test 4: API Connections
- [ ] Open DevTools → Network tab
- [ ] Navigate to dashboard
- [ ] Check:
  - `/api/users/progress` returns 200
  - `/api/dsa/topics` returns 200
  - `/api/fsd/paths` returns 200

### Test 5: Logout
- [ ] Click Logout button
- [ ] Verify redirect to home page
- [ ] Verify token cleared from localStorage

## 🐛 Troubleshooting

### Problem: Backend won't start

**Error: "connect ECONNREFUSED 127.0.0.1:27017"**
- MongoDB is not running
- **Solution**: 
  - Start MongoDB: `mongod` (local) or check MongoDB Atlas
  - Verify MONGODB_URI in .env

**Error: "Port 5000 already in use"**
- Another service is using port 5000
- **Solution**: 
  - Change PORT in .env to 5001
  - Or: Kill process: `lsof -ti:5000 | xargs kill -9`

### Problem: Frontend can't reach backend

**Error: "Failed to fetch" or CORS errors**
- Backend is not running
- NEXT_PUBLIC_API_URL is incorrect
- **Solution**:
  - Verify backend is running on port 5000
  - Check .env.local has correct API URL
  - Hard refresh browser: Ctrl+Shift+R

### Problem: Login fails

**Error: "Invalid credentials"**
- Database not seeded with demo user
- Incorrect email/password
- **Solution**:
  - Run seed script: `node seed/seed.js`
  - Use correct credentials (see seed output)

**Error: "No token provided"**
- Frontend not sending token
- localStorage not working
- **Solution**:
  - Check DevTools → Application → localStorage
  - Clear localStorage and login again
  - Check browser privacy settings

### Problem: MongoDB connection fails

**Error: "MongoServerError: connect ECONNREFUSED"**
- **For Local MongoDB:**
  - Start MongoDB: `mongod`
  - Verify port 27017 is not blocked
  
- **For MongoDB Atlas:**
  - Check connection string format
  - Verify IP whitelist includes your IP (0.0.0.0/0 for all)
  - Check username/password are correct

### Problem: Node modules not installed

**Error: "Cannot find module..."**
- Dependencies not installed
- **Solution**:
  ```bash
  cd backend
  npm install
  
  cd ../frontend
  npm install
  ```

### Problem: "Cannot GET /api/health"

- Backend not running on correct port
- API prefix issue
- **Solution**:
  - Verify backend is running
  - Test: `curl http://localhost:5000/api/health`
  - Should return: `{"status":"Backend is running"}`

## 💾 Database Verification

### Check MongoDB Connection:

**Terminal:**
```bash
mongosh
```

**In mongosh prompt:**
```javascript
// Switch to devmentor-ai database
use devmentor-ai

// Check collections
show collections

// View users
db.users.find()

// View learning progress
db.learningprogresses.find()
```

## 🔑 Environment Variables Summary

### Backend (.env)
| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| MONGODB_URI | mongodb://localhost:27017/devmentor-ai | Database URL |
| JWT_SECRET | devmentor-secret-key-... | JWT signing key |
| CLAUDE_API_KEY | sk-... | Anthropic API key (optional) |
| NODE_ENV | development | Environment mode |

### Frontend (.env.local)
| Variable | Default | Description |
|----------|---------|-------------|
| NEXT_PUBLIC_API_URL | http://localhost:5000/api | Backend API URL |

## 📊 API Endpoints Available

### Health Check
- `GET http://localhost:5000/api/health`

### Authentication
- `POST http://localhost:5000/api/auth/signup`
- `POST http://localhost:5000/api/auth/login`

### User (Protected)
- `GET http://localhost:5000/api/users/profile`
- `GET http://localhost:5000/api/users/progress`
- `POST http://localhost:5000/api/users/update-path`

### DSA
- `GET http://localhost:5000/api/dsa/topics`
- `GET http://localhost:5000/api/dsa/topic/:id`

### Full-Stack
- `GET http://localhost:5000/api/fsd/paths`
- `GET http://localhost:5000/api/fsd/:path/modules`

### AI (Protected)
- `POST http://localhost:5000/api/ai/tutor`
- `POST http://localhost:5000/api/ai/interview`

## 🎯 Next: What to Do Next

### Immediate:
1. ✅ Get the application running
2. ✅ Test authentication flows
3. ✅ Explore all pages

### Short Term:
- [ ] Add Claude API key for AI features
- [ ] Customize demo credentials
- [ ] Explore database structure

### Long Term:
- [ ] Phase 2: DSA Visualizations
- [ ] Phase 3: Full-Stack Content
- [ ] Phase 4: AI Integration
- [ ] Phase 5: Mock Interviews

## 📞 Support & Documentation

- **Main README**: `../README.md`
- **Phase 1 Summary**: `../PHASE_1_SUMMARY.md`
- **Backend**: Check `backend/` files
- **Frontend**: Check `frontend/app/` pages

## ✅ Verification Checklist

Before assuming setup is complete:

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] MongoDB is running/connected
- [ ] Can access http://localhost:3000 in browser
- [ ] Landing page loads correctly
- [ ] Can sign up with new account
- [ ] Can login with credentials
- [ ] Dashboard shows progress stats
- [ ] Can navigate to DSA page
- [ ] Logout works correctly
- [ ] Can login again after logout

## 🎉 You're Ready!

Once all checks pass, DevMentor AI Phase 1 is successfully running!

The platform is now ready for:
- Testing all features
- Adding Claude API key for AI
- Proceeding to Phase 2 (DSA Visualizations)

---

**Last Updated**: November 4, 2024
**Current Phase**: Phase 1 ✅
**Status**: Fully Functional
