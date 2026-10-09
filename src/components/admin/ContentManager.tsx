import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { FrontendContent } from '../../types';
import { CheckCircle, Plus, Trash2 } from 'lucide-react';

const TABS = [
  { key: 'home', label: 'Home Copy' },
  { key: 'stats', label: 'Stats' },
  { key: 'voices', label: 'Testimonials & Partners' },
  { key: 'about', label: 'About Blocks' },
  { key: 'pages', label: 'Page Heroes' },
  { key: 'legal', label: 'Privacy & Terms' },
] as const;

const inputClass = 'w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm';

export const ContentManager: React.FC = () => {
  const { content, updateContent } = useSite();
  const [form, setForm] = useState<FrontendContent>(content);
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('home');
  const [saved, setSaved] = useState(false);

  const set = (patch: Partial<FrontendContent>) => setForm((prev) => ({ ...prev, ...patch }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Frontend Content</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Edit homepage, about, and page headings that are not managed by other modules.
          </p>
        </div>
        {saved && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e6f0eb] text-[#005530] font-bold text-xs">
            <CheckCircle className="w-4 h-4" /> Saved to website
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold ${tab === item.key ? 'bg-school-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form onSubmit={save} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-5 text-xs">
        {tab === 'home' && (
          <>
            <Field label="Hero badge" value={form.hero_badge} onChange={(v) => set({ hero_badge: v })} />
            <Field label="Admissions button" value={form.admissions_cta_label} onChange={(v) => set({ admissions_cta_label: v })} />
            <Field label="Welcome eyebrow" value={form.welcome_eyebrow} onChange={(v) => set({ welcome_eyebrow: v })} />
            <Field label="Welcome heading" value={form.welcome_heading} onChange={(v) => set({ welcome_heading: v })} />
            <Area label="Welcome body" value={form.welcome_body} onChange={(v) => set({ welcome_body: v })} />
            <Area label="Principal quote" value={form.welcome_quote} onChange={(v) => set({ welcome_quote: v })} />
            <Field label="Welcome button" value={form.welcome_cta} onChange={(v) => set({ welcome_cta: v })} />
            <div className="space-y-2">
              <p className="font-bold uppercase text-slate-500">Welcome highlights</p>
              {form.welcome_bullets.map((bullet, index) => (
                <div key={index} className="flex gap-2">
                  <input value={bullet} onChange={(e) => {
                    const next = [...form.welcome_bullets];
                    next[index] = e.target.value;
                    set({ welcome_bullets: next });
                  }} className={inputClass} />
                  <button type="button" onClick={() => set({ welcome_bullets: form.welcome_bullets.filter((_, i) => i !== index) })} className="p-2 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button type="button" onClick={() => set({ welcome_bullets: [...form.welcome_bullets, 'New highlight'] })} className="text-school-600 font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add highlight</button>
            </div>
            <Field label="News section eyebrow" value={form.news_home_eyebrow} onChange={(v) => set({ news_home_eyebrow: v })} />
            <Field label="News section heading" value={form.news_home_heading} onChange={(v) => set({ news_home_heading: v })} />
            <Field label="Events section eyebrow" value={form.events_home_eyebrow} onChange={(v) => set({ events_home_eyebrow: v })} />
            <Field label="Events section heading" value={form.events_home_heading} onChange={(v) => set({ events_home_heading: v })} />
            <Field label="Gallery section eyebrow" value={form.gallery_home_eyebrow} onChange={(v) => set({ gallery_home_eyebrow: v })} />
            <Field label="Gallery section heading" value={form.gallery_home_heading} onChange={(v) => set({ gallery_home_heading: v })} />
          </>
        )}

        {tab === 'stats' && (
          <>
            <Field label="Stats eyebrow" value={form.stats_eyebrow} onChange={(v) => set({ stats_eyebrow: v })} />
            <Field label="Stats heading" value={form.stats_heading} onChange={(v) => set({ stats_heading: v })} />
            {form.stats.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <input value={item.value} onChange={(e) => {
                  const next = [...form.stats]; next[index] = { ...item, value: e.target.value }; set({ stats: next });
                }} className={inputClass} placeholder="2,400+" />
                <input value={item.label} onChange={(e) => {
                  const next = [...form.stats]; next[index] = { ...item, label: e.target.value }; set({ stats: next });
                }} className={inputClass} placeholder="Label" />
                <div className="flex gap-2">
                  <input value={item.desc} onChange={(e) => {
                    const next = [...form.stats]; next[index] = { ...item, desc: e.target.value }; set({ stats: next });
                  }} className={inputClass} placeholder="Description" />
                  <button type="button" onClick={() => set({ stats: form.stats.filter((s) => s.id !== item.id) })} className="p-2 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => set({ stats: [...form.stats, { id: Date.now(), label: 'New stat', value: '0', desc: '' }] })} className="text-school-600 font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add stat</button>
          </>
        )}

        {tab === 'voices' && (
          <>
            <Field label="Testimonials eyebrow" value={form.testimonials_eyebrow} onChange={(v) => set({ testimonials_eyebrow: v })} />
            <Field label="Testimonials heading" value={form.testimonials_heading} onChange={(v) => set({ testimonials_heading: v })} />
            {form.testimonials.map((item, index) => (
              <div key={item.id} className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <Area label="Quote" value={item.quote} onChange={(v) => {
                  const next = [...form.testimonials]; next[index] = { ...item, quote: v }; set({ testimonials: next });
                }} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input value={item.name} onChange={(e) => {
                    const next = [...form.testimonials]; next[index] = { ...item, name: e.target.value }; set({ testimonials: next });
                  }} className={inputClass} placeholder="Name" />
                  <input value={item.role} onChange={(e) => {
                    const next = [...form.testimonials]; next[index] = { ...item, role: e.target.value }; set({ testimonials: next });
                  }} className={inputClass} placeholder="Role" />
                  <div className="flex gap-2">
                    <input value={item.avatar} onChange={(e) => {
                      const next = [...form.testimonials]; next[index] = { ...item, avatar: e.target.value }; set({ testimonials: next });
                    }} className={inputClass} placeholder="Photo URL" />
                    <button type="button" onClick={() => set({ testimonials: form.testimonials.filter((t) => t.id !== item.id) })} className="p-2 text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => set({ testimonials: [...form.testimonials, { id: Date.now(), quote: '', name: '', role: '', avatar: '/images/parent1.jpg', stars: 5 }] })} className="text-school-600 font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add testimonial</button>
            <Field label="Partners heading" value={form.partners_heading} onChange={(v) => set({ partners_heading: v })} />
            {form.partners.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input value={item.title} onChange={(e) => {
                  const next = [...form.partners]; next[index] = { ...item, title: e.target.value }; set({ partners: next });
                }} className={inputClass} />
                <div className="flex gap-2">
                  <input value={item.desc} onChange={(e) => {
                    const next = [...form.partners]; next[index] = { ...item, desc: e.target.value }; set({ partners: next });
                  }} className={inputClass} />
                  <button type="button" onClick={() => set({ partners: form.partners.filter((p) => p.id !== item.id) })} className="p-2 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => set({ partners: [...form.partners, { id: Date.now(), title: 'New partner', desc: '' }] })} className="text-school-600 font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add partner</button>
          </>
        )}

        {tab === 'about' && (
          <>
            <Field label="Principal message heading" value={form.principal_message_heading} onChange={(v) => set({ principal_message_heading: v })} />
            <Field label="About banner image URL" value={form.about_banner_image} onChange={(v) => set({ about_banner_image: v })} />
            <Field label="Facilities eyebrow" value={form.facilities_eyebrow} onChange={(v) => set({ facilities_eyebrow: v })} />
            <Field label="Facilities heading" value={form.facilities_heading} onChange={(v) => set({ facilities_heading: v })} />
            {form.facilities.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <input value={item.title} onChange={(e) => {
                  const next = [...form.facilities]; next[index] = { ...item, title: e.target.value }; set({ facilities: next });
                }} className={inputClass} />
                <input value={item.desc} onChange={(e) => {
                  const next = [...form.facilities]; next[index] = { ...item, desc: e.target.value }; set({ facilities: next });
                }} className={inputClass} />
                <div className="flex gap-2">
                  <input value={item.image} onChange={(e) => {
                    const next = [...form.facilities]; next[index] = { ...item, image: e.target.value }; set({ facilities: next });
                  }} className={inputClass} />
                  <button type="button" onClick={() => set({ facilities: form.facilities.filter((f) => f.id !== item.id) })} className="p-2 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => set({ facilities: [...form.facilities, { id: Date.now(), title: 'New facility', desc: '', image: '/images/campus.jpg' }] })} className="text-school-600 font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add facility</button>
            <Field label="Timeline eyebrow" value={form.timeline_eyebrow} onChange={(v) => set({ timeline_eyebrow: v })} />
            <Field label="Timeline heading" value={form.timeline_heading} onChange={(v) => set({ timeline_heading: v })} />
            {form.timeline.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input value={item.year} onChange={(e) => {
                  const next = [...form.timeline]; next[index] = { ...item, year: e.target.value }; set({ timeline: next });
                }} className={inputClass} />
                <input value={item.title} onChange={(e) => {
                  const next = [...form.timeline]; next[index] = { ...item, title: e.target.value }; set({ timeline: next });
                }} className={inputClass} />
                <div className="sm:col-span-2 flex gap-2">
                  <input value={item.desc} onChange={(e) => {
                    const next = [...form.timeline]; next[index] = { ...item, desc: e.target.value }; set({ timeline: next });
                  }} className={inputClass} />
                  <button type="button" onClick={() => set({ timeline: form.timeline.filter((t) => t.id !== item.id) })} className="p-2 text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => set({ timeline: [...form.timeline, { id: Date.now(), year: '2026', title: 'New milestone', desc: '' }] })} className="text-school-600 font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> Add milestone</button>
          </>
        )}

        {tab === 'pages' && (
          <>
            <Field label="Academics eyebrow" value={form.academics_eyebrow} onChange={(v) => set({ academics_eyebrow: v })} />
            <Field label="Academics heading" value={form.academics_heading} onChange={(v) => set({ academics_heading: v })} />
            <Area label="Academics intro" value={form.academics_intro} onChange={(v) => set({ academics_intro: v })} />
            <Field label="Contact eyebrow" value={form.contact_eyebrow} onChange={(v) => set({ contact_eyebrow: v })} />
            <Field label="Contact heading" value={form.contact_heading} onChange={(v) => set({ contact_heading: v })} />
            <Area label="Contact intro" value={form.contact_intro} onChange={(v) => set({ contact_intro: v })} />
            <Field label="Notices eyebrow" value={form.notices_eyebrow} onChange={(v) => set({ notices_eyebrow: v })} />
            <Field label="Notices heading" value={form.notices_heading} onChange={(v) => set({ notices_heading: v })} />
            <Area label="Notices intro" value={form.notices_intro} onChange={(v) => set({ notices_intro: v })} />
            <Field label="News eyebrow" value={form.news_eyebrow} onChange={(v) => set({ news_eyebrow: v })} />
            <Field label="News heading" value={form.news_heading} onChange={(v) => set({ news_heading: v })} />
            <Area label="News intro" value={form.news_intro} onChange={(v) => set({ news_intro: v })} />
            <Field label="Staff eyebrow" value={form.staff_eyebrow} onChange={(v) => set({ staff_eyebrow: v })} />
            <Field label="Staff heading" value={form.staff_heading} onChange={(v) => set({ staff_heading: v })} />
            <Area label="Staff intro" value={form.staff_intro} onChange={(v) => set({ staff_intro: v })} />
            <Field label="Gallery page eyebrow" value={form.gallery_page_eyebrow} onChange={(v) => set({ gallery_page_eyebrow: v })} />
            <Field label="Gallery page heading" value={form.gallery_page_heading} onChange={(v) => set({ gallery_page_heading: v })} />
            <Area label="Gallery page intro" value={form.gallery_page_intro} onChange={(v) => set({ gallery_page_intro: v })} />
          </>
        )}

        {tab === 'legal' && (
          <>
            <Field label="Privacy title" value={form.privacy_title} onChange={(v) => set({ privacy_title: v })} />
            <Area label="Privacy body" value={form.privacy_body} onChange={(v) => set({ privacy_body: v })} />
            <Field label="Terms title" value={form.terms_title} onChange={(v) => set({ terms_title: v })} />
            <Area label="Terms body" value={form.terms_body} onChange={(v) => set({ terms_body: v })} />
          </>
        )}

        <div className="pt-2 flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-school-600 text-white font-semibold rounded-xl">Save Frontend Content</button>
        </div>
      </form>
    </div>
  );
};

const Field: React.FC<{ label: string; value: string; onChange: (value: string) => void }> = ({ label, value, onChange }) => (
  <label className="block space-y-1">
    <span className="font-bold uppercase text-slate-500">{label}</span>
    <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
  </label>
);

const Area: React.FC<{ label: string; value: string; onChange: (value: string) => void }> = ({ label, value, onChange }) => (
  <label className="block space-y-1">
    <span className="font-bold uppercase text-slate-500">{label}</span>
    <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
  </label>
);
