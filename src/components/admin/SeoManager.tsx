import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { Search, Save, CheckCircle, Code, FileText, Globe } from 'lucide-react';

export const SeoManager: React.FC = () => {
  const { seo, updateSeo } = useSite();
  const [formData, setFormData] = useState(seo);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeo(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            SEO & Social Card Configuration
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage meta tags, Open Graph (OG) social sharing preview, XML Sitemap, and Robots.txt rules.
          </p>
        </div>

        {saved && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs animate-fadeIn">
            <CheckCircle className="w-4 h-4" /> SEO Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6 text-xs">
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Search className="w-4 h-4 text-school-600" />
            Meta Tags & Search Engine Indexing
          </h3>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Global Meta Title *</label>
            <input
              type="text"
              required
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Global Meta Description</label>
            <textarea
              rows={3}
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Focus Meta Keywords</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Social Sharing / Open Graph */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Globe className="w-4 h-4 text-school-600" />
            Social Open Graph & Twitter Cards
          </h3>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Open Graph Image (OG Image URL)</label>
            <input
              type="url"
              value={formData.og_image}
              onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Technical SEO: Robots.txt */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Code className="w-4 h-4 text-school-600" />
            Robots.txt & Sitemap Directives
          </h3>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Robots.txt Content</label>
            <textarea
              rows={4}
              value={formData.robots_txt}
              onChange={(e) => setFormData({ ...formData, robots_txt: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 font-mono text-emerald-400 border border-slate-800 outline-none text-xs"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-school-600 hover:bg-school-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
