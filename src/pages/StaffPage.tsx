import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Search, Filter, Mail, Phone, GraduationCap, Award, Briefcase } from 'lucide-react';
import { SafeImage } from '../components/common/SafeImage';

export const StaffPage: React.FC = () => {
  const { staff, departments } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<number | 'all'>('all');

  const filteredStaff = staff.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || member.department_id === Number(selectedDepartment);
    return matchesSearch && matchesDept && member.is_active;
  });

  return (
    <div className="py-12 space-y-12 bg-[#F5F8FC]">
      
      {/* Header - Deep Academic Navy */}
      <section className="bg-[#12355B] text-white py-16 border-b border-[#0D2A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F5F8B] text-white text-xs font-semibold uppercase tracking-wider border border-[#C9A227]/40">
            <GraduationCap className="w-4 h-4 text-[#C9A227]" />
            Distinguished Faculty & Leadership
          </div>
          <h1 className="text-4xl font-bold font-heading text-white">
            Meet Our Teachers & Educators
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm">
            Our team of world-class educators bring decades of academic mastery, research passion, and personal mentorship to Apex Academy.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-card flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-[#5B6775] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name, qualification, or designation..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] placeholder-[#5B6775] focus:border-[#12355B] transition"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-[#5B6775] shrink-0" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full md:w-64 px-3.5 py-2.5 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] outline-none text-sm text-[#17202A] cursor-pointer"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Staff Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredStaff.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E2E8F0] text-[#5B6775]">
            No faculty members match your selected search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((member) => {
              const deptName = member.department_name || departments.find(d => d.id === member.department_id)?.name || 'Faculty';

              return (
                <div 
                  key={member.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-64 overflow-hidden bg-[#F5F8FC]">
                    <SafeImage
                      src={member.photo_url}
                      alt={member.name}
                      type="person"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#12355B] text-white text-xs font-semibold px-3 py-1 rounded-full border border-[#C9A227]/50 shadow-sm">
                      {deptName}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-heading text-[#12355B] group-hover:text-[#1F5F8B] transition">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-[#1F5F8B]">
                        {member.designation}
                      </p>

                      <div className="space-y-1.5 pt-2 text-xs text-[#5B6775]">
                        <div className="flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                          <span>{member.qualification}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-[#1F5F8B] shrink-0" />
                          <span>{member.experience} Experience</span>
                        </div>
                      </div>

                      {member.bio && (
                        <p className="text-xs text-[#5B6775] pt-2 line-clamp-3 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#E2E8F0] space-y-2 text-xs">
                      <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-[#5B6775] hover:text-[#12355B] transition truncate">
                        <Mail className="w-3.5 h-3.5 text-[#1F5F8B] shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </a>
                      {member.phone && (
                        <div className="flex items-center gap-2 text-[#5B6775]">
                          <Phone className="w-3.5 h-3.5 text-[#1F5F8B] shrink-0" />
                          <span>{member.phone}</span>
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

    </div>
  );
};
