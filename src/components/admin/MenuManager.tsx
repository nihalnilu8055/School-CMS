import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Plus, Edit2, Trash2, Menu as MenuIcon, X } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const MenuManager: React.FC = () => {
  const { menus, addMenu, updateMenu, deleteMenu } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    url: '/',
    location: 'header' as any,
    order_index: 1,
    is_active: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMenu(formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Navigation Menu Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Build and reorder header and footer navigation links across the public website.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Link</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">URL Route</th>
              <th className="p-4">Location</th>
              <th className="p-4">Order</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {menus.map((menu) => (
              <tr key={menu.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">{menu.title}</td>
                <td className="p-4 text-school-600 font-mono">{menu.url}</td>
                <td className="p-4 capitalize">{menu.location}</td>
                <td className="p-4 font-bold">{menu.order_index}</td>
                <td className="p-4 text-right">
                  <button onClick={() => setDeleteId(menu.id)} className="p-2 rounded-xl bg-red-50 text-red-600">
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
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">Add Menu Item</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Menu Label *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">URL Route *</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Save Menu Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete Menu Link"
        message="Are you sure you want to delete this menu link?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMenu(deleteId)}
      />

    </div>
  );
};
