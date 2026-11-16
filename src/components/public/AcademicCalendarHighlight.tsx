import React from 'react';
import { CalendarDays, Download, ExternalLink, FileText } from 'lucide-react';

const CALENDAR_PDF = '/downloads/SCHOOL_ACADEMIC_CALANDER_2026-27.pdf';

interface AcademicCalendarHighlightProps {
  setCurrentTab?: (tab: string) => void;
}

export const AcademicCalendarHighlight: React.FC<AcademicCalendarHighlightProps> = ({ setCurrentTab }) => {
  return (
    <section className="bg-[#e6f0eb] border-y border-[#b7d0c4] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#005530] rounded-[28px] p-6 sm:p-8 lg:p-10 text-white shadow-xl flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <CalendarDays className="w-7 h-7 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">Official Circular</p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading mt-1">
                School Academic Calendar 2026–27
              </h2>
              <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed max-w-2xl">
                Download the official Ibn Seena English High School academic calendar for the current year — term dates, holidays, and key school events.
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white/80">
                <FileText className="w-4 h-4" />
                SCHOOL_ACADEMIC_CALANDER_2026-27.pdf
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={CALENDAR_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#005530] font-semibold text-sm px-5 py-3.5 rounded-xl hover:bg-[#f8fafc]"
            >
              <ExternalLink className="w-4 h-4" />
              View calendar
            </a>
            <a
              href={CALENDAR_PDF}
              download="SCHOOL_ACADEMIC_CALANDER_2026-27.pdf"
              className="inline-flex items-center justify-center gap-2 bg-[#004428] border border-white/25 text-white font-semibold text-sm px-5 py-3.5 rounded-xl hover:bg-[#003822]"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            {setCurrentTab && (
              <button
                type="button"
                onClick={() => {
                  setCurrentTab('information/calendar');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 text-white/90 font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-white/10"
              >
                Open Academic Calendar page
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
