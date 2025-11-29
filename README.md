# 🚀 CodeCanvas - Browser-Based React IDE

A powerful, full-featured browser-based IDE for creating and running React applications instantly. Built with React, Vite, Sandpack, MongoDB, and Express.js.

![CodeCanvas](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

## 🎥 Demo Video

**Watch the full walkthrough:** [YouTube Demo](YOUR_YOUTUBE_LINK_HERE)

**What's covered in the demo:**
- ⚡ Problem statement & solution overview
- 🛠️ Complete tech stack explanation
- 🏗️ Architecture & data flow walkthrough
- ✨ Live feature demonstrations (all 14 features)
- 🚀 Setup & deployment guide
- 🔑 API endpoints & database schema
- 📊 Trade-offs & design decisions

**Duration:** 4-5 minutes

---

## ✨ Features

### 🌟 Core Features & Why They Matter

#### 1. **Zero-Setup Development Environment** ⚡
- **What**: Full React IDE in your browser - no installation required
- **Why It Matters**: Eliminates the barrier to entry for beginners. Students can start learning React immediately without fighting Node.js installation, PATH variables, or build configurations
- **Trade-off**: Cannot install arbitrary npm packages (limited to Sandpack's ecosystem)

#### 2. **Real-Time Code Execution** 🚀
- **What**: Monaco Editor + Sandpack integration with instant preview
- **Why It Matters**: Immediate feedback loop accelerates learning. See changes in milliseconds, not minutes
- **Trade-off**: Preview runs in browser sandbox - some Node.js features unavailable

#### 3. **React Router Auto-Detection** 🔗
- **What**: Automatically detects router usage and injects dependencies
- **Why It Matters**: Multi-page apps just work. No manual dependency management
- **Implementation**: Scans files for `react-router-dom` imports, dynamically adds to Sandpack

#### 4. **Template Library** 📦
- **What**: 5 pre-built templates (Basic App, Todo, Counter, Card, Router App)
- **Why It Matters**: Kickstart projects with best practices. Learn by example
- **Templates Include**: State management, event handling, routing, styling patterns

#### 5. **Code Formatting (Prettier)** ✨
- **What**: One-click code formatting (Ctrl+Shift+P)
- **Why It Matters**: Maintain consistent, professional code style. Focus on logic, not formatting
- **Supports**: JavaScript, TypeScript, JSX, CSS, HTML, JSON

#### 6. **Search & Replace with Regex** 🔍
- **What**: Advanced search with regex support (Ctrl+F)
- **Why It Matters**: Refactor code efficiently. Find patterns, replace in bulk
- **Features**: Case-sensitive, regex mode, replace single/all

#### 7. **Code Snippets Library** 📋
- **What**: 30+ pre-built code snippets organized by category
- **Why It Matters**: Accelerate development with boilerplate code. Learn common patterns
- **Categories**: React Components, Hooks, State Management, Forms, Styling

#### 8. **File Operations** 📁
- **What**: Upload multiple files, ZIP folders, download projects
- **Why It Matters**: Import existing projects, backup work, collaborate
- **Smart Features**: Filters problematic files (.babelrc, .npmrc), detects entry points (main.js/index.js)

#### 9. **Version History (Snapshots)** 🕐
- **What**: Create checkpoints, restore previous versions
- **Why It Matters**: Experiment fearlessly. Roll back mistakes instantly
- **Implementation**: Stores snapshots in ProjectContext with timestamps

#### 10. **Export & Share** 🌐
- **What**: Export to CodeSandbox/StackBlitz, share via URL
- **Why It Matters**: Not locked into platform. Share code for reviews, teaching, collaboration
- **Share Method**: Base64-encoded URL with embedded project data (no backend required)

#### 11. **Project Persistence** 💾
- **What**: Auto-save to localStorage + optional MongoDB cloud sync
- **Why It Matters**: Never lose work. Hybrid approach works offline and online
- **Trade-off**: localStorage has ~5-10MB limit per domain

#### 12. **Authentication System** 🔐
- **What**: JWT-based user accounts with bcrypt password hashing
- **Why It Matters**: Save projects across devices, keep work private
- **Security**: Passwords hashed with bcrypt (10 salt rounds), tokens expire after 24h

#### 13. **Dark/Light Theme** 🌓
- **What**: Toggle theme with persistent preference
- **Why It Matters**: Reduce eye strain, personal preference
- **Implementation**: Context API + Tailwind dark mode classes

#### 14. **Keyboard Shortcuts** ⌨️
- **What**: 10+ productivity shortcuts (documented in Ctrl+Shift+K panel)
- **Why It Matters**: Power users stay in flow. Common actions at fingertips
- **Examples**: 
  - Ctrl+S → Save project
  - Ctrl+Shift+P → Format code
  - Ctrl+F → Search
  - Ctrl+Shift+K → Show shortcuts

### 🎯 Key Trade-Offs & Decisions

| Decision | Benefit | Trade-Off |
|----------|---------|-----------|
| **Sandpack over custom bundler** | Robust, maintained by CodeSandbox team. Hot reload, error handling, React Router support | Cannot install arbitrary npm packages. Limited to Sandpack's dependency list |
| **Context API over Redux** | Simpler, less boilerplate. Good enough for app scope | Not ideal for very large apps with complex state |
| **localStorage + MongoDB** | Works offline, fast access. Cloud backup optional | localStorage limited to ~10MB. Need to handle sync conflicts |
| **Prettier (not ESLint)** | Fast, zero-config formatting | No linting for bugs/code quality (only formatting) |
| **Monaco (not CodeMirror)** | VS Code experience. Familiar to developers | Larger bundle size (~3MB) |
| **Base64 URL sharing** | No backend needed for sharing. Works everywhere | URLs can get long for large projects. Not human-readable |

### 🔥 Unique Value Proposition

**What makes CodeCanvas different from JSFiddle, CodePen, or CodeSandbox:**

1. **Template-First Approach**: Pre-built production-ready templates for instant start
2. **Export Freedom**: Not platform-locked. Export to CodeSandbox/StackBlitz anytime
3. **True Sharing**: Share via URL without requiring recipient registration
4. **Educational Focus**: Built for learning with snippets, templates, and instant feedback
5. **Offline-First**: localStorage persistence means no internet required after initial load
6. **Professional Tools**: Monaco + Sandpack = CodeSandbox-quality experience, free

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT BROWSER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    React Application                          │  │
│  │                                                                │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐        │  │
│  │  │   Navbar    │  │   Sidebar    │  │   Editor     │        │  │
│  │  │  (Actions)  │  │ (File Tree)  │  │  (Monaco)    │        │  │
│  │  └─────────────┘  └──────────────┘  └──────────────┘        │  │
│  │                                                                │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │              Preview (Sandpack)                          │ │  │
│  │  │  - Real-time bundling                                    │ │  │
│  │  │  - React Router detection                                │ │  │
│  │  │  - Live code execution                                   │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │                                                                │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │         State Management (Context API)                  │  │  │
│  │  │  - ProjectContext (files, CRUD operations)              │  │  │
│  │  │  - ThemeContext (dark/light mode)                       │  │  │
│  │  └────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              │ HTTP/REST API (Axios)                │
│                              ▼                                       │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               │ JWT Authentication
                               │ CORS Enabled
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         EXPRESS.JS SERVER                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Middleware Layer                           │  │
│  │  - CORS                                                        │  │
│  │  - JWT Verification                                            │  │
│  │  - Body Parser                                                 │  │
│  │  - Error Handling                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    API Routes                                 │  │
│  │                                                                │  │
│  │  ┌──────────────────┐       ┌──────────────────┐            │  │
│  │  │  /api/auth       │       │  /api/projects   │            │  │
│  │  │  - register      │       │  - GET all       │            │  │
│  │  │  - login         │       │  - GET by ID     │            │  │
│  │  │  - profile       │       │  - POST create   │            │  │
│  │  └──────────────────┘       │  - PUT update    │            │  │
│  │                              │  - DELETE        │            │  │
│  │                              └──────────────────┘            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  Mongoose ODM Layer                           │  │
│  │  - User Model                                                  │  │
│  │  - Project Model                                               │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                       │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         MONGODB ATLAS                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────┐         ┌─────────────────────┐           │
│  │   users Collection  │         │ projects Collection │           │
│  │  - username         │         │  - projectId        │           │
│  │  - email            │         │  - name             │           │
│  │  - password (hash)  │         │  - files[]          │           │
│  │  - projects[]       │         │  - userId           │           │
│  └─────────────────────┘         │  - isPublic         │           │
│                                   └─────────────────────┘           │
└─────────────────────────────────────────────────────────────────────┘


                    ┌──────────────────────────┐
                    │   localStorage (Client)  │
                    │  - Current project       │
                    │  - Theme preference      │
                    │  - Auto-save data        │
                    └──────────────────────────┘
```

### Data Flow Explanation

**1. User Creates/Edits Code:**
   - User types in Monaco Editor
   - ProjectContext updates file state
   - Auto-save to localStorage (every 2 seconds)
   - Files sent to Sandpack for live bundling
   - Preview updates in real-time

**2. User Saves Project to Cloud:**
   - User clicks Save button
   - Frontend sends POST/PUT request with JWT token
   - Backend validates JWT
   - Mongoose saves to MongoDB
   - Response confirms save success

**3. User Shares Project:**
   - Frontend generates base64-encoded URL with project data
   - URL can be shared directly (no backend needed)
   - Recipient loads URL → data decoded → files loaded into editor

**4. User Exports to CodeSandbox/StackBlitz:**
   - Files formatted to platform-specific API format
   - POST request sent to external platform
   - Platform opens with project pre-loaded

**5. React Router Detection:**
   - Preview component scans files for router imports
   - If detected, react-router-dom added to Sandpack dependencies
   - "Router Detected" badge shown in preview header

### Component Architecture

```
CodeCanvas/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Navbar.jsx         # Top bar with actions
│   │   │   ├── Sidebar.jsx        # File tree & operations
│   │   │   ├── Editor.jsx         # Monaco code editor
│   │   │   ├── Preview.jsx        # Sandpack live preview
│   │   │   ├── SearchReplace.jsx  # Code search utility
│   │   │   ├── CodeSnippets.jsx   # Snippet library
│   │   │   ├── ShareModal.jsx     # Share functionality
│   │   │   ├── TemplatesModal.jsx # Template selection
│   │   │   └── KeyboardShortcuts.jsx
│   │   ├── context/        # React Context providers
│   │   │   ├── ThemeContext.jsx   # Dark/light theme
│   │   │   └── ProjectContext.jsx # File & project state
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.jsx       # Landing page
│   │   │   ├── IDEPage.jsx        # Main IDE interface
│   │   │   ├── LoginPage.jsx      # Authentication
│   │   │   └── RegisterPage.jsx   # User registration
│   │   ├── utils/          # Utility functions
│   │   │   ├── api.js             # Axios API client
│   │   │   ├── export.js          # Export/share logic
│   │   │   ├── templates.js       # Project templates
│   │   │   ├── snippets.js        # Code snippets
│   │   │   ├── formatter.js       # Prettier integration
│   │   │   └── fileOperations.js  # ZIP upload/download
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # React entry point
│   └── package.json
│
└── backend/                # Express.js + MongoDB backend
    ├── models/             # Mongoose models
    │   ├── Project.js      # Project schema
    │   └── User.js         # User schema
    ├── routes/             # API routes
    │   ├── projects.js     # Project CRUD endpoints
    │   └── auth.js         # Auth endpoints
    ├── middleware/         # Custom middleware
    │   └── auth.js         # JWT verification
    ├── server.js           # Express server setup
    └── package.json
```

## 🚀 Setup & Run Guide

### Prerequisites
Before you begin, ensure you have:
- **Node.js** v16.0.0 or higher ([Download here](https://nodejs.org/))
- **npm** v7+ (comes with Node.js)
- **MongoDB** (choose one):
  - Local: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Git** ([Download here](https://git-scm.com/))
- A code editor (VS Code recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/khushi11github/Browser_ReactIDE.git
cd Browser_ReactIDE
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables
Create a `.env` file in the `backend` directory:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# macOS/Linux
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codecanvas
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codecanvas?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important**: 
- Change `JWT_SECRET` to a random secure string
- If using MongoDB Atlas, replace connection string with your cluster URL

#### 2.3 Start MongoDB (if using local installation)

**Windows:**
```powershell
# MongoDB should auto-start as a service
# Or manually start:
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"
```

**macOS:**
```bash
brew services start mongodb-community
# Or:
mongod --config /usr/local/etc/mongod.conf
```

**Linux:**
```bash
sudo systemctl start mongod
```

#### 2.4 Start Backend Server
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

✅ **Backend should now be running on** `http://localhost:5000`

Verify by visiting: `http://localhost:5000/health`

### Step 3: Frontend Setup

Open a **new terminal** (keep backend running):

#### 3.1 Install Dependencies
```bash
cd ../frontend
npm install
```

#### 3.2 Configure Environment Variables
Create `.env` file in `frontend` directory:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# macOS/Linux
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000
```

For production deployment, change to your deployed backend URL:
```env
VITE_API_URL=https://your-backend.render.com
```

#### 3.3 Start Frontend Development Server
```bash
npm run dev
```

✅ **Frontend should now be running on** `http://localhost:3000`

### Step 4: Verify Installation

Open your browser and navigate to `http://localhost:3000`

You should see:
1. ✅ CodeCanvas landing page
2. ✅ "Start Coding" button
3. ✅ Login/Register options

**Test the IDE:**
1. Click "Start Coding" or create an account
2. Try editing code in Monaco Editor
3. Verify live preview updates
4. Create a new file
5. Try code formatting (Ctrl+Shift+P)

### 🐛 Troubleshooting

#### Backend Issues

**Problem: "MongooseServerSelectionError: connect ECONNREFUSED"**
```bash
# Solution 1: Start MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Solution 2: Use MongoDB Atlas
# Update MONGODB_URI in .env to Atlas connection string
```

**Problem: "Port 5000 already in use"**
```bash
# Solution 1: Kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Solution 2: Change PORT in backend/.env
PORT=5001
```

**Problem: "JWT_SECRET not defined"**
```bash
# Ensure .env exists in backend directory
# Add: JWT_SECRET=any_random_secure_string_here
```

#### Frontend Issues

**Problem: "Cannot connect to backend"**
```bash
# Verify backend is running on http://localhost:5000
# Check VITE_API_URL in frontend/.env
# Ensure no CORS errors in browser console
```

**Problem: "npm ERR! code ERESOLVE"**
```bash
# Solution: Use legacy peer deps
npm install --legacy-peer-deps
```

**Problem: "Module not found: Error: Can't resolve '@monaco-editor/react'"**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 📦 Building for Production

#### Frontend Build
```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

#### Test Production Build Locally
```bash
npm run preview
# Runs on http://localhost:4173
```

### 🚀 Deployment Options

#### Option 1: Vercel (Frontend) + Render (Backend)

**Deploy Frontend to Vercel:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set build settings:
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
5. Add environment variable:
   - `VITE_API_URL` = your Render backend URL

**Deploy Backend to Render:**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Set build settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. Add environment variables:
   - `MONGODB_URI` = MongoDB Atlas connection string
   - `JWT_SECRET` = secure random string
   - `NODE_ENV` = production

#### Option 2: Railway (Full Stack)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### 🧪 Running Tests (if implemented)

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

### 📝 Development Scripts

**Frontend:**
```bash
npm run dev       # Start dev server (port 3000)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint code
```

**Backend:**
```bash
npm start         # Start server (production mode)
npm run dev       # Start with nodemon (auto-reload)
```

### 🔧 Optional: Install Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dsznajder.es7-react-js-snippets",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "mongodb.mongodb-vscode"
  ]
}
```

---

**Need help?** Create an issue on [GitHub](https://github.com/khushi11github/Browser_ReactIDE/issues)

## 🛠️ Tech Stack

### Frontend Technologies
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI framework with hooks and context |
| **Vite** | 5.4.21 | Fast build tool and dev server |
| **Monaco Editor** | 4.6.0 | VS Code's editor (IntelliSense, syntax highlighting) |
| **Sandpack** | 2.13.5 | CodeSandbox's bundler for live preview |
| **React Router** | 6.x | Client-side routing |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS framework |
| **Lucide React** | Latest | Icon library |
| **Prettier** | 3.1.1 | Code formatting |
| **file-saver** | 2.0.5 | File download utility |
| **jszip** | 3.10.1 | ZIP file handling |
| **Axios** | Latest | HTTP client for API calls |

### Backend Technologies
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 16+ | JavaScript runtime |
| **Express.js** | 4.x | Web framework for REST API |
| **MongoDB** | 6.x | NoSQL database |
| **Mongoose** | 8.x | MongoDB ODM (Object Data Modeling) |
| **JWT** | 9.x | JSON Web Tokens for authentication |
| **bcryptjs** | 2.x | Password hashing |
| **CORS** | 2.x | Cross-Origin Resource Sharing |
| **dotenv** | 16.x | Environment variable management |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **PostCSS** | CSS processing |
| **Autoprefixer** | CSS vendor prefixing |

### Deployment & Infrastructure
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting (auto-deploy from Git) |
| **Render** | Backend hosting with persistent storage |
| **MongoDB Atlas** | Cloud-hosted MongoDB database |
| **Git/GitHub** | Version control and CI/CD |

## 📖 Usage

### Quick Start with Templates 🌟
1. Navigate to the IDE page
2. Click the **"Use Template"** button in the sidebar
3. Choose from pre-built templates:
   - **Basic App**: Simple React starter
   - **Todo List**: Complete todo app with state management
   - **Counter**: Counter app with increment/decrement
   - **Card Component**: Modern card component example
4. Start customizing immediately!

### Creating a New Project
1. Navigate to the IDE page
2. Start coding in the default files (App.js, index.js, styles.css)
3. Your changes are automatically saved to localStorage

### File Management
- **Create File**: Click the `+` button in the sidebar
- **Delete File**: Hover over a file and click the trash icon
- **Rename File**: Hover over a file and click the edit icon
- **Switch Files**: Click on any file in the sidebar

### Sharing Your Project 🌟
1. Click the **"Share"** button (purple) in the navbar
2. Click **"Generate Share Link"**
3. Copy the generated URL
4. Share with anyone - they can view and fork your code!

### Exporting Your Project 🌟
1. Click the **"Export"** button (green) in the navbar
2. Choose your platform:
   - **CodeSandbox**: Opens in CodeSandbox editor
   - **StackBlitz**: Opens in StackBlitz editor
3. Continue development on your preferred platform!

### Saving Projects
- **Auto-save**: Enabled by default, saves every 2 seconds
- **Manual Save**: Click the "Save" button in the navbar
- **Cloud Save**: Login to save projects to MongoDB (optional)

### Theme Switching
- Click the moon/sun icon in the navbar to toggle themes
- Theme preference is saved to localStorage

## 🔑 Key APIs & Endpoints

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response (201):
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Get User Profile
```http
GET /api/auth/profile/:userId
Authorization: Bearer <jwt_token>

Response (200):
{
  "username": "johndoe",
  "email": "john@example.com",
  "projects": ["proj_123", "proj_456"],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Project Endpoints

#### Get All Projects (User's Projects)
```http
GET /api/projects
Authorization: Bearer <jwt_token>

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "projectId": "proj_abc123",
    "name": "My React App",
    "description": "A cool React project",
    "files": [...],
    "userId": "507f1f77bcf86cd799439011",
    "isPublic": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:45:00.000Z"
  }
]
```

#### Get Single Project
```http
GET /api/projects/:projectId
Authorization: Bearer <jwt_token> (optional for public projects)

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "projectId": "proj_abc123",
  "name": "My React App",
  "files": [
    {
      "name": "App.jsx",
      "path": "/App.jsx",
      "content": "import React from 'react'...",
      "type": "file"
    },
    {
      "name": "index.js",
      "path": "/index.js",
      "content": "import React from 'react'...",
      "type": "file"
    }
  ],
  "userId": "507f1f77bcf86cd799439011",
  "isPublic": false
}
```

#### Create New Project
```http
POST /api/projects
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "projectId": "proj_xyz789",
  "name": "Todo App",
  "description": "A simple todo list",
  "files": [
    {
      "name": "App.jsx",
      "path": "/App.jsx",
      "content": "import React...",
      "type": "file"
    }
  ],
  "isPublic": false
}

