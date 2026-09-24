import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SafeImage } from '../common/SafeImage';
import { Plus, Edit2, Trash2, Camera, Image as ImageIcon, X } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const GalleryManager: React.FC = () => {
  const { albums, galleryItems, addAlbum, deleteAlbum, addGalleryItem, deleteGalleryItem } = useSite();
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [deleteAlbumId, setDeleteAlbumId] = useState<number | null>(null);

  const [albumForm, setAlbumForm] = useState({
    title: '',
    slug: '',
    cover_image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  const [photoForm, setPhotoForm] = useState({
    album_id: 1,
    type: 'image' as 'image' | 'video',
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    title: '',
    caption: ''
  });

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    addAlbum({
      ...albumForm,
      slug: albumForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
    setShowAlbumModal(false);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem(photoForm);
    setShowPhotoModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Gallery & Albums Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create photo albums, upload event photos, and organize campus media.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAlbumModal(true)}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Album</span>
          </button>
          <button
            onClick={() => setShowPhotoModal(true)}
            className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>Add Photo to Album</span>
          </button>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div key={album.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md p-5 space-y-4">
            <div className="h-40 rounded-2xl overflow-hidden bg-slate-900 relative">
              <SafeImage src={album.cover_image} alt="" type="academic" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {galleryItems.filter(i => i.album_id === album.id).length} Photos
              </div>
            </div>
            <div>
              <h3 className="font-bold font-heading text-slate-900 dark:text-white text-base">{album.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{album.description}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setDeleteAlbumId(album.id)}
                className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Album Modal */}
      {showAlbumModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">Create Gallery Album</h3>
              <button onClick={() => setShowAlbumModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateAlbum} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Album Title *</label>
                <input
                  type="text"
                  required
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={albumForm.cover_image}
                  onChange={(e) => setAlbumForm({ ...albumForm, cover_image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={albumForm.description}
                  onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Save Album</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">Add Photo to Album</h3>
              <button onClick={() => setShowPhotoModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Select Album</label>
                <select
                  value={photoForm.album_id}
                  onChange={(e) => setPhotoForm({ ...photoForm, album_id: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                >
                  {albums.map(a => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Photo Title</label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Photo URL</label>
                <input
                  type="url"
                  required
                  value={photoForm.url}
                  onChange={(e) => setPhotoForm({ ...photoForm, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Upload Photo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete Album"
        message="Are you sure you want to delete this album and all its images?"
        isOpen={deleteAlbumId !== null}
        onClose={() => setDeleteAlbumId(null)}
        onConfirm={() => deleteAlbumId && deleteAlbum(deleteAlbumId)}
      />

    </div>
  );
};
