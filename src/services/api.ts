import { 
  User, Role, Permission, MenuItem, Page, NewsCategory, NewsItem, 
  Department, StaffMember, GalleryAlbum, GalleryItem, EventItem, 
  AcademicProgram, DownloadItem, BannerSlide, ContactMessage, 
  SiteSettings, SeoSettings, MediaFile, AuditLog 
} from '../types';

// Default Initial Mock Data for full out-of-the-box experience
export const INITIAL_SETTINGS: SiteSettings = {
  school_name: "Apex Academy & International School",
  tagline: "Nurturing Minds, Empowering Future Leaders",
  logo_url: "/images/campus.jpg",
  favicon_url: "/favicon.ico",
  address: "100 Academy Boulevard, Innovation District, CA 94016",
  phone: "+1 (555) 234-5678 / +1 (555) 987-6543",
  email: "admissions@apexacademy.edu",
  website: "https://apexacademy.edu",
  working_hours: "Monday - Friday: 8:00 AM - 4:30 PM | Saturday: 9:00 AM - 1:00 PM",
  google_map_embed: "https://maps.google.com/maps?q=37.7749,-122.4194&z=15&output=embed",
  social_links: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  }
};

export const INITIAL_SEO: SeoSettings = {
  meta_title: "Apex Academy - Premier K-12 International School",
  meta_description: "Apex Academy offers world-class STEM education, athletics, arts, and holistic student leadership development.",
  keywords: "school, education, STEM, international school, AP courses, athletics, admissions",
  og_image: "/images/campus.jpg",
  twitter_card: "summary_large_image",
  robots_txt: "User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://apexacademy.edu/sitemap.xml"
};

export const INITIAL_BANNERS: BannerSlide[] = [
  {
    id: 1,
    title: "Inspiring Excellence, Empowering Leaders",
    subtitle: "Fostering intellectual curiosity, moral integrity, and global leadership in a modern 21st-century learning environment.",
    button_text: "Explore Academics",
    button_url: "/academics",
    image_url: "/images/campus.jpg",
    order_index: 1,
    is_active: true
  },
  {
    id: 2,
    title: "State-of-the-Art Science & Robotics Labs",
    subtitle: "Giving students hands-on experience with artificial intelligence, robotics, and advanced molecular research.",
    button_text: "Our Facilities",
    button_url: "/about",
    image_url: "/images/lab.jpg",
    order_index: 2,
    is_active: true
  },
  {
    id: 3,
    title: "Champion Athletics & Performing Arts",
    subtitle: "Building resilience, teamwork, and artistic mastery through top-tier sports training and music academies.",
    button_text: "View Gallery",
    button_url: "/gallery",
    image_url: "/images/sports.jpg",
    order_index: 3,
    is_active: true
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: 1, name: "Science & Innovation", code: "SCI", description: "Physics, Chemistry, Biology and STEM research labs", head_name: "Dr. Robert Vance" },
  { id: 2, name: "Mathematics & Analytics", code: "MATH", description: "Pure and Applied Mathematics, Statistics, Computer Science", head_name: "Prof. Eleanor Vance" },
  { id: 3, name: "Humanities & Languages", code: "HUM", description: "English Literature, History, Global Studies & Languages", head_name: "Dr. Marcus Sterling" },
  { id: 4, name: "Arts & Performing Arts", code: "ARTS", description: "Visual Arts, Music, Fine Arts, Theater & Graphic Design", head_name: "Ms. Clara Thorne" },
  { id: 5, name: "Physical Education & Athletics", code: "PED", description: "Sports Science, Outdoor Athletics, Fitness & Swimming", head_name: "Coach David Miller" }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 1,
    name: "Dr. Robert Vance",
    photo_url: "/images/staff1.jpg",
    designation: "Principal & Head of Science",
    department_id: 1,
    department_name: "Science & Innovation",
    qualification: "Ph.D. in Applied Physics (MIT)",
    experience: "16 Years",
    email: "r.vance@apexacademy.edu",
    phone: "+1 (555) 101-2030",
    bio: "Passionate educator specializing in quantum mechanics, robotics, and 21st-century STEM curriculum design.",
    order_index: 1,
    is_active: true
  },
  {
    id: 2,
    name: "Prof. Eleanor Vance",
    photo_url: "/images/staff2.jpg",
    designation: "Vice Principal & Math Chair",
    department_id: 2,
    department_name: "Mathematics & Analytics",
    qualification: "M.Sc. Mathematics (Stanford)",
    experience: "14 Years",
    email: "e.vance@apexacademy.edu",
    phone: "+1 (555) 101-2031",
    bio: "Dedicated to making complex mathematical modeling intuitive, fun, and applicable to real-world data science.",
    order_index: 2,
    is_active: true
  },
  {
    id: 3,
    name: "Dr. Marcus Sterling",
    photo_url: "/images/staff3.jpg",
    designation: "Dean of Humanities",
    department_id: 3,
    department_name: "Humanities & Languages",
    qualification: "Ph.D. English Literature (Oxford)",
    experience: "18 Years",
    email: "m.sterling@apexacademy.edu",
    phone: "+1 (555) 101-2032",
    bio: "Author and global speaker encouraging critical debate, rhetoric, world history, and creative writing.",
    order_index: 3,
    is_active: true
  },
  {
    id: 4,
    name: "Ms. Clara Thorne",
    photo_url: "/images/staff4.jpg",
    designation: "Fine Arts Director",
    department_id: 4,
    department_name: "Arts & Performing Arts",
    qualification: "M.F.A. Fine Arts (RISD)",
    experience: "9 Years",
    email: "c.thorne@apexacademy.edu",
    phone: "+1 (555) 101-2033",
    bio: "Inspiring creative expression through oil painting, digital illustration, sculpture, and graphic design.",
    order_index: 4,
    is_active: true
  },
  {
    id: 5,
    name: "Coach David Miller",
    photo_url: "/images/staff5.jpg",
    designation: "Athletic Director",
    department_id: 5,
    department_name: "Physical Education & Athletics",
    qualification: "B.S. Kinesiology & Physical Ed",
    experience: "12 Years",
    email: "d.miller@apexacademy.edu",
    phone: "+1 (555) 101-2034",
    bio: "Former national athletic coach guiding students in discipline, teamwork, and championship sportsmanship.",
    order_index: 5,
    is_active: true
  }
];

