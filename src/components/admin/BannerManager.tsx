import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { BannerSlide } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { Plus, Edit2, Trash2, Eye, Check, X, Image as ImageIcon } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const BannerManager: React.FC = () => {
  const { banners, addBanner, updateBanner, deleteBanner } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerSlide | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    button_text: 'Explore Academics',
    button_url: '/academics',
    image_url: '/images/campus.jpg',
    order_index: 1,
    is_active: true
  });

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      button_text: 'Explore Academics',
      button_url: '/academics',
      image_url: '/images/campus.jpg',
      order_index: banners.length + 1,
      is_active: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (b: BannerSlide) => {
    setEditingBanner(b);
    setFormData({
      title: b.title,
      subtitle: b.subtitle,
      button_text: b.button_text,
      button_url: b.button_url,
      image_url: b.image_url,
      order_index: b.order_index,
      is_active: b.is_active
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      updateBanner(editingBanner.id, formData);
    } else {
      addBanner(formData);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Hero Banner Slider Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage homepage full-width hero slides, captions, buttons, and ordering.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Slide Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((slide) => (
          <div key={slide.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between">
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <SafeImage src={slide.image_url} alt={slide.title} type="building" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                Slide #{slide.order_index}
              </div>
              <div className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                slide.is_active ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
              }`}>
                {slide.is_active ? 'Active' : 'Disabled'}
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">{slide.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{slide.subtitle}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-school-600 font-semibold">{slide.button_text} →</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(slide)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-school-50 text-slate-600 dark:text-slate-300 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(slide.id)}
                    className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Slide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                {editingBanner ? 'Edit Banner Slide' : 'Add New Hero Banner Slide'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Slide Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Subtitle / Description</label>
                <textarea
                  rows={3}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Button Text</label>
                  <input
                    type="text"
                    value={formData.button_text}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Button Action URL</label>
                  <input
                    type="text"
                    value={formData.button_url}
                    onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Background Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-school-600"
                  />
                  <span>Active & Visible on Homepage</span>
                </label>
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
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        title="Delete Banner Slide"
        message="Are you sure you want to delete this hero banner slide?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteBanner(deleteId)}
      />

    </div>
  );
};
