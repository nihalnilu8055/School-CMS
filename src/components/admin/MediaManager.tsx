import React, { useMemo, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SafeImage } from '../common/SafeImage';
import { FileUploadField } from './FileUploadField';
import { ConfirmModal } from './ConfirmModal';
import {
  SITE_IMAGE_PLACEMENTS,
  SITE_PHOTO_GALLERIES,
  UPLOAD_DESTINATIONS,
  SiteImagePlacementDef,
  SiteImageSection,
  UploadDestination,
} from '../../data/siteImagePlacements';
import { SiteGalleryPhoto } from '../../types';
import {
  Upload, Eye, Pencil, MapPin, Image as ImageIcon, X, CheckCircle,
  ArrowRight, Images, LayoutTemplate, Plus, Trash2,
} from 'lucide-react';

interface MediaManagerProps {
  onNavigate?: (module: string) => void;
}

const SECTION_ORDER: SiteImageSection[] = [
  'branding',
  'home_welcome',
  'about',
  'page_heroes',
  'stage_cards',
  'activities_primary',
];

export const MediaManager: React.FC<MediaManagerProps> = ({ onNavigate }) => {
  const {
    siteImages,
    sitePhotoGalleries,
    updateSiteImage,
    addSiteGalleryPhoto,
    updateSiteGalleryPhoto,
    deleteSiteGalleryPhoto,
    banners,
    galleryItems,
  } = useSite();

  const [sectionFilter, setSectionFilter] = useState<'all' | SiteImageSection>('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editingFixed, setEditingFixed] = useState<SiteImagePlacementDef | null>(null);
  const [editingGallery, setEditingGallery] = useState<{ key: string; photo: SiteGalleryPhoto } | null>(null);
  const [previewFixed, setPreviewFixed] = useState<SiteImagePlacementDef | null>(null);
  const [previewGallery, setPreviewGallery] = useState<{ key: string; photo: SiteGalleryPhoto; label: string } | null>(null);
  const [deleteGalleryTarget, setDeleteGalleryTarget] = useState<{ key: string; photoId: number } | null>(null);

  const [formUrl, setFormUrl] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [destinationId, setDestinationId] = useState(UPLOAD_DESTINATIONS[0]?.id || '');
  const [galleryMode, setGalleryMode] = useState<'add' | 'replace'>('add');
  const [replacePhotoId, setReplacePhotoId] = useState<number | null>(null);
  const [savedFlash, setSavedFlash] = useState('');

  const destination = UPLOAD_DESTINATIONS.find((item) => item.id === destinationId) || UPLOAD_DESTINATIONS[0];

  const sectionTabs = useMemo(() => {
    const labels: Record<SiteImageSection, string> = {
      branding: 'Branding',
      home_welcome: 'Home welcome photos',
      about: 'About page',
      page_heroes: 'Page top photos',
      stage_cards: 'Co-curricular cards',
      activities_primary: 'Primary Investiture photos',
    };
    return SECTION_ORDER.map((key) => ({ key, label: labels[key] }));
  }, []);

  const destinationsByGroup = useMemo(() => {
    const map = new Map<string, UploadDestination[]>();
    UPLOAD_DESTINATIONS.forEach((item) => {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    });
    return Array.from(map.entries());
  }, []);

  const resolveFixed = (item: SiteImagePlacementDef) =>
    siteImages[item.id] || { url: item.defaultUrl, caption: item.defaultCaption || '', updated_at: '' };

  const flash = (label: string) => {
    setSavedFlash(label);
    setTimeout(() => setSavedFlash(''), 2500);
  };

  const openUpload = (prefill?: UploadDestination) => {
    const dest = prefill || UPLOAD_DESTINATIONS[0];
    setDestinationId(dest.id);
    setGalleryMode(dest.kind === 'gallery' ? 'add' : 'add');
    setReplacePhotoId(null);
    setFormUrl('');
    setFormCaption('');
    setUploadOpen(true);
  };

  const openUploadForGallery = (galleryKey: string) => {
    const dest = UPLOAD_DESTINATIONS.find((item) => item.kind === 'gallery' && item.id === galleryKey);
    if (dest) openUpload(dest);
  };

  const saveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUrl || !destination) return;

    if (destination.kind === 'fixed') {
      updateSiteImage(destination.id, { url: formUrl, caption: formCaption });
      flash(destination.label);
    } else if (galleryMode === 'add') {
      addSiteGalleryPhoto(destination.id, { url: formUrl, caption: formCaption });
      flash(`Added to ${destination.label}`);
    } else if (replacePhotoId != null) {
      updateSiteGalleryPhoto(destination.id, replacePhotoId, { url: formUrl, caption: formCaption });
      flash(`Replaced photo in ${destination.label}`);
    } else {
      return;
    }

    setUploadOpen(false);
  };

  const saveFixedEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFixed || !formUrl) return;
    updateSiteImage(editingFixed.id, { url: formUrl, caption: formCaption });
    flash(editingFixed.label);
    setEditingFixed(null);
  };

  const saveGalleryEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery || !formUrl) return;
    updateSiteGalleryPhoto(editingGallery.key, editingGallery.photo.id, {
      url: formUrl,
      caption: formCaption,
    });
    flash('Gallery photo updated');
    setEditingGallery(null);
  };

  const fixedVisible = SITE_IMAGE_PLACEMENTS.filter(
    (item) => sectionFilter === 'all' || item.section === sectionFilter
  );
  const galleriesVisible = SITE_PHOTO_GALLERIES.filter(
    (item) => sectionFilter === 'all' || item.section === sectionFilter
  );

  const galleryPhotosForDest =
    destination?.kind === 'gallery' ? sitePhotoGalleries[destination.id] || [] : [];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#005530]">Site Photos</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Choose where the photo shows on the website. For Primary Investiture, you can <strong>add a new photo</strong> (default) or optionally replace an old one.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {savedFlash && (
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#e6f0eb] text-[#005530] text-xs font-bold">
              <CheckCircle className="w-4 h-4" /> {savedFlash}
            </span>
          )}
          <button
            type="button"
            onClick={() => openUpload()}
            className="bg-[#005530] hover:bg-[#004428] text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Upload photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onNavigate?.('banners')}
          className="text-left bg-white rounded-2xl border border-[#b7d0c4] p-5 hover:border-[#005530] transition flex items-start gap-3"
        >
          <span className="w-10 h-10 rounded-xl bg-[#e6f0eb] text-[#005530] flex items-center justify-center shrink-0">
            <LayoutTemplate className="w-5 h-5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-[#005530]">Home hero slider photos</span>
            <span className="block text-xs text-slate-500 mt-1">
              {banners.length} slide(s) on the homepage. Manage in Hero Banner Slider.
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#005530] mt-2">
              Open Hero Banner Slider <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('gallery')}
          className="text-left bg-white rounded-2xl border border-[#b7d0c4] p-5 hover:border-[#005530] transition flex items-start gap-3"
        >
          <span className="w-10 h-10 rounded-xl bg-[#e6f0eb] text-[#005530] flex items-center justify-center shrink-0">
            <Images className="w-5 h-5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-[#005530]">Campus Gallery page photos</span>
            <span className="block text-xs text-slate-500 mt-1">
              {galleryItems.length} photo(s) show under the public <strong>Gallery</strong> menu.
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#005530] mt-2">
              Open Gallery & Albums <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSectionFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold ${
            sectionFilter === 'all' ? 'bg-[#005530] text-white' : 'bg-white border border-[#b7d0c4] text-[#005530]'
          }`}
        >
          All sections
        </button>
        {sectionTabs.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => setSectionFilter(section.key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold ${
              sectionFilter === section.key ? 'bg-[#005530] text-white' : 'bg-white border border-[#b7d0c4] text-[#005530]'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Growing galleries first when filtered to that section or all */}
      {galleriesVisible.map((gallery) => {
        const photos = sitePhotoGalleries[gallery.key] || [];
        return (
          <section key={gallery.key} className="bg-white rounded-3xl border border-[#b7d0c4] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold font-heading text-[#005530]">{gallery.sectionLabel}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  Shows on: {gallery.whereShown}
                </p>
                <p className="text-[11px] text-[#004428] mt-1 font-semibold">
                  {photos.length} photo(s) — add new anytime (does not replace old ones)
                </p>
              </div>
              <button
                type="button"
                onClick={() => openUploadForGallery(gallery.key)}
                className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-[#005530] text-white text-xs font-semibold"
              >
                <Plus className="w-4 h-4" /> Add new photo
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <article key={photo.id} className="rounded-2xl border border-[#b7d0c4] overflow-hidden bg-[#e6f0eb]/40">
                  <div className="relative h-40 bg-[#e6f0eb]">
                    <SafeImage src={photo.url} alt={photo.caption || `Photo ${index + 1}`} type="academic" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-2">
                    <p className="text-xs font-bold text-[#005530]">Photo {index + 1}</p>
                    <p className="text-xs text-slate-600 line-clamp-2">{photo.caption || 'No caption'}</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewGallery({ key: gallery.key, photo, label: gallery.label })}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 rounded-xl bg-white border border-[#b7d0c4] text-[#005530] text-[11px] font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGallery({ key: gallery.key, photo });
                          setFormUrl(photo.url);
                          setFormCaption(photo.caption || '');
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 rounded-xl bg-[#005530] text-white text-[11px] font-semibold"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteGalleryTarget({ key: gallery.key, photoId: photo.id })}
                        className="px-2 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {photos.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-8">No photos yet. Click Add new photo.</p>
            )}
          </section>
        );
      })}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {fixedVisible.map((item) => {
          const current = resolveFixed(item);
          return (
            <article key={item.id} className="bg-white rounded-2xl border border-[#b7d0c4] shadow-sm overflow-hidden flex flex-col">
              <div className="relative h-44 bg-[#e6f0eb]">
                <SafeImage src={current.url} alt={item.label} type="academic" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-[10px] font-bold uppercase tracking-wide text-[#005530] border border-[#b7d0c4]">
                  {item.sectionLabel}
                </span>
              </div>
              <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div>
                  <h3 className="text-sm font-bold font-heading text-[#005530]">{item.label}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#004428]" />
                    <span>Shows on: {item.whereShown}</span>
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPreviewFixed(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#e6f0eb] text-[#005530] text-xs font-semibold border border-[#b7d0c4]"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFixed(item);
                      setFormUrl(current.url);
                      setFormCaption(current.caption || '');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#005530] text-white text-xs font-semibold"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Change photo
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {fixedVisible.length === 0 && galleriesVisible.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#b7d0c4] text-slate-500">
          <ImageIcon className="w-8 h-8 mx-auto mb-3 text-[#7eb89a]" />
          No photos in this section yet.
        </div>
      )}

      {/* Upload modal */}
      {uploadOpen && destination && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={saveUpload} className="bg-white rounded-3xl w-full max-w-lg border border-[#b7d0c4] shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-[#005530]">Upload photo</h3>
              <button type="button" onClick={() => setUploadOpen(false)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
                <X className="w-4 h-4 text-[#005530]" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600 mb-1.5">
                Where should this photo show on the website?
              </label>
              <select
                required
                value={destinationId}
                onChange={(e) => {
                  const next = e.target.value;
                  setDestinationId(next);
                  setGalleryMode('add');
                  setReplacePhotoId(null);
                  setFormCaption('');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
              >
                {destinationsByGroup.map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Shows on: {destination.whereShown}
              </p>
            </div>

            {destination.kind === 'gallery' && (
              <div className="rounded-2xl border border-[#b7d0c4] bg-[#e6f0eb]/50 p-3 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#004428]">What do you want to do?</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="galleryMode"
                      checked={galleryMode === 'add'}
                      onChange={() => {
                        setGalleryMode('add');
                        setReplacePhotoId(null);
                      }}
                    />
                    <span><strong>Add new photo</strong> (keep existing photos)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="galleryMode"
                      checked={galleryMode === 'replace'}
                      onChange={() => {
                        setGalleryMode('replace');
                        setReplacePhotoId(galleryPhotosForDest[0]?.id ?? null);
                      }}
                    />
                    <span>Replace an existing photo</span>
                  </label>
                </div>
                {galleryMode === 'replace' && (
                  <select
                    required
                    value={replacePhotoId ?? ''}
                    onChange={(e) => setReplacePhotoId(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm outline-none"
                  >
                    {galleryPhotosForDest.map((photo, index) => (
                      <option key={photo.id} value={photo.id}>
                        Photo {index + 1}{photo.caption ? ` — ${photo.caption}` : ''}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {destination.kind === 'fixed' && (
              <p className="text-xs text-[#004428] bg-[#e6f0eb] rounded-xl px-3 py-2">
                This place shows one photo. Saving will update that photo on the website.
              </p>
            )}

            <FileUploadField
              label="Choose image"
              value={formUrl}
              accept="image/*"
              hint="PNG, JPG, or WebP under 8 MB."
              onChange={(url) => setFormUrl(url)}
            />
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-600 mb-1.5">
                Caption (optional)
              </label>
              <input
                value={formCaption}
                onChange={(e) => setFormCaption(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
                placeholder="Short description under the photo"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setUploadOpen(false)} className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formUrl || (destination.kind === 'gallery' && galleryMode === 'replace' && replacePhotoId == null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#005530] text-white disabled:opacity-50"
              >
                {destination.kind === 'gallery' && galleryMode === 'add' ? 'Add to website' : 'Save to website'}
              </button>
            </div>
          </form>
        </div>
      )}

      {editingFixed && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={saveFixedEdit} className="bg-white rounded-3xl w-full max-w-lg border border-[#b7d0c4] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-[#005530]">Change photo</h3>
                <p className="text-xs text-slate-500 mt-1">{editingFixed.whereShown}</p>
              </div>
              <button type="button" onClick={() => setEditingFixed(null)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
                <X className="w-4 h-4 text-[#005530]" />
              </button>
            </div>
            <FileUploadField label="New image" value={formUrl} accept="image/*" onChange={(url) => setFormUrl(url)} />
            <input
              value={formCaption}
              onChange={(e) => setFormCaption(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
              placeholder="Caption (optional)"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingFixed(null)} className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600">Cancel</button>
              <button type="submit" className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#005530] text-white">Save</button>
            </div>
          </form>
        </div>
      )}

      {editingGallery && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={saveGalleryEdit} className="bg-white rounded-3xl w-full max-w-lg border border-[#b7d0c4] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-[#005530]">Edit gallery photo</h3>
              <button type="button" onClick={() => setEditingGallery(null)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
                <X className="w-4 h-4 text-[#005530]" />
              </button>
            </div>
            <FileUploadField label="Image" value={formUrl} accept="image/*" onChange={(url) => setFormUrl(url)} />
            <input
              value={formCaption}
              onChange={(e) => setFormCaption(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
              placeholder="Caption"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingGallery(null)} className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600">Cancel</button>
              <button type="submit" className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#005530] text-white">Save</button>
            </div>
          </form>
        </div>
      )}

      {previewFixed && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl border border-[#b7d0c4] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#b7d0c4]">
              <div>
                <h3 className="font-bold font-heading text-[#005530]">{previewFixed.label}</h3>
                <p className="text-xs text-slate-500">Shows on: {previewFixed.whereShown}</p>
              </div>
              <button type="button" onClick={() => setPreviewFixed(null)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
                <X className="w-4 h-4 text-[#005530]" />
              </button>
            </div>
            <div className="p-4 bg-[#e6f0eb]">
              <SafeImage src={resolveFixed(previewFixed).url} alt={previewFixed.label} type="academic" className="w-full max-h-[60vh] object-contain rounded-2xl bg-white" />
            </div>
          </div>
        </div>
      )}

      {previewGallery && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl border border-[#b7d0c4] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#b7d0c4]">
              <div>
                <h3 className="font-bold font-heading text-[#005530]">{previewGallery.label}</h3>
                <p className="text-xs text-slate-500">{previewGallery.photo.caption}</p>
              </div>
              <button type="button" onClick={() => setPreviewGallery(null)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
                <X className="w-4 h-4 text-[#005530]" />
              </button>
            </div>
            <div className="p-4 bg-[#e6f0eb]">
              <SafeImage src={previewGallery.photo.url} alt="" type="academic" className="w-full max-h-[60vh] object-contain rounded-2xl bg-white" />
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete photo"
        message="Remove this photo from the Primary Investiture gallery on the website?"
        isOpen={deleteGalleryTarget !== null}
        onClose={() => setDeleteGalleryTarget(null)}
        onConfirm={() => {
          if (deleteGalleryTarget) {
            deleteSiteGalleryPhoto(deleteGalleryTarget.key, deleteGalleryTarget.photoId);
          }
          setDeleteGalleryTarget(null);
        }}
      />
    </div>
  );
};
