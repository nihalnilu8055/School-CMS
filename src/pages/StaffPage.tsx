import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { relatedNavForSlug } from '../data/navigation';
import { PageHero } from '../components/public/PageHero';
import { SafeImage } from '../components/common/SafeImage';
import { Search, Mail, Phone, Award, Briefcase } from 'lucide-react';

const go = (tab: string) => {
  window.history.pushState({}, '', tab === 'home' ? '/' : `/${tab}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const StaffPage: React.FC = () => {
  const { staff, departments, content } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<number | 'all'>('all');
  const aboutLinks = relatedNavForSlug('about')?.children || [];

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || member.department_id === Number(selectedDepartment);
    return matchesSearch && matchesDept && member.is_active;
  });

  return (
    <div className="bg-white pb-16 animate-fadeIn">
      <PageHero
        eyebrow={content.staff_eyebrow || 'Faculty'}
        title={content.staff_heading || 'Teachers & leadership'}
        intro={content.staff_intro || 'Meet the educators who guide learning at Ibn Seena English High School.'}
        image="/images/classroom-2.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or designation..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 outline-none text-sm focus:border-[#005530]"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full md:w-64 px-4 py-3 rounded-xl bg-white border border-slate-200 outline-none text-sm"
              >
                <option value="all">All departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {filteredStaff.length === 0 ? (
              <div className="text-center py-16 bg-[#f8fafc] rounded-3xl border border-slate-100 text-slate-400">
                No staff members match this search.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStaff.map((member) => {
                  const deptName = member.department_name || departments.find((d) => d.id === member.department_id)?.name || 'Faculty';
                  return (
                    <div key={member.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-card">
                      <div className="relative h-64 overflow-hidden bg-[#e6f0eb]">
                        <SafeImage src={member.photo_url} alt={member.name} type="person" className="w-full h-full object-cover object-top" />
                        <span className="absolute top-4 left-4 bg-white/95 text-[#005530] text-xs font-bold px-3 py-1 rounded-full">
                          {deptName}
                        </span>
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="text-xl font-bold font-heading text-[#005530]">{member.name}</h3>
                        <p className="text-sm font-semibold text-[#004428]">{member.designation}</p>
                        <div className="space-y-1.5 text-sm text-slate-600">
                          <div className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />{member.qualification}</div>
                          <div className="flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />{member.experience}</div>
                        </div>
                        {member.bio && <p className="text-sm text-slate-500 line-clamp-3">{member.bio}</p>}
                        <div className="pt-3 border-t border-slate-100 space-y-2 text-sm">
                          <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-slate-600 truncate">
                            <Mail className="w-3.5 h-3.5 text-[#005530] shrink-0" />{member.email}
                          </a>
                          {member.phone && (
                            <div className="flex items-center gap-2 text-slate-500">
                              <Phone className="w-3.5 h-3.5 text-[#005530] shrink-0" />{member.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-[#b7d0c4] bg-[#e6f0eb] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#004428] mb-3">Related to this</p>
              <div className="space-y-1">
                <button onClick={() => go('about')} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-white">
                  About overview
                </button>
                {aboutLinks.map((child) => (
                  <button
                    key={child.key}
                    onClick={() => go(child.key)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm ${
                      child.key === 'about/staff' ? 'bg-white text-[#005530] font-semibold' : 'text-slate-700 hover:bg-white'
                    }`}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
