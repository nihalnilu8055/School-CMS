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
  const { news, content } = useSite();
  const latestNews = news.filter((n) => n.status === 'published').slice(0, 3);

  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f0eb] border border-[#E2E8F0] text-[#005530] text-xs font-bold uppercase tracking-wider mb-3 shadow-subtle">
              <Newspaper className="w-3.5 h-3.5 text-[#005530]" />
              {content.news_home_eyebrow}
            </div>
            <h2 className="text-3xl font-bold font-heading text-[#005530]">
              {content.news_home_heading}
            </h2>
          </div>
          <button
            onClick={() => { setCurrentTab('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-[#004428] hover:text-[#005530] font-semibold text-sm group"
          >
            <span>View all stories</span>
            <ArrowRight className="w-4 h-4 text-[#005530] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectNewsItem(item)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all text-left flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-[#e6f0eb]">
                <SafeImage
                  src={item.featured_image}
                  alt={item.title}
                  type="news"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#005530] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  {item.category_name || 'News'}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#005530] mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(item.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="text-lg font-bold font-heading text-[#005530] line-clamp-2 group-hover:text-[#004428]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#5B6775] leading-relaxed line-clamp-3 mt-2 flex-1">
                  {item.excerpt}
                </p>
                <span className="mt-4 pt-4 border-t border-[#E2E8F0] text-xs font-bold text-[#005530] inline-flex items-center gap-1">
                  Read story <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
