import React from 'react';
import { useSite } from '../context/SiteContext';
import { PAGE_CONTENT } from '../data/pageContent';
import { relatedNavForSlug } from '../data/navigation';
import { PageHero } from '../components/public/PageHero';
import { SafeImage } from '../components/common/SafeImage';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Facility } from '../types';

const FALLBACK_FACILITIES: Facility[] = [
  { id: 1, title: 'STEM & Science Labs', desc: 'Advanced robotics and molecular chemistry workstations.', image: '/images/lab.jpg' },
  { id: 2, title: 'Central Resource Library', desc: '35,000+ reference volumes and digital archives.', image: '/images/library.jpg' },
  { id: 3, title: 'Sports Ground & Courts', desc: 'Athletics track, football field, and indoor games hall.', image: '/images/sports.jpg' },
  { id: 4, title: 'Main Auditorium', desc: 'Assembly, annual day, and parent briefing space.', image: '/images/auditorium.jpg' },
  { id: 5, title: 'Smart Classrooms', desc: 'Calm, well-lit rooms with boards and digital screens.', image: '/images/classroom.jpg' },
  { id: 6, title: 'Campus & Gardens', desc: 'Open lawns and shaded walkways for break and arrival.', image: '/images/campus.jpg' },
  { id: 7, title: 'Student Commons', desc: 'Cafeteria and gathering spaces for clubs and lunch.', image: '/images/students.jpg' },
  { id: 8, title: 'Art & Activity Studios', desc: 'Art, music, and co-curricular rooms for hands-on work.', image: '/images/classroom.jpg' },
];

export const resolveFacilities = (saved?: Facility[]) => {
  const current = saved?.length ? saved : [];
  if (current.length >= 4) return current;
  const extras = FALLBACK_FACILITIES.filter((item) => !current.some((savedItem) => savedItem.title === item.title));
  return [...current, ...extras];
};

const go = (tab: string) => {
  window.history.pushState({}, '', tab === 'home' ? '/' : `/${tab}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const FacilitiesPage: React.FC = () => {
  const { content } = useSite();
  const facilities = resolveFacilities(content.facilities);
  const aboutLinks = relatedNavForSlug('about')?.children || [];
  const mission = PAGE_CONTENT['about/mission'];

  return (
    <div className="bg-white pb-16 animate-fadeIn">
      <PageHero
        eyebrow={content.facilities_eyebrow || 'Infrastructure'}
        title={content.facilities_heading || 'Campus Facilities'}
        intro="Laboratories, library, sports, and learning spaces that support academic and personal growth."
        image={content.about_banner_image}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => go('about')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#032f23] bg-[#e8f0ed] border border-[#c5d5ce] px-4 py-2 rounded-xl mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to About Us
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {facilities.map((fac) => (
                <article key={fac.id} className="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-subtle">
                  <div className="h-44 overflow-hidden bg-[#e8f0ed]">
                    <SafeImage src={fac.image} alt={fac.title} type="building" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading font-bold text-[#032f23]">{fac.title}</h2>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{fac.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-[#c5d5ce] bg-[#e8f0ed] p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#054433] mb-3">Related to this</p>
              <div className="space-y-1">
                <button onClick={() => go('about')} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-white">
                  About overview
                </button>
                {aboutLinks.map((child) => (
                  <button
                    key={child.key}
                    onClick={() => go(child.key)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-white"
                  >
                    {child.label}
                  </button>
                ))}
                <button onClick={() => go('gallery')} className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-white">
                  Photo gallery
                </button>
              </div>
            </div>
            <div className="rounded-2xl bg-[#032f23] text-white p-6">
              <h3 className="font-heading font-bold text-lg">Visit the campus</h3>
              <p className="text-sm text-white/80 mt-2 leading-relaxed">
                {mission?.intro || 'Book a short tour to see classrooms, labs, and the library in person.'}
              </p>
              <button
                onClick={() => go('contact')}
                className="mt-4 inline-flex items-center gap-2 bg-white text-[#032f23] font-semibold text-sm px-4 py-2.5 rounded-xl"
              >
                Contact the office <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
