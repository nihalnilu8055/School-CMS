import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { GalleryItem } from '../types';
import { PageHero } from '../components/public/PageHero';
import { SafeImage } from '../components/common/SafeImage';
import { Maximize2, X } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { albums, galleryItems, content } = useSite();
  const [selectedAlbum, setSelectedAlbum] = useState<number | 'all'>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const filteredItems = galleryItems.filter((item) => selectedAlbum === 'all' || item.album_id === Number(selectedAlbum));

  return (
    <div className="bg-white pb-16 animate-fadeIn">
      <PageHero
        eyebrow={content.gallery_page_eyebrow || 'Gallery'}
        title={content.gallery_page_heading || 'Campus gallery'}
        intro={content.gallery_page_intro || 'Moments from academic life, sports, culture, and the Ibn Seena campus.'}
        image="/images/campus.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedAlbum('all')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs ${
              selectedAlbum === 'all' ? 'bg-[#005530] text-white' : 'bg-[#e6f0eb] text-[#005530] border border-[#b7d0c4]'
            }`}
          >
            All albums ({galleryItems.length})
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbum(album.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs ${
                selectedAlbum === album.id ? 'bg-[#005530] text-white' : 'bg-[#e6f0eb] text-[#005530] border border-[#b7d0c4]'
              }`}
            >
              {album.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative h-72 rounded-3xl overflow-hidden border border-slate-100 bg-[#e6f0eb] text-left"
            >
              <SafeImage src={item.url} alt={item.title} type="academic" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#005530]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-base font-bold font-heading">{item.title}</h3>
                    <p className="text-xs text-white/80 mt-0.5">{item.caption}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-[#003822]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden">
            <button onClick={() => setActiveLightbox(null)} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#005530] text-white flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <SafeImage src={activeLightbox.url} alt={activeLightbox.title} type="academic" className="max-h-[75vh] w-auto object-contain" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold font-heading text-[#005530]">{activeLightbox.title}</h3>
              {activeLightbox.caption && <p className="text-sm text-slate-500 mt-1">{activeLightbox.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
