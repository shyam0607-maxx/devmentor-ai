# 🚀 Deploy to Vercel - 3 Minutes

Your code is on GitHub! ✅

**GitHub Repository**: https://github.com/shyam0607-maxx/devmentor-ai

Now let's deploy the frontend to Vercel:

---

## 📋 STEP 1: Go to Vercel

1. Open: https://vercel.com/new
2. Click: **"Continue with GitHub"**
3. Authorize Vercel access to your GitHub

---

## 📦 STEP 2: Select Repository

1. You should see `devmentor-ai` in the list
2. Click it to import
3. Click: **"Import"**

---

## ⚙️ STEP 3: Configure Project

**Framework Preset**: Next.js (should auto-detect)

**Root Directory**: 
- Click dropdown
- Select: `frontend`

**Build Command**: Keep default `npm run build`

**Environment Variables**:
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `http://localhost:5000/api` (for now, local backend)

---

## 🚀 STEP 4: Deploy

Click: **"Deploy"**

Wait 2-5 minutes...

---

## ✅ Your Live URL

Once deployed, you'll get a URL like:

```
🌐 https://devmentor-ai.vercel.app
```

Share this URL with anyone!

---

## 🔄 Next: Deploy Backend (Optional)

To make the backend live too, follow: [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)

---

**Ready? Go to https://vercel.com/new and start deploying!** 🚀

