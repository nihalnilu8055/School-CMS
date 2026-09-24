import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Role, MenuItem, Page, NewsCategory, NewsItem, 
  Department, StaffMember, GalleryAlbum, GalleryItem, EventItem, 
  AcademicProgram, DownloadItem, BannerSlide, ContactMessage, 
  SiteSettings, SeoSettings, AuditLog 
} from '../types';
import { 
  INITIAL_SETTINGS, INITIAL_SEO, INITIAL_BANNERS, INITIAL_DEPARTMENTS, 
  INITIAL_STAFF, INITIAL_CATEGORIES, INITIAL_NEWS, INITIAL_EVENTS, 
  INITIAL_GALLERY_ALBUMS, INITIAL_GALLERY_ITEMS, INITIAL_PROGRAMS, 
  INITIAL_DOWNLOADS, INITIAL_MESSAGES, INITIAL_AUDIT_LOGS, INITIAL_USERS, 
  INITIAL_ROLES, INITIAL_PAGES, INITIAL_MENUS 
} from '../services/api';

interface SiteContextType {
  settings: SiteSettings;
  seo: SeoSettings;
  banners: BannerSlide[];
  departments: Department[];
  staff: StaffMember[];
  newsCategories: NewsCategory[];
  news: NewsItem[];
  events: EventItem[];
  albums: GalleryAlbum[];
  galleryItems: GalleryItem[];
  programs: AcademicProgram[];
  downloads: DownloadItem[];
  messages: ContactMessage[];
  auditLogs: AuditLog[];
  users: User[];
  roles: Role[];
  pages: Page[];
  menus: MenuItem[];

  // CRUD Operations
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateSeo: (newSeo: Partial<SeoSettings>) => void;
  
  // Banners
  addBanner: (banner: Omit<BannerSlide, 'id'>) => void;
  updateBanner: (id: number, banner: Partial<BannerSlide>) => void;
  deleteBanner: (id: number) => void;

  // News
  addNews: (item: Omit<NewsItem, 'id' | 'created_at'>) => void;
  updateNews: (id: number, item: Partial<NewsItem>) => void;
  deleteNews: (id: number) => void;
  addNewsCategory: (cat: Omit<NewsCategory, 'id'>) => void;

  // Staff & Depts
  addStaff: (member: Omit<StaffMember, 'id'>) => void;
  updateStaff: (id: number, member: Partial<StaffMember>) => void;
  deleteStaff: (id: number) => void;
  addDepartment: (dept: Omit<Department, 'id'>) => void;

