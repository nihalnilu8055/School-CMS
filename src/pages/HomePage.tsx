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
      <section className="bg-[#032f23] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">Admissions 2026</p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-white mt-1">A calm, trusted place for your child to grow.</h2>
          </div>
          <button
            onClick={onOpenAdmissionModal}
            className="w-full md:w-auto shrink-0 bg-white text-[#032f23] font-semibold px-6 py-3.5 rounded-xl"
          >
            Apply for Admissions 2026
          </button>
        </div>
      </section>
      <PartnersSection />
    </div>
  );
};
