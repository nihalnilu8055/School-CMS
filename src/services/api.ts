import { 
  User, Role, MenuItem, Page, NewsCategory, NewsItem, 
  Department, StaffMember, GalleryAlbum, GalleryItem, EventItem, 
  AcademicProgram, DownloadItem, BannerSlide, ContactMessage, 
  SiteSettings, SeoSettings, AuditLog, Notice, FrontendContent 
} from '../types';
import { PAGE_CONTENT } from '../data/pageContent';
import { NAV_GROUPS } from '../data/navigation';

export const INITIAL_SETTINGS: SiteSettings = {
  school_name: "Ibn Seena English High School",
  tagline: "Producing Universal Human Beings with Wisdom & Character",
  logo_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80",
  favicon_url: "/favicon.ico",
  address: "Ibn Seena Education Campus, High School Road, CA 94016",
  phone: "+1 (555) 345-6789 / +1 (555) 876-5432",
  email: "info@ibnseenaschool.edu",
  website: "https://ibnseenaschool.edu",
  working_hours: "Monday - Friday: 7:30 AM - 3:30 PM | Saturday: 8:00 AM - 1:00 PM",
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
  meta_title: "Ibn Seena English High School - Excellence in Education & Character",
  meta_description: "Ibn Seena English High School nurtures the social, moral, and psychological development of students to face real-world challenges.",
  keywords: "Ibn Seena, High School, Education, Admissions, Fees, Notices, Curriculum, Alumni",
  og_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
  twitter_card: "summary_large_image",
  robots_txt: "User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://ibnseenaschool.edu/sitemap.xml"
};

export const INITIAL_BANNERS: BannerSlide[] = [
  {
    id: 1,
    title: "Wisdom for the Greater Good",
    subtitle: "The school is committed to producing a universal human being, a person with not just robotic information at his command, but the wisdom to use it for the greater good.",
    button_text: "Explore Mission & Vision",
    button_url: "/about",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80",
    order_index: 1,
    is_active: true
  },
  {
    id: 2,
    title: "A Free & Approachable Environment",
    subtitle: "We believe that children need a free and relaxed atmosphere to grow in, where they are trusted and the teachers are approachable.",
    button_text: "Our Curriculum",
    button_url: "/academics",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80",
    order_index: 2,
    is_active: true
  },
  {
    id: 3,
    title: "Holistic Social & Moral Growth",
    subtitle: "By placing an equal emphasis on a child's social, moral and psychological development, our graduates are well equipped to deal with real-world challenges.",
    button_text: "Read Notices",
    button_url: "/notices",
    image_url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80",
    order_index: 3,
    is_active: true
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: 1, name: "Science & STEM Research", code: "SCI", description: "Physics, Chemistry, Biology and STEM research labs", head_name: "Dr. Robert Vance" },
  { id: 2, name: "Mathematics & Computing", code: "MATH", description: "Pure & Applied Mathematics, Computer Science, Robotics", head_name: "Prof. Eleanor Vance" },
  { id: 3, name: "Languages & Humanities", code: "HUM", description: "English Literature, History, Ethics & Global Studies", head_name: "Dr. Marcus Sterling" },
  { id: 4, name: "Arts & Performing Arts", code: "ARTS", description: "Visual Arts, Drama, Music Ensemble, Calligraphy", head_name: "Ms. Clara Thorne" },
  { id: 5, name: "Sports & Physical Fitness", code: "PED", description: "Athletics, Football, Swimming, Martial Arts", head_name: "Coach David Miller" }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 1,
    name: "Dr. Robert Vance",
    photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    designation: "Principal & Chief Academic Officer",
    department_id: 1,
    department_name: "Science & STEM Research",
    qualification: "Ph.D. in Applied Physics",
    experience: "18 Years",
    email: "principal@ibnseenaschool.edu",
    phone: "+1 (555) 345-6780",
    bio: "Dedicated to holistic education that balances technical knowledge with moral integrity.",
    order_index: 1,
    is_active: true
  },
  {
    id: 2,
    name: "Prof. Eleanor Vance",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    designation: "Vice Principal & Math Chair",
    department_id: 2,
    department_name: "Mathematics & Computing",
    qualification: "M.Sc. Mathematics & Pedagogy",
    experience: "14 Years",
    email: "e.vance@ibnseenaschool.edu",
    phone: "+1 (555) 345-6781",
    bio: "Focused on developing analytical problem-solving skills in an approachable learning environment.",
    order_index: 2,
    is_active: true
  },
  {
    id: 3,
    name: "Ms. Amina Rahman",
    photo_url: "/images/staff3.jpg",
    designation: "Head of Primary",
    department_id: 3,
    department_name: "Primary Years",
    qualification: "M.Ed. Early Childhood Education",
    experience: "12 Years",
    email: "a.rahman@ibnseenaschool.edu",
    phone: "+1 (555) 345-6782",
    bio: "Creates a calm, trusted classroom where young learners feel known and ready to try.",
    order_index: 3,
    is_active: true
  }
];

