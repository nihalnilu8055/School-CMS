import React from 'react';
import { Award, ShieldCheck, Globe, CheckCircle } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const partners = [
    { title: "STEM Accredited Excellence", desc: "National STEM Education Council", icon: ShieldCheck },
    { title: "Advanced Placement (AP)", desc: "College Board Authorized Center", icon: Award },
    { title: "International Baccalaureate", desc: "IB World Partner Institution", icon: Globe },
    { title: "National Sports League", desc: "State Interscholastic Athletic Association", icon: CheckCircle }
  ];

  return (
    <section className="py-16 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-[#5B6775] mb-8">
          Recognized & Accredited By Leading Global Educational Bodies
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#F5F8FC] border border-[#E2E8F0] text-center flex flex-col items-center justify-center space-y-2 hover:border-[#12355B] transition duration-300 shadow-card"
              >
                <Icon className="w-8 h-8 text-[#1F5F8B]" />
                <h4 className="text-sm font-bold font-heading text-[#12355B]">{p.title}</h4>
                <p className="text-[11px] text-[#5B6775]">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
