# 🚀 CipherStudio Deployment Guide

Complete guide to deploy CipherStudio to production.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
5. [Alternative Deployments](#alternative-deployments)
6. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Render/Railway account (free tier works)
- ✅ MongoDB Atlas account (free tier works)
- ✅ Code pushed to GitHub repository

---

## 🌐 Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard (Recommended)

**Step 1: Push to GitHub**
```powershell
cd d:\myfolders\CipherSchool
git init
git add .
git commit -m "Initial commit - CipherStudio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cipherstudio.git
git push -u origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables (if needed):
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`

6. Click **"Deploy"**

**Step 3: Get Your URL**
- After deployment, you'll get a URL like: `https://cipherstudio.vercel.app`

### Option 2: Deploy via Vercel CLI

```powershell
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Backend for Production

Create `render.yaml` in the root directory (optional but recommended):

```yaml
services:
  - type: web
    name: cipherstudio-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: PORT
        value: 5000
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `cipherstudio-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables:
   ```
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
   JWT_SECRET = your_super_secret_jwt_key_here_change_this
   PORT = 5000
   ```

6. Click **"Create Web Service"**

### Step 3: Get Your Backend URL
- After deployment: `https://cipherstudio-backend.onrender.com`

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create Cluster

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Login
3. Create a **FREE M0 Cluster**
4. Choose a cloud provider (AWS/Google/Azure)
5. Select nearest region

### Step 2: Create Database User

1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Username: `cipherstudio`
5. Password: Generate a secure password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **"Add User"**

### Step 3: Whitelist IP Addresses

1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for simplicity)
   - Or add specific IPs: `0.0.0.0/0`
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** → **Connect**
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://cipherstudio:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `...mongodb.net/cipherstudio?retryWrites=true...`

### Step 5: Test Connection

Update your backend `.env` (local test):
```env
MONGODB_URI=mongodb+srv://cipherstudio:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cipherstudio?retryWrites=true&w=majority
```

Then add this to Render's environment variables.

---

## 🔄 Update Frontend with Backend URL

After deploying backend, update frontend:

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add/Update:
   ```
   VITE_API_URL = https://cipherstudio-backend.onrender.com
   ```
4. Redeploy

### Or update code:
In `frontend/src/` create `config.js`:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Update axios calls to use `API_URL`:
```javascript
import { API_URL } from './config';
axios.post(`${API_URL}/api/auth/login`, { email, password });
```

---

## 🔧 Alternative Deployments

### Backend Alternatives

#### 1. Railway.app
```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to backend
cd backend

# Initialize and deploy
railway init
railway up
```

#### 2. Cyclic.sh
1. Go to [cyclic.sh](https://cyclic.sh)
2. Connect GitHub
3. Select repository
4. Auto-deploys on push

#### 3. Heroku
```powershell
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd backend
heroku create cipherstudio-backend

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_secret"

# Deploy
git push heroku main
```

### Frontend Alternatives

#### 1. Netlify
```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend
cd frontend

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### 2. GitHub Pages (Static only)
```powershell
cd frontend
npm run build

# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d dist
```

---

## ✅ Post-Deployment Checklist

### 1. Test All Features
- [ ] Homepage loads correctly
- [ ] Can create new project in IDE
- [ ] Monaco editor works
- [ ] Live preview updates
- [ ] File create/delete/rename works
- [ ] Theme switcher works
- [ ] Auto-save functionality
- [ ] Manual save button
- [ ] Login/Register (if implemented)
- [ ] Cloud save to MongoDB

### 2. Update CORS Settings

In `backend/server.js`, update CORS:
```javascript
app.use(cors({
  origin: [
    'https://cipherstudio.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### 3. Security Checklist
- [ ] Change JWT_SECRET to a strong random string
- [ ] Use environment variables (never commit secrets)
- [ ] Enable HTTPS (Vercel/Render do this automatically)
- [ ] Set secure MongoDB password
- [ ] Whitelist specific IPs if possible
- [ ] Add rate limiting (optional)

### 4. Performance Optimization
- [ ] Enable caching headers
- [ ] Compress responses (gzip)
- [ ] Use CDN for static assets
- [ ] Monitor MongoDB indexes
- [ ] Add error logging (e.g., Sentry)

---

## 🐛 Troubleshooting

### Issue: Frontend can't connect to backend
**Solution**: 
- Check CORS settings in backend
- Verify `VITE_API_URL` environment variable
- Check browser console for errors
- Ensure backend is running (check Render logs)

### Issue: MongoDB connection timeout
**Solution**:
- Verify connection string is correct
- Check Network Access whitelist in Atlas
- Ensure password doesn't have special characters (URL encode if needed)
- Test connection locally first

### Issue: Vercel deployment fails
**Solution**:
- Check build logs in Vercel dashboard
- Ensure `package.json` is correct
- Try clearing cache: Vercel dashboard → Settings → Clear cache
- Verify root directory is set to `frontend`

### Issue: Render free tier sleeps
**Solution**:
- Free tier sleeps after 15 mins of inactivity
- First request after sleep takes ~30 seconds
- Upgrade to paid tier for always-on
- Or use a ping service (e.g., UptimeRobot)

---

## 📊 Monitoring

### Vercel Analytics
- Free analytics in Vercel dashboard
- See page views, performance, errors

### Render Logs
```bash
# View logs
render logs cipherstudio-backend
```

### MongoDB Atlas Monitoring
- Go to Atlas dashboard
- View connections, operations, performance

---

## 🎉 Your Deployed URLs

After following this guide, you'll have:

- **Frontend**: `https://cipherstudio.vercel.app`
- **Backend API**: `https://cipherstudio-backend.onrender.com`
- **Database**: MongoDB Atlas (cloud)

---

## 📝 Quick Deploy Summary

```powershell
# 1. Push to GitHub
git add .
git commit -m "Deploy CipherStudio"
git push origin main

# 2. Deploy frontend to Vercel
# - Visit vercel.com
# - Import repository
# - Set root: frontend
# - Deploy

# 3. Deploy backend to Render
# - Visit render.com
# - Create web service
# - Set root: backend
# - Add env vars
# - Deploy

# 4. Setup MongoDB Atlas
# - Create cluster
# - Get connection string
# - Add to Render env vars

# 5. Update frontend with backend URL
# - Add VITE_API_URL in Vercel
# - Redeploy
```

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **React Docs**: https://react.dev

---

**Congratulations!** 🎊 Your CipherStudio IDE is now live and accessible worldwide!
