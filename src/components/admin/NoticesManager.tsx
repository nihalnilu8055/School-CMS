import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Notice, NoticeCategory, NoticePriority, NoticeStatus } from '../../types';
import { Plus, Edit2, Pin, Archive, Bell, X } from 'lucide-react';

const emptyForm = {
  title: '',
  category: 'General Notices' as NoticeCategory,
  excerpt: '',
  content: '',
  priority: 'General' as NoticePriority,
  release_date: new Date().toISOString().slice(0, 10),
  expiry_date: '',
  attachment_url: '',
  attachment_name: '',
  is_pinned: false,
  status: 'published' as NoticeStatus,
};

const priorityClass: Record<NoticePriority, string> = {
  Urgent: 'bg-red-100 text-red-700',
  Important: 'bg-amber-100 text-amber-800',
  General: 'bg-slate-100 text-slate-700',
};

const statusClass: Record<NoticeStatus, string> = {
  published: 'bg-[#e8f0ed] text-[#032f23]',
  archived: 'bg-slate-200 text-slate-600',
};

export const NoticesManager: React.FC = () => {
  const { notices, addNotice, updateNotice } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const openAdd = () => {
    setEditing(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (notice: Notice) => {
    setEditing(notice);
    setFormData({
      title: notice.title,
      category: notice.category,
      excerpt: notice.excerpt,
      content: notice.content,
      priority: notice.priority,
      release_date: notice.release_date,
      expiry_date: notice.expiry_date,
      attachment_url: notice.attachment_url || '',
      attachment_name: notice.attachment_name || '',
      is_pinned: notice.is_pinned,
      status: notice.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      attachment_url: formData.attachment_url || undefined,
      attachment_name: formData.attachment_name || undefined,
    };
    if (editing) updateNotice(editing.id, payload);
    else addNotice(payload);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#032f23]">Notices Manager</h2>
          <p className="text-xs text-slate-600 mt-1">Create, pin, and archive general, fee, academic, and exam notices.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-[#032f23] hover:bg-[#054433] text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-white" />
          Add Notice
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#c5d5ce] shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[980px]">
          <thead className="bg-[#e8f0ed] text-[#032f23] font-bold uppercase border-b border-[#c5d5ce]">
            <tr>
              <th className="p-4">Notice</th>
              <th className="p-4">Category</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {notices.map((notice) => (
              <tr key={notice.id} className="bg-white hover:bg-[#e8f0ed]/70">
                <td className="p-4 align-middle">
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    {notice.is_pinned && <Pin className="w-3.5 h-3.5 text-[#032f23] shrink-0" />}
                    {notice.title}
                  </p>
                  <p className="text-slate-500 mt-1 line-clamp-1">{notice.excerpt}</p>
                </td>
                <td className="p-4 align-middle font-semibold text-[#054433]">{notice.category}</td>
                <td className="p-4 align-middle">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold ${priorityClass[notice.priority] || priorityClass.General}`}>
                    {notice.priority}
                  </span>
                </td>
                <td className="p-4 align-middle text-slate-600 whitespace-nowrap">
                  {notice.release_date} → {notice.expiry_date}
                </td>
                <td className="p-4 align-middle">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${statusClass[notice.status] || statusClass.published}`}>
                    {notice.status}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <button
                      onClick={() => openEdit(notice)}
                      className="p-2 rounded-xl bg-[#e8f0ed] text-[#032f23] border border-[#c5d5ce] hover:bg-[#d1fae5]"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateNotice(notice.id, { is_pinned: !notice.is_pinned })}
                      className={`p-2 rounded-xl border ${
                        notice.is_pinned
                          ? 'bg-[#032f23] text-white border-[#032f23]'
                          : 'bg-[#e8f0ed] text-[#032f23] border-[#c5d5ce] hover:bg-[#d1fae5]'
                      }`}
                      title="Pin"
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateNotice(notice.id, { status: notice.status === 'archived' ? 'published' : 'archived' })}
                      className="p-2 rounded-xl bg-[#e8f0ed] text-[#032f23] border border-[#c5d5ce] hover:bg-[#d1fae5]"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#032f23]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto border border-[#c5d5ce] shadow-2xl">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#c5d5ce]">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#032f23]" />
                <h3 className="text-lg font-bold font-heading text-[#032f23]">{editing ? 'Edit Notice' : 'Create Notice'}</h3>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-slate-500 hover:bg-[#e8f0ed]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Notice title" className="w-full px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900" />
            <textarea required value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Short summary" className="w-full px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900 min-h-20" />
            <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Full notice text" className="w-full px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900 min-h-24" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as NoticeCategory })} className="px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900">
                <option>General Notices</option>
                <option>Fee Notices</option>
                <option>Academic Circulars</option>
                <option>Exam Notices</option>
              </select>
              <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value as NoticePriority })} className="px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900">
                <option>Urgent</option>
                <option>Important</option>
                <option>General</option>
              </select>
              <input type="date" value={formData.release_date} onChange={(e) => setFormData({ ...formData, release_date: e.target.value })} className="px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900" />
              <input type="date" required value={formData.expiry_date} onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })} className="px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900" />
            </div>
            <input value={formData.attachment_url} onChange={(e) => setFormData({ ...formData, attachment_url: e.target.value })} placeholder="Attachment URL (PDF or file)" className="w-full px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900" />
            <input value={formData.attachment_name} onChange={(e) => setFormData({ ...formData, attachment_name: e.target.value })} placeholder="Attachment file name" className="w-full px-3.5 py-2.5 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-sm text-slate-900" />
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={formData.is_pinned} onChange={(e) => setFormData({ ...formData, is_pinned: e.target.checked })} />
              Pin this notice
            </label>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-[#c5d5ce] text-sm text-[#032f23]">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-[#032f23] hover:bg-[#054433] text-white font-semibold text-sm">Save Notice</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
