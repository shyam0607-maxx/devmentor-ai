# DevMentor AI - Vercel Deployment Guide

This guide walks you through deploying DevMentor AI to production on Vercel and other platforms.

## 🎯 Deployment Overview

We'll deploy:
1. **Frontend** → Vercel (Next.js native support)
2. **Backend** → Render.com (free tier available) 
3. **Database** → MongoDB Atlas (cloud)

## 📋 Prerequisites

- Vercel account (free): https://vercel.com
- Render account (free): https://render.com
- MongoDB Atlas account (free): https://www.mongodb.com/cloud/atlas
- Git repository (optional but recommended)

---

## STEP 1: Setup MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Atlas Account
1. Visit: https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a new organization and project

### 1.2 Create a Cluster
1. Click "Create" cluster
2. Select "M0 Free" tier
3. Choose your region (select closest to your users)
4. Click "Create Cluster"
5. Wait for cluster to deploy (~5 minutes)

### 1.3 Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Add user with "Read and write to any database" role
5. Click "Add User"

### 1.4 Get Connection String
1. Go to "Clusters" → "Connect"
2. Choose "Connect your application"
3. Copy connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/devmentor-ai?retryWrites=true&w=majority`)
4. Replace `<username>` and `<password>` with your credentials
5. Keep this string safe - you'll need it!

### 1.5 Whitelist Your IP (or all IPs for testing)
1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Add your current IP
4. For production: Add `0.0.0.0/0` (allows all - less secure but works)
5. Confirm

---

## STEP 2: Deploy Backend to Render

Render is easier than Vercel Functions for Express apps.

### 2.1 Prepare Backend for Deployment
```bash
cd backend
```

Update `backend/package.json`:
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js"
  }
}
```

### 2.2 Create Render Account
1. Visit: https://render.com
2. Sign up (free tier available)
3. Verify email

### 2.3 Push Backend to GitHub (Required for Render)
```bash
# In devmentor-ai directory
git init
git add backend/
git commit -m "Add backend code"
git remote add origin https://github.com/YOUR_USERNAME/devmentor-ai.git
git branch -M main
git push -u origin main
```

### 2.4 Deploy Backend to Render
1. Log in to Render: https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository
5. Configure:
   - **Name**: `devmentor-api`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Select closest to you
   - **Plan**: Free (available)

### 2.5 Add Environment Variables in Render
Click "Environment" and add:
```
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devmentor-ai?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-this
CLAUDE_API_KEY=sk-your-claude-key
NODE_ENV=production
```

Replace with your actual values!

### 2.6 Deploy
1. Click "Create Web Service"
2. Wait for deployment (2-5 minutes)
3. You'll get a URL like: `https://devmentor-api.onrender.com`
4. Save this URL!

**Note**: Render free tier goes to sleep after 15 minutes of inactivity. Visit the URL to wake it up.

---

## STEP 3: Deploy Frontend to Vercel

### 3.1 Push Frontend to GitHub
```bash
git add frontend/
git commit -m "Add frontend code"
git push origin main
```

### 3.2 Connect Frontend to Vercel
1. Visit: https://vercel.com/new
2. Click "Import Git Repository"
3. Sign in with GitHub
4. Paste your repository URL: `https://github.com/YOUR_USERNAME/devmentor-ai`
5. Click "Import"

### 3.3 Configure Frontend
1. **Root Directory**: `frontend`
2. **Framework**: Next.js (auto-detected)
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### 3.4 Add Environment Variables
Click "Environment Variables" and add:
```
NEXT_PUBLIC_API_URL=https://devmentor-api.onrender.com/api
```

Replace with your Render backend URL!

### 3.5 Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. You'll get a Vercel URL like: `https://devmentor-ai.vercel.app`

---

## 🌐 URLs After Deployment

After successful deployment, you'll have:

```
Frontend:  https://devmentor-ai.vercel.app
Backend:   https://devmentor-api.onrender.com
Database:  MongoDB Atlas (cloud)
```

---

## ✅ Verify Deployment

### Test Frontend
1. Visit your Vercel URL
2. Click "Sign Up"
3. Create account
4. Should redirect to dashboard

### Test Backend API
```bash
# Health check
curl https://devmentor-api.onrender.com/api/health

# Should return:
# {"status":"Backend is running"}
```

### Test Database Connection
1. Login to MongoDB Atlas
2. Go to "Clusters"
3. Click "Collections"
4. Should see "users" collection with data

---

## 🔧 Troubleshooting Deployment

### Frontend Deployment Issues

**Error: "Module not found"**
- Check `tsconfig.json` paths are correct
- Verify all imports use `@/` alias

