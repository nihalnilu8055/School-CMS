import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { StaffMember } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { Plus, Edit2, Trash2, Search, Users, Mail, Phone, Award, X } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const StaffManager: React.FC = () => {
  const { staff, departments, addStaff, updateStaff, deleteStaff } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    photo_url: '/images/staff1.jpg',
    designation: 'Senior Faculty',
    department_id: 1,
    qualification: 'M.Sc. Education',
    experience: '10 Years',
    email: 'faculty@apexacademy.edu',
    phone: '+1 (555) 101-2099',
    bio: 'Dedicated educator passionate about student mentorship.',
    order_index: 1,
    is_active: true
  });

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      photo_url: '/images/staff1.jpg',
      designation: 'Senior Faculty',
      department_id: 1,
      qualification: 'M.Sc. Education',
      experience: '10 Years',
      email: 'faculty@apexacademy.edu',
      phone: '+1 (555) 101-2099',
      bio: 'Dedicated educator passionate about student mentorship.',
      order_index: staff.length + 1,
      is_active: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (s: StaffMember) => {
    setEditingStaff(s);
    setFormData({
      name: s.name,
      photo_url: s.photo_url,
      designation: s.designation,
      department_id: s.department_id,
      qualification: s.qualification,
      experience: s.experience,
      email: s.email,
      phone: s.phone || '',
      bio: s.bio || '',
      order_index: s.order_index,
      is_active: s.is_active
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deptObj = departments.find(d => d.id === Number(formData.department_id));

    if (editingStaff) {
      updateStaff(editingStaff.id, {
        ...formData,
        department_name: deptObj?.name
      });
    } else {
      addStaff({
        ...formData,
        department_name: deptObj?.name
      });
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Staff & Faculty Profile Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage teacher profiles, qualifications, department designations, contact details, and display ordering.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search staff by name or designation..."
          className="w-full bg-transparent outline-none text-xs text-slate-900 dark:text-white placeholder-slate-400"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-4">
              <SafeImage src={member.photo_url} alt="" type="person" className="w-16 h-16 rounded-2xl object-cover border-2 border-school-500" />
              <div>
                <h3 className="font-bold font-heading text-slate-900 dark:text-white text-base">{member.name}</h3>
                <p className="text-xs text-school-600 font-semibold">{member.designation}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{member.department_name || 'Faculty'}</p>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <p><strong className="text-slate-900 dark:text-white">Qualification:</strong> {member.qualification}</p>
              <p><strong className="text-slate-900 dark:text-white">Experience:</strong> {member.experience}</p>
              <p className="text-slate-400 truncate"><strong className="text-slate-900 dark:text-white">Email:</strong> {member.email}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Order #{member.order_index}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-school-50 text-slate-600 dark:text-slate-300 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(member.id)}
                  className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                {editingStaff ? 'Edit Faculty Profile' : 'Add New Faculty Member'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Teacher Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Department</label>
                  <select
                    value={formData.department_id}
                    onChange={(e) => setFormData({ ...formData, department_id: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
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
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        title="Remove Staff Profile"
        message="Are you sure you want to remove this faculty profile?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteStaff(deleteId)}
      />

    </div>
  );
};
