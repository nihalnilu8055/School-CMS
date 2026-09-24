import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SafeImage } from '../common/SafeImage';
import { 
  Menu, Sun, Moon, Globe, Bell, Shield, 
  User, Key, LogOut, CheckCircle2 
} from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onNavigatePublic: () => void;
  onOpenProfile: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  onNavigatePublic,
  onOpenProfile
}) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            CMS Management Console
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* View Public Website */}
        <button
          onClick={onNavigatePublic}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-school-50 dark:bg-slate-800 text-school-600 dark:text-school-400 font-semibold text-xs hover:bg-school-100 dark:hover:bg-slate-700 transition"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>View Live Site</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          title="Toggle Dark / Light Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 z-50 animate-fadeIn">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">System Notifications</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                  <p className="font-semibold text-slate-900 dark:text-white">New Contact Submission</p>
                  <p className="text-slate-500">Jonathan Miller submitted a Grade 9 Inquiry.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
                  <p className="font-semibold text-slate-900 dark:text-white">STEM Article Published</p>
                  <p className="text-slate-500">Geneva STEM Innovation news is live.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <SafeImage
              src={user?.avatar_url || "/images/staff3.jpg"}
              alt="Avatar"
              type="person"
              className="w-8 h-8 rounded-full object-cover border border-school-500"
            />
            <span className="hidden md:block text-xs font-bold text-slate-900 dark:text-white">{user?.name || "Admin"}</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 space-y-1 z-50 animate-fadeIn">
              <button
                onClick={() => { setShowUserMenu(false); onOpenProfile(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                <User className="w-4 h-4 text-school-500" />
                <span>My Profile Settings</span>
              </button>
              <button
                onClick={() => { setShowUserMenu(false); logout(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