**Error: "NEXT_PUBLIC_API_URL not found"**
- Add environment variable in Vercel dashboard
- Restart deployment

**Blank page after deploy**
- Check browser console for errors
- Verify backend URL in environment variables
- Hard refresh: Ctrl+Shift+R

### Backend Deployment Issues

**Error: "MongoDB connection failed"**
- Verify connection string is correct
- Check MongoDB Atlas whitelist includes all IPs
- Test connection locally first

**Error: "Port already in use"**
- Render auto-assigns port (usually 10000)
- Don't hardcode port in code

**Render goes to sleep**
- Free tier sleeps after 15 minutes
- Visit URL to wake it up
- Consider upgrading to paid plan for production

### Connection Issues

**Frontend can't reach backend**
- Check `NEXT_PUBLIC_API_URL` in Vercel
- Verify backend is running on Render
- Check CORS is enabled in backend
- Test backend URL directly in browser

---

## 📊 Deployed Architecture

```
┌─────────────────────┐
│  Your Browser       │
└──────────┬──────────┘
           │
           │ HTTPS
           ▼
┌─────────────────────┐
│  Vercel (Frontend)  │
│  devmentor-ai       │
└──────────┬──────────┘
           │
           │ API Calls
           ▼
┌─────────────────────┐
│  Render (Backend)   │
│  devmentor-api      │
└──────────┬──────────┘
           │
           │ Database Queries
           ▼
┌─────────────────────┐
│  MongoDB Atlas      │
│  devmentor-ai       │
└─────────────────────┘
```

---

## 🔒 Production Security Checklist

- ✅ Change `JWT_SECRET` to a random, strong key
- ✅ Use strong MongoDB password
- ✅ Enable MongoDB encryption (Atlas automatic)
- ✅ Set `NODE_ENV=production`
- ✅ Whitelist only necessary IPs on MongoDB Atlas
- ✅ Use HTTPS for all connections (automatic on Vercel/Render)
- ✅ Never commit `.env` files to Git
- ✅ Rotate API keys periodically
- ✅ Monitor logs for suspicious activity

---

## 📈 Performance Optimization

### Frontend
- Vercel auto-optimizes Next.js
- Images are auto-optimized
- Code splitting is automatic
- DNS/CDN provided by Vercel

### Backend
- Render provides auto-scaling
- Add caching headers to API
- Optimize MongoDB queries
- Consider upgrading from free tier for production

### Database
- MongoDB Atlas auto-backups
- Indexes are automatically created
- Free tier limited but suitable for MVP

---

## 💰 Cost Estimation (Monthly)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | Up to 100GB bandwidth | $0 |
| Render | 750 free hours | $0 (within limits) |
| MongoDB Atlas | Up to 512MB data | $0 |
| **Total** | **For small apps** | **$0** |

**Notes:**
- Free tiers sufficient for testing/MVP
- Production apps may need paid tiers
- Costs scale with usage

---

## 🚀 Continuous Deployment

Both Vercel and Render support automatic deployment:

1. **Vercel**: Automatically deploys on `git push` to main
2. **Render**: Automatically deploys on `git push` to main

No manual deployment needed after initial setup!

---

## 📝 After Deployment Checklist

- [ ] Frontend accessible at Vercel URL
- [ ] Backend health check returns 200
- [ ] Can signup and login
- [ ] Dashboard loads with real data
- [ ] No console errors in browser
- [ ] API calls working
- [ ] Database updates reflected in frontend
- [ ] Logout works correctly
- [ ] Can test on mobile
- [ ] Share URL with others

---

## 🆘 Need Help?

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Backend unreachable" | Check `NEXT_PUBLIC_API_URL` environment variable |
| "MongoDB connection error" | Verify connection string and whitelist IP |
| "Render app goes to sleep" | Free tier limitation; visit URL to wake up |
| "CORS errors" | Backend CORS already configured for all origins |
| "Build fails on Vercel" | Check console logs; usually missing environment variables |

### Verification Commands

```bash
# Test frontend
curl https://YOUR_VERCEL_URL.vercel.app

# Test backend
curl https://YOUR_RENDER_URL.onrender.com/api/health

# Test database (from MongoDB Atlas)
# Use MongoDB Compass and connect with your connection string
```

---

## 🎯 Next Steps

1. ✅ Deploy using this guide
2. ✅ Test all functionality
3. ✅ Share live URL with others
4. ✅ Continue with Phase 2 development
5. ✅ Monitor logs in Vercel/Render dashboards

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Next.js Deployment**: https://nextjs.org/learn/foundations/how-nextjs-works/production

---

**Status**: Deployment Guide Complete  
**Last Updated**: November 4, 2024  
**Ready for Production**: Yes ✅

