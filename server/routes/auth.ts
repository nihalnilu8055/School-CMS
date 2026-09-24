import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'apex_school_cms_secret_key_2026';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Attempt DB Lookup
    const dbRes = await pool.query('SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.email = $1', [email]);
    
    if (dbRes.rows.length > 0) {
      const user = dbRes.rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (match || password === 'password123') { // Fallback standard demo pass
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role_name }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role_name || 'Super Admin',
            avatar_url: user.avatar_url
          }
        });
      }
    }
  } catch (e) {
    console.warn('DB query error during login, falling back to mock authentication.');
  }

  // Fallback Mock Validation
  if (email === 'admin@apexacademy.edu' && (password === 'password123' || password === 'admin')) {
    const token = jwt.sign({ id: 1, email, role: 'Super Admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({
      token,
      user: {
        id: 1,
        name: 'Alexander Wright',
        email: 'admin@apexacademy.edu',
        role: 'Super Admin',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      }
    });
  }

  return res.status(401).json({ message: 'Invalid email or password' });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export default router;
