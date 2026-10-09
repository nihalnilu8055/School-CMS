import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface WelcomeSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ setCurrentTab }) => {
  const { content } = useSite();

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#b7d0c4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative max-w-xl mx-auto lg:mx-0 w-full">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-[22px] overflow-hidden aspect-[16/10] bg-[#e6f0eb] border border-[#b7d0c4]">
                <SafeImage
                  src="/images/classroom.jpg"
                  alt="Students learning at Ibn Seena English High School"
                  type="academic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[20px] overflow-hidden aspect-[4/3] bg-[#e6f0eb] border border-[#b7d0c4]">
                <SafeImage
                  src="/images/campus.jpg"
                  alt="Campus courtyard"
                  type="building"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-[20px] overflow-hidden aspect-[4/3] bg-[#e6f0eb] border border-[#b7d0c4]">
                <SafeImage
                  src="/images/lab.jpg"
                  alt="Science laboratory"
                  type="academic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f0eb] border border-[#b7d0c4] text-[#005530] text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#005530]" />
              {content.welcome_eyebrow}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#005530] leading-tight">
              {content.welcome_heading}
            </h2>

            <p className="text-[#17202A] text-base sm:text-lg leading-relaxed">
              {content.welcome_body}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {content.welcome_bullets.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#005530] shrink-0" />
                  <span className="text-sm font-semibold text-[#17202A]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => { setCurrentTab('about/mission'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-[#005530] hover:bg-[#004428] text-white font-semibold text-sm px-6 py-3.5 rounded-xl"
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
