import React from 'react';
import { NewsItem } from '../types';
import { SafeImage } from '../components/common/SafeImage';
import { ArrowLeft, Calendar, Tag, Share2, User } from 'lucide-react';

interface NewsDetailPageProps {
  newsItem: NewsItem;
  onBack: () => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsItem, onBack }) => {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#12355B] hover:text-[#1F5F8B] bg-[#F5F8FC] border border-[#E2E8F0] px-4 py-2 rounded-xl transition"
      >
        <ArrowLeft className="w-4 h-4 text-[#C9A227]" />
        Back to All News Articles
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="inline-block bg-[#12355B] text-white text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#C9A227]/40 shadow-sm">
          {newsItem.category_name || 'School News'}
        </span>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#12355B] leading-tight">
          {newsItem.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5B6775] pt-2 border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-1.5 text-[#C9A227]">
            <Calendar className="w-4 h-4 text-[#C9A227]" />
            <span>{new Date(newsItem.publish_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#1F5F8B]">
            <User className="w-4 h-4 text-[#1F5F8B]" />
            <span>Apex Press Office</span>
          </div>
        </div>
      </div>

      {/* Featured Main Image */}
      <div className="rounded-3xl overflow-hidden shadow-card max-h-[450px] bg-[#F5F8FC] border border-[#E2E8F0]">
        <SafeImage
          src={newsItem.featured_image}
          alt={newsItem.title}
          type="news"
          className="w-full h-full object-cover"
        />
      </div>

      {/* HTML Rich Text Content */}
      <div 
        className="prose max-w-none text-[#17202A] leading-relaxed text-base space-y-4"
        dangerouslySetInnerHTML={{ __html: newsItem.content }}
      />

      {/* Gallery Images if any */}
      {newsItem.gallery_images && newsItem.gallery_images.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#E2E8F0]">
          <h3 className="text-lg font-bold font-heading text-[#12355B]">Article Media Gallery</h3>
          <div className="grid grid-cols-2 gap-4">
            {newsItem.gallery_images.map((img, idx) => (
              <SafeImage key={idx} src={img} alt={`Gallery ${idx}`} type="news" className="rounded-2xl h-48 w-full object-cover shadow-sm border border-[#E2E8F0]" />
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {newsItem.tags && newsItem.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#E2E8F0]">
          <Tag className="w-4 h-4 text-[#C9A227]" />
          {newsItem.tags.map((tag, idx) => (
            <span key={idx} className="bg-[#F5F8FC] border border-[#E2E8F0] text-[#12355B] font-semibold text-xs px-3 py-1 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>
      )}

    </div>
  );
};
