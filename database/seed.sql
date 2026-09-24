-- =========================================================
-- Seed Data for School Management CMS
-- =========================================================

-- 1. Roles
INSERT INTO roles (id, name, description) VALUES
(1, 'Super Admin', 'Full system access to all modules and configurations'),
(2, 'Admin', 'Access to content management, staff, news, gallery, and settings'),
(3, 'Editor', 'Access to manage news, events, pages, and media'),
(4, 'Staff', 'Limited view and profile access')
ON CONFLICT (id) DO NOTHING;

-- 2. Permissions
INSERT INTO permissions (id, name, module, description) VALUES
(1, 'manage_users', 'users', 'Create, update, and delete admin users'),
(2, 'manage_pages', 'pages', 'Manage static pages content'),
(3, 'manage_news', 'news', 'Publish and edit school news & articles'),
(4, 'manage_staff', 'staff', 'Manage teacher profiles and departments'),
(5, 'manage_gallery', 'gallery', 'Upload and organize photo albums'),
(6, 'manage_academics', 'academics', 'Update curriculum, subjects, downloads'),
(7, 'manage_settings', 'settings', 'Configure site branding, contact, SEO'),
(8, 'view_messages', 'messages', 'Read and reply to contact form inquiries')
ON CONFLICT (id) DO NOTHING;

-- 3. Users (Default admin user password: password123 hashed with bcrypt)
INSERT INTO users (id, name, email, password_hash, role_id, phone, avatar_url) VALUES
(1, 'Alexander Wright', 'admin@apexacademy.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, '+1 (555) 019-2834', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'),
(2, 'Sarah Jenkins', 'editor@apexacademy.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '+1 (555) 019-5821', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80')
ON CONFLICT (id) DO NOTHING;

-- 4. Departments
INSERT INTO departments (id, name, code, description, head_name) VALUES
(1, 'Science & Innovation', 'SCI', 'Physics, Chemistry, Biology and STEM research labs', 'Dr. Robert Vance'),
(2, 'Mathematics & Analytics', 'MATH', 'Pure and Applied Mathematics, Statistics, Computer Science', 'Prof. Eleanor Vance'),
(3, 'Humanities & Languages', 'HUM', 'English Literature, History, Global Studies & Foreign Languages', 'Dr. Marcus Sterling'),
(4, 'Arts & Performing Arts', 'ARTS', 'Visual Arts, Music, Fine Arts, Theater & Graphic Design', 'Ms. Clara Thorne'),
(5, 'Physical Education & Athletics', 'PED', 'Sports Science, Outdoor Athletics, Wellness & Fitness', 'Coach David Miller')
ON CONFLICT (id) DO NOTHING;

