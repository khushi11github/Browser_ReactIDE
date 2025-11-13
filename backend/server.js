import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS origins (comma-separated in ALLOWED_ORIGINS)
const defaultOrigins = ['http://localhost:3000', 'https://codecanvas-app.vercel.app'];
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : defaultOrigins;

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g., mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Track DB connection state so we can start server even if DB temporarily fails
let dbConnected = false;

// Health check (also reports DB status)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', dbConnected, message: 'CodeCanvas API is running' });
});

// Simple middleware: if DB is down, block dangerous methods (POST/PUT/DELETE)
app.use((req, res, next) => {
  if (!dbConnected && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return res.status(503).json({ error: 'Service temporarily unavailable (database offline).' });
  }
  next();
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection (don't exit process on failure; allow graceful degradation)
const connectDB = async () => {
  // Only try to connect when a MONGODB_URI is explicitly provided or when
  // running in development (local). This prevents attempts to connect to
  // localhost on hosting platforms (which causes ECONNREFUSED errors).
  const envUri = process.env.MONGODB_URI;
  const localFallback = process.env.NODE_ENV !== 'production';
  const uri = envUri ? envUri : (localFallback ? 'mongodb://localhost:27017/codecanvas' : null);

  if (!uri) {
    dbConnected = false;
    console.log('⚠️  No MONGODB_URI provided and running in production — skipping DB connection.');
    return;
  }

  try {
    // Connect without passing unsupported options to avoid MongoParseError
    await mongoose.connect(uri);
    dbConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    dbConnected = false;
    console.error('❌ MongoDB connection error:', error);
    console.error('Continuing without DB. The server will respond 503 for write operations.');
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔌 Allowed origins: ${allowedOrigins.join(', ')}`);
  });
};

startServer();

export default app;
