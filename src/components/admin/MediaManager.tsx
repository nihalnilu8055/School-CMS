import React, { useState } from 'react';
import { SafeImage } from '../common/SafeImage';
import { Upload, HardDrive, Folder, FileText, Image as ImageIcon, Trash2, Eye, X, CheckCircle } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

interface MediaItem {
  id: number;
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'video';
  folder: string;
  size: string;
}

export const MediaManager: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState('all');
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [mediaList, setMediaList] = useState<MediaItem[]>([
    { id: 1, name: 'Robotics_Expo_2026.jpg', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', type: 'image', folder: 'news', size: '2.4 MB' },
    { id: 2, name: 'Academic_Prospectus_2026.pdf', url: '#', type: 'pdf', folder: 'documents', size: '4.2 MB' },
    { id: 3, name: 'Main_Plaza_Architecture.jpg', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80', type: 'image', folder: 'gallery', size: '1.8 MB' },
    { id: 4, name: 'Faculty_Dr_Vance.jpg', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80', type: 'image', folder: 'staff', size: '950 KB' },
  ]);

  const filteredMedia = mediaList.filter(m => currentFolder === 'all' || m.folder === currentFolder);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isPdf = file.name.endsWith('.pdf');
      const newMedia: MediaItem = {
        id: Date.now(),
        name: file.name,
        url: isPdf ? '#' : URL.createObjectURL(file),
        type: isPdf ? 'pdf' : 'image',
        folder: currentFolder === 'all' ? 'general' : currentFolder,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      setMediaList(prev => [newMedia, ...prev]);
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      setMediaList(prev => prev.filter(m => m.id !== deleteId));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Media Manager & File Library
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Upload images, PDF documents, and organize media across folders.
          </p>
        </div>

        {/* Upload Button */}
        <label className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer w-fit">
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
          <input type="file" onChange={handleSimulateUpload} className="hidden" accept="image/*,.pdf" />
        </label>
      </div>

      {/* Folders */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'news', 'staff', 'gallery', 'documents', 'general'].map((folder) => (
          <button
            key={folder}
            onClick={() => setCurrentFolder(folder)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize flex items-center gap-2 transition ${
              currentFolder === folder
                ? 'bg-school-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>{folder}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((file) => (
          <div key={file.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm p-3 space-y-2 group">
            <div className="h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
              {file.type === 'pdf' ? (
                <div className="text-center p-4">
                  <FileText className="w-10 h-10 text-red-500 mx-auto" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 block">PDF Document</span>
                </div>
              ) : (
                <SafeImage src={file.url} alt="" type="academic" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              )}
              <button
                onClick={() => setPreviewMedia(file)}
                className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition backdrop-blur-xs"
              >
                <Eye className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="min-w-0 pr-2">
                <p className="font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400">{file.size} • {file.folder}</p>
              </div>
              <button
                onClick={() => setDeleteId(file.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-2xl w-full text-white border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold font-heading">{previewMedia.name}</h3>
              <button onClick={() => setPreviewMedia(null)}>✕</button>
            </div>
            {previewMedia.type === 'pdf' ? (
              <div className="p-12 text-center bg-slate-950 rounded-2xl">
                <FileText className="w-16 h-16 text-red-500 mx-auto mb-2" />
                <p>PDF Preview Mode ({previewMedia.size})</p>
              </div>
            ) : (
              <SafeImage src={previewMedia.url} alt="" type="academic" className="max-h-96 w-full object-contain rounded-2xl" />
            )}
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        title="Delete Media File"
        message="Are you sure you want to delete this media file from the library?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

    </div>
  );
};
