import React from 'react';
import { Award, ShieldCheck, Globe } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { Partner } from '../../types';

const ICONS = [ShieldCheck, Award, Globe];

const FALLBACK_PARTNERS: Partner[] = [
  { id: 1, title: 'STEM Accredited', desc: 'National Science Education Board' },
  { id: 2, title: 'Holistic Pedagogy', desc: 'Global Education Council' },
  { id: 3, title: 'Character Education', desc: 'Values & Citizenship Network' },
];

export const PartnersSection: React.FC = () => {
  const { content } = useSite();
  const saved = content.partners?.length ? content.partners : [];
  const extras = FALLBACK_PARTNERS.filter((item) => !saved.some((current) => current.title === item.title));
  const partners = (saved.length >= 3 ? saved : [...saved, ...extras]).slice(0, 3);

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-[#5B6775] mb-8">
          {content.partners_heading}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {partners.map((p, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={p.id}
                className="p-6 rounded-2xl bg-[#e6f0eb] border border-[#E2E8F0] text-center flex flex-col items-center justify-center space-y-2"
              >
                <Icon className="w-8 h-8 text-[#004428]" />
                <h4 className="text-sm font-bold font-heading text-[#005530]">{p.title}</h4>
                <p className="text-[11px] text-[#5B6775]">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
