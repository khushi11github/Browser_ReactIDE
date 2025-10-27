# 🚀 CipherStudio - Browser-Based React IDE

A powerful, full-featured browser-based IDE for creating and running React applications instantly. Built with React, Vite, Sandpack, MongoDB, and Express.js.

![CipherStudio](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

## ✨ Features

### Core Features
- **📁 File Management**: Create, delete, rename, and organize project files with an intuitive file tree
- **💻 Code Editor**: Monaco Editor integration with syntax highlighting, IntelliSense, and auto-completion
- **⚡ Live Preview**: Real-time React code execution using Sandpack
- **💾 Save & Load**: Automatic project persistence with localStorage and optional MongoDB backend
- **🎨 Clean UI/UX**: Modern, responsive interface built with Tailwind CSS

### Bonus Features
- **🌓 Theme Switcher**: Toggle between dark and light themes
- **🔄 Auto-save**: Configurable auto-save functionality
- **🔐 Authentication**: Optional user login/register with JWT
- **📱 Responsive**: Works seamlessly on desktop and tablet
- **🔍 File Icons**: Visual file type indicators

## 🏗️ Architecture

```
CipherStudio/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Editor.jsx
│   │   │   └── Preview.jsx
│   │   ├── context/        # React Context providers
│   │   │   ├── ThemeContext.jsx
│   │   │   └── ProjectContext.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── IDEPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── backend/                # Express.js + MongoDB backend
    ├── models/             # Mongoose models
    │   ├── Project.js
    │   └── User.js
    ├── routes/             # API routes
    │   ├── projects.js
    │   └── auth.js
    ├── server.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

### Backend Setup

1. Create `.env` file in the backend directory:
```bash
cd backend
cp .env.example .env
```

2. Update `.env` with your MongoDB connection string:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherstudio
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

3. Install dependencies and start server:
```bash
npm install
npm run dev
```

The backend API will run on `http://localhost:5000`

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite |
| **Code Editor** | Monaco Editor |
| **Code Execution** | Sandpack (CodeSandbox) |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v6 |
| **Icons** | Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JWT, bcryptjs |
| **HTTP Client** | Axios |

## 📖 Usage

### Creating a New Project
1. Navigate to the IDE page
2. Start coding in the default files (App.js, index.js, styles.css)
3. Your changes are automatically saved to localStorage

### File Management
- **Create File**: Click the `+` button in the sidebar
- **Delete File**: Hover over a file and click the trash icon
- **Rename File**: Hover over a file and click the edit icon
- **Switch Files**: Click on any file in the sidebar

### Saving Projects
- **Auto-save**: Enabled by default, saves every 2 seconds
- **Manual Save**: Click the "Save" button in the navbar
- **Cloud Save**: Login to save projects to MongoDB (optional)

### Theme Switching
- Click the moon/sun icon in the navbar to toggle themes
- Theme preference is saved to localStorage

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:userId` - Get user profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:projectId` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  projects: [ObjectId],
  createdAt: Date
}
```

### Project Model
```javascript
{
  projectId: String (required, unique),
  name: String (required),
  description: String,
  files: [{
    name: String,
    path: String,
    content: String,
    type: String (file/folder)
  }],
  userId: ObjectId (optional),
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

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
5. **Monaco Editor**: Professional-grade editing experience

---

**Made with ❤️ for CipherSchool**
