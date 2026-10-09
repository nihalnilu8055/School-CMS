import React, { useEffect, useMemo, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { PageHero } from '../components/public/PageHero';
import { Bell, Calendar, Download, Search, Pin } from 'lucide-react';
import { markNoticesSeen } from '../utils/notices';

const FILTERS = [
  { key: 'all', label: 'All notices' },
  { key: 'General', label: 'General' },
  { key: 'Fee', label: 'Fee' },
  { key: 'Academic', label: 'Academic' },
  { key: 'Exam', label: 'Exam' },
] as const;

interface NoticesPageProps {
  initialFilter?: (typeof FILTERS)[number]['key'];
}

export const NoticesPage: React.FC<NoticesPageProps> = ({ initialFilter = 'all' }) => {
  const { notices, content } = useSite();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['key']>(initialFilter);
  const [query, setQuery] = useState('');

  useEffect(() => {
    markNoticesSeen(notices);
    window.dispatchEvent(new Event('school-notices-seen'));
  }, [notices]);

  const visible = useMemo(() => {
    return notices
      .filter((notice) => notice.status === 'published')
      .filter((notice) => filter === 'all' || notice.category.includes(filter))
      .filter((notice) => {
        const haystack = `${notice.title} ${notice.excerpt || ''} ${notice.summary || ''}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      })
      .sort((a, b) => Number(b.is_pinned) - Number(a.is_pinned) || (b.release_date || '').localeCompare(a.release_date || ''));
  }, [notices, filter, query]);

  return (
    <div className="bg-[#f8fafc] pb-16 animate-fadeIn">
      <PageHero
        eyebrow={content.notices_eyebrow || 'School notices'}
        title={content.notices_heading || 'Notices & circulars'}
        intro={content.notices_intro}
        image="/images/campus.jpg"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col lg:flex-row gap-4 lg:items-center">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold ${
                  filter === item.key ? 'bg-[#005530] text-white' : 'bg-[#e6f0eb] text-[#005530]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notices..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-sm outline-none focus:border-[#005530]"
            />
          </div>
        </div>

        <div className="space-y-3">
          {visible.map((notice) => (
            <article key={notice.id} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {notice.is_pinned && <Pin className="w-3.5 h-3.5 text-[#005530]" />}
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#e6f0eb] text-[#005530]">{notice.category}</span>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{notice.priority}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {notice.release_date}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900">{notice.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{notice.excerpt || notice.summary}</p>
              </div>
              {(notice.attachment_url || notice.file_url) && (
                <a
                  href={notice.attachment_url || notice.file_url}
                  download={notice.attachment_name || 'notice-attachment'}
                  className="inline-flex items-center gap-2 shrink-0 bg-[#005530] text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
                >
                  <Download className="w-4 h-4" /> {notice.attachment_name || 'Download'}
                </a>
              )}
            </article>
          ))}
          {visible.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 text-slate-500">
              <Bell className="w-8 h-8 mx-auto mb-3 text-[#7eb89a]" />
              No notices match this filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
