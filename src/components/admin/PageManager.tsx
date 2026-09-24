import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Page } from '../../types';
import { Plus, Edit2, Trash2, FileText, X } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { ConfirmModal } from './ConfirmModal';

export const PageManager: React.FC = () => {
  const { pages, addPage, updatePage, deletePage } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '<p>Page content here...</p>',
    template: 'default' as any,
    is_published: true
  });

  const handleOpenAdd = () => {
    setEditingPage(null);
    setFormData({
      title: '',
      slug: '',
      content: '<p>Page content here...</p>',
      template: 'default',
      is_published: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: Page) => {
    setEditingPage(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      content: p.content,
      template: p.template,
      is_published: p.is_published
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slugVal = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editingPage) {
      updatePage(editingPage.id, { ...formData, slug: slugVal });
    } else {
      addPage({ ...formData, slug: slugVal });
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Page Management & Content Builder
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create custom landing pages, edit static content, and configure layout templates.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">Page Title</th>
              <th className="p-4">Slug Route</th>
              <th className="p-4">Template</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pages.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">{p.title}</td>
                <td className="p-4 text-school-600 font-mono">/{p.slug}</td>
                <td className="p-4 capitalize">{p.template}</td>
                <td className="p-4 text-slate-400">{p.updated_at}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(p)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteId(p.id)} className="p-2 rounded-xl bg-red-50 text-red-600">
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                {editingPage ? 'Edit Page' : 'Create Page'}
              </h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Page Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Page Content</label>
                <RichTextEditor value={formData.content} onChange={(val) => setFormData({ ...formData, content: val })} />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Save Page</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete Page"
        message="Are you sure you want to delete this static page?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deletePage(deleteId)}
      />

    </div>
  );
};
