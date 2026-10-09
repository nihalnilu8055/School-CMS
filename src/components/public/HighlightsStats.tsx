import React from 'react';
import { useSite } from '../../context/SiteContext';

export const HighlightsStats: React.FC = () => {
  const { content } = useSite();

  return (
    <section className="bg-[#005530] py-12 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {content.stats.map((item) => (
            <div key={item.id} className="text-center flex flex-col items-center justify-center">
              <p className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">{item.value}</p>
              <p className="mt-2 text-sm font-semibold text-white/80">{item.label}</p>
              <p className="text-xs text-white/75 mt-1 hidden sm:block">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
