import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { MenuItem } from '../../types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

const emptyForm = {
  title: '',
  url: '/',
  location: 'header' as MenuItem['location'],
  parent_id: null as number | null,
  order_index: 1,
  is_active: true,
};

export const MenuManager: React.FC = () => {
  const { menus, addMenu, updateMenu, deleteMenu } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const sorted = [...menus].sort((a, b) => {
    if (a.location !== b.location) return a.location.localeCompare(b.location);
    const aParent = a.parent_id || 0;
    const bParent = b.parent_id || 0;
    if (aParent !== bParent) return aParent - bParent;
    return a.order_index - b.order_index;
  });

  const parents = menus.filter((item) => item.location === formData.location && !item.parent_id && item.id !== editing?.id);

  const openAdd = () => {
    setEditing(null);
    setFormData({ ...emptyForm, order_index: menus.length + 1 });
    setShowModal(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setFormData({
      title: item.title,
      url: item.url,
      location: item.location,
      parent_id: item.parent_id || null,
      order_index: item.order_index,
      is_active: item.is_active,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, parent_id: formData.parent_id || null };
    if (editing) updateMenu(editing.id, payload);
    else addMenu(payload);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#005530]">Navigation Menu Management</h2>
          <p className="text-xs text-slate-600 mt-1">
            These links drive the public header dropdowns and footer quick links. Parent items become dropdown groups.
          </p>
        </div>
        <button onClick={openAdd} className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" />
          Add Menu Link
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[720px]">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">URL</th>
              <th className="p-4">Location</th>
              <th className="p-4">Parent</th>
              <th className="p-4">Order</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sorted.map((item) => {
              const parent = menus.find((menu) => menu.id === item.parent_id);
              return (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className={`p-4 font-bold text-slate-900 dark:text-white ${item.parent_id ? 'pl-8 text-sm font-medium' : 'text-sm'}`}>
                    {item.parent_id ? `— ${item.title}` : item.title}
                  </td>
                  <td className="p-4 font-mono text-school-600">{item.url}</td>
                  <td className="p-4 capitalize">{item.location}</td>
                  <td className="p-4 text-slate-500">{parent?.title || '—'}</td>
                  <td className="p-4">{item.order_index}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${item.is_active ? 'bg-[#e6f0eb] text-[#005530]' : 'bg-slate-200 text-slate-600'}`}>
                      {item.is_active ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-xl bg-[#e6f0eb] text-[#005530] border border-[#b7d0c4] hover:bg-[#d1fae5]">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(item.id)} className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">{editing ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <label className="block space-y-1">
                <span className="font-bold uppercase">Label</span>
                <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm text-slate-900 dark:text-white" />
              </label>
              <label className="block space-y-1">
                <span className="font-bold uppercase">URL route</span>
                <input required value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="/about/mission" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm font-mono text-slate-900 dark:text-white" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-1">
                  <span className="font-bold uppercase">Location</span>
                  <select value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value as MenuItem['location'], parent_id: null })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm text-slate-900 dark:text-white">
                    <option value="header">Header</option>
                    <option value="footer">Footer</option>
                  </select>
                </label>
                <label className="block space-y-1">
                  <span className="font-bold uppercase">Order</span>
                  <input type="number" value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm text-slate-900 dark:text-white" />
                </label>
              </div>
              <label className="block space-y-1">
                <span className="font-bold uppercase">Parent menu (optional)</span>
                <select value={formData.parent_id || ''} onChange={(e) => setFormData({ ...formData, parent_id: e.target.value ? Number(e.target.value) : null })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm text-slate-900 dark:text-white">
                  <option value="">Top-level item</option>
                  {parents.map((item) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                Visible on the website
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Save Link</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete Menu Link"
        message="This will also remove any child links under this item."
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMenu(deleteId)}
      />
    </div>
  );
};
