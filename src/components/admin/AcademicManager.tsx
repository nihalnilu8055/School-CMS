import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { AcademicProgram } from '../../types';
import { Plus, Edit2, Trash2, BookOpen, Layers, X } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const AcademicManager: React.FC = () => {
  const { programs, addProgram, updateProgram, deleteProgram, departments, addDepartment, updateDepartment, deleteDepartment } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<AcademicProgram | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deptForm, setDeptForm] = useState({ name: '', code: '', description: '', head_name: '' });
  const [editingDeptId, setEditingDeptId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    code: 'SEC',
    level: 'Secondary' as any,
    description: '',
    curriculum_details: '',
    duration: '4 Years',
    is_active: true
  });

  const handleOpenAdd = () => {
    setEditingProgram(null);
    setFormData({
      title: '',
      code: 'SEC',
      level: 'Secondary',
      description: '',
      curriculum_details: '',
      duration: '4 Years',
      is_active: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: AcademicProgram) => {
    setEditingProgram(p);
    setFormData({
      title: p.title,
      code: p.code,
      level: p.level,
      description: p.description,
      curriculum_details: p.curriculum_details,
      duration: p.duration,
      is_active: p.is_active
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProgram) {
      updateProgram(editingProgram.id, formData);
    } else {
      addProgram(formData);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Academic Programs & Curriculum Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure primary, middle, and AP high school programs and course subjects.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Academic Program</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((prog) => (
          <div key={prog.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-school-100 text-school-700 uppercase">
                {prog.level} • {prog.duration}
              </span>
              <h3 className="font-bold font-heading text-slate-900 dark:text-white text-base">{prog.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{prog.description}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button onClick={() => handleOpenEdit(prog)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => setDeleteId(prog.id)} className="p-2 rounded-xl bg-red-50 text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                {editingProgram ? 'Edit Program' : 'Add Program'}
              </h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase mb-1">Grade Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  >
                    <option value="Primary">Primary</option>
                    <option value="Middle">Middle</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Higher Secondary">Higher Secondary</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Save Program</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete Academic Program"
        message="Are you sure you want to delete this program?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteProgram(deleteId)}
      />

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">Departments</h3>
        <p className="text-xs text-slate-500">These appear on the Academics page and as staff filters.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
              <p className="font-bold text-slate-900 dark:text-white">{dept.name} <span className="text-xs text-school-600">{dept.code}</span></p>
              <p className="text-xs text-slate-500">{dept.description}</p>
              <p className="text-xs text-slate-500">Head: {dept.head_name}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setEditingDeptId(dept.id); setDeptForm({ name: dept.name, code: dept.code, description: dept.description, head_name: dept.head_name }); }} className="p-2 rounded-xl bg-slate-100"><Edit2 className="w-4 h-4" /></button>
                <button type="button" onClick={() => deleteDepartment(dept.id)} className="p-2 rounded-xl bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editingDeptId) updateDepartment(editingDeptId, deptForm);
            else addDepartment(deptForm);
            setEditingDeptId(null);
            setDeptForm({ name: '', code: '', description: '', head_name: '' });
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800"
        >
          <input required placeholder="Department name" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm" />
          <input required placeholder="Code" value={deptForm.code} onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm" />
          <input placeholder="Description" value={deptForm.description} onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm" />
          <input placeholder="Head of department" value={deptForm.head_name} onChange={(e) => setDeptForm({ ...deptForm, head_name: e.target.value })} className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm" />
          <button type="submit" className="sm:col-span-2 bg-school-600 text-white font-semibold py-2 rounded-xl text-sm">
            {editingDeptId ? 'Update Department' : 'Add Department'}
          </button>
        </form>
      </div>

    </div>
  );
};
