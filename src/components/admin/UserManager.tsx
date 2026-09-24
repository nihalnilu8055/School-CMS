import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { User } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { Plus, Edit2, Trash2, Users, Shield, Check, X } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const UserManager: React.FC = () => {
  const { users, roles, addUser, updateUser, deleteUser } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Editor',
    role_id: 3,
    phone: '',
    avatar_url: '/images/staff3.jpg',
    is_active: true
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'Editor',
      role_id: 3,
      phone: '',
      avatar_url: '/images/staff3.jpg',
      is_active: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (u: User) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      role: u.role,
      role_id: u.role_id,
      phone: u.phone || '',
      avatar_url: u.avatar_url || '',
      is_active: u.is_active
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roleObj = roles.find(r => r.id === Number(formData.role_id));

    if (editingUser) {
      updateUser(editingUser.id, {
        ...formData,
        role: roleObj?.name || 'Editor'
      });
    } else {
      addUser({
        ...formData,
        role: roleObj?.name || 'Editor'
      });
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Admin User Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create staff accounts, set roles, update passwords, and control system access.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                <td className="p-4 flex items-center gap-3">
                  <SafeImage src={u.avatar_url} alt="" type="person" className="w-10 h-10 rounded-full object-cover border-2 border-school-500" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</p>
                    <p className="text-slate-400 text-[11px]">{u.email}</p>
                  </div>
                </td>
                <td className="p-4 font-semibold text-school-600 dark:text-school-400">
                  {u.role}
                </td>
                <td className="p-4 text-slate-500">{u.phone || 'N/A'}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    u.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {u.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(u)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-school-50 text-slate-600 dark:text-slate-300 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(u.id)}
                    className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                {editingUser ? 'Edit User Account' : 'Add New Admin Account'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Role Permission Group</label>
                <select
                  value={formData.role_id}
                  onChange={(e) => setFormData({ ...formData, role_id: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.name} - {r.description}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-school-600 hover:bg-school-700 text-white font-semibold"
                >
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete User Account"
        message="Are you sure you want to delete this admin user?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteUser(deleteId)}
      />

    </div>
  );
};
