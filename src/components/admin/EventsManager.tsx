import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { EventItem } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { Plus, Edit2, Trash2, Calendar, MapPin, Clock, X } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const EventsManager: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    location: 'Main Auditorium',
    event_date: '2026-10-30',
    start_time: '09:00 AM',
    end_time: '04:00 PM',
    banner_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    is_featured: true
  });

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      location: 'Main Auditorium',
      event_date: '2026-10-30',
      start_time: '09:00 AM',
      end_time: '04:00 PM',
      banner_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      is_featured: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (evt: EventItem) => {
    setEditingEvent(evt);
    setFormData({
      title: evt.title,
      slug: evt.slug,
      description: evt.description,
      location: evt.location,
      event_date: evt.event_date,
      start_time: evt.start_time,
      end_time: evt.end_time,
      banner_image: evt.banner_image,
      is_featured: evt.is_featured
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slugVal = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editingEvent) {
      updateEvent(editingEvent.id, { ...formData, slug: slugVal });
    } else {
      addEvent({ ...formData, slug: slugVal });
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            School Events & Calendar Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create upcoming academic, sports, and cultural events with dates, timings, and banner photos.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add School Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div key={evt.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md p-5 space-y-4">
            <div className="h-40 rounded-2xl overflow-hidden bg-slate-900 relative">
              <SafeImage src={evt.banner_image} alt="" type="building" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-school-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {evt.event_date}
              </div>
            </div>
            <div>
              <h3 className="font-bold font-heading text-slate-900 dark:text-white text-base">{evt.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{evt.description}</p>
              <div className="mt-2 space-y-1 text-xs text-slate-400">
                <p>📍 {evt.location}</p>
                <p>⏰ {evt.start_time} - {evt.end_time}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button onClick={() => handleOpenEdit(evt)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => setDeleteId(evt.id)} className="p-2 rounded-xl bg-red-50 text-red-600">
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
                {editingEvent ? 'Edit Event' : 'Add Event'}
              </h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Event Title *</label>
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
                  <label className="block font-bold uppercase mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                <button type="submit" className="px-5 py-2 bg-school-600 text-white font-semibold rounded-xl">Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteEvent(deleteId)}
      />

    </div>
  );
};