-- 5. Staff
INSERT INTO staff (id, name, photo_url, designation, department_id, qualification, experience, email, phone, bio, order_index) VALUES
(1, 'Dr. Robert Vance', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80', 'Head of Science Department', 1, 'Ph.D. in Physics (MIT)', '16 Years', 'r.vance@apexacademy.edu', '+1 (555) 101-2030', 'Passionate educator specializing in quantum mechanics, robotics, and STEM curriculum design.', 1),
(2, 'Prof. Eleanor Vance', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80', 'Senior Math Faculty', 2, 'M.Sc. Applied Mathematics (Stanford)', '12 Years', 'e.vance@apexacademy.edu', '+1 (555) 101-2031', 'Dedicated to making complex mathematics intuitive, fun, and applicable to real-world data science.', 2),
(3, 'Dr. Marcus Sterling', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80', 'Dean of Humanities', 3, 'Ph.D. English Literature (Oxford)', '18 Years', 'm.sterling@apexacademy.edu', '+1 (555) 101-2032', 'Author and global speaker encouraging critical thinking, public speaking, and historical analysis.', 3),
(4, 'Ms. Clara Thorne', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80', 'Fine Arts Director', 4, 'M.F.A. Fine Arts (Rhode Island School of Design)', '9 Years', 'c.thorne@apexacademy.edu', '+1 (555) 101-2033', 'Inspiring creative expression through oil painting, digital illustration, and ceramic art.', 4),
(5, 'Coach David Miller', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80', 'Athletics & Sports Director', 5, 'B.S. Sports Science & Physical Ed', '14 Years', 'd.miller@apexacademy.edu', '+1 (555) 101-2034', 'Former national swimmer guiding students in discipline, teamwork, and championship sportsmanship.', 5)
ON CONFLICT (id) DO NOTHING;

-- 6. News Categories
INSERT INTO news_categories (id, name, slug, description) VALUES
(1, 'Academics & Science', 'academics', 'Academic achievements, science fairs, and exam announcements'),
(2, 'Sports & Athletics', 'sports', 'Tournament updates, athletics meets, and sports honors'),
(3, 'Cultural & Arts', 'cultural', 'Music galas, art exhibitions, theater plays, and cultural events'),
(4, 'Campus Life', 'campus-life', 'Daily school updates, student initiatives, and club activities')
ON CONFLICT (id) DO NOTHING;

-- 7. News Items
INSERT INTO news (id, title, slug, content, excerpt, category_id, featured_image, is_featured, status, publish_date) VALUES
(1, 'Apex Academy Wins International STEM Innovation Challenge 2026', 'apex-wins-international-stem-2026', '<p>Our high school robotics team secured the <strong>First Place Trophy</strong> at the Global Youth Innovation Summit held in Geneva. The team built an AI-powered solar micro-grid prototype that impressed international judges with its efficiency and practical application for rural electrification.</p><p>Principal Dr. Robert Vance commended the students for their tireless dedication, late-night lab sessions, and collaborative spirit.</p>', 'Our high school robotics team secured 1st place in Geneva with an AI solar micro-grid invention.', 1, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', TRUE, 'published', NOW()),
(2, 'Annual Cultural Arts Gala Highlights Student Talent', 'annual-cultural-arts-gala-2026', '<p>The Apex Auditorium came alive with vibrant colors, classical orchestrations, and contemporary dance performances during our annual Cultural Gala. Over 600 parents and community members attended the evening showcase.</p><p>Highlights included the Senior Drama Club performance of <i>The Tempest</i> and the orchestra ensemble performance of Vivaldi’s Four Seasons.</p>', 'Over 600 attendees gathered for an unforgettable evening of orchestra, theater, and visual arts.', 3, 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80', TRUE, 'published', NOW()),
(3, 'Apex Varsity Soccer Team Advances to State Finals', 'apex-varsity-soccer-state-finals', '<p>In an edge-of-the-seat semifinal match against Oakridge High, Apex Academy secured a 3-2 victory with a stunning stoppage-time goal by team captain Liam Carter.</p><p>The finals will take place next Saturday at the Central Athletic Stadium. We invite all parents and alumni to come support our Eagles!</p>', 'A thrilling 3-2 victory propels Apex Eagles into the State Championship finals this coming weekend.', 2, 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80', FALSE, 'published', NOW()),
(4, 'New Modern Biotech Lab Opened for Advanced Placement Students', 'new-biotech-lab-opening', '<p>We are excited to announce the opening of our state-of-the-art Biotech Research Lab equipped with PCR thermal cyclers, fluorescence microscopes, and laminar flow hoods.</p><p>This lab will empower students taking AP Biology and Biotechnology research electives.</p>', 'State-of-the-art laboratory facility installed to support advanced genetic and biochemical research.', 1, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80', FALSE, 'published', NOW()),
(5, 'Fall Parent-Teacher Conference Schedule Announced', 'fall-parent-teacher-conference', '<p>The Fall Semester Parent-Teacher Conference is scheduled for October 15-16, 2026. Parents can book 15-minute one-on-one consultation slots with subject teachers via the online portal.</p>', 'Book your one-on-one faculty consultation slots online starting next Monday.', 4, 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80', FALSE, 'published', NOW())
ON CONFLICT (id) DO NOTHING;

-- 8. Hero Banners
INSERT INTO banners (id, title, subtitle, button_text, button_url, image_url, order_index, is_active) VALUES
(1, 'Inspiring Excellence, Empowering Leaders', 'Fostering intellectual curiosity, moral integrity, and global leadership in a modern 21st-century learning environment.', 'Explore Programs', '/academics', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80', 1, TRUE),
(2, 'State-of-the-Art Science & Tech Labs', 'Giving students hands-on experience with artificial intelligence, robotics, and molecular biology.', 'Discover Facilities', '/about', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80', 2, TRUE),
(3, 'Champion Sports & Holistic Development', 'Building resilience, teamwork, and athletic mastery through top-tier sports training and facilities.', 'View Sports', '/academics', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80', 3, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 9. Events
INSERT INTO events (id, title, slug, description, location, event_date, start_time, end_time, banner_image, is_featured) VALUES
(1, 'Annual International Science & Tech Expo 2026', 'science-tech-expo-2026', 'Over 100 student projects showcasing AI models, renewable energy devices, and biomedical innovations.', 'Main Auditorium & STEM Atrium', '2026-10-18', '09:00 AM', '04:30 PM', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', TRUE),
(2, 'Fall Music Ensemble Concert', 'fall-music-concert', 'An extraordinary evening of symphony, choir harmony, and jazz performances by Apex Music Department.', 'Apex Symphony Hall', '2026-10-25', '06:00 PM', '09:00 PM', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80', TRUE),
(3, 'Open House Admission Orientation 2027-28', 'open-house-orientation', 'Interactive campus tours, faculty Q&A session, and curriculum overview for prospective parents and students.', 'Campus Center Hall', '2026-11-05', '10:00 AM', '01:00 PM', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', FALSE)
ON CONFLICT (id) DO NOTHING;

-- 10. Gallery Albums & Items
INSERT INTO gallery_albums (id, title, slug, cover_image, description) VALUES
(1, 'Campus Architecture & Facilities', 'campus-architecture', 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80', 'Modern classrooms, digital libraries, sports arena, and green eco-campus grounds.'),
(2, 'STEM & Robotics Exhibition', 'stem-robotics-expo', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', 'Students presenting working prototypes and automated systems at the annual fair.'),
(3, 'Sports Meet & Athletic Championship', 'sports-meet-2026', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80', 'Action shots from track and field events, basketball finals, and swimming tournaments.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO gallery_items (id, album_id, type, url, thumbnail_url, title, caption) VALUES
(1, 1, 'image', 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=400&q=80', 'Main Academic Building', 'Iconic front plaza and clock tower'),
(2, 1, 'image', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80', 'Central Digital Library', 'Over 40,000 digital & physical titles with silent study pods'),
(3, 2, 'image', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80', 'Robotics Testing Rig', 'High school seniors calibrating autonomous sensor drones'),
(4, 3, 'image', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80', 'Track & Field 100m Sprint', 'Athletes crossing the finish line in record time')
ON CONFLICT (id) DO NOTHING;

-- 11. Downloads
INSERT INTO downloads (id, title, file_url, file_type, file_size, category, downloads_count) VALUES
(1, 'Academic Prospectus 2026-2027 (PDF)', '/downloads/Academic_Prospectus_2026.pdf', 'PDF Document', '4.2 MB', 'General', 1420),
(2, 'Annual Examination Timetable - Fall 2026', '/downloads/Exam_Timetable_Fall_2026.pdf', 'PDF Document', '1.1 MB', 'Exam Timetable', 890),
(3, 'Student Admission & Scholarship Form', '/downloads/Admission_Form_2026.pdf', 'PDF Document', '850 KB', 'Forms', 2340),
(4, 'School Code of Conduct & Student Handbook', '/downloads/Student_Handbook_2026.pdf', 'PDF Document', '2.8 MB', 'Circular', 670)
ON CONFLICT (id) DO NOTHING;

-- 12. Site Settings
INSERT INTO site_settings (key, value) VALUES
('school_name', '"Apex Academy & International School"'),
('tagline', '"Nurturing Minds, Building Future Leaders"'),
('logo_url', '"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80"'),
('favicon_url', '"/favicon.ico"'),
('address', '"100 Academy Boulevard, Innovation District, CA 94016"'),
('phone', '"+1 (555) 234-5678 / +1 (555) 987-6543"'),
('email', '"admissions@apexacademy.edu"'),
('website', '"https://apexacademy.edu"'),
('working_hours', '"Monday - Friday: 8:00 AM - 4:30 PM | Saturday: 9:00 AM - 1:00 PM"'),
('google_map_embed', '"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192842416824!2d-122.41941548468202!3d37.77492957975927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter%20HQ!5e0!3m2!1sen!2sus!4v1625000000000!5m2!1sen!2sus"'),
('social_links', '{"facebook":"https://facebook.com","instagram":"https://instagram.com","twitter":"https://twitter.com","linkedin":"https://linkedin.com","youtube":"https://youtube.com"}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 13. SEO Settings
INSERT INTO seo_settings (key, value) VALUES
('meta_title', '"Apex Academy - Premier K-12 International School"'),
('meta_description', '"Apex Academy offers world-class education, advanced STEM labs, sports excellence, and holistic leadership development for K-12 students."'),
('keywords', '"school, education, STEM, international school, AP courses, athletics, admissions"'),
('og_image', '"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"'),
('twitter_card', '"summary_large_image"'),
('robots_txt', '"User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://apexacademy.edu/sitemap.xml"')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Keep SERIAL sequences in sync after inserting explicit IDs
SELECT setval(pg_get_serial_sequence('roles', 'id'), (SELECT COALESCE(MAX(id), 1) FROM roles));
SELECT setval(pg_get_serial_sequence('permissions', 'id'), (SELECT COALESCE(MAX(id), 1) FROM permissions));
SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT COALESCE(MAX(id), 1) FROM users));
SELECT setval(pg_get_serial_sequence('departments', 'id'), (SELECT COALESCE(MAX(id), 1) FROM departments));
SELECT setval(pg_get_serial_sequence('staff', 'id'), (SELECT COALESCE(MAX(id), 1) FROM staff));
SELECT setval(pg_get_serial_sequence('news_categories', 'id'), (SELECT COALESCE(MAX(id), 1) FROM news_categories));
SELECT setval(pg_get_serial_sequence('news', 'id'), (SELECT COALESCE(MAX(id), 1) FROM news));
SELECT setval(pg_get_serial_sequence('banners', 'id'), (SELECT COALESCE(MAX(id), 1) FROM banners));
SELECT setval(pg_get_serial_sequence('events', 'id'), (SELECT COALESCE(MAX(id), 1) FROM events));
SELECT setval(pg_get_serial_sequence('gallery_albums', 'id'), (SELECT COALESCE(MAX(id), 1) FROM gallery_albums));
SELECT setval(pg_get_serial_sequence('gallery_items', 'id'), (SELECT COALESCE(MAX(id), 1) FROM gallery_items));
SELECT setval(pg_get_serial_sequence('downloads', 'id'), (SELECT COALESCE(MAX(id), 1) FROM downloads));
