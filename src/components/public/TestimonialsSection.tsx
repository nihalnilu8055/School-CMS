import React from 'react';
import { Quote, Star } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';
import { useSite } from '../../context/SiteContext';
import { Testimonial } from '../../types';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: 'Ibn Seena English High School provided my children with not just academic success, but strong moral grounding and confidence.',
    name: 'Dr. Hamza Rahman',
    role: 'Parent of Grade 9 Scholar',
    avatar: '/images/parent2.jpg',
    stars: 5,
  },
  {
    id: 2,
    quote: 'Teachers are approachable, classrooms stay calm, and my daughter looks forward to assembly and library time every week.',
    name: 'Amina Joseph',
    role: 'Parent of Grade 4 Student',
    avatar: '/images/parent1.jpg',
    stars: 5,
  },
  {
    id: 3,
    quote: 'As an alumnus, I still use the writing and ethics I learned here. The school treats graduates as part of one family.',
    name: 'Faris Al-Najjar',
    role: 'Alumnus, Class of 2020',
    avatar: '/images/alumni.jpg',
    stars: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const { content } = useSite();
  const saved = content.testimonials?.length ? content.testimonials : [];
  const extras = FALLBACK_TESTIMONIALS.filter((item) => !saved.some((current) => current.name === item.name));
  const testimonials = (saved.length >= 3 ? saved : [...saved, ...extras]).slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-[#e6f0eb] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#005530] text-xs font-bold uppercase tracking-wider mb-3 shadow-subtle">
            <Quote className="w-3.5 h-3.5 text-[#005530]" />
            {content.testimonials_eyebrow}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#005530]">
            {content.testimonials_heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#005530]">
                  {[...Array(t.stars || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#005530] text-[#005530]" />
                  ))}
                </div>
                <p className="text-sm text-[#5B6775] italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#E2E8F0]">
                <SafeImage
                  src={t.avatar}
                  alt={t.name}
                  type="person"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#005530]"
                />
                <div>
                  <h4 className="text-sm font-bold font-heading text-[#005530]">{t.name}</h4>
                  <p className="text-xs text-[#5B6775]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