export const INITIAL_CATEGORIES: NewsCategory[] = [
  { id: 1, name: "Academics & Research", slug: "academics", description: "Academic milestones, science exhibitions, and board exam results" },
  { id: 2, name: "Sports & Athletics", slug: "sports", description: "Interschool tournaments and sports championships" },
  { id: 3, name: "Campus Life", slug: "campus-life", description: "Assemblies, culture, and community events" }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Ibn Seena Students Awarded First Prize at National Science Olympiad 2026",
    slug: "ibn-seena-wins-science-olympiad-2026",
    excerpt: "Our high school science team secured 1st place with their solar microgrid project.",
    content: "<p>Students of Ibn Seena English High School demonstrated outstanding scientific wisdom and technical mastery at the National Science Olympiad 2026. The team constructed an innovative clean energy model designed for rural community electrification.</p><p>Principal Dr. Vance praised the students for applying their knowledge toward the greater good of society.</p>",
    category_id: 1,
    category_name: "Academics & Research",
    featured_image: "/images/lab.jpg",
    tags: ["Science", "Awards", "Olympiad"],
    is_featured: true,
    status: "published",
    publish_date: "2026-09-28T10:00:00.000Z",
    created_at: "2026-09-28T10:00:00.000Z"
  },
  {
    id: 2,
    title: "Sports Day Champions Lift the Inter-House Trophy",
    slug: "sports-day-champions-2026",
    excerpt: "Green House won the annual sports meet with record relays and a spirited closing march.",
    content: "<p>The annual Sports Day filled the campus with colour, fair play, and house pride. Green House took the overall trophy after a close finish in the 4x100m relay.</p><p>Coaches thanked families who volunteered at the track, first-aid tent, and refreshment stall.</p>",
    category_id: 2,
    category_name: "Sports & Athletics",
    featured_image: "/images/sports.jpg",
    tags: ["Sports", "House", "Athletics"],
    is_featured: true,
    status: "published",
    publish_date: "2026-09-18T09:00:00.000Z",
    created_at: "2026-09-18T09:00:00.000Z"
  },
  {
    id: 3,
    title: "Reading Week Turns the Library into a Story Village",
    slug: "reading-week-library-2026",
    excerpt: "Primary classes spent five days with guest authors, book talks, and quiet reading corners.",
    content: "<p>Reading Week invited every child to choose a book, meet a visiting storyteller, and write a postcard to a favourite character.</p><p>The library recorded more than 1,200 book checkouts during the week.</p>",
    category_id: 3,
    category_name: "Campus Life",
    featured_image: "/images/library.jpg",
    tags: ["Library", "Reading", "Primary"],
    is_featured: true,
    status: "published",
    publish_date: "2026-09-12T08:30:00.000Z",
    created_at: "2026-09-12T08:30:00.000Z"
  },
  {
    id: 4,
    title: "Grade 10 Debate Team Qualifies for the City Finals",
    slug: "debate-team-city-finals-2026",
    excerpt: "The senior debate squad advanced after a calm, well-researched round on digital citizenship.",
    content: "<p>Ibn Seena’s Grade 10 debate team qualified for the city finals with a motion on responsible use of technology.</p><p>The English department will host extra practice sessions before the November round.</p>",
    category_id: 1,
    category_name: "Academics & Research",
    featured_image: "/images/classroom.jpg",
    tags: ["Debate", "English", "Secondary"],
    is_featured: false,
    status: "published",
    publish_date: "2026-09-05T11:00:00.000Z",
    created_at: "2026-09-05T11:00:00.000Z"
  },
  {
    id: 5,
    title: "Art Studio Exhibits Student Work for Parents’ Evening",
    slug: "art-studio-parents-evening-2026",
    excerpt: "Paintings, clay models, and calligraphy from Grades 3 to 12 are on display in the atrium.",
    content: "<p>The art studio opened a week-long exhibition so families can see how drawing, design, and Islamic art are taught across the school.</p>",
    category_id: 3,
    category_name: "Campus Life",
    featured_image: "/images/students.jpg",
    tags: ["Art", "Exhibition", "Parents"],
    is_featured: false,
    status: "published",
    publish_date: "2026-08-29T10:00:00.000Z",
    created_at: "2026-08-29T10:00:00.000Z"
  },
  {
    id: 6,
    title: "Football Team Opens the Season with a 3–1 Home Win",
    slug: "football-season-opener-2026",
    excerpt: "The senior boys’ team started the interschool league with a strong home performance.",
    content: "<p>Supporters filled the sidelines as Ibn Seena won the season opener 3–1. The PE department reminded families that midweek fixtures are listed on the school calendar.</p>",
    category_id: 2,
    category_name: "Sports & Athletics",
    featured_image: "/images/sports.jpg",
    tags: ["Football", "Sports", "Secondary"],
    is_featured: false,
    status: "published",
    publish_date: "2026-08-22T16:00:00.000Z",
    created_at: "2026-08-22T16:00:00.000Z"
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 1,
    title: "First Term Fee Payment Schedule & Guidelines (2026-2027)",
    category: "Fee Notices",
    excerpt: "1st Term Tuition and Transport fee schedule.",
    summary: "Parents are requested to settle the 1st Term Tuition and Transport fees on or before October 25, 2026. Online payment portal is now open.",
    content: "<p>Parents are requested to settle the 1st Term Tuition and Transport fees on or before October 25, 2026.</p>",
    priority: "Urgent",
    date: "2026-10-01",
    release_date: "2026-10-01",
    expiry_date: "2026-10-25",
    file_url: "#",
    is_urgent: true,
    is_pinned: true,
    status: "published",
    created_at: "2026-10-01T08:00:00.000Z"
  },
  {
    id: 2,
    title: "Schedule for Mid-Term Academic Assessments & Examination Timetable",
    category: "Exam Notices",
    excerpt: "Mid-term written examinations timetable.",
    summary: "The mid-term written examinations for Grades 6 through 12 will commence from November 10, 2026. Detailed timetable is available for download.",
    content: "<p>The mid-term written examinations for Grades 6 through 12 will commence from November 10, 2026.</p>",
    priority: "Urgent",
    date: "2026-09-29",
    release_date: "2026-09-29",
    expiry_date: "2026-11-20",
    file_url: "#",
    is_urgent: true,
    is_pinned: false,
    status: "published",
    created_at: "2026-09-29T08:00:00.000Z"
  }
];

