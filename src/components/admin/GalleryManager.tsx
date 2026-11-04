import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SafeImage } from '../common/SafeImage';
import { Plus, Trash2, Camera, ExternalLink, X } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';
import { FileUploadField } from './FileUploadField';

export const GalleryManager: React.FC = () => {
  const { albums, galleryItems, addAlbum, deleteAlbum, addGalleryItem, deleteGalleryItem } = useSite();
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [deleteAlbumId, setDeleteAlbumId] = useState<number | null>(null);
  const [deletePhotoId, setDeletePhotoId] = useState<number | null>(null);

  const emptyAlbum = {
    title: '',
    slug: '',
    cover_image: '',
    description: ''
  };

  const emptyPhoto = {
    album_id: 1,
    type: 'image' as 'image' | 'video',
    url: '',
    title: '',
    caption: ''
  };

  const [albumForm, setAlbumForm] = useState(emptyAlbum);
  const [photoForm, setPhotoForm] = useState(emptyPhoto);

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    addAlbum({
      ...albumForm,
      slug: albumForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
    setShowAlbumModal(false);
    setAlbumForm(emptyAlbum);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem(photoForm);
    setShowPhotoModal(false);
    setPhotoForm({ ...emptyPhoto, album_id: albums[0]?.id || 1 });
  };

  const openPublicGallery = () => {
    window.open('/gallery', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold font-heading text-[#005530]">
            Gallery & Albums Management
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            These photos appear on the public website at <strong>/gallery</strong> (Gallery menu).
            Page banners, logo, and Primary Investiture photos are managed in <strong>Site Photos</strong>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto">
          <button
            type="button"
            onClick={openPublicGallery}
            className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-white text-[#005530] font-semibold text-xs border border-[#b7d0c4] hover:bg-[#e6f0eb]"
          >
            <ExternalLink className="w-4 h-4" />
            View live Gallery
          </button>
          <button
            type="button"
            onClick={() => {
              setAlbumForm(emptyAlbum);
              setShowAlbumModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#004428] hover:bg-[#003822] text-white font-semibold text-xs"
          >
            <Plus className="w-4 h-4" />
            Create Album
          </button>
          <button
            type="button"
            onClick={() => {
              setPhotoForm({ ...emptyPhoto, album_id: albums[0]?.id || 1 });
              setShowPhotoModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#005530] hover:bg-[#004428] text-white font-semibold text-xs shadow-md"
          >
            <Camera className="w-4 h-4" />
            Add Photo to Album
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#b7d0c4] bg-[#e6f0eb]/70 px-4 py-3 text-xs text-[#004428]">
        <strong>Where photos show:</strong> Website header → <strong>Gallery</strong> → choose an album. Uploaded photos are listed under each album below.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {albums.map((album) => {
          const albumPhotos = galleryItems.filter((item) => item.album_id === album.id);
          return (
            <div key={album.id} className="bg-white rounded-3xl overflow-hidden border border-[#b7d0c4] shadow-sm p-5 space-y-4">
              <div className="h-40 rounded-2xl overflow-hidden bg-[#e6f0eb] relative">
                <SafeImage src={album.cover_image} alt="" type="academic" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-[#005530] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {albumPhotos.length} Photos
                </div>
              </div>
              <div>
                <h3 className="font-bold font-heading text-[#005530] text-base">{album.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{album.description}</p>
              </div>
              {albumPhotos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {albumPhotos.slice(0, 6).map((photo) => (
                    <div key={photo.id} className="relative group rounded-xl overflow-hidden h-16 bg-[#e6f0eb]">
                      <SafeImage src={photo.url} alt={photo.title} type="academic" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setDeletePhotoId(photo.id)}
                        className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 text-white text-[10px] font-bold flex items-center justify-center"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="pt-3 border-t border-[#b7d0c4] flex justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteAlbumId(album.id)}
                  className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {albums.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#b7d0c4] text-slate-500 text-sm">
          No albums yet. Click <strong>Create Album</strong>, then <strong>Add Photo to Album</strong>.
        </div>
      )}

      {showAlbumModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#b7d0c4] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#b7d0c4]">
              <h3 className="text-lg font-bold font-heading text-[#005530]">Create Gallery Album</h3>
              <button type="button" onClick={() => setShowAlbumModal(false)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
                <X className="w-4 h-4 text-[#005530]" />
              </button>
            </div>
            <form onSubmit={handleCreateAlbum} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1 text-slate-600">Album Title *</label>
                <input
                  type="text"
                  required
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 text-sm"
                />
              </div>
              <FileUploadField
                label="Cover image"
                value={albumForm.cover_image}
                accept="image/*"
                onChange={(url) => setAlbumForm({ ...albumForm, cover_image: url })}
              />
              <div>
                <label className="block font-bold uppercase mb-1 text-slate-600">Description</label>
                <textarea
                  rows={3}
                  value={albumForm.description}
                  onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#b7d0c4]">
                <button type="submit" className="px-5 py-2.5 bg-[#005530] text-white font-semibold rounded-xl">Save Album</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#b7d0c4] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#b7d0c4]">
              <h3 className="text-lg font-bold font-heading text-[#005530]">Add Photo to Album</h3>
              <button type="button" onClick={() => setShowPhotoModal(false)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
                <X className="w-4 h-4 text-[#005530]" />
              </button>
            </div>
            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1 text-slate-600">Select Album</label>
                <select
                  value={photoForm.album_id}
                  onChange={(e) => setPhotoForm({ ...photoForm, album_id: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 text-sm"
                >
                  {albums.map((a) => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold uppercase mb-1 text-slate-600">Photo Title</label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none text-slate-900 text-sm"
                />
              </div>
              <FileUploadField
                label="Upload photo"
                value={photoForm.url}
                accept="image/*"
                hint="Choose a photo from your computer."
                onChange={(url, meta) => setPhotoForm({
                  ...photoForm,
                  url,
                  title: photoForm.title || meta?.name?.replace(/\.[^.]+$/, '') || '',
                })}
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-[#b7d0c4]">
                <button type="submit" className="px-5 py-2.5 bg-[#005530] text-white font-semibold rounded-xl">Upload Photo</button>
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

      <ConfirmModal
        title="Delete Photo"
        message="Remove this photo from the gallery album?"
        isOpen={deletePhotoId !== null}
        onClose={() => setDeletePhotoId(null)}
        onConfirm={() => {
          if (deletePhotoId) deleteGalleryItem(deletePhotoId);
          setDeletePhotoId(null);
        }}
      />
    </div>
  );
};
