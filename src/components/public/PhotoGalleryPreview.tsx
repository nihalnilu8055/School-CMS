import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Image as ImageIcon, Maximize2, X, ArrowRight, Camera } from 'lucide-react';
import { GalleryItem } from '../../types';

interface PhotoGalleryPreviewProps {
  setCurrentTab: (tab: string) => void;
}

export const PhotoGalleryPreview: React.FC<PhotoGalleryPreviewProps> = ({ setCurrentTab }) => {
  const { galleryItems } = useSite();
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const previewItems = galleryItems.slice(0, 6);

  return (
    <section className="py-20 bg-[#F5F8FC] border-b border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#12355B] text-xs font-bold uppercase tracking-wider mb-3 shadow-subtle">
              <Camera className="w-3.5 h-3.5 text-[#C9A227]" />
              Life at Apex
            </div>
            <h2 className="text-3xl font-bold font-heading text-[#12355B]">
              Campus Photo & Media Gallery
            </h2>
          </div>
          <button
            onClick={() => { setCurrentTab('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-[#1F5F8B] hover:text-[#12355B] font-semibold text-sm group"
          >
            <span>Explore All Albums</span>
            <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-card border border-[#E2E8F0] bg-white"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12355B]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-heading text-white">{item.title}</h3>
                    <p className="text-xs text-[#C9A227] mt-0.5 font-medium">{item.caption}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-[#12355B]/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-2xl">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#12355B] text-white flex items-center justify-center transition hover:bg-[#0D2A47]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeLightbox.url}
                alt={activeLightbox.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-white border-t border-[#E2E8F0]">
              <h3 className="text-xl font-bold font-heading text-[#12355B]">{activeLightbox.title}</h3>
              {activeLightbox.caption && <p className="text-sm text-[#5B6775] mt-1">{activeLightbox.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
