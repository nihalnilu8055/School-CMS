import React from 'react';
import { useSite } from '../../context/SiteContext';
import { NewsItem } from '../../types';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface NewsSectionProps {
  setCurrentTab: (tab: string) => void;
  onSelectNewsItem: (item: NewsItem) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ setCurrentTab, onSelectNewsItem }) => {
  const { news } = useSite();
  const latestNews = news.filter(n => n.status === 'published').slice(0, 5);

  return (
    <section className="py-20 bg-[#F5F8FC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#12355B] text-xs font-bold uppercase tracking-wider mb-3 shadow-subtle">
              <Newspaper className="w-3.5 h-3.5 text-[#C9A227]" />
              Latest Campus Stories
            </div>
            <h2 className="text-3xl font-bold font-heading text-[#12355B]">
              News & Announcements
            </h2>
          </div>
          <button
            onClick={() => { setCurrentTab('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-[#1F5F8B] hover:text-[#12355B] font-semibold text-sm group"
          >
            <span>View All News Articles</span>
            <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Article (Left 7 Cols) */}
          {latestNews[0] && (
            <div 
              onClick={() => onSelectNewsItem(latestNews[0])}
              className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative h-72 sm:h-80 overflow-hidden bg-[#F5F8FC]">
                <SafeImage 
                  src={latestNews[0].featured_image} 
                  alt={latestNews[0].title}
                  type="news"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#12355B] text-white text-xs font-semibold px-3.5 py-1 rounded-full border border-[#C9A227]/40 shadow-sm">
                  {latestNews[0].category_name || 'Featured'}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A227]">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>{new Date(latestNews[0].publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#12355B] group-hover:text-[#1F5F8B] transition">
                    {latestNews[0].title}
                  </h3>
                  <p className="text-[#5B6775] text-sm leading-relaxed line-clamp-3">
                    {latestNews[0].excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#12355B] flex items-center gap-1 group-hover:text-[#1F5F8B]">
                    Read Full Story <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary 4 Articles List (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {latestNews.slice(1, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNewsItem(item)}
                className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#F5F8FC]">
                  <SafeImage
                    src={item.featured_image}
                    alt={item.title}
                    type="news"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1F5F8B] uppercase tracking-wide">
                    {item.category_name || 'News'}
                  </span>
                  <h4 className="text-sm font-bold font-heading text-[#12355B] line-clamp-2 group-hover:text-[#1F5F8B] transition leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#5B6775] pt-0.5">
                    <Calendar className="w-3 h-3 text-[#C9A227]" />
                    <span>{new Date(item.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