export const INITIAL_CATEGORIES: NewsCategory[] = [
  { id: 1, name: "Academics & Science", slug: "academics", description: "Academic milestones, research fairs, and olympiad wins" },
  { id: 2, name: "Sports & Athletics", slug: "sports", description: "Tournament victories, athletics meets, and sports honors" },
  { id: 3, name: "Cultural & Arts", slug: "cultural", description: "Concerts, art exhibitions, theater plays, and cultural fests" },
  { id: 4, name: "Campus Life", slug: "campus-life", description: "School events, student initiatives, and club activities" }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Apex Academy Wins International STEM Innovation Challenge 2026",
    slug: "apex-wins-international-stem-2026",
    excerpt: "Our high school robotics team secured 1st place in Geneva with an AI-powered solar micro-grid invention.",
    content: "<p>Our high school robotics team secured the <strong>First Place Trophy</strong> at the Global Youth Innovation Summit held in Geneva. The team built an AI-powered solar micro-grid prototype that impressed international judges with its energy efficiency and practical application for rural electrification.</p><p>Principal Dr. Robert Vance commended the students for their tireless dedication, late-night lab sessions, and collaborative spirit.</p>",
    category_id: 1,
    category_name: "Academics & Science",
    featured_image: "/images/students.jpg",
    gallery_images: [
      "/images/lab.jpg",
      "/images/computers.jpg"
    ],
    tags: ["STEM", "Robotics", "Geneva", "Awards"],
    is_featured: true,
    status: "published",
    publish_date: "2026-09-20T10:00:00.000Z",
    created_at: "2026-09-20T10:00:00.000Z"
  },
  {
    id: 2,
    title: "Annual Cultural Arts Gala 2026 Celebrates Young Talent",
    slug: "annual-cultural-arts-gala-2026",
    excerpt: "Over 600 attendees gathered for an extraordinary evening of symphony orchestra, theater, and fine arts.",
    content: "<p>The Apex Auditorium came alive with vibrant colors, classical orchestrations, and contemporary dance performances during our annual Cultural Gala. Over 600 parents and community leaders attended the evening showcase.</p><p>Highlights included the Senior Drama Club performance of <i>The Tempest</i> and the orchestra ensemble performance of Vivaldi’s Four Seasons.</p>",
    category_id: 3,
    category_name: "Cultural & Arts",
    featured_image: "/images/concert.jpg",
    tags: ["Arts", "Concert", "Drama", "Symphony"],
    is_featured: true,
    status: "published",
    publish_date: "2026-09-18T14:30:00.000Z",
    created_at: "2026-09-18T14:30:00.000Z"
  },
  {
    id: 3,
    title: "Apex Eagles Soccer Team Advances to State Finals",
    slug: "apex-eagles-soccer-state-finals",
    excerpt: "A thrilling 3-2 victory propels Apex Eagles into the State Championship finals this coming weekend.",
    content: "<p>In an edge-of-the-seat semifinal match against Oakridge High, Apex Academy secured a 3-2 victory with a stunning stoppage-time goal by team captain Liam Carter.</p><p>The finals will take place next Saturday at the Central Athletic Stadium. We invite all parents and alumni to come support our Eagles!</p>",
    category_id: 2,
    category_name: "Sports & Athletics",
    featured_image: "/images/soccer.jpg",
    tags: ["Soccer", "Sports", "State Finals"],
    is_featured: false,
    status: "published",
    publish_date: "2026-09-15T09:00:00.000Z",
    created_at: "2026-09-15T09:00:00.000Z"
  },
  {
    id: 4,
    title: "State-of-the-Art Biotech Laboratory Officially Opened",
    slug: "biotech-lab-opening",
    excerpt: "New molecular biology equipment installed to support Advanced Placement research programs.",
    content: "<p>We are excited to announce the opening of our state-of-the-art Biotech Research Lab equipped with PCR thermal cyclers, fluorescence microscopes, and laminar flow hoods.</p><p>This lab will empower students taking AP Biology and Biotechnology research electives.</p>",
    category_id: 1,
    category_name: "Academics & Science",
    featured_image: "/images/lab.jpg",
    tags: ["Biotech", "Lab", "Science"],
    is_featured: false,
    status: "published",
    publish_date: "2026-09-10T11:15:00.000Z",
    created_at: "2026-09-10T11:15:00.000Z"
  },
  {
    id: 5,
    title: "Fall Parent-Teacher Conference Schedule Announced",
    slug: "fall-parent-teacher-conference",
    excerpt: "Book your 1-on-1 faculty consultation slots online starting next Monday.",
    content: "<p>The Fall Semester Parent-Teacher Conference is scheduled for October 15-16, 2026. Parents can book 15-minute one-on-one consultation slots with subject teachers via the online parent portal.</p>",
    category_id: 4,
    category_name: "Campus Life",
    featured_image: "/images/students.jpg",
    tags: ["Notice", "Parents", "Conference"],
    is_featured: false,
    status: "published",
    publish_date: "2026-09-05T08:00:00.000Z",
    created_at: "2026-09-05T08:00:00.000Z"
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Annual International Science & Tech Expo 2026",
    slug: "science-tech-expo-2026",
    description: "Over 100 student projects showcasing AI models, renewable energy devices, and biomedical innovations.",
    location: "Main Auditorium & STEM Atrium",
    event_date: "2026-10-18",
    start_time: "09:00 AM",
    end_time: "04:30 PM",
    banner_image: "/images/auditorium.jpg",
    is_featured: true
  },
  {
    id: 2,
    title: "Fall Music Ensemble Concert",
    slug: "fall-music-concert",
    description: "An extraordinary evening of symphony, choir harmony, and solo instrumental performances.",
    location: "Apex Symphony Hall",
    event_date: "2026-10-25",
    start_time: "06:00 PM",
    end_time: "09:00 PM",
    banner_image: "/images/concert.jpg",
    is_featured: true
  },
  {
    id: 3,
    title: "Open House Admission Orientation 2027-28",
    slug: "open-house-orientation",
    description: "Interactive campus tours, faculty Q&A session, and curriculum overview for prospective families.",
    location: "Campus Center Hall",
    event_date: "2026-11-05",
    start_time: "10:00 AM",
    end_time: "01:00 PM",
    banner_image: "/images/hallway.jpg",
    is_featured: false
  }
];

