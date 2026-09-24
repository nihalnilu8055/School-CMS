import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { DashboardOverview } from '../components/admin/DashboardOverview';
import { BannerManager } from '../components/admin/BannerManager';
import { NewsManager } from '../components/admin/NewsManager';
import { StaffManager } from '../components/admin/StaffManager';
import { GalleryManager } from '../components/admin/GalleryManager';
import { EventsManager } from '../components/admin/EventsManager';
import { AcademicManager } from '../components/admin/AcademicManager';
import { DownloadsManager } from '../components/admin/DownloadsManager';
import { MessagesManager } from '../components/admin/MessagesManager';
import { SettingsManager } from '../components/admin/SettingsManager';
import { MediaManager } from '../components/admin/MediaManager';
import { SeoManager } from '../components/admin/SeoManager';
import { UserManager } from '../components/admin/UserManager';
import { RoleManager } from '../components/admin/RoleManager';
import { AuditLogsView } from '../components/admin/AuditLogsView';
import { MenuManager } from '../components/admin/MenuManager';
import { PageManager } from '../components/admin/PageManager';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardPageProps {
  onNavigatePublic: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigatePublic }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardOverview setActiveModule={setActiveModule} />;
      case 'banners':
        return <BannerManager />;
      case 'news':
        return <NewsManager />;
      case 'staff':
        return <StaffManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'events':
        return <EventsManager />;
      case 'academics':
        return <AcademicManager />;
      case 'downloads':
        return <DownloadsManager />;
      case 'messages':
        return <MessagesManager />;
      case 'settings':
        return <SettingsManager />;
      case 'media':
        return <MediaManager />;
      case 'seo':
        return <SeoManager />;
      case 'users':
        return <UserManager />;
      case 'roles':
        return <RoleManager />;
      case 'logs':
        return <AuditLogsView />;
      case 'menus':
        return <MenuManager />;
      case 'pages':
        return <PageManager />;
      default:
        return <DashboardOverview setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex transition-colors">
      
      {/* Admin Sidebar */}
      <AdminSidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onLogout={logout}
      />

      {/* Main Container */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNavigatePublic={onNavigatePublic}
          onOpenProfile={() => setActiveModule('users')}
        />

        <main className="p-6 sm:p-8 flex-1">
          {renderModule()}
        </main>

      </div>

    </div>
  );
};
