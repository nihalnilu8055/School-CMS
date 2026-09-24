import React from 'react';
import { SafeImage } from '../common/SafeImage';
import { 
  LayoutDashboard, Menu as MenuIcon, FileText, Image as ImageIcon, 
  Newspaper, Users, BookOpen, Download, Mail, Settings, 
  Search, ShieldAlert, Sliders, HardDrive, History, LogOut, GraduationCap, X, Calendar 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeModule,
  setActiveModule,
  isOpen,
  setIsOpen,
  onLogout
}) => {
  const { user } = useAuth();

  const menuGroups = [
    {
      title: "Core Operations",
      items: [
        { key: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { key: 'banners', label: 'Hero Banner Slider', icon: ImageIcon },
        { key: 'news', label: 'News Management', icon: Newspaper },
        { key: 'events', label: 'Events Calendar', icon: Calendar },
        { key: 'gallery', label: 'Gallery & Albums', icon: ImageIcon },
      ]
    },
    {
      title: "School Directory",
      items: [
        { key: 'staff', label: 'Staff & Teachers', icon: Users },
        { key: 'academics', label: 'Academic Programs', icon: BookOpen },
        { key: 'downloads', label: 'PDF & Downloads', icon: Download },
        { key: 'messages', label: 'Contact Submissions', icon: Mail },
      ]
    },
    {
      title: "Site Administration",
      items: [
        { key: 'pages', label: 'Page Management', icon: FileText },
        { key: 'menus', label: 'Menu Management', icon: MenuIcon },
        { key: 'media', label: 'Media Manager', icon: HardDrive },
        { key: 'seo', label: 'SEO Settings', icon: Search },
        { key: 'settings', label: 'Site Settings', icon: Settings },
        { key: 'users', label: 'User Accounts', icon: Users },
        { key: 'roles', label: 'Roles & Permissions', icon: ShieldAlert },
        { key: 'logs', label: 'Audit Logs', icon: History },
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-[#12355B]/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#12355B] text-white border-r border-[#0D2A47] flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Brand Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center border border-[#C9A227]">
              <GraduationCap className="w-5 h-5 text-[#12355B]" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-white leading-tight">Apex Admin</h2>
              <span className="text-[11px] text-[#C9A227] font-bold uppercase tracking-wide">CMS Control Panel</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 text-[#D8E2EC] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Modules List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <h3 className="px-3 text-[11px] font-extrabold uppercase text-[#C9A227] tracking-wider">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.key;

                  return (
                    <button
                      key={item.key}
                      onClick={() => { setActiveModule(item.key); setIsOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                        isActive
                          ? 'bg-[#1F5F8B] text-white shadow-sm border-l-4 border-[#C9A227]'
                          : 'text-[#D8E2EC] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A227]' : 'text-[#D8E2EC]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Footer info & Logout */}
        <div className="p-4 border-t border-white/10 bg-[#0D2A47] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <SafeImage
              src={user?.avatar_url || "/images/staff3.jpg"}
              alt={user?.name || "User"}
              type="person"
              className="w-9 h-9 rounded-full object-cover border border-[#C9A227] shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || "Alexander Wright"}</p>
              <p className="text-[10px] text-[#C9A227] font-semibold truncate">{user?.role || "Super Admin"}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-[#D8E2EC] hover:text-[#C9A227] hover:bg-white/10 rounded-lg transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </aside>
    </>
  );
};
