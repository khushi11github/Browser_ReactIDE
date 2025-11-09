# CodeCanvas Backend

Express.js + MongoDB backend API for CodeCanvas.

## Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. Install dependencies:
```bash
npm install
```

4. Start server:
```bash
npm run dev
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - List projects
- `GET /api/projects/:id` - Get project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Deploy to Render

1. Create a new Web Service on Render
2. Connect your repository
3. Set environment variables
4. Deploy
