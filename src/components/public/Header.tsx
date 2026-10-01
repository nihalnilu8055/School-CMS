import React, { useEffect, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Phone, Mail, Clock, Search, Menu, X, Bell,
  GraduationCap, ChevronDown, ChevronRight, Sparkles
} from 'lucide-react';
import { SafeImage } from '../common/SafeImage';
import { NAV_GROUPS, isNavActive, menusToNavGroups } from '../../data/navigation';
import { getUnseenNotices } from '../../utils/notices';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAdmissionModal: () => void;
}

const isNoticesNav = (key: string, label?: string) =>
  key === 'notices' || key.startsWith('notices/') || (label || '').toLowerCase().includes('notice');

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, onOpenAdmissionModal }) => {
  const { settings, pages, menus, content, notices } = useSite();
  const [unseenCount, setUnseenCount] = useState(0);
  const cmsGroups = menusToNavGroups(menus);
  const baseGroups = cmsGroups.length ? cmsGroups : NAV_GROUPS;
  const reservedNav = new Set([
    ...baseGroups.flatMap((group) => [group.key, ...(group.children?.map((child) => child.key) || [])]),
    'home', 'admin', 'news', 'staff', 'gallery', 'academics', 'contact', 'news_detail', 'about/facilities', 'alumni/our-alumni',
  ]);
  const extraPages = pages.filter((page) => page.is_published && !reservedNav.has(page.slug));
  const navGroups = extraPages.length
    ? [...baseGroups, { key: 'more', label: 'More Pages', children: extraPages.map((page) => ({ key: page.slug, label: page.title })) }]
    : baseGroups;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const refresh = () => setUnseenCount(getUnseenNotices(notices).length);
    refresh();
    window.addEventListener('school-notices-seen', refresh);
    return () => window.removeEventListener('school-notices-seen', refresh);
  }, [notices, currentTab]);

  const handleNavClick = (tabKey: string) => {
    setCurrentTab(tabKey);
    setMobileMenuOpen(false);
    setOpenGroup(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-subtle">
      <div className="bg-[#032f23] text-white text-[11px] sm:text-xs py-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 min-w-0">
            <span className="flex items-center gap-1.5 truncate">
              <Phone className="w-3.5 h-3.5 text-white/70 shrink-0" />
              <span className="truncate">{settings.phone.split('/')[0]}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 min-w-0">
              <Mail className="w-3.5 h-3.5 text-white/70 shrink-0" />
              <span className="truncate">{settings.email}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white/70" />
              {settings.working_hours}
            </span>
            <button
              type="button"
              onClick={() => handleNavClick('notices')}
              className="relative p-1.5 rounded-lg hover:bg-white/10"
              aria-label={unseenCount ? `${unseenCount} new notices` : 'Notices'}
            >
              <Bell className="w-4 h-4 text-white" />
              {unseenCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-red-500 text-[9px] font-bold leading-[14px] text-white text-center">
                  {unseenCount > 9 ? '9+' : unseenCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-[#c5d5ce]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          <div onClick={() => handleNavClick('home')} className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#032f23] flex items-center justify-center border border-[#054433] shrink-0 overflow-hidden">
              {settings.logo_url ? (
                <SafeImage src={settings.logo_url} alt={settings.school_name} type="building" className="w-full h-full object-cover" />
              ) : (
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg xl:text-xl font-bold font-heading text-[#032f23] leading-tight line-clamp-2 sm:truncate">
                {settings.school_name}
              </h1>
              <p className="hidden xs:block sm:block text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-1">
                {settings.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button onClick={() => setShowSearchModal(true)} className="p-2 sm:p-2.5 text-[#032f23] hover:bg-[#e8f0ed] rounded-xl">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenAdmissionModal}
              className="inline-flex items-center gap-1.5 bg-[#032f23] hover:bg-[#054433] text-white font-semibold text-xs sm:text-sm px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="sm:hidden">Apply</span>
              <span className="hidden sm:inline">{content.admissions_cta_label || 'Apply for Admissions'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 sm:p-2.5 rounded-xl bg-[#e8f0ed] text-[#032f23] border border-[#c5d5ce]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden xl:block bg-[#032f23]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-flow-col auto-cols-fr">
          {navGroups.map((group, index) => {
            const active = isNavActive(currentTab, group);
            const hasChildren = Boolean(group.children?.length);
            return (
              <div
                key={group.key}
                className={`relative ${index !== 0 ? 'border-l border-white/15' : ''}`}
                onMouseEnter={() => setOpenGroup(group.key)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  onClick={() => handleNavClick(group.key)}
                  className={`w-full min-h-12 px-2 py-2 flex items-center justify-center gap-1 text-[12px] 2xl:text-[13px] font-semibold text-center leading-snug ${
                    active ? 'bg-[#054433] text-white' : 'text-white hover:bg-[#054433]'
                  }`}
                >
                  <span className="relative inline-flex items-center pr-1">
                    {group.label}
                    {unseenCount > 0 && isNoticesNav(group.key, group.label) && (
                      <span className="absolute -top-2 -right-3 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[9px] font-bold leading-none text-white">
                        {unseenCount > 9 ? '9+' : unseenCount}
                      </span>
                    )}
                  </span>
                  {hasChildren && <ChevronDown className="w-3.5 h-3.5 shrink-0 text-white/70" />}
                </button>
                {openGroup === group.key && hasChildren && (
                  <div className="absolute left-0 right-0 top-full z-50">
                    <div className="bg-white border border-[#c5d5ce] shadow-card-hover py-2 min-w-full">
                      {group.children?.map((child) => (
                        <button
                          key={child.key}
                          onClick={() => handleNavClick(child.key)}
                          className={`w-full text-left px-4 py-2.5 text-sm ${
                            currentTab === child.key
                              ? 'bg-[#e8f0ed] text-[#032f23] font-semibold'
                              : 'text-slate-700 hover:bg-[#e8f0ed] hover:text-[#032f23]'
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#c5d5ce] px-3 sm:px-4 pt-2 pb-6 max-h-[75vh] overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.key} className="border-b border-[#d7e3de] pb-1">
              <div className="flex items-center">
                <button
                  onClick={() => handleNavClick(group.key)}
                  className="flex-1 px-3 py-3 rounded-xl text-left font-semibold text-[#032f23] inline-flex items-center gap-2"
                >
                  {group.label}
                  {unseenCount > 0 && isNoticesNav(group.key, group.label) && (
                    <span className="inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[9px] font-bold leading-none text-white">
                      {unseenCount > 9 ? '9+' : unseenCount}
                    </span>
                  )}
                </button>
                {group.children?.length ? (
                  <button
                    onClick={() => setOpenGroup(openGroup === group.key ? null : group.key)}
                    className="p-3 text-[#032f23]"
                    aria-label={`Show ${group.label} pages`}
                  >
                    <ChevronRight className={`w-4 h-4 transition ${openGroup === group.key ? 'rotate-90' : ''}`} />
                  </button>
                ) : null}
              </div>
              {openGroup === group.key && group.children?.map((child) => (
                <button
                  key={child.key}
                  onClick={() => handleNavClick(child.key)}
                  className="w-full text-left pl-6 pr-3 py-2.5 text-sm text-slate-600 hover:bg-[#e8f0ed] rounded-xl"
                >
                  {child.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-[#032f23]/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#c5d5ce] overflow-hidden">
            <div className="p-4 border-b border-[#c5d5ce] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#054433] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices, admissions, curriculum..."
                className="w-full outline-none text-slate-800 text-base"
                autoFocus
              />
              <button onClick={() => setShowSearchModal(false)} className="p-1 rounded-lg hover:bg-[#e8f0ed]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-3">
              <button onClick={() => { handleNavClick('notices'); setShowSearchModal(false); }} className="w-full text-left p-3 rounded-xl hover:bg-[#e8f0ed]">
                <p className="font-semibold text-[#032f23] text-sm">Urgent Notices</p>
                <p className="text-xs text-slate-500">General and fee circulars</p>
              </button>
              <button onClick={() => { handleNavClick('about/mission'); setShowSearchModal(false); }} className="w-full text-left p-3 rounded-xl hover:bg-[#e8f0ed]">
                <p className="font-semibold text-[#032f23] text-sm">Mission & Vision</p>
                <p className="text-xs text-slate-500">School philosophy</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
