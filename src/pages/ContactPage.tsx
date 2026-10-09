import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { PageHero } from '../components/public/PageHero';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, submitContactForm, content } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      submitContactForm(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 600);
  };

  return (
    <div className="bg-white pb-16 animate-fadeIn">
      <PageHero
        eyebrow={content.contact_eyebrow || 'Contact'}
        title={content.contact_heading || 'Contact the school'}
        intro={content.contact_intro || 'Have questions about admissions, timing, transport, or academics? The office is ready to help.'}
        image="/images/campus.jpg"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#e6f0eb] p-8 rounded-3xl border border-[#b7d0c4] space-y-5">
              <h3 className="text-xl font-bold font-heading text-[#005530]">Campus office</h3>
              {[
                { icon: MapPin, label: 'Address', value: settings.address },
                { icon: Phone, label: 'Phone', value: settings.phone },
                { icon: Mail, label: 'Email', value: settings.email },
                { icon: Clock, label: 'Office hours', value: settings.working_hours },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white text-[#005530] flex items-center justify-center shrink-0 border border-[#b7d0c4]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</h4>
                    <p className="text-sm font-medium text-slate-800 mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl overflow-hidden border border-[#b7d0c4] h-64 bg-[#e6f0eb]">
              <iframe title="School Location Map" src={settings.google_map_embed} width="100%" height="100%" style={{ border: 0 }} loading="lazy" />
            </div>
            {settings.google_maps_url && (
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#005530]"
              >
                Open campus location in Google Maps
              </a>
            )}
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-card space-y-6">
              <div>
                <h3 className="text-2xl font-bold font-heading text-[#005530]">Send a message</h3>
                <p className="text-sm text-slate-500 mt-1">The office will reply by email during working hours.</p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-3xl bg-[#e6f0eb] border border-[#b7d0c4] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#005530] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#005530] font-heading">Message received</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">Thank you. Our team will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="inline-block bg-[#005530] text-white font-semibold text-xs px-5 py-2.5 rounded-xl">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase mb-1">Your name *</label>
                      <input id="contact-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-2xl bg-[#f8fafc] border border-slate-200 outline-none text-sm focus:border-[#005530]" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase mb-1">Email *</label>
                      <input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-2xl bg-[#f8fafc] border border-slate-200 outline-none text-sm focus:border-[#005530]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
                      <input id="contact-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-2xl bg-[#f8fafc] border border-slate-200 outline-none text-sm focus:border-[#005530]" />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                      <select id="contact-subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-2xl bg-[#f8fafc] border border-slate-200 outline-none text-sm">
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Admissions 2026-27">Admissions 2026-27</option>
                        <option value="Fee & Transport Inquiry">Fee & Transport Inquiry</option>
                        <option value="Campus Tour Request">Campus Tour Request</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase mb-1">Message *</label>
                    <textarea id="contact-message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-2xl bg-[#f8fafc] border border-slate-200 outline-none text-sm focus:border-[#005530]" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#005530] hover:bg-[#003822] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Sending...' : 'Submit message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