export const INITIAL_CONTENT: FrontendContent = {
  hero_badge: "Producing Universal Human Beings",
  admissions_cta_label: "Apply for Admissions 2026",
  welcome_eyebrow: "About Ibn Seena English High School",
  welcome_heading: "Wisdom, Character & Real-World Resilience",
  welcome_body: "The school is committed to producing a universal human being, a person with not just robotic information at his command, but the wisdom to use it for the greater good.",
  welcome_quote: "We believe that children need a free and relaxed atmosphere to grow in, where they are trusted and the teachers are approachable.",
  welcome_bullets: [
    "Equal emphasis on social, moral & psychological development",
    "Approachable faculty & trusted learning environment",
    "Integrated STEM & Ethics curriculum",
    "Equipped to deal with real-world challenges"
  ],
  welcome_cta: "Explore Our Mission & Vision",
  stats_eyebrow: "School At A Glance",
  stats_heading: "Key Highlights & Milestones",
  stats: [
    { id: 1, label: "Enrolled Students", value: "1,800+", desc: "K-12 Scholars" },
    { id: 2, label: "Faculty Members", value: "95+", desc: "Experienced Educators" },
    { id: 3, label: "Smart Classrooms", value: "50+", desc: "Tech & Science Labs" },
    { id: 4, label: "Years of Excellence", value: "30+", desc: "Legacy of Wisdom" }
  ],
  news_home_eyebrow: "Latest Stories",
  news_home_heading: "Campus News & Achievements",
  events_home_eyebrow: "School Calendar",
  events_home_heading: "Upcoming Events",
  gallery_home_eyebrow: "Life At Ibn Seena",
  gallery_home_heading: "Photo & Media Showcase",
  testimonials_eyebrow: "Community Voices",
  testimonials_heading: "What Parents & Alumni Say",
  testimonials: [
    {
      id: 1,
      quote: "Ibn Seena English High School provided my children with not just academic success, but strong moral grounding and confidence.",
      name: "Dr. Hamza Rahman",
      role: "Parent of Grade 9 Scholar",
      avatar: "/images/staff1.jpg",
      stars: 5
    },
    {
      id: 2,
      quote: "Teachers are approachable, classrooms stay calm, and my daughter looks forward to assembly and library time every week.",
      name: "Amina Joseph",
      role: "Parent of Grade 4 Student",
      avatar: "/images/staff3.jpg",
      stars: 5
    },
    {
      id: 3,
      quote: "As an alumnus, I still use the writing and ethics I learned here. The school treats graduates as part of one family.",
      name: "Faris Al-Najjar",
      role: "Alumnus, Class of 2020",
      avatar: "/images/parent1.jpg",
      stars: 5
    }
  ],
  partners_heading: "Recognized By Educational Bodies",
  partners: [
    { id: 1, title: "STEM Accredited", desc: "National Science Education Board" },
    { id: 2, title: "Holistic Pedagogy", desc: "Global Education Council" },
    { id: 3, title: "Character Education", desc: "Values & Citizenship Network" }
  ],
  principal_message_heading: "Message from the Desk of Principal",
  about_banner_image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80",
  facilities_eyebrow: "Infrastructure",
  facilities_heading: "Campus Facilities",
  facilities: [
    { id: 1, title: "STEM & Science Labs", desc: "Advanced robotics and molecular chemistry workstations.", image: "/images/lab.jpg" },
    { id: 2, title: "Central Resource Library", desc: "35,000+ reference volumes and digital archives.", image: "/images/library.jpg" },
    { id: 3, title: "Sports Ground & Courts", desc: "Athletics track, football field, and indoor games hall.", image: "/images/sports.jpg" },
    { id: 4, title: "Main Auditorium", desc: "Assembly, annual day, and parent briefing space.", image: "/images/auditorium.jpg" },
    { id: 5, title: "Smart Classrooms", desc: "Calm, well-lit rooms with boards and digital screens.", image: "/images/classroom.jpg" },
    { id: 6, title: "Campus & Gardens", desc: "Open lawns and shaded walkways for break and arrival.", image: "/images/campus.jpg" },
    { id: 7, title: "Student Commons", desc: "Cafeteria and gathering spaces for clubs and lunch.", image: "/images/students.jpg" },
    { id: 8, title: "Art & Activity Studios", desc: "Art, music, and co-curricular rooms for hands-on work.", image: "/images/classroom.jpg" }
  ],
  timeline_eyebrow: "Our Heritage",
  timeline_heading: "Milestones Timeline",
  timeline: [
    { id: 1, year: "1996", title: "Foundation", desc: "Established with a vision for holistic wisdom and character." },
    { id: 2, year: "2010", title: "Campus Expansion", desc: "Added modern STEM labs and Symphony Auditorium." },
    { id: 3, year: "2026", title: "National Olympiad Champions", desc: "Secured 1st Place at National Science Olympiad." }
  ],
  academics_eyebrow: "Curriculum & Programs",
  academics_heading: "Academic Pathways",
  academics_intro: "Comprehensive K-12 academic programs balancing technical knowledge with moral and social growth.",
  contact_eyebrow: "Get In Touch",
  contact_heading: "Contact Administration",
  contact_intro: "Reach out to our admissions team for campus tours and enrolment queries.",
  notices_eyebrow: "Official Bulletins",
  notices_heading: "Notices & Circulars",
  notices_intro: "Access current general notices, fee schedules, and examination timetables.",
  news_eyebrow: "Newsroom",
  news_heading: "School Articles",
  news_intro: "Read articles celebrating student accomplishments and school activities.",
  staff_eyebrow: "Faculty Directory",
  staff_heading: "Educators & Leadership",
  staff_intro: "Meet our approachable, dedicated faculty members.",
  gallery_page_eyebrow: "Campus Albums",
  gallery_page_heading: "Media Showcase",
  gallery_page_intro: "Browse photos capturing moments of discovery and friendship.",
  privacy_title: "Privacy Policy",
  privacy_body: "Ibn Seena English High School protects student and parent data privacy under strict administrative standards.",
  terms_title: "Terms of Use",
  terms_body: "Official terms governing the use of the school website portal."
};

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Annual Science & Innovation Exhibition 2026",
    slug: "science-innovation-expo-2026",
    description: "Student projects showcasing environmental tech, robotics, and biological models.",
    location: "Main Auditorium & Labs",
    event_date: "2026-10-22",
    start_time: "08:30 AM",
    end_time: "03:30 PM",
    banner_image: "/images/lab.jpg",
    is_featured: true
  },
  {
    id: 2,
    title: "Fall Parent-Teacher Conference",
    slug: "fall-parent-teacher-conference-2026",
    description: "Book a 10-minute meeting with class teachers to review progress and next steps.",
    location: "Primary & Secondary Blocks",
    event_date: "2026-10-15",
    start_time: "08:00 AM",
    end_time: "02:00 PM",
    banner_image: "/images/classroom.jpg",
    is_featured: true
  },
  {
    id: 3,
    title: "Inter-House Sports Day",
    slug: "inter-house-sports-day-2026",
    description: "Track events, marching, and house cheers on the main field.",
    location: "School Sports Ground",
    event_date: "2026-11-08",
    start_time: "07:45 AM",
    end_time: "01:30 PM",
    banner_image: "/images/sports.jpg",
    is_featured: true
  },
  {
    id: 4,
    title: "Mid-Term Examinations (Grades 6-12)",
    slug: "mid-term-examinations-2026",
    description: "Written assessments for middle and secondary school. Timetable is on the Notices page.",
    location: "Examination Halls",
    event_date: "2026-11-20",
    start_time: "08:00 AM",
    end_time: "12:30 PM",
    banner_image: "/images/classroom.jpg",
    is_featured: false
  },
  {
    id: 5,
    title: "Annual Day & Cultural Evening",
    slug: "annual-day-cultural-evening-2026",
    description: "Music, drama, and prize-giving with families in the auditorium.",
    location: "Main Auditorium",
    event_date: "2026-12-12",
    start_time: "05:00 PM",
    end_time: "08:00 PM",
    banner_image: "/images/auditorium.jpg",
    is_featured: false
  },
  {
    id: 6,
    title: "Admissions Open House 2026-27",
    slug: "admissions-open-house-2026",
    description: "Campus tour, principal’s briefing, and vacancy guidance for new families.",
    location: "Reception & Seminar Hall",
    event_date: "2026-12-05",
    start_time: "09:00 AM",
    end_time: "12:00 PM",
    banner_image: "/images/campus.jpg",
    is_featured: false
  }
];

