import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { PageHero } from '../components/public/PageHero';
import { BookOpen, FileText, Download, Calendar, Layers } from 'lucide-react';

export const AcademicsPage: React.FC = () => {
  const { programs, downloads, departments, content, events } = useSite();
  const [activeTab, setActiveTab] = useState<'programs' | 'departments' | 'calendar' | 'downloads'>('programs');

  return (
    <div className="bg-white pb-16 animate-fadeIn">
      <PageHero
        eyebrow={content.academics_eyebrow || 'Academics'}
        title={content.academics_heading || 'Academic programmes'}
        intro={content.academics_intro || 'Structured learning pathways, departments, calendar dates, and official downloads.'}
        image="/images/classroom.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-[#e6f0eb] rounded-2xl max-w-3xl mx-auto border border-[#b7d0c4]">
          {[
            { key: 'programs', label: 'Programmes', icon: Layers },
            { key: 'departments', label: 'Departments', icon: BookOpen },
            { key: 'calendar', label: 'Calendar', icon: Calendar },
            { key: 'downloads', label: 'Downloads', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm ${
                  activeTab === tab.key ? 'bg-[#005530] text-white' : 'text-[#005530] hover:bg-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div key={prog.id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card space-y-4">
                <span className="inline-block bg-[#e6f0eb] text-[#005530] font-bold text-xs px-3.5 py-1.5 rounded-full uppercase">
                  {prog.level} · {prog.duration}
                </span>
                <h3 className="text-xl font-bold font-heading text-[#005530]">{prog.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{prog.description}</p>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Curriculum</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{prog.curriculum_details}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-3xl p-7 border border-slate-100 shadow-card space-y-3">
                <span className="text-xs font-bold text-[#004428] uppercase tracking-wider">{dept.code}</span>
                <h3 className="text-lg font-bold font-heading text-[#005530]">{dept.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{dept.description}</p>
                <div className="pt-3 border-t border-slate-100 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Head: </span>{dept.head_name}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...events].sort((a, b) => a.event_date.localeCompare(b.event_date)).map((evt) => (
              <article key={evt.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-card space-y-3">
                <span className="inline-block bg-[#e6f0eb] text-[#005530] font-bold text-xs px-3 py-1 rounded-full uppercase">
                  {new Date(evt.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <h3 className="text-lg font-bold font-heading text-[#005530]">{evt.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{evt.description}</p>
                <p className="text-xs text-slate-500">{evt.start_time} – {evt.end_time} · {evt.location}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloads.map((dl) => (
              <div key={dl.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-card flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6f0eb] text-[#005530] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{dl.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{dl.file_type} · {dl.file_size}</p>
                  </div>
                </div>
                <a href={dl.file_url} className="bg-[#005530] text-white p-3 rounded-2xl shrink-0" title="Download">
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
