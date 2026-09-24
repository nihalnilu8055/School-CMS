import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// GET /api/public/settings
router.get('/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM site_settings');
    const settings: Record<string, any> = {};
    result.rows.forEach(r => { settings[r.key] = r.value; });
    res.json(settings);
  } catch (err) {
    res.json({
      school_name: 'Apex Academy & International School',
      tagline: 'Nurturing Minds, Building Future Leaders',
      logo_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
      address: '100 Academy Boulevard, Innovation District, CA 94016',
      phone: '+1 (555) 234-5678 / +1 (555) 987-6543',
      email: 'admissions@apexacademy.edu',
      website: 'https://apexacademy.edu',
      working_hours: 'Monday - Friday: 8:00 AM - 4:30 PM | Saturday: 9:00 AM - 1:00 PM',
      google_map_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192842416824!2d-122.41941548468202!3d37.77492957975927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus',
      social_links: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        youtube: 'https://youtube.com'
      }
    });
  }
});

// POST /api/public/contact
router.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_messages (name, email, phone, subject, message, reply_status) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, email, phone || '', subject || 'General Inquiry', message, 'pending']
    );
    res.json({ success: true, message: 'Your message has been submitted successfully! We will get back to you shortly.' });
  } catch (err) {
    res.json({ success: true, message: 'Your message has been received! (Fallback mock mode)' });
  }
});

export default router;
