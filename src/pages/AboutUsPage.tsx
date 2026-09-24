import React from 'react';
import { useSite } from '../context/SiteContext';
import { SafeImage } from '../components/common/SafeImage';
import { 
  History, Compass, Target, Quote, Building2, Trophy, 
  Milestone, CheckCircle, GraduationCap, ShieldCheck, Sparkles 
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { staff, settings } = useSite();
  const principal = staff.find(s => s.designation.toLowerCase().includes('principal')) || staff[0];

  const facilities = [
    { title: "Advanced STEM & Biotech Labs", desc: "Equipped with PCR thermocyclers, 3D printers, and robotics testing rigs.", image: "/images/lab.jpg" },
    { title: "Central Digital Library", desc: "Over 40,000 physical volumes and unlimited online academic journals.", image: "/images/library.jpg" },
    { title: "Olympic Aquatic & Sports Complex", desc: "Heated 50m swimming pool, indoor basketball courts, and FIFA track.", image: "/images/sports.jpg" },
    { title: "600-Seat Symphony Auditorium", desc: "Acoustically tuned concert hall hosting annual orchestra and theater plays.", image: "/images/concert.jpg" }
  ];

  const timeline = [
    { year: "1991", title: "School Foundation", desc: "Established with 120 primary students and a vision for holistic learning." },
    { year: "2002", title: "Campus Expansion", desc: "Constructed the High School Wing, Symphony Hall, and Central Library." },
    { year: "2012", title: "STEM & AP Certification", desc: "Authorized College Board AP Testing Center with dedicated robotics labs." },
    { year: "2020", title: "Eco-Smart Campus Launch", desc: "Solar-powered microgrid installation and digital smart classrooms." },
    { year: "2026", title: "Global STEM Champions", desc: "Awarded 1st Place at the International Youth Innovation Summit in Geneva." }
  ];

  return (
    <div className="py-12 space-y-16 bg-[#FFFFFF]">
      
      {/* Banner - Deep Academic Navy */}
      <section className="relative bg-[#12355B] text-white py-20 overflow-hidden border-b border-[#0D2A47]">
        <div className="absolute inset-0 opacity-15">
          <SafeImage src="/images/campus.jpg" alt="About" type="building" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F5F8B] border border-[#C9A227]/40 text-white text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-[#C9A227]" />
            Empowering Future Leaders Since 1991
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight text-white">
            About {settings.school_name.split('&')[0]}
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-base">
            Discover our heritage, core values, state-of-the-art facilities, and visionary leadership driving academic excellence.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#12355B] text-white p-8 rounded-3xl shadow-card space-y-4 border border-[#0D2A47]">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-[#C9A227]/30">
              <Compass className="w-6 h-6 text-[#C9A227]" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Our Vision</h2>
            <p className="text-slate-200 leading-relaxed text-sm">
              To be a globally recognized institution that nurtures inquisitive minds, ethical leaders, and creative thinkers equipped to solve complex 21st-century challenges.
            </p>
          </div>

          <div className="bg-[#1F5F8B] text-white p-8 rounded-3xl shadow-card space-y-4 border border-[#12355B]">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Target className="w-6 h-6 text-[#C9A227]" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Our Mission</h2>
            <p className="text-slate-100 leading-relaxed text-sm">
              To provide a rigorous, inclusive, and technologically advanced learning ecosystem that cultivates academic mastery, athletic discipline, artistic expression, and moral integrity.
            </p>
          </div>

        </div>
      </section>

      {/* Principal & Chairman Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-square bg-[#F5F8FC] border border-[#E2E8F0]">
                <SafeImage src={principal?.photo_url || "/images/staff1.jpg"} alt="Principal" type="person" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold font-heading text-[#12355B]">{principal?.name || "Dr. Robert Vance"}</h3>
                <p className="text-xs text-[#1F5F8B] font-semibold">{principal?.designation}</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F8FC] border border-[#E2E8F0] text-[#12355B] text-xs font-bold uppercase">
                <Quote className="w-3.5 h-3.5 text-[#C9A227]" />
                Message from the Desk of Principal
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12355B]">
                "Nurturing Curiosity and Building Character Every Day"
              </h2>
              <div className="text-[#5B6775] text-sm leading-relaxed space-y-3">
                <p>
                  Welcome to Apex Academy! For over three decades, our institution has been dedicated to cultivating an environment where young minds are encouraged to question, experiment, and excel.
                </p>
                <p>
                  We blend foundational academic discipline with hands-on research in artificial intelligence, biotechnology, debate, and fine arts. Our faculty works closely with every student to unlock their unique potential.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="bg-[#F5F8FC] py-16 border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#12355B] text-xs font-bold uppercase mb-3 shadow-subtle">
              <Building2 className="w-3.5 h-3.5 text-[#C9A227]" />
              Infrastructure & Amenities
            </div>
            <h2 className="text-3xl font-bold font-heading text-[#12355B]">
              World-Class Campus Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition">
                <div className="h-44 overflow-hidden bg-[#F5F8FC]">
                  <SafeImage src={fac.image} alt={fac.title} type="building" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold font-heading text-[#12355B]">{fac.title}</h3>
                  <p className="text-xs text-[#5B6775] leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="bg-[#12355B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F5F8B] text-white text-xs font-semibold uppercase mb-3 border border-[#C9A227]/40">
              <Milestone className="w-3.5 h-3.5 text-[#C9A227]" />
              Our Journey
            </div>
            <h2 className="text-3xl font-bold font-heading text-white">
              School Heritage Timeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="bg-[#0D2A47] p-6 rounded-2xl border border-white/10 space-y-2 relative">
                <span className="text-2xl font-extrabold font-heading text-[#C9A227] block">{item.year}</span>
                <h3 className="text-base font-bold font-heading text-white">{item.title}</h3>
                <p className="text-xs text-[#D8E2EC] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