export const INITIAL_GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 1,
    title: "Campus & Facilities",
    slug: "campus-facilities",
    cover_image: "/images/campus.jpg",
    description: "Buildings, library, labs, and outdoor spaces.",
    created_at: "2026-08-01T10:00:00.000Z",
    items_count: 2
  },
  {
    id: 2,
    title: "Classroom Learning",
    slug: "classroom-learning",
    cover_image: "/images/classroom.jpg",
    description: "Lessons, labs, and library time.",
    created_at: "2026-08-10T10:00:00.000Z",
    items_count: 2
  },
  {
    id: 3,
    title: "Sports & Activities",
    slug: "sports-activities",
    cover_image: "/images/sports.jpg",
    description: "Games, assemblies, and student life.",
    created_at: "2026-08-18T10:00:00.000Z",
    items_count: 2
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, album_id: 1, type: "image", url: "/images/campus.jpg", title: "Main Academic Building", caption: "Front entrance and plaza" },
  { id: 2, album_id: 2, type: "image", url: "/images/classroom.jpg", title: "Morning Lesson", caption: "Primary classroom" },
  { id: 3, album_id: 3, type: "image", url: "/images/sports.jpg", title: "Sports Day", caption: "House races on the field" },
  { id: 4, album_id: 1, type: "image", url: "/images/library.jpg", title: "Central Library", caption: "Quiet reading and research" },
  { id: 5, album_id: 2, type: "image", url: "/images/lab.jpg", title: "Science Lab", caption: "Secondary practical work" },
  { id: 6, album_id: 3, type: "image", url: "/images/students.jpg", title: "Student Life", caption: "Friends on campus" }
];

