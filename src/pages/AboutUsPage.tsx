import React from 'react';
import { useSite } from '../context/SiteContext';
import { PAGE_CONTENT } from '../data/pageContent';
import { relatedNavForSlug } from '../data/navigation';
import { PageHero } from '../components/public/PageHero';
import { SafeImage } from '../components/common/SafeImage';
import { Compass, Target, Quote, ArrowRight } from 'lucide-react';
import { resolveFacilities } from './FacilitiesPage';

export const AboutUsPage: React.FC = () => {
  const { staff, settings, pages, content } = useSite();
  const aboutPage = pages.find((page) => page.slug === 'about' && page.is_published);
  const mission = PAGE_CONTENT['about/mission'];
  const aboutLinks = relatedNavForSlug('about')?.children || [];
  const facilities = resolveFacilities(content.facilities);
  const previewFacilities = facilities.slice(0, 4);
  const timeline = content.timeline?.length ? content.timeline : [];
  const go = (tab: string) => {
    window.history.pushState({}, '', `/${tab}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white pb-16 animate-fadeIn">
      <PageHero
        eyebrow={settings.school_name}
        title="About Our School"
        intro={aboutPage?.intro || 'Nurturing social, moral, and intellectual wisdom for the greater good.'}
        image={content.about_banner_image}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-[#005530] text-white p-8 sm:p-10">
          <Target className="w-8 h-8 text-white/70 mb-4" />
          <h2 className="text-2xl font-bold font-heading">Our Mission</h2>
          <p className="mt-3 text-white/90 leading-relaxed text-sm sm:text-base">
            {mission?.sections.find((section) => section.heading.toLowerCase().includes('mission'))?.body || mission?.sections[0]?.body}
          </p>
        </div>
        <div className="rounded-3xl border border-[#b7d0c4] bg-[#e6f0eb] p-8 sm:p-10">
          <Compass className="w-8 h-8 text-[#004428] mb-4" />
          <h2 className="text-2xl font-bold font-heading text-[#005530]">Our Vision</h2>
          <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
            {mission?.sections.find((section) => section.heading.toLowerCase().includes('vision'))?.body || 'Nurturing Social, Moral, and Intellectual Wisdom for the Greater Good.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl border border-slate-100 bg-white p-6 sm:p-10 shadow-subtle">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#e6f0eb]">
              <SafeImage src="/images/campus.jpg" alt="Ibn Seena English High School campus" type="building" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004428]">
              <Quote className="w-4 h-4" /> School philosophy
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#005530] leading-tight">
              Academic achievement without losing the whole child
            </h2>
            <p className="text-[#17202A] leading-relaxed">
              {mission?.sections.find((section) => section.heading.toLowerCase().includes('mission'))?.body}
            </p>
            <p className="text-[#17202A] leading-relaxed">
              {mission?.sections.find((section) => section.heading.toLowerCase().includes('vision'))?.body}
            </p>
          </div>
        </div>
      </section>

      {staff.filter((member) => member.is_active).length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#004428]">{content.staff_eyebrow || 'Faculty Directory'}</p>
              <h2 className="text-3xl font-bold font-heading text-[#005530] mt-2">{content.staff_heading || 'Educators & Leadership'}</h2>
            </div>
            <button
              onClick={() => go('about/staff')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#005530]"
            >
              See all faculty & staff <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.filter((member) => member.is_active).map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => go('about/staff')}
                className="text-left rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-subtle hover:shadow-card transition"
              >
                <div className="h-56 overflow-hidden bg-[#e6f0eb]">
                  <SafeImage src={member.photo_url} alt={member.name} type="person" className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-[#005530]">{member.name}</h3>
                  <p className="text-sm font-semibold text-[#004428] mt-1">{member.designation}</p>
                  {member.qualification && <p className="text-xs text-slate-500 mt-2">{member.qualification}</p>}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {aboutLinks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-[#004428]">Explore About Us</p>
          <h2 className="text-3xl font-bold font-heading text-[#005530] mt-2 mb-8">School information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aboutLinks.map((item) => (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                className="text-left rounded-2xl border border-[#b7d0c4] bg-[#e6f0eb] p-5 hover:bg-white hover:shadow-card transition"
              >
                <h3 className="font-heading font-bold text-[#005530]">{item.label}</h3>
                <p className="text-xs text-slate-500 mt-2">Read more</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {previewFacilities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#004428]">{content.facilities_eyebrow}</p>
              <h2 className="text-3xl font-bold font-heading text-[#005530] mt-2">{content.facilities_heading}</h2>
            </div>
            {facilities.length > 4 && (
              <button
                onClick={() => go('about/facilities')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#005530]"
              >
                See more facilities <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewFacilities.map((fac) => (
              <div key={fac.id} className="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-subtle">
                <div className="h-40 overflow-hidden bg-[#e6f0eb]">
                  <SafeImage src={fac.image} alt={fac.title} type="building" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-[#005530]">{fac.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {timeline.length > 0 && (
        <section className="bg-[#e6f0eb] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#004428]">{content.timeline_eyebrow}</p>
            <h2 className="text-3xl font-bold font-heading text-[#005530] mt-2 mb-8">{content.timeline_heading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {timeline.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 border border-[#b7d0c4]">
                  <p className="text-2xl font-extrabold font-heading text-[#005530]">{item.year}</p>
                  <h3 className="font-bold text-sm mt-2 text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
