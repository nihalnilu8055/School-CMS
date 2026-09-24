import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { 
  BookOpen, FileText, Download, Calendar, Layers, 
  CheckCircle, Award, Sparkles, ExternalLink 
} from 'lucide-react';

export const AcademicsPage: React.FC = () => {
  const { programs, downloads, departments } = useSite();
  const [activeTab, setActiveTab] = useState<'programs' | 'departments' | 'calendar' | 'downloads'>('programs');

  return (
    <div className="py-12 space-y-12 bg-[#F5F8FC]">
      
      {/* Page Header - Deep Academic Navy */}
      <section className="bg-[#12355B] text-white py-16 border-b border-[#0D2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F5F8B] text-white text-xs font-semibold uppercase tracking-wider border border-[#C9A227]/40">
            <BookOpen className="w-4 h-4 text-[#C9A227]" />
            Comprehensive K-12 Curriculum
          </div>
          <h1 className="text-4xl font-bold font-heading text-white">
            Academic Excellence & Programs
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm">
            Discover our structured learning pathways, department leadership, examination schedules, and official downloadable guides.
          </p>
        </div>
      </section>

      {/* Tabs Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-2xl max-w-2xl mx-auto border border-[#E2E8F0] shadow-subtle">
          {[
            { key: 'programs', label: 'Academic Programs', icon: Layers },
            { key: 'departments', label: 'Departments', icon: BookOpen },
            { key: 'calendar', label: 'Academic Calendar', icon: Calendar },
            { key: 'downloads', label: 'PDF Downloads', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#12355B] text-white shadow-sm font-bold border-b-2 border-[#C9A227]'
                    : 'text-[#5B6775] hover:text-[#12355B] hover:bg-[#F5F8FC]'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.key ? 'text-[#C9A227]' : 'text-[#1F5F8B]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        
        {/* Programs */}
        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
            {programs.map((prog) => (
              <div 
                key={prog.id}
                className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <span className="inline-block bg-[#F5F8FC] text-[#12355B] border border-[#E2E8F0] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {prog.level} Level ({prog.duration})
                  </span>
                  <h3 className="text-xl font-bold font-heading text-[#12355B] leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-[#5B6775] leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
                  <h4 className="text-xs font-bold text-[#1F5F8B] uppercase tracking-wider">Curriculum Details</h4>
                  <p className="text-xs text-[#17202A] leading-relaxed font-medium">
                    {prog.curriculum_details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Departments */}
        {activeTab === 'departments' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all space-y-3">
                <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">{dept.code}</span>
                <h3 className="text-lg font-bold font-heading text-[#12355B]">{dept.name}</h3>
                <p className="text-xs text-[#5B6775]">{dept.description}</p>
                <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#5B6775]">
                  <span className="font-semibold text-[#12355B]">Head: </span>{dept.head_name}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar & Examinations */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-card space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold font-heading text-[#12355B] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#1F5F8B]" />
              Academic Term Key Dates (2026-2027)
            </h3>
            <div className="space-y-4">
              {[
                { date: "Oct 15 - Oct 16, 2026", title: "Fall Parent-Teacher Conference", type: "Conference" },
                { date: "Nov 20 - Nov 28, 2026", title: "Mid-Term Examinations (Grades 6-12)", type: "Exams" },
                { date: "Dec 18, 2026 - Jan 04, 2027", title: "Winter Break Holidays", type: "Holiday" },
                { date: "Mar 10 - Mar 20, 2027", title: "Spring Semester Final AP Assessments", type: "Exams" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#12355B]">{item.title}</h4>
                    <p className="text-xs text-[#5B6775]">{item.date}</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#1F5F8B] shrink-0 w-fit">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Downloads */}
        {activeTab === 'downloads' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold font-heading text-[#12355B] mb-6">
              Official School Prospectus & Printable Forms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloads.map((dl) => (
                <div key={dl.id} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] text-[#12355B] flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-[#12355B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#12355B]">{dl.title}</h4>
                      <p className="text-xs text-[#5B6775]">{dl.file_type} • {dl.file_size} • {dl.downloads_count} downloads</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading: ${dl.title}`)}
                    className="bg-[#12355B] hover:bg-[#0D2A47] text-white p-2.5 rounded-xl transition shrink-0"
                    title="Download File"
                  >
                    <Download className="w-4 h-4 text-[#C9A227]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
