import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { GalleryItem } from '../types';
import { SafeImage } from '../components/common/SafeImage';
import { Camera, Maximize2, X } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { albums, galleryItems } = useSite();
  const [selectedAlbum, setSelectedAlbum] = useState<number | 'all'>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(item => 
    selectedAlbum === 'all' || item.album_id === Number(selectedAlbum)
  );

  return (
    <div className="py-12 space-y-12 bg-[#F5F8FC]">
      
      {/* Header - Deep Academic Navy */}
      <section className="bg-[#12355B] text-white py-16 border-b border-[#0D2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F5F8B] text-white text-xs font-semibold uppercase tracking-wider border border-[#C9A227]/40">
            <Camera className="w-4 h-4 text-[#C9A227]" />
            Media & Albums Showcase
          </div>
          <h1 className="text-4xl font-bold font-heading text-white">
            School Photo & Media Gallery
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm">
            Explore moments of joy, academic discoveries, athletic championships, and campus life at Apex Academy.
          </p>
        </div>
      </section>

      {/* Album Filter Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setSelectedAlbum('all')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              selectedAlbum === 'all'
                ? 'bg-[#12355B] text-white shadow-sm border-b-2 border-[#C9A227]'
                : 'bg-white text-[#12355B] border border-[#E2E8F0] hover:bg-[#F5F8FC]'
            }`}
          >
            All Photos & Albums ({galleryItems.length})
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbum(album.id)}
              className={`px-5 py-2.5 rounded-2xl font-semibold text-xs transition-all ${
                selectedAlbum === album.id
                  ? 'bg-[#12355B] text-white shadow-sm border-b-2 border-[#C9A227]'
                  : 'bg-white text-[#12355B] border border-[#E2E8F0] hover:bg-[#F5F8FC]'
              }`}
            >
              {album.title}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-card border border-[#E2E8F0] bg-white"
            >
              <SafeImage
                src={item.url}
                alt={item.title}
                type="academic"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12355B]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
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
              <SafeImage
                src={activeLightbox.url}
                alt={activeLightbox.title}
                type="academic"
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

    </div>
  );
};
