import React from 'react';
import { HeroSlider } from '../components/public/HeroSlider';
import { WelcomeSection } from '../components/public/WelcomeSection';
import { HighlightsStats } from '../components/public/HighlightsStats';
import { NewsSection } from '../components/public/NewsSection';
import { EventsSection } from '../components/public/EventsSection';
import { PhotoGalleryPreview } from '../components/public/PhotoGalleryPreview';
import { TestimonialsSection } from '../components/public/TestimonialsSection';
import { PartnersSection } from '../components/public/PartnersSection';
import { NewsItem } from '../types';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  onSelectNewsItem: (item: NewsItem) => void;
  onOpenAdmissionModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  setCurrentTab, 
  onSelectNewsItem, 
  onOpenAdmissionModal 
}) => {
  return (
    <div className="space-y-0">
      <HeroSlider setCurrentTab={setCurrentTab} onOpenAdmissionModal={onOpenAdmissionModal} />
      <WelcomeSection setCurrentTab={setCurrentTab} />
      <HighlightsStats />
      <NewsSection setCurrentTab={setCurrentTab} onSelectNewsItem={onSelectNewsItem} />
      <EventsSection setCurrentTab={setCurrentTab} />
      <PhotoGalleryPreview setCurrentTab={setCurrentTab} />
      <TestimonialsSection />
      <PartnersSection />
    </div>
  );
};