export const INITIAL_PROGRAMS: AcademicProgram[] = [
  {
    id: 1,
    title: "Primary School Foundations (Grades 1 - 5)",
    code: "PRIM",
    level: "Primary",
    description: "Nurturing literacy, numeracy, exploratory science, and socio-emotional growth in a relaxed, supportive atmosphere.",
    curriculum_details: "Core subjects: English, Mathematics, General Science, Moral Studies, Art & Music, Physical Education.",
    duration: "5 Years",
    is_active: true
  },
  {
    id: 2,
    title: "Middle School Discovery (Grades 6 - 8)",
    code: "MID",
    level: "Middle",
    description: "Fostering analytical reasoning, collaborative projects, digital literacy, and holistic moral development.",
    curriculum_details: "Subjects: Algebra, Integrated Science, History, Computer Science, Literature, Athletics.",
    duration: "3 Years",
    is_active: true
  },
  {
    id: 3,
    title: "High School & Senior Secondary (Grades 9 - 12)",
    code: "SEC",
    level: "Secondary",
    description: "Comprehensive academic preparation balancing board exam mastery with psychological and character readiness.",
    curriculum_details: "Advanced Physics, Chemistry, Calculus, Computer Science, Economics, Ethics & Social Science.",
    duration: "4 Years",
    is_active: true
  }
];

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  { id: 1, title: "Ibn Seena School Prospectus & Curriculum Guide 2026-27", file_url: "#", file_type: "PDF Document", file_size: "4.5 MB", category: "General", downloads_count: 1850, created_at: "2026-08-10" },
  { id: 2, title: "First Term Fee Structure & Payment Regulations", file_url: "#", file_type: "PDF Document", file_size: "1.2 MB", category: "Forms", downloads_count: 1420, created_at: "2026-09-01" },
  { id: 3, title: "Mid-Term Examination Schedule & Regulations", file_url: "#", file_type: "PDF Document", file_size: "980 KB", category: "Exam Timetable", downloads_count: 2100, created_at: "2026-09-15" }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 1,
    name: "Dr. Hamza Rahman",
    email: "h.rahman@gmail.com",
    phone: "+1 (555) 432-8765",
    subject: "Grade 8 Admission Inquiry",
    message: "Respected Admin, I am looking to enroll my son in Grade 8 for the upcoming term. Kindly provide details on entrance procedures and fee structure.",
    reply_status: "pending",
    created_at: "2026-09-30T11:20:00.000Z"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 1, user_name: "Alexander Wright", action: "UPDATE_SETTINGS", module: "Site Settings", details: "Updated school branding to Ibn Seena English High School", ip_address: "127.0.0.1", created_at: "2026-10-01T08:30:00.000Z" }
];