Response (201):
{
  "message": "Project created successfully",
  "project": { ... }
}
```

#### Update Project
```http
PUT /api/projects/:projectId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "files": [
    {
      "name": "App.jsx",
      "path": "/App.jsx",
      "content": "updated content...",
      "type": "file"
    }
  ]
}

Response (200):
{
  "message": "Project updated successfully",
  "project": { ... }
}
```

#### Delete Project
```http
DELETE /api/projects/:projectId
Authorization: Bearer <jwt_token>

Response (200):
{
  "message": "Project deleted successfully"
}
```

### Error Responses

All endpoints return consistent error responses:

```http
Response (400): Bad Request
{
  "error": "Invalid input data",
  "details": "Email is required"
}

Response (401): Unauthorized
{
  "error": "Authentication required",
  "details": "No token provided"
}

Response (403): Forbidden
{
  "error": "Access denied",
  "details": "You don't have permission to access this project"
}

Response (404): Not Found
{
  "error": "Resource not found",
  "details": "Project not found"
}

Response (500): Internal Server Error
{
  "error": "Server error",
  "details": "Database connection failed"
}
```

## 📊 Database Schema

### User Model (`models/User.js`)

```javascript
{
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/  // Email validation regex
  },
  password: {
    type: String,
    required: true,
    minlength: 6
    // Stored as bcrypt hash (10 salt rounds)
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes:
// - username (unique)
// - email (unique)
```

**Sample Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "projects": [
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013"
  ],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Project Model (`models/Project.js`)

```javascript
{
  projectId: {
    type: String,
    required: true,
    unique: true,
    // Format: "proj_" + timestamp + random string
    // Example: "proj_1705318200123_a3f9c2"
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    default: 'Untitled Project'
  },
  description: {
    type: String,
    maxlength: 500,
    default: ''
  },
  files: [{
    name: {
      type: String,
      required: true
      // Examples: "App.jsx", "index.js", "styles.css"
    },
    path: {
      type: String,
      required: true
      // Format: "/App.jsx", "/components/Button.jsx"
    },
    content: {
      type: String,
      default: ''
      // Full file content as string
    },
    type: {
      type: String,
      enum: ['file', 'folder'],
      default: 'file'
    }
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  // Optional for anonymous projects
  },
  isPublic: {
    type: Boolean,
    default: false
    // If true, project can be viewed without authentication
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes:
// - projectId (unique)
// - userId
// - createdAt (for sorting)

// Middleware:
// - Updates 'updatedAt' on save
```

**Sample Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "projectId": "proj_1705318200123_a3f9c2",
  "name": "My Todo App",
  "description": "A simple todo list with React hooks",
  "files": [
    {
      "name": "App.jsx",
      "path": "/App.jsx",
      "content": "import React, { useState } from 'react';\n\nexport default function App() {\n  const [todos, setTodos] = useState([]);\n  // ... rest of code\n}",
      "type": "file"
    },
    {
      "name": "index.js",
      "path": "/index.js",
      "content": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
      "type": "file"
    },
    {
      "name": "styles.css",
      "path": "/styles.css",
      "content": "body {\n  margin: 0;\n  font-family: sans-serif;\n}",
      "type": "file"
    }
  ],
  "userId": "507f1f77bcf86cd799439011",
  "isPublic": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T12:45:00.000Z"
}
```

### Database Relationships

```
┌─────────────┐           ┌──────────────┐
│    User     │ 1     N   │   Project    │
│             ├───────────┤              │
│ - _id       │           │ - _id        │
│ - username  │           │ - projectId  │
│ - email     │           │ - name       │
│ - password  │           │ - files[]    │
│ - projects[]│◄──────────┤ - userId     │
└─────────────┘           └──────────────┘

Relationship: One User has Many Projects
Foreign Key: Project.userId references User._id
```

### MongoDB Collections

```bash
# View collections
use codecanvas
show collections

# Output:
# users
# projects

# Count documents
db.users.countDocuments()
db.projects.countDocuments()

# Find user with projects
db.users.aggregate([
  {
    $lookup: {
      from: "projects",
      localField: "_id",
      foreignField: "userId",
      as: "userProjects"
    }
  }
])
```

### Data Validation Rules

**User:**
- Username: 3-30 characters, alphanumeric + underscore
- Email: Valid email format, unique
- Password: Minimum 6 characters (hashed before storage)

**Project:**
- ProjectId: Unique, auto-generated
- Name: 1-100 characters
- Description: Maximum 500 characters
- Files: Array of file objects (minimum 1 file required)
- Each file must have name, path, and content

### Sample Queries

```javascript
// Find all public projects
db.projects.find({ isPublic: true })

// Find user's projects
db.projects.find({ userId: ObjectId("507f1f77bcf86cd799439011") })

// Find projects by name (case-insensitive)
db.projects.find({ 
  name: { $regex: /todo/i } 
})

// Find projects created in last 7 days
db.projects.find({
  createdAt: { 
    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
  }
})

// Update project files
db.projects.updateOne(
  { projectId: "proj_abc123" },
  { $set: { files: [...newFiles], updatedAt: new Date() } }
)
```

## 💡 Important Technical Highlights

### 1. **React Router Auto-Detection in Preview**
**Location:** `frontend/src/components/Preview.jsx`

```javascript
// Scans all files for React Router imports
const hasRouter = Object.values(files).some(file =>
  file.content.includes('react-router-dom') ||
  file.content.includes('BrowserRouter') ||
  file.content.includes('Routes')
);

// Dynamically injects router dependency if detected
const dependencies = {
  ...sandpackDependencies,
  ...(hasRouter ? { 'react-router-dom': '^6.20.0' } : {})
};
```

**Why it matters:** Users don't need to manually configure dependencies. Multi-page apps "just work".

### 2. **Smart Entry Point Detection**
**Location:** `frontend/src/components/Preview.jsx`

```javascript
// Checks multiple entry points in order of priority
const mainFile = files['/main.jsx'] || files['/main.js'] || 
                files['/index.jsx'] || files['/index.js'];
```

**Why it matters:** Compatible with different project structures (CRA, Vite, custom setups).

### 3. **ZIP Upload with File Filtering**
**Location:** `frontend/src/utils/fileOperations.js`

```javascript
// Filters out problematic files that break Sandpack
const problematicFiles = [
  '.babelrc', 'babel.config.js', '.npmrc', 
  'package-lock.json', '.gitignore', '.env'
];

// Only processes valid files
if (!problematicFiles.some(pattern => path.includes(pattern))) {
  // Add to project
}
```

**Why it matters:** Users can upload existing projects without Babel/config file conflicts.

### 4. **Hybrid Persistence Strategy**
**Location:** `frontend/src/context/ProjectContext.jsx`

```javascript
// Auto-save to localStorage every 2 seconds
useEffect(() => {
  const timer = setInterval(() => {
    if (autoSave && currentProject) {
      const projectData = {
        ...currentProject,
        files,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(`project-${currentProject.projectId}`, 
                          JSON.stringify(projectData));
    }
  }, 2000);
  return () => clearInterval(timer);
}, [currentProject, files, autoSave]);

// Manual cloud save to MongoDB
const saveProject = async () => {
  if (user) {
    await api.put(`/projects/${projectId}`, projectData);
  }
};
```

**Why it matters:** Works offline, never lose work, optional cloud backup for cross-device access.

### 5. **Code Formatting with Prettier**
**Location:** `frontend/src/utils/formatter.js`

```javascript
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';

// Detects file type and uses appropriate parser
const getParser = (filename) => {
  if (filename.endsWith('.jsx') || filename.endsWith('.js')) return 'babel';
  if (filename.endsWith('.html')) return 'html';
  if (filename.endsWith('.css')) return 'css';
  // ... more parsers
};

export const formatCode = (code, filename) => {
  return prettier.format(code, {
    parser: getParser(filename),
    plugins: [parserBabel, parserHtml, parserCss],
    semi: true,
    singleQuote: true,
    tabWidth: 2
  });
};
```

**Why it matters:** Professional code formatting without external tools or configuration.

### 6. **Base64 URL Sharing (No Backend Required)**
**Location:** `frontend/src/utils/export.js`

```javascript
export const generateShareLink = (files) => {
  const projectData = {
    files,
    timestamp: Date.now()
  };
  
  // Encode project data in URL
  const encoded = btoa(JSON.stringify(projectData));
  return `${window.location.origin}?share=${encoded}`;
};

// On load, decode from URL
export const loadFromShareLink = () => {
  const params = new URLSearchParams(window.location.search);
  const shareData = params.get('share');
  
  if (shareData) {
    const decoded = JSON.parse(atob(shareData));
    return decoded;
  }
};
```

**Why it matters:** Instant sharing without database writes, works even if backend is down.

### 7. **JWT Authentication Flow**
**Location:** `backend/middleware/auth.js`

```javascript
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

**Security features:**
- Bcrypt password hashing (10 salt rounds)
- JWT tokens expire after 24 hours
- Tokens stored in localStorage (could use httpOnly cookies for better security)
- Password validation (minimum 6 characters)

### 8. **Version History (Snapshots)**
**Location:** `frontend/src/context/ProjectContext.jsx`

```javascript
const [snapshots, setSnapshots] = useState([]);

const createSnapshot = () => {
  const snapshot = {
    id: Date.now(),
    files: JSON.parse(JSON.stringify(files)), // Deep clone
    timestamp: new Date().toISOString()
  };
  
  setSnapshots(prev => [...prev, snapshot].slice(-10)); // Keep last 10
};

const loadSnapshot = (snapshotId) => {
  const snapshot = snapshots.find(s => s.id === snapshotId);
  if (snapshot) {
    setFiles(snapshot.files);
  }
};
```

**Why it matters:** Non-destructive experimentation. Roll back mistakes instantly.

### 9. **Sandpack Custom Configuration**
**Location:** `frontend/src/components/Preview.jsx`

```javascript
<SandpackProvider
  template="react"
  files={files}
  customSetup={{
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      ...(hasRouter ? { 'react-router-dom': '^6.20.0' } : {})
    },
    entry: mainFile
  }}
  options={{
    externalResources: [],
    bundlerURL: 'https://sandpack-bundler.codesandbox.io',
    recompileMode: 'delayed',
    recompileDelay: 500
  }}
>
```

**Optimizations:**
- Delayed recompile (500ms) prevents excessive bundling on every keystroke
- Custom entry point detection
- Conditional dependency injection
- Error boundary for graceful failure handling

### 10. **Monaco Editor Custom Configuration**
**Location:** `frontend/src/components/Editor.jsx`

```javascript
<MonacoEditor
  language={getLanguage(currentFile.name)}
  theme={theme === 'dark' ? 'vs-dark' : 'light'}
  value={currentFile.content}
  onChange={handleEditorChange}
  options={{
    minimap: { enabled: true },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    parameterHints: { enabled: true }
  }}
/>
```

**Features enabled:**
- IntelliSense and autocomplete
- Format on paste/type
- Parameter hints for functions
- Word wrap for long lines
- Automatic layout adjustment

### Performance Optimizations

1. **Code Splitting**: Vite automatically splits code for faster initial load
2. **Lazy Loading**: Monaco Editor loaded only when needed
3. **Debounced Auto-Save**: Only saves after 2 seconds of inactivity
4. **Memoization**: ProjectContext uses useMemo for expensive operations
5. **Virtual DOM**: React's efficient rendering for file tree

### Security Considerations

1. **Password Hashing**: bcrypt with 10 salt rounds
2. **JWT Secrets**: Stored in environment variables
3. **CORS Configuration**: Restricts API access to frontend domain
4. **Input Validation**: Mongoose schema validation for all data
5. **XSS Prevention**: React automatically escapes content
6. **No Eval**: Sandpack runs code in isolated iframe

**Trade-off:** localStorage-based sharing exposes code in URL (not suitable for sensitive projects).

## 🎯 Project Goals

This project demonstrates:
- ✅ Full-stack architecture design
- ✅ React component composition and state management
- ✅ Context API for global state
- ✅ Integration with third-party libraries (Monaco, Sandpack)
- ✅ RESTful API design
- ✅ MongoDB schema design
- ✅ JWT authentication
- ✅ Responsive UI/UX design
- ✅ localStorage persistence
- ✅ Real-time code preview

### 🌟 Unique Value Proposition

**What makes CodeCanvas different from other browser IDEs:**

1. **Template Library**: Get started instantly with production-ready templates
2. **Export Freedom**: Not locked into our platform - export to CodeSandbox or StackBlitz anytime
3. **True Sharing**: Share projects via URL without requiring recipient registration
4. **Zero Setup**: No account creation, downloads, or configuration needed to start coding
5. **Professional Tools**: Monaco Editor + Sandpack = CodeSandbox-quality experience

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Render/Railway)
1. Create a new Web Service
2. Connect your repository
3. Set environment variables
4. Deploy

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- [Sandpack](https://sandpack.codesandbox.io/) - Code execution engine
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Lucide Icons](https://lucide.dev/) - Icon library

## 👨‍💻 Development

Built as part of the CipherSchool assessment project.

### Development Decisions
1. **Sandpack over custom bundler**: Leverages CodeSandbox's robust execution engine
2. **MongoDB + localStorage**: Hybrid approach for reliability and offline support
3. **Context API**: Simpler state management for this scope
4. **Tailwind CSS**: Rapid UI development with consistent design
5. Monaco Editor: Professional-grade editing experience

---

**Made with ❤️ using CodeCanvas**
