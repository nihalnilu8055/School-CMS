import React from 'react';
import { Quote, Star } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Apex Academy provided my son with the STEM environment he needed to thrive. The faculty is deeply supportive, and the robotics lab is world-class!",
      name: "Elizabeth Montgomery",
      role: "Parent of Grade 11 AP Student",
      avatar: "/images/parent1.jpg",
      stars: 5
    },
    {
      quote: "The debate club and AP Literature courses at Apex honed my critical writing skills and gave me the confidence to secure admission to Harvard University.",
      name: "Julian Rodriguez",
      role: "Alumni (Class of 2024)",
      avatar: "/images/parent2.jpg",
      stars: 5
    },
    {
      quote: "The athletic program and swimming facilities allowed me to balance academic excellence with competitive state championships. Best 4 years!",
      name: "Sophia Chen",
      role: "Senior Varsity Athlete",
      avatar: "/images/student1.jpg",
      stars: 5
    }
  ];

  return (
    <section className="py-20 bg-[#F5F8FC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#12355B] text-xs font-bold uppercase tracking-wider mb-3 shadow-subtle">
            <Quote className="w-3.5 h-3.5 text-[#C9A227]" />
            Voices of Our Community
          </div>
          <h2 className="text-3xl font-bold font-heading text-[#12355B]">
            What Parents & Students Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#C9A227]">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A227] text-[#C9A227]" />
                  ))}
                </div>
                <p className="text-sm text-[#5B6775] italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#E2E8F0]">
                <SafeImage
                  src={t.avatar}
                  alt={t.name}
                  type="person"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#C9A227]"
                />
                <div>
                  <h4 className="text-sm font-bold font-heading text-[#12355B]">{t.name}</h4>
                  <p className="text-xs text-[#5B6775]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
