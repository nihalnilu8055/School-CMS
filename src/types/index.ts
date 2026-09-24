// Comprehensive TypeScript Type Definitions for School Management CMS

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  role_id: number;
  avatar_url?: string;
  phone?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions_count?: number;
}

export interface Permission {
  id: number;
  name: string;
  module: string;
  description: string;
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  location: 'header' | 'footer' | 'topbar';
  parent_id?: number | null;
  order_index: number;
  is_active: boolean;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  template: 'default' | 'full-width' | 'contact' | 'about';
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  updated_at: string;
}

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category_id: number;
  category_name?: string;
  featured_image: string;
  gallery_images?: string[];
  tags?: string[];
  author_id?: number;
  author_name?: string;
  is_featured: boolean;
  status: 'draft' | 'published' | 'archived';
  publish_date: string;
  created_at: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  head_name: string;
}

export interface StaffMember {
  id: number;
  name: string;
  photo_url: string;
  designation: string;
  department_id: number;
  department_name?: string;
  qualification: string;
  experience: string;
  email: string;
  phone?: string;
  bio?: string;
  order_index: number;
  is_active: boolean;
}

export interface GalleryAlbum {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  description: string;
  created_at: string;
  items_count?: number;
}

export interface GalleryItem {
  id: number;
  album_id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  title: string;
  caption?: string;
}

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  event_date: string;
  start_time: string;
  end_time: string;
  banner_image: string;
  is_featured: boolean;
}

export interface AcademicProgram {
  id: number;
  title: string;
  code: string;
  level: 'Primary' | 'Middle' | 'Secondary' | 'Higher Secondary';
  description: string;
  curriculum_details: string;
  duration: string;
  is_active: boolean;
}

export interface DownloadItem {
  id: number;
  title: string;
  file_url: string;
  file_type: string;
  file_size: string;
  category: 'General' | 'Syllabus' | 'Exam Timetable' | 'Forms' | 'Circular';
  downloads_count: number;
  created_at: string;
}

export interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  reply_status: 'pending' | 'replied' | 'archived';
  admin_notes?: string;
  created_at: string;
}

export interface SiteSettings {
  school_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  working_hours: string;
  google_map_embed: string;
  social_links: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
}

export interface SeoSettings {
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_image: string;
  twitter_card: string;
  robots_txt: string;
}

export interface MediaFile {
  id: number;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  folder: string;
  created_at: string;
}

export interface AuditLog {
  id: number;
  user_id?: number;
  user_name: string;
  action: string;
  module: string;
  details: string;
  ip_address: string;
  created_at: string;
}