export const INITIAL_USERS: User[] = [
  { id: 1, name: "Alexander Wright", email: "admin@ibnseenaschool.edu", password_hash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", role: "Super Admin", role_id: 1, phone: "+1 (555) 345-6780", avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80", is_active: true, created_at: "2026-01-01" }
];

export const INITIAL_ROLES: Role[] = [
  { id: 1, name: "Super Admin", description: "Full system access to all modules and security configurations", permissions_count: 8 },
  { id: 2, name: "Admin", description: "Access to manage staff, news, gallery, events, downloads, and messages", permissions_count: 6 }
];

export const INITIAL_PAGES: Page[] = Object.entries(PAGE_CONTENT).map(([slug, item], index) => ({
  id: index + 1,
  title: item.title,
  slug,
  eyebrow: item.eyebrow,
  intro: item.intro,
  content: item.sections.map((section) => `<h2>${section.heading}</h2><p>${section.body}</p>`).join(''),
  template: slug.startsWith('about') ? 'about' : 'default',
  is_published: true,
  updated_at: '2026-10-01'
}));

const buildInitialMenus = (): MenuItem[] => {
  const items: MenuItem[] = [];
  let id = 1;
  NAV_GROUPS.forEach((group, groupIndex) => {
    const parentId = id;
    items.push({
      id: id++,
      title: group.label,
      url: `/${group.key}`,
      location: 'header',
      parent_id: null,
      order_index: groupIndex + 1,
      is_active: true,
    });
    group.children?.forEach((child, childIndex) => {
      items.push({
        id: id++,
        title: child.label,
        url: `/${child.key}`,
        location: 'header',
        parent_id: parentId,
        order_index: childIndex + 1,
        is_active: true,
      });
    });
  });
  [
    { title: 'Mission & Vision', url: '/about/mission' },
    { title: 'Faculty & Staff', url: '/about/staff' },
    { title: 'Admission Process', url: '/admissions/process' },
    { title: 'Academic Calendar', url: '/information/calendar' },
    { title: 'Fee Structure', url: '/fees/structure' },
    { title: 'Our Alumni', url: '/alumni/our-alumni' },
    { title: 'Notices', url: '/notices' },
    { title: 'Contact Us', url: '/contact' },
  ].forEach((link, index) => {
    items.push({
      id: id++,
      title: link.title,
      url: link.url,
      location: 'footer',
      parent_id: null,
      order_index: index + 1,
      is_active: true,
    });
  });
  return items;
};

export const INITIAL_MENUS: MenuItem[] = buildInitialMenus();
