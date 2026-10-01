import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Page } from '../../types';
import { Plus, Edit2, Trash2, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { ConfirmModal } from './ConfirmModal';

const MODULE_SLUGS: Record<string, string> = {
  home: 'Use Hero Banner + Site Settings',
  notices: 'Use Notices Manager',
  staff: 'Use Staff & Teachers',
  'about/staff': 'Use Staff & Teachers',
  contact: 'Use Site Settings + Contact form',
};

const emptyForm = {
  title: '',
  slug: '',
  eyebrow: '',
  intro: '',
  content: '<p>Write the page content here...</p>',
  template: 'default' as Page['template'],
  is_published: true,
};

export const PageManager: React.FC = () => {
  const { pages, addPage, updatePage, deletePage } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const handleOpenAdd = () => {
    setEditingPage(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleOpenEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      eyebrow: page.eyebrow || '',
      intro: page.intro || '',
      content: page.content,
      template: page.template,
      is_published: page.is_published,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slugVal = (formData.slug || formData.title)
      .toLowerCase()
      .trim()
      .replace(/^\/+/, '')
      .replace(/[^a-z0-9/-]+/g, '-')
      .replace(/-+/g, '-');

    const payload = { ...formData, slug: slugVal };
    if (editingPage) {
      updatePage(editingPage.id, payload);
    } else {
      addPage(payload);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#032f23]">
            Page Management
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Edit every public content page. Changes appear immediately on the website at the page slug.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          Create New Page
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[720px]">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">Page Title</th>
              <th className="p-4">Public URL</th>
              <th className="p-4">Status</th>
              <th className="p-4">Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{page.title}</p>
                  {MODULE_SLUGS[page.slug] ? (
                    <p className="text-amber-600 mt-0.5">{MODULE_SLUGS[page.slug]}</p>
                  ) : page.eyebrow ? (
                    <p className="text-slate-400 mt-0.5">{page.eyebrow}</p>
                  ) : null}
                </td>
                <td className="p-4 font-mono text-school-600">/{page.slug}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    page.is_published ? 'bg-[#e8f0ed] text-[#032f23]' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {page.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{page.updated_at}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex p-2 rounded-xl bg-[#e8f0ed] text-[#032f23] border border-[#c5d5ce] hover:bg-[#d1fae5]"
                      title="View on website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={() => handleOpenEdit(page)} className="p-2 rounded-xl bg-[#e8f0ed] text-[#032f23] border border-[#c5d5ce] hover:bg-[#d1fae5]">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updatePage(page.id, { is_published: !page.is_published })}
                      className="p-2 rounded-xl bg-[#e8f0ed] text-[#032f23] border border-[#c5d5ce] hover:bg-[#d1fae5]"
                      title={page.is_published ? 'Unpublish' : 'Publish'}
                    >
                      {page.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setDeleteId(page.id)} className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                {editingPage ? 'Edit Page' : 'Create Page'}
              </h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1 sm:col-span-2">
                  <span className="font-bold uppercase text-slate-500">Page title</span>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="font-bold uppercase text-slate-500">Public URL slug</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="about/mission"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm font-mono"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="font-bold uppercase text-slate-500">Section label</span>
                  <input
                    type="text"
                    value={formData.eyebrow}
                    onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                    placeholder="About Us"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </label>
                <label className="block space-y-1 sm:col-span-2">
                  <span className="font-bold uppercase text-slate-500">Intro text</span>
                  <textarea
                    value={formData.intro}
                    onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm min-h-20"
                  />
                </label>
              </div>
              <label className="block space-y-1">
                <span className="font-bold uppercase text-slate-500">Page content</span>
                <RichTextEditor value={formData.content} onChange={(val) => setFormData({ ...formData, content: val })} />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
                Published on the website
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Save Page</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete Page"
        message="Are you sure you want to delete this page from the website?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deletePage(deleteId)}
      />
    </div>
  );
};
