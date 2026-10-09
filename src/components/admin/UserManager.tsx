import React, { useMemo, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { User } from '../../types';
import { SafeImage } from '../common/SafeImage';
import {
  Plus, Edit2, Trash2, Shield, Check, Lock, Eye, EyeOff,
  KeyRound, Sparkles, UserRound, X
} from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';
import { generatePassword, getPasswordStrength, hashPassword } from '../../utils/password';

const emptyForm = {
  name: '',
  email: '',
  role: 'Editor',
  role_id: 3,
  phone: '',
  avatar_url: '/images/staff3.jpg',
  is_active: true,
  password: '',
  confirmPassword: '',
};

export const UserManager: React.FC = () => {
  const { users, roles, addUser, updateUser, deleteUser } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const strength = useMemo(() => getPasswordStrength(formData.password), [formData.password]);
  const passwordsMatch = !formData.confirmPassword || formData.password === formData.confirmPassword;

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormError('');
    setShowPassword(false);
    setShowConfirm(false);
    setFormData(emptyForm);
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setFormError('');
    setShowModal(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      ...emptyForm,
      name: user.name,
      email: user.email,
      role: user.role,
      role_id: user.role_id,
      phone: user.phone || '',
      avatar_url: user.avatar_url || '/images/staff3.jpg',
      is_active: user.is_active,
    });
    setFormError('');
    setShowModal(true);
  };

  const handleGeneratePassword = () => {
    const nextPassword = generatePassword();
    setFormData((prev) => ({ ...prev, password: nextPassword, confirmPassword: nextPassword }));
    setShowPassword(true);
    setShowConfirm(true);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const emailTaken = users.some(
      (user) => user.email.toLowerCase() === formData.email.trim().toLowerCase() && user.id !== editingUser?.id
    );
    if (emailTaken) {
      setFormError('An account with this email already exists.');
      return;
    }

    if (!editingUser && !formData.password) {
      setFormError('Create a password so this user can sign in.');
      return;
    }

    if (formData.password) {
      if (!strength.isValid) {
        setFormError('Password must be at least 8 characters and include a letter and a number.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setFormError('Password and confirmation do not match.');
        return;
      }
    }

    const roleObj = roles.find((role) => role.id === Number(formData.role_id));
    const payload: Partial<User> = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: roleObj?.name || 'Editor',
      role_id: Number(formData.role_id),
      phone: formData.phone.trim(),
      avatar_url: formData.avatar_url,
      is_active: formData.is_active,
    };

    setSaving(true);
    try {
      if (formData.password) {
        payload.password_hash = await hashPassword(formData.password);
      }

      if (editingUser) {
        updateUser(editingUser.id, payload);
      } else {
        addUser(payload as Omit<User, 'id' | 'created_at'>);
      }
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Admin User Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create staff accounts, assign roles, and set sign-in passwords.
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
              <th className="p-4">Access</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                <td className="p-4 flex items-center gap-3">
                  <SafeImage src={user.avatar_url} alt="" type="person" className="w-10 h-10 rounded-full object-cover border-2 border-school-500" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
                    <p className="text-slate-400 text-[11px]">{user.email}</p>
                  </div>
                </td>
                <td className="p-4 font-semibold text-school-600 dark:text-school-400">
                  {user.role}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    user.password_hash
                      ? 'bg-[#e6f0eb] text-[#005530] border border-[#b7d0c4]'
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    <Lock className="w-3 h-3" />
                    {user.password_hash ? 'Password set' : 'Needs password'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    user.is_active ? 'bg-[#e6f0eb] text-[#005530]' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {user.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(user)}
                      className="p-2 rounded-xl bg-[#e6f0eb] text-[#005530] border border-[#b7d0c4] hover:bg-[#d1fae5]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(user.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                    >
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
        <div className="fixed inset-0 z-50 bg-[#005530]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-5 bg-[#005530] text-white flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-[#005530]/40 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-[#005530]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading">
                    {editingUser ? 'Edit Admin Account' : 'Create Admin Account'}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    {editingUser
                      ? 'Update profile details or reset this user’s sign-in password.'
                      : 'Set the account profile and a password they will use on the admin login page.'}
                  </p>
                </div>
              </div>
              <button onClick={closeModal} className="text-white/70 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto p-6 space-y-5">
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-medium">
                  {formError}
                </div>
              )}

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-[#005530]">
                  <UserRound className="w-4 h-4 text-[#005530]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Account details</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5 sm:col-span-2">
                    <span className="text-[11px] font-bold uppercase text-slate-500">Full name</span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm focus:border-[#004428]"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-slate-500">Email address</span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm focus:border-[#004428]"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-slate-500">Phone</span>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm focus:border-[#004428]"
                    />
                  </label>

                  <label className="block space-y-1.5 sm:col-span-2">
                    <span className="text-[11px] font-bold uppercase text-slate-500">Role permission group</span>
                    <select
                      value={formData.role_id}
                      onChange={(e) => setFormData({ ...formData, role_id: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm focus:border-[#004428]"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.name} — {role.description}</option>
                      ))}
                    </select>
                  </label>

                  <label className="flex items-center gap-3 sm:col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4 accent-[#005530]"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      Account is active and allowed to sign in
                    </span>
                  </label>
                </div>
              </section>

              <section className="space-y-4 pt-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[#005530]">
                    <KeyRound className="w-4 h-4 text-[#005530]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">Login password</h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#004428] hover:text-[#005530]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate strong password
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-4">
                  <p className="text-[11px] text-slate-500">
                    {editingUser
                      ? 'Leave both fields blank to keep the current password. Enter a new one only if you want to reset it.'
                      : 'This password is required. The user will enter it on the admin login page.'}
                  </p>

                  <label className="block space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-slate-500">
                      {editingUser ? 'New password' : 'Password'}
                    </span>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder={editingUser ? 'Leave blank to keep current password' : 'Create a sign-in password'}
                        className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm focus:border-[#004428]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </label>

                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Password strength</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{strength.label}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${strength.barClass}`}
                          style={{ width: `${(strength.score / 4) * 100}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        {[
                          { ok: strength.checks.length, label: '8+ characters' },
                          { ok: strength.checks.letter, label: 'Contains a letter' },
                          { ok: strength.checks.number, label: 'Contains a number' },
                          { ok: strength.checks.symbol, label: 'Symbol recommended' },
                        ].map((item) => (
                          <span key={item.label} className={`inline-flex items-center gap-1.5 ${item.ok ? 'text-[#005530]' : 'text-slate-400'}`}>
                            <Check className="w-3 h-3" />
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <label className="block space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-slate-500">Confirm password</span>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder={editingUser ? 'Re-enter only if changing password' : 'Re-enter password'}
                        className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-white dark:bg-slate-900 border outline-none text-slate-900 dark:text-white text-sm ${
                          passwordsMatch ? 'border-slate-200 dark:border-slate-700 focus:border-[#004428]' : 'border-red-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((value) => !value)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        aria-label={showConfirm ? 'Hide confirmation' : 'Show confirmation'}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {!passwordsMatch && (
                      <p className="text-[11px] text-red-600">The two passwords do not match.</p>
                    )}
                  </label>
                </div>
              </section>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#005530] hover:bg-[#003822] text-white font-semibold text-sm disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editingUser ? 'Save Changes' : 'Create Account'}
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