  // Gallery
  addAlbum: (album: Omit<GalleryAlbum, 'id' | 'created_at'>) => void;
  deleteAlbum: (id: number) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: number) => void;

  // Events
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: number, event: Partial<EventItem>) => void;
  deleteEvent: (id: number) => void;

  // Academics & Downloads
  addProgram: (prog: Omit<AcademicProgram, 'id'>) => void;
  updateProgram: (id: number, prog: Partial<AcademicProgram>) => void;
  deleteProgram: (id: number) => void;
  addDownload: (dl: Omit<DownloadItem, 'id' | 'downloads_count' | 'created_at'>) => void;
  deleteDownload: (id: number) => void;

  // Contact Form
  submitContactForm: (msg: Omit<ContactMessage, 'id' | 'reply_status' | 'created_at'>) => void;
  updateMessageStatus: (id: number, status: 'pending' | 'replied' | 'archived', notes?: string) => void;
  deleteMessage: (id: number) => void;

  // Pages & Menus
  addPage: (page: Omit<Page, 'id' | 'updated_at'>) => void;
  updatePage: (id: number, page: Partial<Page>) => void;
  deletePage: (id: number) => void;

  addMenu: (menu: Omit<MenuItem, 'id'>) => void;
  updateMenu: (id: number, menu: Partial<MenuItem>) => void;
  deleteMenu: (id: number) => void;

  // Users & Roles
  addUser: (user: Omit<User, 'id' | 'created_at'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;

  // Audit Logs
  logAction: (action: string, module: string, details: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Helper to init state with localStorage persistence
  const usePersistentState = <T,>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
      const saved = localStorage.getItem(`school_cms_${key}`);
      return saved ? JSON.parse(saved) : initial;
    });

    useEffect(() => {
      localStorage.setItem(`school_cms_${key}`, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
  };

  const [settings, setSettings] = usePersistentState<SiteSettings>('settings', INITIAL_SETTINGS);
  const [seo, setSeo] = usePersistentState<SeoSettings>('seo', INITIAL_SEO);
  const [banners, setBanners] = usePersistentState<BannerSlide[]>('banners', INITIAL_BANNERS);
  const [departments, setDepartments] = usePersistentState<Department[]>('departments', INITIAL_DEPARTMENTS);
  const [staff, setStaff] = usePersistentState<StaffMember[]>('staff', INITIAL_STAFF);
  const [newsCategories, setNewsCategories] = usePersistentState<NewsCategory[]>('news_categories', INITIAL_CATEGORIES);
  const [news, setNews] = usePersistentState<NewsItem[]>('news', INITIAL_NEWS);
  const [events, setEvents] = usePersistentState<EventItem[]>('events', INITIAL_EVENTS);
  const [albums, setAlbums] = usePersistentState<GalleryAlbum[]>('albums', INITIAL_GALLERY_ALBUMS);
  const [galleryItems, setGalleryItems] = usePersistentState<GalleryItem[]>('gallery_items', INITIAL_GALLERY_ITEMS);
  const [programs, setPrograms] = usePersistentState<AcademicProgram[]>('programs', INITIAL_PROGRAMS);
  const [downloads, setDownloads] = usePersistentState<DownloadItem[]>('downloads', INITIAL_DOWNLOADS);
  const [messages, setMessages] = usePersistentState<ContactMessage[]>('messages', INITIAL_MESSAGES);
  const [auditLogs, setAuditLogs] = usePersistentState<AuditLog[]>('audit_logs', INITIAL_AUDIT_LOGS);
  const [users, setUsers] = usePersistentState<User[]>('users', INITIAL_USERS);
  const [roles] = usePersistentState<Role[]>('roles', INITIAL_ROLES);
  const [pages, setPages] = usePersistentState<Page[]>('pages', INITIAL_PAGES);
  const [menus, setMenus] = usePersistentState<MenuItem[]>('menus', INITIAL_MENUS);

  const logAction = (action: string, module: string, details: string) => {
    const newLog: AuditLog = {
      id: Date.now(),
      user_name: "Alexander Wright",
      action,
      module,
      details,
      ip_address: "127.0.0.1",
      created_at: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Site & SEO
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    logAction('UPDATE_SETTINGS', 'Site Settings', 'Updated general site information & social links');
  };

  const updateSeo = (newSeo: Partial<SeoSettings>) => {
    setSeo(prev => ({ ...prev, ...newSeo }));
    logAction('UPDATE_SEO', 'SEO Settings', 'Updated meta tags, OG image & robots.txt');
  };

  // Banners
  const addBanner = (banner: Omit<BannerSlide, 'id'>) => {
    const newId = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
    setBanners(prev => [...prev, { id: newId, ...banner }]);
    logAction('CREATE_BANNER', 'Banners', `Added hero slide: ${banner.title}`);
  };

  const updateBanner = (id: number, banner: Partial<BannerSlide>) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...banner } : b));
    logAction('UPDATE_BANNER', 'Banners', `Updated hero slide #${id}`);
  };

  const deleteBanner = (id: number) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    logAction('DELETE_BANNER', 'Banners', `Deleted hero slide #${id}`);
  };

  // News
  const addNews = (item: Omit<NewsItem, 'id' | 'created_at'>) => {
    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
    const newItem: NewsItem = {
      ...item,
      id: newId,
      created_at: new Date().toISOString()
    };
    setNews(prev => [newItem, ...prev]);
    logAction('CREATE_NEWS', 'News', `Published article: ${item.title}`);
  };

  const updateNews = (id: number, item: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...item } : n));
    logAction('UPDATE_NEWS', 'News', `Updated article #${id}`);
  };

  const deleteNews = (id: number) => {
    setNews(prev => prev.filter(n => n.id !== id));
    logAction('DELETE_NEWS', 'News', `Deleted news article #${id}`);
  };

  const addNewsCategory = (cat: Omit<NewsCategory, 'id'>) => {
    const newId = newsCategories.length > 0 ? Math.max(...newsCategories.map(c => c.id)) + 1 : 1;
    setNewsCategories(prev => [...prev, { id: newId, ...cat }]);
  };

  // Staff
  const addStaff = (member: Omit<StaffMember, 'id'>) => {
    const newId = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1;
    setStaff(prev => [...prev, { id: newId, ...member }]);
    logAction('CREATE_STAFF', 'Staff', `Added faculty member: ${member.name}`);
  };

  const updateStaff = (id: number, member: Partial<StaffMember>) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...member } : s));
    logAction('UPDATE_STAFF', 'Staff', `Updated staff profile #${id}`);
  };

  const deleteStaff = (id: number) => {
    setStaff(prev => prev.filter(s => s.id !== id));
    logAction('DELETE_STAFF', 'Staff', `Removed staff member #${id}`);
  };

  const addDepartment = (dept: Omit<Department, 'id'>) => {
    const newId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
    setDepartments(prev => [...prev, { id: newId, ...dept }]);
  };

  // Gallery
  const addAlbum = (album: Omit<GalleryAlbum, 'id' | 'created_at'>) => {
    const newId = albums.length > 0 ? Math.max(...albums.map(a => a.id)) + 1 : 1;
    setAlbums(prev => [...prev, { id: newId, ...album, created_at: new Date().toISOString() }]);
    logAction('CREATE_ALBUM', 'Gallery', `Created gallery album: ${album.title}`);
  };

  const deleteAlbum = (id: number) => {
    setAlbums(prev => prev.filter(a => a.id !== id));
    setGalleryItems(prev => prev.filter(item => item.album_id !== id));
    logAction('DELETE_ALBUM', 'Gallery', `Deleted gallery album #${id}`);
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newId = galleryItems.length > 0 ? Math.max(...galleryItems.map(g => g.id)) + 1 : 1;
    setGalleryItems(prev => [...prev, { id: newId, ...item }]);
    logAction('ADD_GALLERY_ITEM', 'Gallery', `Added item to album #${item.album_id}`);
  };

  const deleteGalleryItem = (id: number) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  // Events
  const addEvent = (event: Omit<EventItem, 'id'>) => {
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents(prev => [...prev, { id: newId, ...event }]);
    logAction('CREATE_EVENT', 'Events', `Created school event: ${event.title}`);
  };

  const updateEvent = (id: number, event: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...event } : e));
    logAction('UPDATE_EVENT', 'Events', `Updated event #${id}`);
  };

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    logAction('DELETE_EVENT', 'Events', `Deleted event #${id}`);
  };

  // Academics & Downloads
  const addProgram = (prog: Omit<AcademicProgram, 'id'>) => {
    const newId = programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1;
    setPrograms(prev => [...prev, { id: newId, ...prog }]);
  };

  const updateProgram = (id: number, prog: Partial<AcademicProgram>) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, ...prog } : p));
  };

  const deleteProgram = (id: number) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  const addDownload = (dl: Omit<DownloadItem, 'id' | 'downloads_count' | 'created_at'>) => {
    const newId = downloads.length > 0 ? Math.max(...downloads.map(d => d.id)) + 1 : 1;
    setDownloads(prev => [...prev, { id: newId, ...dl, downloads_count: 0, created_at: new Date().toISOString().split('T')[0] }]);
    logAction('ADD_DOWNLOAD', 'Downloads', `Uploaded document: ${dl.title}`);
  };

  const deleteDownload = (id: number) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
    logAction('DELETE_DOWNLOAD', 'Downloads', `Deleted file #${id}`);
  };

  // Contact
  const submitContactForm = (msg: Omit<ContactMessage, 'id' | 'reply_status' | 'created_at'>) => {
    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    setMessages(prev => [{
      id: newId,
      ...msg,
      reply_status: 'pending',
      created_at: new Date().toISOString()
    }, ...prev]);
  };

  const updateMessageStatus = (id: number, status: 'pending' | 'replied' | 'archived', notes?: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, reply_status: status, admin_notes: notes ?? m.admin_notes } : m));
    logAction('UPDATE_MESSAGE', 'Contact Messages', `Updated status of message #${id} to ${status}`);
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Pages & Menus
  const addPage = (page: Omit<Page, 'id' | 'updated_at'>) => {
    const newId = pages.length > 0 ? Math.max(...pages.map(p => p.id)) + 1 : 1;
    setPages(prev => [...prev, { id: newId, ...page, updated_at: new Date().toISOString().split('T')[0] }]);
  };

  const updatePage = (id: number, page: Partial<Page>) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, ...page, updated_at: new Date().toISOString().split('T')[0] } : p));
  };

  const deletePage = (id: number) => {
    setPages(prev => prev.filter(p => p.id !== id));
  };

  const addMenu = (menu: Omit<MenuItem, 'id'>) => {
    const newId = menus.length > 0 ? Math.max(...menus.map(m => m.id)) + 1 : 1;
    setMenus(prev => [...prev, { id: newId, ...menu }]);
  };

  const updateMenu = (id: number, menu: Partial<MenuItem>) => {
    setMenus(prev => prev.map(m => m.id === id ? { ...m, ...menu } : m));
  };

  const deleteMenu = (id: number) => {
    setMenus(prev => prev.filter(m => m.id !== id));
  };

  // Users
  const addUser = (user: Omit<User, 'id' | 'created_at'>) => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers(prev => [...prev, { id: newId, ...user, created_at: new Date().toISOString() }]);
    logAction('CREATE_USER', 'User Management', `Created user account: ${user.email}`);
  };

  const updateUser = (id: number, user: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...user } : u));
    logAction('UPDATE_USER', 'User Management', `Updated user account #${id}`);
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    logAction('DELETE_USER', 'User Management', `Deleted user account #${id}`);
  };

  return (
    <SiteContext.Provider value={{
      settings, seo, banners, departments, staff, newsCategories, news, events,
      albums, galleryItems, programs, downloads, messages, auditLogs, users, roles, pages, menus,
      updateSettings, updateSeo, addBanner, updateBanner, deleteBanner, addNews, updateNews, deleteNews, addNewsCategory,
      addStaff, updateStaff, deleteStaff, addDepartment, addAlbum, deleteAlbum, addGalleryItem, deleteGalleryItem,
      addEvent, updateEvent, deleteEvent, addProgram, updateProgram, deleteProgram, addDownload, deleteDownload,
      submitContactForm, updateMessageStatus, deleteMessage, addPage, updatePage, deletePage, addMenu, updateMenu, deleteMenu,
      addUser, updateUser, deleteUser, logAction
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
