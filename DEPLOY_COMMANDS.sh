#!/bin/bash
# DevMentor AI - GitHub & Vercel Deployment Commands
# Username: shyam0607-maxx

echo "🚀 DevMentor AI Deployment Script"
echo "=================================="
echo ""
echo "STEP 1: Configure Git"
git config user.name "Shyam Saravanan"
git config user.email "shyamsaravanan.cse2025@citchennai.net"

echo ""
echo "STEP 2: Initialize Repository"
git init
git add .
git commit -m "Initial commit: DevMentor AI Phase 1 - Complete Foundation

- User authentication (signup/login)
- MongoDB integration
- Main dashboard with progress tracking
- DSA learning path
- RESTful API with 16+ endpoints
- Professional UI with Tailwind CSS
- TypeScript type safety
- Environment configuration
- Comprehensive documentation"

echo ""
echo "STEP 3: Add Remote Repository"
git remote add origin https://github.com/shyam0607-maxx/devmentor-ai.git
git branch -M main

echo ""
echo "STEP 4: Push to GitHub"
echo "⚠️  When prompted for password, paste your GitHub Personal Access Token"
echo "    (Get it from: https://github.com/settings/tokens/new)"
echo ""
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo "📍 Repository: https://github.com/shyam0607-maxx/devmentor-ai"