export const INITIAL_GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 1,
    title: "Campus Architecture & Facilities",
    slug: "campus-architecture",
    cover_image: "/images/campus.jpg",
    description: "Modern classrooms, digital libraries, sports arena, and eco-friendly campus grounds.",
    created_at: "2026-08-01T10:00:00.000Z",
    items_count: 4
  },
  {
    id: 2,
    title: "STEM & Robotics Exhibition",
    slug: "stem-robotics-expo",
    cover_image: "/images/lab.jpg",
    description: "Students presenting working prototypes and automated systems at the annual tech fair.",
    created_at: "2026-08-15T10:00:00.000Z",
    items_count: 3
  },
  {
    id: 3,
    title: "Sports Championship Meet",
    slug: "sports-championship",
    cover_image: "/images/sports.jpg",
    description: "High-octane action shots from track & field, soccer finals, and swimming tournaments.",
    created_at: "2026-09-01T10:00:00.000Z",
    items_count: 3
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, album_id: 1, type: "image", url: "/images/campus.jpg", title: "Main Academic Building", caption: "School campus and main entrance" },
  { id: 2, album_id: 1, type: "image", url: "/images/hallway.jpg", title: "School Corridor", caption: "Bright hallways connecting classrooms" },
  { id: 3, album_id: 1, type: "image", url: "/images/classroom.jpg", title: "Primary Classroom", caption: "Students learning with their teacher" },
  { id: 4, album_id: 1, type: "image", url: "/images/library.jpg", title: "School Library", caption: "Quiet reading and study space" },
  { id: 5, album_id: 2, type: "image", url: "/images/lab.jpg", title: "Science Laboratory", caption: "Hands-on experiments in the school lab" },
  { id: 6, album_id: 2, type: "image", url: "/images/computers.jpg", title: "Computer Classroom", caption: "Digital learning and coding lessons" },
  { id: 7, album_id: 2, type: "image", url: "/images/students.jpg", title: "Active Classroom", caption: "Students raising hands during a lesson" },
  { id: 8, album_id: 3, type: "image", url: "/images/sports.jpg", title: "School Sports Day", caption: "Team sports on the school field" },
  { id: 9, album_id: 3, type: "image", url: "/images/soccer.jpg", title: "Soccer Practice", caption: "Eagles training after school" },
  { id: 10, album_id: 3, type: "image", url: "/images/playground.jpg", title: "Playground & Recess", caption: "Students enjoying outdoor break time" }
];

