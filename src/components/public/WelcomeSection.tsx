import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Quote, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface WelcomeSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ setCurrentTab }) => {
  const { staff, content } = useSite();
  const principal = staff.find(s => s.designation.toLowerCase().includes('principal')) || staff[0];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#c5d5ce]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative max-w-md mx-auto lg:mx-0 w-full">
            <div className="absolute top-4 left-4 right-[-12px] bottom-[-12px] rounded-[28px] bg-[#032f23] hidden sm:block" />
            <article className="relative z-10 bg-white p-3 sm:p-3.5 rounded-[24px] shadow-card-hover border border-[#c5d5ce]">
              <div className="relative rounded-[18px] overflow-hidden aspect-[4/5] bg-[#e8f0ed]">
                <SafeImage
                  src={principal?.photo_url || '/images/staff1.jpg'}
                  alt={principal?.name || 'Principal'}
                  type="person"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021f18] via-[#021f18]/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                    School Leadership
                  </p>
                  <h3 className="mt-1.5 text-xl sm:text-2xl font-bold font-heading text-white leading-tight">
                    {principal?.name || 'Dr. Robert Vance'}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-[15px] font-medium text-white leading-snug">
                    {principal?.designation || 'Principal & Chief Academic Officer'}
                  </p>
                </div>
              </div>

              <div className="mt-3.5 p-4 rounded-2xl bg-[#e8f0ed] border border-[#c5d5ce] flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#032f23] shrink-0 mt-0.5" />
                <p className="text-sm text-[#17202A] leading-relaxed">
                  “{content.welcome_quote}”
                </p>
              </div>
            </article>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f0ed] border border-[#c5d5ce] text-[#032f23] text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#032f23]" />
              {content.welcome_eyebrow}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#032f23] leading-tight">
              {content.welcome_heading}
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              {content.welcome_body}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {content.welcome_bullets.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#032f23] shrink-0" />
                  <span className="text-sm font-semibold text-[#17202A]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-[#032f23] hover:bg-[#054433] text-white font-semibold text-sm px-6 py-3.5 rounded-xl"
              >
                <span>{content.welcome_cta}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
