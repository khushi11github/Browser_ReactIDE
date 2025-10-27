# Quick Deployment Commands

## Prerequisites
```powershell
# Install Git (if not installed)
# Download from: https://git-scm.com/download/win

# Verify installations
git --version
node --version
npm --version
```

## 1. Push to GitHub

```powershell
# Navigate to project root
cd d:\myfolders\CipherSchool

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - CipherStudio IDE"

# Create main branch
git branch -M main

# Add remote (replace with your GitHub username/repo)
git remote add origin https://github.com/YOUR_USERNAME/cipherstudio.git

# Push to GitHub
git push -u origin main
```

## 2. Deploy Frontend to Vercel

### Method 1: Vercel Dashboard (Easiest)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Settings:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Method 2: Vercel CLI
```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Link to existing project or create new? [Create new]
# - Project name? [cipherstudio-frontend]
# - Directory? [./]
```

**Your frontend URL**: `https://your-project.vercel.app`

## 3. Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a FREE account
3. Build a Database → FREE Shared (M0)
4. Choose cloud provider & region (nearest to you)
5. Cluster Name: `Cluster0` (default is fine)
6. Click "Create"

### Create Database User
1. Security → Database Access
2. Add New Database User
3. Username: `cipherstudio_user`
4. Password: Auto-generate (copy it!)
5. Built-in Role: **Read and write to any database**
6. Add User

### Network Access
1. Security → Network Access
2. Add IP Address
3. Select "Allow Access from Anywhere" (`0.0.0.0/0`)
4. Confirm

### Get Connection String
1. Database → Connect
2. "Connect your application"
3. Copy connection string:
   ```
   mongodb+srv://cipherstudio_user:<password>@cluster0.xxxxx.mongodb.net/
   ```
4. Replace `<password>` with your actual password
5. Add database name at the end:
   ```
   mongodb+srv://cipherstudio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cipherstudio?retryWrites=true&w=majority
   ```

## 4. Deploy Backend to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Dashboard → New → Web Service
4. Connect your repository
5. Settings:
   - **Name**: `cipherstudio-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. Environment Variables (click "Add Environment Variable"):
   ```
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://cipherstudio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/cipherstudio
   JWT_SECRET = your_super_secret_jwt_key_change_this_to_random_string
   PORT = 5000
   ```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)

**Your backend URL**: `https://cipherstudio-backend.onrender.com`

## 5. Connect Frontend to Backend

### Update Vercel Environment Variables
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://cipherstudio-backend.onrender.com`
   - **Environment**: All (Production, Preview, Development)
4. Save

### Redeploy Frontend
1. Vercel Dashboard → Deployments
2. Click the three dots on latest deployment
3. Click "Redeploy"

OR update code and push:
```powershell
cd frontend
# Make a small change (e.g., add a space in README)
git add .
git commit -m "Update API URL"
git push origin main
# Vercel auto-deploys on push
```

## 6. Test Your Deployment

Open your Vercel URL: `https://your-project.vercel.app`

Test these features:
- ✅ Homepage loads
- ✅ Click "Start Coding Now"
- ✅ IDE interface appears
- ✅ Create a new file
- ✅ Edit code in Monaco editor
- ✅ See live preview
- ✅ Click Save button
- ✅ Toggle theme (dark/light)
- ✅ Register/Login (if using backend)

## Troubleshooting

### Frontend can't reach backend
```powershell
# Check if backend is running
# Open in browser: https://cipherstudio-backend.onrender.com/api/health
# Should return: {"status":"ok","message":"CipherStudio API is running"}
```

### CORS Error
Update `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-project.vercel.app',
    'http://localhost:3000'
  ]
}));
```

Commit and push:
```powershell
cd backend
git add .
git commit -m "Fix CORS"
git push origin main
# Render auto-deploys
```

### MongoDB Connection Error
- Verify password is correct (no special characters or URL-encode them)
- Check Network Access in Atlas (should allow 0.0.0.0/0)
- Test connection string locally first

## Alternative: Deploy Everything Locally First

```powershell
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev

# Test at http://localhost:3000
# Once working locally, deploy to cloud
```

## 🎉 Success!

After completing these steps, you'll have:
- **Frontend**: https://your-project.vercel.app
- **Backend**: https://cipherstudio-backend.onrender.com
- **Database**: MongoDB Atlas (cloud)

Share your deployed URL in the submission form!

## Submission Checklist
- [ ] GitHub repository link
- [ ] Live frontend URL (Vercel)
- [ ] Backend API URL (Render) - optional
- [ ] Test all core features
- [ ] Add README.md to repo
- [ ] Submit via Google Form