export const INITIAL_PROGRAMS: AcademicProgram[] = [
  {
    id: 1,
    title: "Primary Academic Foundations (Grades 1-5)",
    code: "PRIM",
    level: "Primary",
    description: "Building strong literacy, numeracy, exploratory science, and socio-emotional skills through inquiry-based learning.",
    curriculum_details: "Core subjects: English, Mathematics, General Science, World Languages, Art & Music, Physical Education.",
    duration: "5 Years",
    is_active: true
  },
  {
    id: 2,
    title: "Middle School Discovery Program (Grades 6-8)",
    code: "MID",
    level: "Middle",
    description: "Fostering analytical thinking, collaborative project work, digital literacy, and introductory STEM electives.",
    curriculum_details: "Subjects: Algebra, Integrated Science, World History, Computer Science, Literature, Athletics.",
    duration: "3 Years",
    is_active: true
  },
  {
    id: 3,
    title: "Secondary & AP High School Diploma (Grades 9-12)",
    code: "SEC",
    level: "Secondary",
    description: "Comprehensive college-preparatory curriculum featuring Advanced Placement (AP) courses, SAT/ACT coaching, and capstone research.",
    curriculum_details: "AP Biology, AP Physics C, AP Calculus BC, AP Computer Science A, AP Microeconomics, World Literature.",
    duration: "4 Years",
    is_active: true
  }
];

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  { id: 1, title: "Academic Prospectus & Curriculum Guide 2026-27", file_url: "#", file_type: "PDF Document", file_size: "4.2 MB", category: "General", downloads_count: 1420, created_at: "2026-08-10" },
  { id: 2, title: "Annual Examination Schedule & Regulations - Fall 2026", file_url: "#", file_type: "PDF Document", file_size: "1.1 MB", category: "Exam Timetable", downloads_count: 890, created_at: "2026-09-01" },
  { id: 3, title: "New Student Admission & Scholarship Application Form", file_url: "#", file_type: "PDF Document", file_size: "850 KB", category: "Forms", downloads_count: 2340, created_at: "2026-08-01" },
  { id: 4, title: "School Code of Conduct & Honor Code Policy", file_url: "#", file_type: "PDF Document", file_size: "2.8 MB", category: "Circular", downloads_count: 670, created_at: "2026-08-15" }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 1,
    name: "Jonathan Miller",
    email: "j.miller@gmail.com",
    phone: "+1 (555) 321-7654",
    subject: "Grade 9 Admission Inquiry",
    message: "Hello, I am interested in enrolling my daughter in Grade 9 for the upcoming academic year. Could you please send details on entrance assessments and tuition fees?",
    reply_status: "pending",
    created_at: "2026-09-23T14:20:00.000Z"
  },
  {
    id: 2,
    name: "Dr. Rebecca Hayes",
    email: "rhayes@biotech.org",
    phone: "+1 (555) 987-1234",
    subject: "STEM Partnership Opportunity",
    message: "Our institute would love to sponsor student scholarships for the upcoming Robotics Competition. Who should we contact from the administration team?",
    reply_status: "replied",
    admin_notes: "Sent email response connecting with Principal Dr. Vance.",
    created_at: "2026-09-21T09:15:00.000Z"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 1, user_name: "Alexander Wright", action: "UPDATE_SETTINGS", module: "Site Settings", details: "Updated school phone number & address", ip_address: "192.168.1.10", created_at: "2026-09-24T09:30:00.000Z" },
  { id: 2, user_name: "Alexander Wright", action: "CREATE_NEWS", module: "News", details: "Published news item: Apex Academy Wins International STEM", ip_address: "192.168.1.10", created_at: "2026-09-20T10:00:00.000Z" }
];

