import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { NewsItem } from '../types';
import { PageHero } from '../components/public/PageHero';
import { SafeImage } from '../components/common/SafeImage';
import { Search, Calendar, ArrowRight } from 'lucide-react';

interface NewsPageProps {
  onSelectNewsItem: (item: NewsItem) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onSelectNewsItem }) => {
  const { news, newsCategories, content } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  const filteredNews = news.filter((item) => {
    if (item.status !== 'published') return false;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category_id === Number(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white pb-16 animate-fadeIn">
      <PageHero
        eyebrow={content.news_eyebrow || 'News'}
        title={content.news_heading || 'News & achievements'}
        intro={content.news_intro || 'Academic milestones, sports, cultural events, and school updates.'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none text-sm focus:border-[#032f23]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full md:w-64 px-4 py-3 rounded-xl bg-white border border-slate-200 outline-none text-sm"
          >
            <option value="all">All categories</option>
            {newsCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-[#f8fafc] rounded-3xl border border-slate-100 text-slate-400">
            No news articles found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectNewsItem(item)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-card text-left flex flex-col group"
              >
                <div className="relative h-52 overflow-hidden bg-[#e8f0ed]">
                  <SafeImage src={item.featured_image} alt={item.title} type="news" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-[#032f23] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.category_name || 'News'}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-[#0a5c47]" />
                      {new Date(item.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-lg font-bold font-heading text-[#032f23] line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-3">{item.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#032f23]">
                    Read story <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
