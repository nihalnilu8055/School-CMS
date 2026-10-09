import React from 'react';
import { SafeImage } from '../common/SafeImage';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  intro,
  image = '/images/campus.jpg',
}) => {
  return (
    <section className="relative overflow-hidden bg-[#005530] text-white">
      <div className="absolute inset-0">
        <SafeImage src={image} alt="" type="building" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#005530]/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003822] via-[#005530]/70 to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 mb-3">{eyebrow}</p>
        <h1 className="max-w-3xl text-2xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight leading-tight">
          {title}
        </h1>
        {intro && (
          <p className="max-w-2xl mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
};
