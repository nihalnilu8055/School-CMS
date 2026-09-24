import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth';
import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';
import { isSupabaseConfigured, supabase } from './supabase';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';

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
app.get('/api/health', async (req, res) => {
  let database = 'mock';
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from('roles').select('id').limit(1);
    database = error ? `supabase-configured (${error.message})` : 'supabase';
  }

  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'School Management CMS API Server',
    database
  });
});

// Root page — visiting http://localhost:5000 in a browser used to show
// Express's "Cannot GET /" because this is an API, not a website.
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'School Management CMS API Server',
    message: 'This is the API server, not the website.',
    website: FRONTEND_URL,
    admin_portal: `${FRONTEND_URL}/admin-portal`,
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      public: '/api/public',
      admin: '/api/admin'
    }
  });
});

app.get(['/admin', '/admin-portal'], (req, res) => {
  res.redirect(302, `${FRONTEND_URL}/admin-portal`);
});

app.listen(PORT, async () => {
  console.log(`🚀 School Management CMS Backend Server running on http://localhost:${PORT}`);
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('⚠️ Supabase keys are missing. Operating in Memory/Mock API fallback mode.');
    return;
  }

  const { error } = await supabase.from('roles').select('id').limit(1);
  if (error) {
    console.warn('⚠️ Connected to Supabase, but tables are missing. Run database/schema.sql and database/seed.sql in the SQL Editor.');
    console.warn(`   ${error.message}`);
  } else {
    console.log('✅ Successfully connected to Supabase!');
  }
});
