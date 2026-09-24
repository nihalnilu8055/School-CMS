import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  MapPin, Phone, Mail, Clock, Send, 
  CheckCircle2, Sparkles, MessageSquare 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, submitContactForm } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
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
    <div className="py-12 space-y-12 bg-[#F5F8FC]">
      
      {/* Header - Deep Academic Navy */}
      <section className="bg-[#12355B] text-white py-16 border-b border-[#0D2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F5F8B] text-white text-xs font-semibold uppercase tracking-wider border border-[#C9A227]/40">
            <MessageSquare className="w-4 h-4 text-[#C9A227]" />
            Get In Touch With Admissions & Faculty
          </div>
          <h1 className="text-4xl font-bold font-heading text-white">
            Contact Apex Academy
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm">
            Have questions regarding K-12 admissions, campus visits, or athletic programs? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-card space-y-6">
              <h3 className="text-xl font-bold font-heading text-[#12355B] border-b border-[#E2E8F0] pb-4">
                Campus Location & Info
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-[#1F5F8B] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#1F5F8B]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5B6775] uppercase tracking-wider">School Address</h4>
                    <p className="text-sm font-semibold text-[#17202A] mt-1">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-[#1F5F8B] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#1F5F8B]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5B6775] uppercase tracking-wider">Phone Numbers</h4>
                    <p className="text-sm font-semibold text-[#17202A] mt-1">{settings.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-[#1F5F8B] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#1F5F8B]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5B6775] uppercase tracking-wider">Email Address</h4>
                    <p className="text-sm font-semibold text-[#17202A] mt-1">{settings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-[#1F5F8B] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#1F5F8B]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5B6775] uppercase tracking-wider">Office Hours</h4>
                    <p className="text-sm font-semibold text-[#17202A] mt-1">{settings.working_hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-card bg-white h-64">
              <iframe
                title="School Location Map"
                src={settings.google_map_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E2E8F0] shadow-card space-y-6">
              
              <div>
                <h3 className="text-2xl font-bold font-heading text-[#12355B]">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-[#5B6775] mt-1">
                  Fill out the form below. Your inquiry will be logged into our CMS database and assigned to an admissions counselor.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#F5F8FC] border border-[#2E7D5B] text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-[#2E7D5B] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#12355B] font-heading">
                    Thank You! Message Received.
                  </h4>
                  <p className="text-sm text-[#5B6775] max-w-md mx-auto">
                    Your inquiry has been successfully recorded in our database. Our admissions department will reach out via email within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-block bg-[#12355B] hover:bg-[#0D2A47] text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12355B] uppercase mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] placeholder-[#5B6775] focus:border-[#12355B] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12355B] uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. eleanor@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] placeholder-[#5B6775] focus:border-[#12355B] transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12355B] uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] placeholder-[#5B6775] focus:border-[#12355B] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12355B] uppercase mb-1">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Admissions 2026-27">Admissions 2026-27</option>
                        <option value="Campus Tour Request">Campus Tour Request</option>
                        <option value="STEM / Athletics Inquiry">STEM / Athletics Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12355B] uppercase mb-1">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please enter your detailed inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] placeholder-[#5B6775] focus:border-[#12355B] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#12355B] hover:bg-[#0D2A47] text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting to Database...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#C9A227]" />
                        <span>Submit Message to CMS</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
