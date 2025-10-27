# 🚀 CipherStudio Setup Guide

## Quick Start (Development)

### Step 1: Install Dependencies

**Frontend:**
```powershell
cd frontend
npm install
```

**Backend:**
```powershell
cd backend
npm install
```

### Step 2: Configure Backend

Create `.env` file in backend directory:
```powershell
cd backend
cp .env.example .env
```

Edit `.env` and update MongoDB URI (use local or Atlas):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherstudio
JWT_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
```

### Step 3: Start MongoDB (if using local)

```powershell
mongod
```

Or use MongoDB Atlas (cloud) - get connection string from atlas.mongodb.com

### Step 4: Run the Application

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### Step 5: Open Browser

Navigate to: `http://localhost:3000`

## 📝 Usage Guide

### Without Login (LocalStorage Only)
1. Go to `http://localhost:3000/ide`
2. Start coding immediately
3. Projects are saved to browser localStorage
4. Auto-save is enabled by default

### With Login (Cloud Storage)
1. Go to `http://localhost:3000/register`
2. Create an account
3. Login and create projects
4. Projects are saved to MongoDB
5. Access from any device

## 🎨 Features to Test

1. **File Management**
   - Click `+` to create new files
   - Hover over files to rename/delete
   - Click files to switch between them

2. **Code Editor**
   - Write React code in App.js
   - See syntax highlighting
   - Auto-completion works

3. **Live Preview**
   - Changes appear instantly in preview pane
   - Console errors shown inline
   - Full React environment

4. **Theme Switching**
   - Click moon/sun icon in navbar
   - Theme persists across sessions

5. **Auto-save**
   - Opens Settings menu
   - Toggle auto-save on/off
   - Manual save with Save button

## 🚀 Production Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set root directory: `frontend`
4. Deploy

### Backend (Render/Railway)

1. Create Web Service
2. Connect GitHub repo
3. Set root directory: `backend`
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. Deploy

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas: whitelist your IP

### Port Already in Use
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Won't Start
```powershell
cd frontend
rm -rf node_modules
npm install
npm run dev
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Sandpack Docs](https://sandpack.codesandbox.io/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS](https://tailwindcss.com)

---

**Need Help?** Check the main README.md for more details.