export const INITIAL_USERS: User[] = [
  { id: 1, name: "Alexander Wright", email: "admin@apexacademy.edu", role: "Super Admin", role_id: 1, phone: "+1 (555) 019-2834", avatar_url: "/images/staff3.jpg", is_active: true, created_at: "2026-01-01" },
  { id: 2, name: "Sarah Jenkins", email: "editor@apexacademy.edu", role: "Editor", role_id: 3, phone: "+1 (555) 019-5821", avatar_url: "/images/staff4.jpg", is_active: true, created_at: "2026-02-15" }
];

export const INITIAL_ROLES: Role[] = [
  { id: 1, name: "Super Admin", description: "Full system access to all modules and security configurations", permissions_count: 8 },
  { id: 2, name: "Admin", description: "Access to manage staff, news, gallery, events, downloads, and messages", permissions_count: 6 },
  { id: 3, name: "Editor", description: "Access to manage news articles, events, gallery, and pages", permissions_count: 4 },
  { id: 4, name: "Staff", description: "Read-only access to staff directory and school events", permissions_count: 2 }
];

export const INITIAL_PAGES: Page[] = [
  { id: 1, title: "Home Page", slug: "home", content: "Welcome to Apex Academy main public homepage.", template: "default", is_published: true, updated_at: "2026-09-20" },
  { id: 2, title: "About Us", slug: "about", content: "School history, vision, mission, and principal's desk message.", template: "about", is_published: true, updated_at: "2026-09-18" },
  { id: 3, title: "Academics", slug: "academics", content: "Curriculum programs, examination timetables, and downloads.", template: "default", is_published: true, updated_at: "2026-09-15" },
  { id: 4, title: "Staff Directory", slug: "staff", content: "Faculty list and department chairs.", template: "default", is_published: true, updated_at: "2026-09-10" },
  { id: 5, title: "Contact Us", slug: "contact", content: "School campus address, inquiry form, and Google Map location.", template: "contact", is_published: true, updated_at: "2026-09-01" }
];

export const INITIAL_MENUS: MenuItem[] = [
  { id: 1, title: "Home", url: "/", location: "header", order_index: 1, is_active: true },
  { id: 2, title: "About Us", url: "/about", location: "header", order_index: 2, is_active: true },
  { id: 3, title: "Academics", url: "/academics", location: "header", order_index: 3, is_active: true },
  { id: 4, title: "Staff", url: "/staff", location: "header", order_index: 4, is_active: true },
  { id: 5, title: "News", url: "/news", location: "header", order_index: 5, is_active: true },
  { id: 6, title: "Gallery", url: "/gallery", location: "header", order_index: 6, is_active: true },
  { id: 7, title: "Contact", url: "/contact", location: "header", order_index: 7, is_active: true }
];
