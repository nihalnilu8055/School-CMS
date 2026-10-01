import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface EventsSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ setCurrentTab }) => {
  const { events, content } = useSite();
  const preview = [...events]
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, 3);

  return (
    <section className="py-20 bg-[#e8f0ed] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#032f23] text-xs font-bold uppercase tracking-wider mb-3 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-[#0a5c47]" />
              {content.events_home_eyebrow}
            </div>
            <h2 className="text-3xl font-bold font-heading text-[#032f23]">
              {content.events_home_heading}
            </h2>
          </div>
          <button
            onClick={() => { setCurrentTab('information/calendar'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-[#054433] hover:text-[#032f23] font-semibold text-sm group"
          >
            <span>Full academic calendar</span>
            <ArrowRight className="w-4 h-4 text-[#0a5c47] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((evt) => {
            const dateObj = new Date(evt.event_date);
            const monthStr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const dayNum = dateObj.getDate();

            return (
              <button
                key={evt.id}
                onClick={() => { setCurrentTab('information/calendar'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all flex flex-col text-left group"
              >
                <div className="relative h-48 overflow-hidden bg-[#E2E8F0]">
                  <SafeImage
                    src={evt.banner_image}
                    alt={evt.title}
                    type="building"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 rounded-2xl px-3.5 py-2 text-center shadow-md border border-[#E2E8F0]">
                    <span className="block text-xs font-extrabold text-[#0a5c47] uppercase">{monthStr}</span>
                    <span className="block text-xl font-black font-heading text-[#032f23] leading-none">{dayNum}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-heading text-[#032f23] group-hover:text-[#054433]">
                      {evt.title}
                    </h3>
                    <p className="text-sm text-[#5B6775] line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-[#E2E8F0] text-xs text-[#5B6775]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#054433] shrink-0" />
                      <span>{evt.start_time} - {evt.end_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#054433] shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
