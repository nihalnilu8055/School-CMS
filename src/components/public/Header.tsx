import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Phone, Mail, MapPin, Clock, Search, Menu, X, 
  GraduationCap, UserCheck, ShieldCheck, ChevronRight, Sparkles, Sun, Moon 
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAdmissionModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, onOpenAdmissionModal }) => {
  const { settings, menus } = useSite();
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleNavClick = (tabKey: string) => {
    setCurrentTab(tabKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-subtle transition-colors">
      {/* Top Utility Bar - Deep Academic Navy */}
      <div className="bg-[#12355B] text-white text-xs py-2 px-4 border-b border-[#0D2A47]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="flex items-center gap-1.5 hover:text-[#C9A227] transition">
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              {settings.phone.split('/')[0]}
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#C9A227] transition hidden md:flex">
              <Mail className="w-3.5 h-3.5 text-[#C9A227]" />
              {settings.email}
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#C9A227] transition hidden lg:flex">
              <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
              Mon - Fri: 8:00 AM - 4:30 PM
            </span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1F5F8B] text-white hover:bg-[#0D2A47] transition font-medium text-[11px] cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-[#C9A227]" /> : <Moon className="w-3.5 h-3.5 text-white" />}
              <span className="hidden sm:inline">{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header - Pure White */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-[#12355B] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center border border-[#C9A227]">
            <GraduationCap className="w-6 h-6 text-[#C9A227]" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-[#12355B] tracking-tight leading-tight group-hover:text-[#1F5F8B] transition">
              {settings.school_name.split('&')[0]}
            </h1>
            <p className="text-xs text-[#5B6775] font-medium tracking-wide">
              {settings.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { key: 'home', label: 'Home' },
            { key: 'about', label: 'About Us' },
            { key: 'academics', label: 'Academics' },
            { key: 'staff', label: 'Staff' },
            { key: 'news', label: 'News' },
            { key: 'gallery', label: 'Gallery' },
            { key: 'contact', label: 'Contact' },
          ].map((nav) => {
            const isActive = currentTab === nav.key;
            return (
              <button
                key={nav.key}
                onClick={() => handleNavClick(nav.key)}
                className={`relative px-3.5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isActive 
                    ? 'text-[#12355B] bg-[#F5F8FC] font-bold border-b-2 border-[#C9A227]' 
                    : 'text-[#12355B] hover:text-[#1F5F8B] hover:bg-[#F5F8FC]'
                }`}
              >
                {nav.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Search & Admissions CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setShowSearchModal(true)}
            className="p-2 text-[#5B6775] hover:text-[#12355B] hover:bg-[#F5F8FC] rounded-lg transition"
            title="Search site"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={onOpenAdmissionModal}
            className="flex items-center gap-2 bg-[#12355B] hover:bg-[#0D2A47] text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            Admissions 2026-27
          </button>
        </div>

        {/* Mobile Menu Toggle button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setShowSearchModal(true)}
            className="p-2 text-[#5B6775] rounded-lg"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#F5F8FC] text-[#12355B] border border-[#E2E8F0]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {[
            { key: 'home', label: 'Home' },
            { key: 'about', label: 'About Us' },
            { key: 'academics', label: 'Academics' },
            { key: 'staff', label: 'Staff' },
            { key: 'news', label: 'News' },
            { key: 'gallery', label: 'Gallery' },
            { key: 'contact', label: 'Contact' },
          ].map((nav) => (
            <button
              key={nav.key}
              onClick={() => handleNavClick(nav.key)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-left text-base ${
                currentTab === nav.key
                  ? 'bg-[#12355B] text-white font-semibold border-l-4 border-[#C9A227]'
                  : 'text-[#17202A] hover:bg-[#F5F8FC]'
              }`}
            >
              <span>{nav.label}</span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmissionModal(); }}
              className="w-full flex items-center justify-center gap-2 bg-[#12355B] hover:bg-[#0D2A47] text-white font-semibold py-3 rounded-xl shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              Apply for Admissions 2026
            </button>
          </div>
        </div>
      )}

      {/* Search Modal Dialog */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-[#12355B]/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#1F5F8B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news, staff, programs, events..."
                className="w-full bg-transparent outline-none text-[#17202A] placeholder-[#5B6775] text-base"
                autoFocus
              />
              <button 
                onClick={() => setShowSearchModal(false)}
                className="p-1 rounded-lg hover:bg-[#F5F8FC] text-[#5B6775]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-80 overflow-y-auto">
              {searchQuery.trim() === '' ? (
                <div className="text-center text-[#5B6775] py-6 text-sm">
                  Type any keyword to search across school articles, faculty, and programs.
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[#5B6775] uppercase tracking-wider">Suggestions</p>
                  <button 
                    onClick={() => { handleNavClick('academics'); setShowSearchModal(false); }} 
                    className="w-full text-left p-3 rounded-xl hover:bg-[#F5F8FC] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-[#12355B] text-sm">AP High School & Science Electives</p>
                      <p className="text-xs text-[#5B6775]">Academics & Curriculum</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#5B6775]" />
                  </button>
                  <button 
                    onClick={() => { handleNavClick('news'); setShowSearchModal(false); }} 
                    className="w-full text-left p-3 rounded-xl hover:bg-[#F5F8FC] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-[#12355B] text-sm">International STEM Challenge 2026</p>
                      <p className="text-xs text-slate-500">Latest News Article</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#5B6775]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
