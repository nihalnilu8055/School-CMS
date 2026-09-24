import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Quote, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface WelcomeSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ setCurrentTab }) => {
  const { staff } = useSite();
  const principal = staff.find(s => s.designation.toLowerCase().includes('principal')) || staff[0];

  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Principal Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-white p-4 rounded-3xl shadow-card border border-[#E2E8F0]">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#F5F8FC]">
                <SafeImage
                  src={principal?.photo_url || "/images/staff1.jpg"}
                  alt={principal?.name || "Principal"}
                  fallbackType="person"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12355B]/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold font-heading text-white">{principal?.name || "Dr. Robert Vance"}</h3>
                  <p className="text-xs text-[#C9A227] font-semibold">{principal?.designation || "Principal & Chief Administrator"}</p>
                </div>
              </div>

              {/* Quote Badge */}
              <div className="mt-4 p-4 rounded-xl bg-[#F5F8FC] border border-[#E2E8F0] flex items-start gap-3">
                <Quote className="w-7 h-7 text-[#C9A227] shrink-0 mt-0.5" />
                <p className="text-xs text-[#17202A] italic leading-relaxed font-medium">
                  "At Apex Academy, we believe education is not the filling of a pail, but the lighting of a fire."
                </p>
              </div>
            </div>

            {/* Decorative Background Accents */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#C9A227]/30 rounded-3xl pointer-events-none hidden sm:block"></div>
          </div>

          {/* Right Column: School Introduction & Welcome Message */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F8FC] border border-[#E2E8F0] text-[#12355B] text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#C9A227]" />
              Welcome to Apex Academy
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#12355B] leading-tight">
              Transforming Curiosity Into Innovation & Character
            </h2>

            <p className="text-[#5B6775] text-base leading-relaxed">
              Founded on the principles of academic rigor, character development, and global innovation, Apex Academy has been empowering students for over 35 years. Our modern campus combines cutting-edge STEM laboratories, expansive athletics facilities, and immersive digital learning environments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "Advanced Placement (AP) & STEM Curriculum",
                "Dedicated Mentorship & Small Class Ratios",
                "Championship Athletics & Aquatic Center",
                "Global Cultural & Exchange Programs"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#1F5F8B] shrink-0" />
                  <span className="text-sm font-semibold text-[#17202A]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-2 bg-[#12355B] hover:bg-[#0D2A47] text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-all"
              >
                <span>Read Full Principal's Message</span>
                <ArrowRight className="w-4 h-4 text-[#C9A227]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
