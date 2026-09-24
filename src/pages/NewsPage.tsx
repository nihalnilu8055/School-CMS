import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { NewsItem } from '../types';
import { Search, Calendar, Newspaper, ArrowRight, Filter } from 'lucide-react';
import { SafeImage } from '../components/common/SafeImage';

interface NewsPageProps {
  onSelectNewsItem: (item: NewsItem) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onSelectNewsItem }) => {
  const { news, newsCategories } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  const publishedNews = news.filter(n => n.status === 'published');

  const filteredNews = publishedNews.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = selectedCategory === 'all' || item.category_id === Number(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 space-y-12 bg-[#F5F8FC]">
      
      {/* Header - Deep Academic Navy */}
      <section className="bg-[#12355B] text-white py-16 border-b border-[#0D2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F5F8B] text-white text-xs font-semibold uppercase tracking-wider border border-[#C9A227]/40">
            <Newspaper className="w-4 h-4 text-[#C9A227]" />
            School Journal & Newsroom
          </div>
          <h1 className="text-4xl font-bold font-heading text-white">
            Latest News & Achievements
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm">
            Stay informed with the latest academic competitions, sports tournament highlights, cultural galas, and school notices.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-card flex flex-col md:flex-row items-center gap-4">
          
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-[#5B6775] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news articles, tags, or topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] placeholder-[#5B6775] focus:border-[#12355B] transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-[#5B6775] shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full md:w-64 px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {newsCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E2E8F0] text-[#5B6775]">
            No news articles found for your search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectNewsItem(item)}
                className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden bg-[#F5F8FC]">
                  <SafeImage
                    src={item.featured_image}
                    alt={item.title}
                    type="news"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#12355B] text-white text-xs font-semibold px-3 py-1 rounded-full border border-[#C9A227]/40 shadow-sm">
                    {item.category_name || 'News'}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A227]">
                      <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>{new Date(item.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h3 className="text-lg font-bold font-heading text-[#12355B] group-hover:text-[#1F5F8B] transition line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#5B6775] line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#12355B] group-hover:text-[#1F5F8B]">
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
