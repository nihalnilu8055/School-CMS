import React from 'react';
import { Users, GraduationCap, School, Trophy, Sparkles } from 'lucide-react';

export const HighlightsStats: React.FC = () => {
  const stats = [
    {
      label: "Enrolled Students",
      value: "2,400+",
      desc: "K-12 Active Learners",
      icon: Users,
    },
    {
      label: "Expert Faculty",
      value: "180+",
      desc: "Advanced Degree Educators",
      icon: GraduationCap,
    },
    {
      label: "Smart Classrooms",
      value: "65+",
      desc: "Tech & STEM Research Labs",
      icon: School,
    },
    {
      label: "Years of Excellence",
      value: "35+",
      desc: "Legacy of Leadership",
      icon: Trophy,
    }
  ];

  return (
    <section className="py-16 bg-[#F5F8FC] border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#12355B] text-xs font-bold uppercase tracking-wider mb-3 shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            Key School Milestones
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12355B]">
            Apex Academy at a Glance
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx}
                className="group relative bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] flex items-center justify-center text-[#C9A227]">
                      <IconComponent className="w-6 h-6 text-[#C9A227]" />
                    </div>
                    <span className="text-3xl font-extrabold font-heading text-[#12355B] tracking-tight">
                      {item.value}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-heading text-[#12355B]">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#5B6775] mt-1">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 h-1 w-full rounded-full bg-[#12355B] group-hover:bg-[#C9A227] transition-colors"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
