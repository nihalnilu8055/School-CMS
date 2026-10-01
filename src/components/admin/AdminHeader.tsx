import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import { SafeImage } from '../common/SafeImage';
import { Menu, Globe, Bell, User, LogOut, Mail, Newspaper, Megaphone } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onNavigatePublic: () => void;
  onOpenProfile: () => void;
  onNavigateModule: (module: string) => void;
}

type HeaderPanel = 'notifications' | 'user' | null;

const formatWhen = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  onNavigatePublic,
  onOpenProfile,
  onNavigateModule,
}) => {
  const { user, logout } = useAuth();
  const { messages, news, notices } = useSite();
  const [openPanel, setOpenPanel] = useState<HeaderPanel>(null);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const clusterRef = useRef<HTMLDivElement>(null);

  const notifications = useMemo(() => {
    const contactItems = [...messages]
      .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
      .slice(0, 4)
      .map((item) => ({
        id: `message-${item.id}`,
        title: item.reply_status === 'pending' ? 'New contact submission' : 'Contact message',
        detail: `${item.name} — ${item.subject}`,
        time: item.created_at,
        module: 'messages',
        unread: item.reply_status === 'pending',
        icon: Mail,
      }));

    const newsItems = news
      .filter((item) => item.status === 'published')
      .slice(0, 2)
      .map((item) => ({
        id: `news-${item.id}`,
        title: 'News article published',
        detail: item.title,
        time: item.publish_date || item.created_at,
        module: 'news',
        unread: false,
        icon: Newspaper,
      }));

    const noticeItems = notices
      .filter((item) => item.status === 'published')
      .slice(0, 2)
      .map((item) => ({
        id: `notice-${item.id}`,
        title: item.is_pinned ? 'Pinned notice' : 'Notice published',
        detail: item.title,
        time: item.release_date || item.created_at,
        module: 'notices',
        unread: Boolean(item.is_urgent || item.priority === 'Urgent'),
        icon: Megaphone,
      }));

    return [...contactItems, ...newsItems, ...noticeItems]
      .sort((a, b) => Number(b.unread) - Number(a.unread) || (b.time || '').localeCompare(a.time || ''))
      .slice(0, 6);
  }, [messages, news, notices]);

  const unreadCount = notifications.filter((item) => item.unread && !seenIds.includes(item.id)).length;

  const closePanel = () => setOpenPanel(null);

  const togglePanel = (panel: HeaderPanel) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  useEffect(() => {
    if (!openPanel) return;

    const onPointerDown = (event: MouseEvent) => {
      if (clusterRef.current && !clusterRef.current.contains(event.target as Node)) {
        closePanel();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openPanel]);

  const openNotification = (module: string, id: string) => {
    setSeenIds((current) => (current.includes(id) ? current : [...current, id]));
    closePanel();
    onNavigateModule(module);
  };

  return (
    <header className="h-16 bg-white border-b border-[#c5d5ce] px-6 flex items-center justify-between sticky top-0 z-40">
      {openPanel && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-slate-900/10 cursor-default"
          onClick={closePanel}
        />
      )}

      <div className="flex items-center gap-4 relative z-50">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-[#032f23] hover:bg-[#e8f0ed] rounded-xl transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold font-heading text-[#032f23]">
          CMS Management Console
        </h1>
      </div>

      <div ref={clusterRef} className="relative z-50 flex items-center gap-3">
        <button
          onClick={onNavigatePublic}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#e8f0ed] text-[#032f23] font-semibold text-xs hover:bg-[#d1fae5] border border-[#c5d5ce]"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>View Live Site</span>
        </button>

        <div className="relative">
          <button
            type="button"
            aria-expanded={openPanel === 'notifications'}
            aria-haspopup="dialog"
            onClick={() => togglePanel('notifications')}
            className={`p-2 rounded-xl relative ${
              openPanel === 'notifications' ? 'bg-[#e8f0ed] text-[#032f23]' : 'text-[#032f23] hover:bg-[#e8f0ed]'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {openPanel === 'notifications' && (
            <div className="absolute right-0 mt-2 w-[22rem] bg-white rounded-2xl shadow-2xl border border-[#c5d5ce] overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[#c5d5ce] flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#032f23] uppercase tracking-wider">System notifications</h4>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold text-[#054433] bg-[#e8f0ed] px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {notifications.length === 0 && (
                  <p className="px-3 py-8 text-center text-xs text-slate-500">No notifications yet.</p>
                )}
                {notifications.map((item) => {
                  const Icon = item.icon;
                  const isUnread = item.unread && !seenIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openNotification(item.module, item.id)}
                      className={`w-full text-left p-3 rounded-xl flex items-start gap-3 ${
                        isUnread ? 'bg-[#e8f0ed]' : 'hover:bg-[#f8fafc]'
                      }`}
                    >
                      <span className="mt-0.5 w-8 h-8 rounded-xl bg-white border border-[#c5d5ce] text-[#032f23] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-[#032f23]">{item.title}</span>
                          {isUnread && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
                        </span>
                        <span className="block text-xs text-slate-500 mt-0.5 line-clamp-2">{item.detail}</span>
                        <span className="block text-[10px] text-slate-400 mt-1">{formatWhen(item.time)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-[#c5d5ce] p-2">
                <button
                  type="button"
                  onClick={() => { closePanel(); onNavigateModule('messages'); }}
                  className="w-full text-center text-xs font-semibold text-[#032f23] hover:bg-[#e8f0ed] rounded-xl py-2"
                >
                  Open contact submissions
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            aria-expanded={openPanel === 'user'}
            aria-haspopup="menu"
            onClick={() => togglePanel('user')}
            className={`flex items-center gap-2 p-1.5 rounded-xl ${
              openPanel === 'user' ? 'bg-[#e8f0ed]' : 'hover:bg-[#e8f0ed]'
            }`}
          >
            <SafeImage
              src={user?.avatar_url || '/images/staff3.jpg'}
              alt="Avatar"
              type="person"
              className="w-8 h-8 rounded-full object-cover border border-[#054433]"
            />
            <span className="hidden md:block text-xs font-bold text-[#032f23]">{user?.name || 'Admin'}</span>
          </button>

          {openPanel === 'user' && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#c5d5ce] p-2 z-50">
              <button
                type="button"
                onClick={() => { closePanel(); onOpenProfile(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#032f23] hover:bg-[#e8f0ed] rounded-xl"
              >
                <User className="w-4 h-4" />
                My Profile Settings
              </button>
              <button
                type="button"
                onClick={() => { closePanel(); logout(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                Logout Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
