import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { 
  GraduationCap, MapPin, Phone, Mail, Clock, ExternalLink, 
  ShieldCheck, FileText 
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { settings } = useSite();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12355B] text-white pt-16 pb-8 border-t border-[#0D2A47] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center border border-[#C9A227]">
                <GraduationCap className="w-5 h-5 text-[#12355B]" />
              </div>
              <span className="text-xl font-bold font-heading text-white tracking-tight">
                {settings.school_name.split('&')[0]}
              </span>
            </div>

            <p className="text-sm text-[#D8E2EC] leading-relaxed">
              {settings.tagline}. Dedicated to academic excellence, innovative STEM labs, and global character development.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href={settings.social_links.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#1F5F8B] hover:bg-[#C9A227] text-white hover:text-[#12355B] flex items-center justify-center transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={settings.social_links.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#1F5F8B] hover:bg-[#C9A227] text-white hover:text-[#12355B] flex items-center justify-center transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={settings.social_links.twitter} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#1F5F8B] hover:bg-[#C9A227] text-white hover:text-[#12355B] flex items-center justify-center transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={settings.social_links.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#1F5F8B] hover:bg-[#C9A227] text-white hover:text-[#12355B] flex items-center justify-center transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[#C9A227] font-heading font-bold text-xs uppercase mb-4 tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { key: 'home', label: 'Home Page' },
                { key: 'about', label: 'About Us & History' },
                { key: 'academics', label: 'Academics & Downloads' },
                { key: 'staff', label: 'Faculty & Staff Directory' },
                { key: 'news', label: 'Latest News & Articles' },
                { key: 'gallery', label: 'Photo & Video Gallery' },
                { key: 'contact', label: 'Contact Us & Campus Tour' },
              ].map((link) => (
                <li key={link.key}>
                  <button 
                    onClick={() => handleNav(link.key)}
                    className="text-white hover:text-[#C9A227] transition flex items-center gap-2 group text-sm cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Working Hours */}
          <div>
            <h3 className="text-[#C9A227] font-heading font-bold text-xs uppercase mb-4 tracking-wider">
              Contact Information
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <span className="text-[#D8E2EC]">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span className="text-[#D8E2EC]">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span className="text-[#D8E2EC]">{settings.email}</span>
              </li>
              <li className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span className="text-[#D8E2EC] text-xs leading-relaxed">{settings.working_hours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Google Map Preview */}
          <div>
            <h3 className="text-[#C9A227] font-heading font-bold text-xs uppercase mb-4 tracking-wider">
              Campus Location
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/20 bg-[#0D2A47] group relative">
              <iframe
                title="School Location Map"
                src={settings.google_map_embed}
                width="100%"
                height="130"
                style={{ border: 0 }}
                loading="lazy"
                className="opacity-90 group-hover:opacity-100 transition"
              ></iframe>
              <button
                onClick={() => setShowMapModal(true)}
                className="w-full bg-[#1F5F8B] hover:bg-[#0D2A47] text-white text-xs py-2 px-3 flex items-center justify-center gap-1.5 transition font-medium cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A227]" />
                View Full Google Map
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#D8E2EC] gap-4">
          <p>© {new Date().getFullYear()} {settings.school_name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setShowPrivacyModal(true)} className="hover:text-[#C9A227] transition cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => setShowPrivacyModal(true)} className="hover:text-[#C9A227] transition cursor-pointer">
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-[#12355B]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-[#E2E8F0] relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold font-heading text-[#12355B] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C9A227]" />
                {settings.school_name} - Main Campus Map
              </h3>
              <button onClick={() => setShowMapModal(false)} className="text-[#5B6775] hover:text-[#12355B] font-bold">✕</button>
            </div>
            <iframe
              title="Full School Map"
              src={settings.google_map_embed}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-[#12355B]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#E2E8F0] text-[#17202A]">
            <h3 className="text-xl font-bold font-heading text-[#12355B] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#C9A227]" />
              Privacy Policy & Student Data Safety
            </h3>
            <div className="space-y-3 text-sm text-[#5B6775] max-h-80 overflow-y-auto pr-2">
              <p>Apex Academy is committed to protecting student, parent, and faculty privacy. All student educational records are handled under strict FERPA and COPPA compliance guidelines.</p>
              <p>Contact information submitted via website forms is strictly utilized for educational counseling and school administration purposes.</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="bg-[#12355B] hover:bg-[#0D2A47] text-white font-medium px-5 py-2 rounded-xl text-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
