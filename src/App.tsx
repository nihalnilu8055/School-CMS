import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import { Header } from './components/public/Header';
import { Footer } from './components/public/Footer';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { StaffPage } from './pages/StaffPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdmissionModal } from './components/public/AdmissionModal';
import { NewsItem } from './types';

const getTabFromPath = (): string => {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('admin')) return 'admin';
  if (path.includes('about')) return 'about';
  if (path.includes('academics')) return 'academics';
  if (path.includes('staff')) return 'staff';
  if (path.includes('news')) return 'news';
  if (path.includes('gallery')) return 'gallery';
  if (path.includes('contact')) return 'contact';
  return 'home';
};

const MainAppContent: React.FC = () => {
  const [currentTab, setCurrentTabState] = useState<string>(getTabFromPath());
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  const navigateTab = (tab: string) => {
    setCurrentTabState(tab);
    let targetPath = '/';
    if (tab === 'admin') targetPath = '/admin';
    else if (tab !== 'home' && tab !== 'news_detail') targetPath = `/${tab}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentTabState(getTabFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectNewsItem = (item: NewsItem) => {
    setSelectedNewsItem(item);
    navigateTab('news_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomePage
            setCurrentTab={navigateTab}
            onSelectNewsItem={handleSelectNewsItem}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        );
      case 'about':
        return <AboutUsPage />;
      case 'academics':
        return <AcademicsPage />;
      case 'staff':
        return <StaffPage />;
      case 'news':
        return <NewsPage onSelectNewsItem={handleSelectNewsItem} />;
      case 'news_detail':
        return selectedNewsItem ? (
          <NewsDetailPage
            newsItem={selectedNewsItem}
            onBack={() => navigateTab('news')}
          />
        ) : (
          <NewsPage onSelectNewsItem={handleSelectNewsItem} />
        );
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        if (isAuthenticated) {
          return <AdminDashboardPage onNavigatePublic={() => navigateTab('home')} />;
        }
        return (
          <AdminLoginPage
            onSuccessLogin={() => navigateTab('admin')}
            onNavigatePublic={() => navigateTab('home')}
          />
        );
      default:
        return (
          <HomePage
            setCurrentTab={navigateTab}
            onSelectNewsItem={handleSelectNewsItem}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        );
    }
  };

  const isFullAdminView = currentTab === 'admin' && isAuthenticated;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {!isFullAdminView && (
        <Header
          currentTab={currentTab}
          setCurrentTab={navigateTab}
          onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
        />
      )}

      <main className="flex-1">
        {renderContent()}
      </main>

      {!isFullAdminView && (
        <Footer setCurrentTab={navigateTab} />
      )}

      <AdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SiteProvider>
          <MainAppContent />
        </SiteProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
