import React, { useMemo, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { ActivityFolder, ActivityFolderPhoto, ActivityStage } from '../../types';
import { ACTIVITY_STAGES, formatActivityDate } from '../../data/activityFolders';
import { SafeImage } from '../common/SafeImage';
import { FileUploadField } from './FileUploadField';
import { ConfirmModal } from './ConfirmModal';
import {
  Plus, FolderOpen, Camera, Trash2, Pencil, X, Eye, ArrowLeft, Images,
} from 'lucide-react';

const emptyFolder = {
  stage: 'primary' as ActivityStage,
  title: '',
  byline: '',
  event_date: new Date().toISOString().slice(0, 10),
  cover_image: '',
  description: '',
  is_published: true,
};

export const ActivityFoldersManager: React.FC = () => {
  const {
    activityFolders,
    addActivityFolder,
    updateActivityFolder,
    deleteActivityFolder,
    addActivityFolderPhoto,
    updateActivityFolderPhoto,
    deleteActivityFolderPhoto,
  } = useSite();

  const [stageFilter, setStageFilter] = useState<'all' | ActivityStage>('all');
  const [openFolderId, setOpenFolderId] = useState<number | null>(null);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [editingFolder, setEditingFolder] = useState<ActivityFolder | null>(null);
  const [folderForm, setFolderForm] = useState(emptyFolder);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<ActivityFolderPhoto | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [deleteFolderId, setDeleteFolderId] = useState<number | null>(null);
  const [deletePhotoId, setDeletePhotoId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const folders = useMemo(
    () =>
      activityFolders
        .filter((folder) => stageFilter === 'all' || folder.stage === stageFilter)
        .sort((a, b) => (b.event_date || '').localeCompare(a.event_date || '')),
    [activityFolders, stageFilter]
  );

  const openFolder = activityFolders.find((folder) => folder.id === openFolderId) || null;

  const openCreateFolder = () => {
    setEditingFolder(null);
    setFolderForm({
      ...emptyFolder,
      stage: stageFilter === 'all' ? 'primary' : stageFilter,
    });
    setShowFolderModal(true);
  };

  const openEditFolder = (folder: ActivityFolder) => {
    setEditingFolder(folder);
    setFolderForm({
      stage: folder.stage,
      title: folder.title,
      byline: folder.byline || '',
      event_date: folder.event_date,
      cover_image: folder.cover_image,
      description: folder.description || '',
      is_published: folder.is_published,
    });
    setShowFolderModal(true);
  };

  const saveFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderForm.title.trim()) return;
    if (editingFolder) {
      updateActivityFolder(editingFolder.id, {
        ...folderForm,
        title: folderForm.title.trim(),
        byline: folderForm.byline.trim(),
        description: folderForm.description.trim(),
      });
    } else {
      addActivityFolder({
        ...folderForm,
        title: folderForm.title.trim(),
        byline: folderForm.byline.trim(),
        description: folderForm.description.trim(),
        slug: '',
        photos: [],
      });
    }
    setShowFolderModal(false);
  };

  const openAddPhoto = () => {
    setEditingPhoto(null);
    setPhotoUrl('');
    setPhotoCaption('');
    setShowPhotoModal(true);
  };

  const openEditPhoto = (photo: ActivityFolderPhoto) => {
    setEditingPhoto(photo);
    setPhotoUrl(photo.url);
    setPhotoCaption(photo.caption || '');
    setShowPhotoModal(true);
  };

  const savePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!openFolder || !photoUrl) return;
    if (editingPhoto) {
      updateActivityFolderPhoto(openFolder.id, editingPhoto.id, {
        url: photoUrl,
        caption: photoCaption,
      });
    } else {
      addActivityFolderPhoto(openFolder.id, { url: photoUrl, caption: photoCaption });
    }
    setShowPhotoModal(false);
  };

  if (openFolder) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={() => setOpenFolderId(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#005530] mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Back to folders
            </button>
            <h2 className="text-2xl font-bold font-heading text-[#005530]">{openFolder.title}</h2>
            <p className="text-xs text-slate-600 mt-1">
              {ACTIVITY_STAGES.find((s) => s.key === openFolder.stage)?.label} · {formatActivityDate(openFolder.event_date)}
              {openFolder.byline ? ` · By ${openFolder.byline}` : ''} · {openFolder.photos.length} photo(s)
            </p>
            <p className="text-xs text-[#004428] mt-2 font-semibold">
              Shows on website: /information/activities/{openFolder.stage}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => openEditFolder(openFolder)}
              className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-white border border-[#b7d0c4] text-[#005530] text-xs font-semibold"
            >
              <Pencil className="w-4 h-4" /> Edit folder details
            </button>
            <button
              type="button"
              onClick={openAddPhoto}
              className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#005530] text-white text-xs font-semibold"
            >
              <Camera className="w-4 h-4" /> Add photo to this folder
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {openFolder.photos.map((photo, index) => (
            <article key={photo.id} className="bg-white rounded-2xl border border-[#b7d0c4] overflow-hidden">
              <div className="h-44 bg-[#e6f0eb]">
                <SafeImage src={photo.url} alt={photo.caption || `Photo ${index + 1}`} type="academic" className="w-full h-full object-cover" />
              </div>
              <div className="p-3 space-y-2">
                <p className="text-xs font-bold text-[#005530]">Photo {index + 1}</p>
                <p className="text-xs text-slate-600 line-clamp-2">{photo.caption || 'No caption'}</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setPreviewUrl(photo.url)} className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 rounded-xl bg-[#e6f0eb] text-[#005530] text-[11px] font-semibold">
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button type="button" onClick={() => openEditPhoto(photo)} className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-2 rounded-xl bg-[#005530] text-white text-[11px] font-semibold">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button type="button" onClick={() => setDeletePhotoId(photo.id)} className="px-2 py-2 rounded-xl bg-red-50 text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => updateActivityFolder(openFolder.id, { cover_image: photo.url })}
                  className={`w-full text-[11px] font-semibold py-2 rounded-xl border ${
                    openFolder.cover_image === photo.url
                      ? 'bg-[#005530] text-white border-[#005530]'
                      : 'bg-white text-[#005530] border-[#b7d0c4]'
                  }`}
                >
                  {openFolder.cover_image === photo.url ? 'Cover photo' : 'Set as folder cover'}
                </button>
              </div>
            </article>
          ))}
        </div>

        {openFolder.photos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#b7d0c4] text-slate-500 text-sm">
            No photos in this folder yet. Click <strong>Add photo to this folder</strong>.
          </div>
        )}

        {showPhotoModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={savePhoto} className="bg-white rounded-3xl w-full max-w-lg border border-[#b7d0c4] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-heading text-[#005530]">
                  {editingPhoto ? 'Edit photo' : 'Add photo to folder'}
                </h3>
                <button type="button" onClick={() => setShowPhotoModal(false)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500">Folder: <strong>{openFolder.title}</strong> ({ACTIVITY_STAGES.find((s) => s.key === openFolder.stage)?.label})</p>
              <FileUploadField label="Choose image" value={photoUrl} accept="image/*" onChange={(url) => setPhotoUrl(url)} />
              <input
                value={photoCaption}
                onChange={(e) => setPhotoCaption(e.target.value)}
                placeholder="Caption (optional)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowPhotoModal(false)} className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" disabled={!photoUrl} className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#005530] text-white disabled:opacity-50">
                  {editingPhoto ? 'Save photo' : 'Add to folder'}
                </button>
              </div>
            </form>
          </div>
        )}

        <ConfirmModal
          title="Delete photo"
          message="Remove this photo from the folder?"
          isOpen={deletePhotoId !== null}
          onClose={() => setDeletePhotoId(null)}
          onConfirm={() => {
            if (deletePhotoId) deleteActivityFolderPhoto(openFolder.id, deletePhotoId);
            setDeletePhotoId(null);
          }}
        />

        {previewUrl && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4" onClick={() => setPreviewUrl(null)}>
            <img src={previewUrl} alt="" className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
          </div>
        )}

        {showFolderModal && renderFolderModal()}
      </div>
    );
  }

  function renderFolderModal() {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
        <form onSubmit={saveFolder} className="bg-white rounded-3xl w-full max-w-lg border border-[#b7d0c4] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-[#005530]">
              {editingFolder ? 'Edit folder' : 'Create activity folder'}
            </h3>
            <button type="button" onClick={() => setShowFolderModal(false)} className="p-2 rounded-xl hover:bg-[#e6f0eb]">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1.5">Which page / stage?</label>
            <select
              value={folderForm.stage}
              onChange={(e) => setFolderForm({ ...folderForm, stage: e.target.value as ActivityStage })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
            >
              {ACTIVITY_STAGES.map((stage) => (
                <option key={stage.key} value={stage.key}>
                  {stage.label} — /{stage.path}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1.5">Folder name / title *</label>
            <input
              required
              value={folderForm.title}
              onChange={(e) => setFolderForm({ ...folderForm, title: e.target.value })}
              placeholder="HAPPY FAMILY DAY"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1.5">By (class / group)</label>
              <input
                value={folderForm.byline}
                onChange={(e) => setFolderForm({ ...folderForm, byline: e.target.value })}
                placeholder="FS2"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1.5">Date *</label>
              <input
                type="date"
                required
                value={folderForm.event_date}
                onChange={(e) => setFolderForm({ ...folderForm, event_date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1.5">Short description</label>
            <textarea
              rows={3}
              value={folderForm.description}
              onChange={(e) => setFolderForm({ ...folderForm, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none"
            />
          </div>

          <FileUploadField
            label="Folder cover image (optional)"
            value={folderForm.cover_image}
            accept="image/*"
            hint="If empty, the first photo added becomes the cover."
            onChange={(url) => setFolderForm({ ...folderForm, cover_image: url })}
          />

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={folderForm.is_published}
              onChange={(e) => setFolderForm({ ...folderForm, is_published: e.target.checked })}
            />
            Published on website
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowFolderModal(false)} className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600">Cancel</button>
            <button type="submit" className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#005530] text-white">
              {editingFolder ? 'Save folder' : 'Create folder'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#005530]">Activity Folders</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Create a folder for each event (example: HAPPY FAMILY DAY), choose Primary / Junior / Senior, then upload photos into that folder. Website shows folders first; opening a folder shows its photos.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateFolder}
          className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#005530] text-white text-xs font-semibold shrink-0"
        >
          <Plus className="w-4 h-4" /> Create folder
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStageFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold ${stageFilter === 'all' ? 'bg-[#005530] text-white' : 'bg-white border border-[#b7d0c4] text-[#005530]'}`}
        >
          All stages
        </button>
        {ACTIVITY_STAGES.map((stage) => (
          <button
            key={stage.key}
            type="button"
            onClick={() => setStageFilter(stage.key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold ${stageFilter === stage.key ? 'bg-[#005530] text-white' : 'bg-white border border-[#b7d0c4] text-[#005530]'}`}
          >
            {stage.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {folders.map((folder) => (
          <article key={folder.id} className="bg-white rounded-2xl border border-[#b7d0c4] overflow-hidden shadow-sm">
            <div className="relative h-40 bg-[#e6f0eb]">
              <SafeImage
                src={folder.cover_image || folder.photos[0]?.url || '/images/campus.jpg'}
                alt={folder.title}
                type="academic"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-[10px] font-bold uppercase text-[#005530] border border-[#b7d0c4]">
                {ACTIVITY_STAGES.find((s) => s.key === folder.stage)?.label}
              </span>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#005530] text-white text-[10px] font-bold">
                <Images className="w-3.5 h-3.5" /> {folder.photos.length}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-bold font-heading text-[#005530]">{folder.title}</h3>
              <p className="text-xs text-slate-500">
                {formatActivityDate(folder.event_date)}
                {folder.byline ? ` · By ${folder.byline}` : ''}
              </p>
              <p className="text-[11px] text-slate-500">
                {folder.is_published ? 'Published on website' : 'Hidden (draft)'}
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setOpenFolderId(folder.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#005530] text-white text-xs font-semibold"
                >
                  <FolderOpen className="w-3.5 h-3.5" /> Open / add photos
                </button>
                <button
                  type="button"
                  onClick={() => openEditFolder(folder)}
                  className="px-3 py-2 rounded-xl bg-[#e6f0eb] text-[#005530] border border-[#b7d0c4]"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteFolderId(folder.id)}
                  className="px-3 py-2 rounded-xl bg-red-50 text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {folders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#b7d0c4] text-slate-500 text-sm">
          No folders yet. Create <strong>HAPPY FAMILY DAY</strong> under Primary, then add photos into that folder.
        </div>
      )}

      {showFolderModal && renderFolderModal()}

      <ConfirmModal
        title="Delete folder"
        message="Delete this folder and all photos inside it?"
        isOpen={deleteFolderId !== null}
        onClose={() => setDeleteFolderId(null)}
        onConfirm={() => {
          if (deleteFolderId) deleteActivityFolder(deleteFolderId);
          setDeleteFolderId(null);
        }}
      />
    </div>
  );
};
