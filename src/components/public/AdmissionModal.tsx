import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { X, Sparkles, CheckCircle2, Send, GraduationCap } from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  const { submitContactForm, content, settings } = useSite();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    gradeApplying: 'Grade 9 (AP Program)',
    previousSchool: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactForm({
      name: formData.parentName,
      email: formData.email,
      phone: formData.phone,
      subject: `Admission Application — ${formData.gradeApplying}`,
      message: `Student: ${formData.studentName}\nParent: ${formData.parentName}\nGrade: ${formData.gradeApplying}\nPrevious school: ${formData.previousSchool || 'Not provided'}`,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#005530]/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-6 relative overflow-y-auto max-h-[92vh]">
        
        <div className="flex justify-between items-start border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6f0eb] border border-[#E2E8F0] text-[#005530] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#005530]" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-[#005530]">{content.admissions_cta_label}</h3>
              <p className="text-xs text-[#004428] font-bold">{settings.school_name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#5B6775] hover:text-[#005530]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-[#2E7D5B] text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-heading text-[#005530]">Application Submitted!</h4>
            <p className="text-xs text-[#5B6775] leading-relaxed">
              We have received your enrolment application for {formData.studentName}. Our admissions desk will schedule a campus interview call shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#005530] uppercase mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Lucas Wright"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#e6f0eb] border border-[#E2E8F0] outline-none text-[#17202A] text-sm focus:border-[#005530]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#005530] uppercase mb-1">Parent / Guardian *</label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="e.g. Sarah Wright"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#e6f0eb] border border-[#E2E8F0] outline-none text-[#17202A] text-sm focus:border-[#005530]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#005530] uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#e6f0eb] border border-[#E2E8F0] outline-none text-[#17202A] text-sm focus:border-[#005530]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#005530] uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#e6f0eb] border border-[#E2E8F0] outline-none text-[#17202A] text-sm focus:border-[#005530]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#005530] uppercase mb-1">Grade Applying For</label>
              <select
                value={formData.gradeApplying}
                onChange={(e) => setFormData({ ...formData, gradeApplying: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#e6f0eb] border border-[#E2E8F0] outline-none text-[#17202A] text-sm cursor-pointer"
              >
                <option value="Primary (Grades 1-5)">Primary Foundation (Grades 1-5)</option>
                <option value="Middle School (Grades 6-8)">Middle School Discovery (Grades 6-8)</option>
                <option value="Grade 9 (AP Program)">High School Grade 9 (AP Prep)</option>
                <option value="Grade 10 (AP Program)">High School Grade 10</option>
                <option value="Grade 11-12 (AP Diploma)">Grade 11-12 AP Diploma</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#005530] hover:bg-[#003822] text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm mt-4"
            >
              <Send className="w-4 h-4 text-[#005530]" />
              <span>Submit Admission Application</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
