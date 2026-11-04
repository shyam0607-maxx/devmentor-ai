@echo off
REM DevMentor AI - GitHub & Vercel Deployment
REM Username: shyam0607-maxx

echo.
echo ========================================
echo 🚀 DevMentor AI Deployment Started
echo ========================================
echo.

REM Step 1: Configure Git
echo [1/5] Configuring Git...
git config user.name "Shyam Saravanan"
git config user.email "shyamsaravanan.cse2025@citchennai.net"

REM Step 2: Initialize Repository
echo [2/5] Initializing Git Repository...
git init

REM Step 3: Add all files
echo [3/5] Adding files...
git add .

REM Step 4: Create commit
echo [4/5] Creating commit...
git commit -m "Initial commit: DevMentor AI Phase 1 - Complete Foundation"

REM Step 5: Add remote and push
echo [5/5] Adding remote and pushing to GitHub...
git remote add origin https://github.com/shyam0607-maxx/devmentor-ai.git
git branch -M main

echo.
echo ⚠️  IMPORTANT: You will be prompted for authentication
echo    Use your GitHub Personal Access Token as password
echo    Get it from: https://github.com/settings/tokens/new
echo.
pause

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Code pushed to GitHub
    echo.
    echo 📍 Your Repository:
    echo    https://github.com/shyam0607-maxx/devmentor-ai
    echo.
    echo 🎯 Next Step: Deploy to Vercel
    echo    1. Go to: https://vercel.com/new
    echo    2. Select your repository
    echo    3. Configure and deploy!
    echo.
) else (
    echo.
    echo ❌ ERROR: Failed to push to GitHub
    echo    Check your token and internet connection
    echo.
)

pause
