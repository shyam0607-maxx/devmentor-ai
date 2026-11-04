# 🚀 DevMentor AI - Quick Start (5 Minutes)

## Prerequisites
- Node.js 18+
- MongoDB running (local or Atlas)

## 1️⃣ Start MongoDB

```bash
# Local
mongod

# Or use MongoDB Atlas cloud
```

## 2️⃣ Start Backend

```bash
cd backend
npm install
npm run dev
```

Expected: `Server running on port 5000`

## 3️⃣ Start Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Expected: `Local: http://localhost:3000`

## 4️⃣ Seed Database (Optional)

```bash
cd backend
node seed/seed.js
```

## 5️⃣ Login & Explore

1. Visit: http://localhost:3000
2. Click **"Sign Up"** or **"Login"**
3. Use demo credentials:
   - **Email**: demo@example.com
   - **Password**: demo123
4. Explore the dashboard!

## ✅ Done!

You now have DevMentor AI running locally with:
- ✅ User authentication
- ✅ Learning dashboard
- ✅ DSA topic listing
- ✅ Progress tracking

## 📚 Next Steps

- Read full docs: [`SETUP_GUIDE.md`](./SETUP_GUIDE.md)
- Understand structure: [`PHASE_1_SUMMARY.md`](./PHASE_1_SUMMARY.md)
- See detailed guide: [`README.md`](./README.md)

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB won't start | Run `mongod` in terminal |
| Port 5000 in use | Change PORT in backend/.env |
| Frontend can't connect | Check backend is running |
| Login fails | Run `node seed/seed.js` |
| Can't find localhost:3000 | Check frontend is running |

---

**Status**: ✅ Phase 1 Complete | Ready for Phase 2: DSA Visualizations
