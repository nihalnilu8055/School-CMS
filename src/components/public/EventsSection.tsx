import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface EventsSectionProps {
  setCurrentTab: (tab: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ setCurrentTab }) => {
  const { events } = useSite();

  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F8FC] border border-[#E2E8F0] text-[#12355B] text-xs font-bold uppercase tracking-wider mb-3 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              Calendar & Activities
            </div>
            <h2 className="text-3xl font-bold font-heading text-[#12355B]">
              Upcoming School Events
            </h2>
          </div>
          <button
            onClick={() => { setCurrentTab('academics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 text-[#1F5F8B] hover:text-[#12355B] font-semibold text-sm group"
          >
            <span>Full Academic Calendar</span>
            <ArrowRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt) => {
            const dateObj = new Date(evt.event_date);
            const monthStr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const dayNum = dateObj.getDate();

            return (
              <div 
                key={evt.id}
                className="bg-[#F5F8FC] rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-[#E2E8F0]">
                  <img
                    src={evt.banner_image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date Badge Overlay */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 text-center shadow-md border border-[#E2E8F0]">
                    <span className="block text-xs font-extrabold text-[#C9A227] uppercase">{monthStr}</span>
                    <span className="block text-xl font-black font-heading text-[#12355B] leading-none">{dayNum}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold font-heading text-[#12355B] group-hover:text-[#1F5F8B] transition">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-[#5B6775] line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#E2E8F0] text-xs text-[#5B6775]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#1F5F8B] shrink-0" />
                      <span>{evt.start_time} - {evt.end_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1F5F8B] shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
