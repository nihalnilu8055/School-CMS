import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth';
import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'School Management CMS API Server'
  });
});

// Root page — visiting http://localhost:5000 in a browser used to show
// Express's "Cannot GET /" because this is an API, not a website.
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'School Management CMS API Server',
    message: 'This is the API server, not the website. Open the site at http://localhost:5174',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      public: '/api/public',
      admin: '/api/admin'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 School Management CMS Backend Server running on http://localhost:${PORT}`);
});
