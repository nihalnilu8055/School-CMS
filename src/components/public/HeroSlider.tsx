import React from 'react';
import { useSite } from '../../context/SiteContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface HeroSliderProps {
  setCurrentTab: (tab: string) => void;
  onOpenAdmissionModal: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ setCurrentTab, onOpenAdmissionModal }) => {
  const { banners, content, settings } = useSite();
  const activeSlides = banners.filter((b) => b.is_active).sort((a, b) => a.order_index - b.order_index);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const slide = activeSlides[currentSlide];

  return (
    <div className="relative w-full min-h-[380px] h-[42vh] sm:h-[480px] md:h-[540px] lg:h-[600px] xl:h-[640px] max-h-[720px] bg-[#003822] overflow-hidden">
      {activeSlides.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <SafeImage
            src={item.image_url}
            alt={item.title}
            fallbackType="building"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#003822]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002416] via-[#003822]/70 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
            {content.hero_badge || settings.school_name}
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold font-heading text-white leading-[1.12] tracking-tight">
            {slide.title}
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenAdmissionModal}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#005530] hover:bg-[#e6f0eb] font-semibold text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl w-full sm:w-auto"
            >
              {content.admissions_cta_label}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab(slide.button_url.replace(/^\//, '') || 'about')}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/40 hover:bg-white/10 font-semibold text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl w-full sm:w-auto"
            >
              {slide.button_text || 'Learn more'}
            </button>
          </div>
        </div>
      </div>

      {activeSlides.length > 1 && (
        <>
          <div className="absolute z-30 bottom-4 sm:bottom-8 right-4 sm:right-10 flex items-center gap-2">
            <button onClick={() => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)} className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentSlide((prev) => (prev + 1) % activeSlides.length)} className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute z-30 bottom-4 sm:bottom-8 left-4 sm:left-10 flex items-center gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/45'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
