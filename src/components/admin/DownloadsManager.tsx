import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Plus, Trash2, Download, FileText, X } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const DownloadsManager: React.FC = () => {
  const { downloads, addDownload, deleteDownload } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    file_url: '#',
    file_type: 'PDF Document',
    file_size: '2.5 MB',
    category: 'General' as any
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDownload(formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            PDF & Downloads Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Upload and manage school prospectuses, exam timetables, admission forms, and official circulars.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New PDF Document</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">Document Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Size & Type</th>
              <th className="p-4">Downloads Count</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {downloads.map((dl) => (
              <tr key={dl.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                <td className="p-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-red-500 shrink-0" />
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{dl.title}</span>
                </td>
                <td className="p-4 font-semibold text-school-600 dark:text-school-400">{dl.category}</td>
                <td className="p-4 text-slate-500">{dl.file_type} • {dl.file_size}</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">{dl.downloads_count}</td>
                <td className="p-4 text-right">
                  <button onClick={() => setDeleteId(dl.id)} className="p-2 rounded-xl bg-red-50 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">Upload PDF File</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                >
                  <option value="General">General</option>
                  <option value="Syllabus">Syllabus</option>
                  <option value="Exam Timetable">Exam Timetable</option>
                  <option value="Forms">Forms</option>
                  <option value="Circular">Circular</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Save Document</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete Download File"
        message="Are you sure you want to delete this PDF document?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteDownload(deleteId)}
      />

    </div>
  );
};
