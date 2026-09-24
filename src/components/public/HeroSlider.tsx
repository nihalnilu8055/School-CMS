import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface HeroSliderProps {
  setCurrentTab: (tab: string) => void;
  onOpenAdmissionModal: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ setCurrentTab, onOpenAdmissionModal }) => {
  const { banners } = useSite();
  const activeSlides = banners.filter(b => b.is_active).sort((a, b) => a.order_index - b.order_index);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % activeSlides.length);
  };

  const slide = activeSlides[currentSlide];

  return (
    <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[650px] bg-[#12355B] overflow-hidden select-none">
      {/* Background Image Slides */}
      {activeSlides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <SafeImage
            src={s.image_url}
            alt={s.title}
            fallbackType="building"
            className="w-full h-full object-cover object-center transform scale-105 animate-pulse-slow"
          />
          {/* Subtle Professional Navy Overlay (55-65% Opacity) */}
          <div className="absolute inset-0 bg-[#12355B]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#12355B] via-transparent to-transparent opacity-80"></div>
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12355B]/90 backdrop-blur-md border border-[#C9A227]/40 text-[#C9A227] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            Empowering 21st Century Leaders
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.15] tracking-tight">
            {slide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal max-w-xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                if (slide.button_url.includes('academics')) setCurrentTab('academics');
                else if (slide.button_url.includes('about')) setCurrentTab('about');
                else if (slide.button_url.includes('gallery')) setCurrentTab('gallery');
                else setCurrentTab('academics');
              }}
              className="flex items-center gap-2 bg-[#12355B] hover:bg-[#0D2A47] text-white border border-[#C9A227] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <span>{slide.button_text || 'Explore Academics'}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A227]" />
            </button>

            <button
              onClick={onOpenAdmissionModal}
              className="flex items-center gap-2 bg-white hover:bg-[#12355B] text-[#12355B] hover:text-white border border-[#12355B] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all"
            >
              <span>Apply for Admissions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Controls (Arrows) */}
      <div className="absolute z-30 bottom-8 right-8 flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="w-11 h-11 rounded-xl bg-[#12355B]/80 hover:bg-[#12355B] text-white border border-[#C9A227]/40 flex items-center justify-center transition shadow-md"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="w-11 h-11 rounded-xl bg-[#12355B]/80 hover:bg-[#12355B] text-white border border-[#C9A227]/40 flex items-center justify-center transition shadow-md"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute z-30 bottom-8 left-8 flex items-center gap-2">
        {activeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-[#C9A227]' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
