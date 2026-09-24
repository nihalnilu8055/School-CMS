import React from 'react';
import { useSite } from '../../context/SiteContext';
import { 
  Newspaper, Users, Mail, Image as ImageIcon, Download, 
  Calendar, ArrowUpRight, Clock, ShieldCheck, Sparkles, CheckCircle 
} from 'lucide-react';

interface DashboardOverviewProps {
  setActiveModule: (mod: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveModule }) => {
  const { news, staff, messages, galleryItems, downloads, events, auditLogs } = useSite();

  const pendingMessages = messages.filter(m => m.reply_status === 'pending');

  const stats = [
    { label: "Published News", count: news.filter(n => n.status === 'published').length, mod: 'news', icon: Newspaper, bg: 'bg-blue-500' },
    { label: "Faculty & Staff", count: staff.length, mod: 'staff', icon: Users, bg: 'bg-cyan-500' },
    { label: "Contact Inquiries", count: messages.length, badge: `${pendingMessages.length} pending`, mod: 'messages', icon: Mail, bg: 'bg-amber-500' },
    { label: "Media & Photos", count: galleryItems.length, mod: 'gallery', icon: ImageIcon, bg: 'bg-emerald-500' },
    { label: "Active Downloads", count: downloads.length, mod: 'downloads', icon: Download, bg: 'bg-purple-500' },
    { label: "School Events", count: events.length, mod: 'events', icon: Calendar, bg: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-school-950 to-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-school-600/30 text-school-300 text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            School CMS Administration Dashboard
          </div>
          <h2 className="text-3xl font-extrabold font-heading">
            Welcome Back, Alexander!
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            All system modules are online. You have <strong className="text-amber-400">{pendingMessages.length} pending contact form submissions</strong> awaiting response.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => setActiveModule('news')}
            className="bg-school-600 hover:bg-school-700 text-white font-semibold text-xs px-4 py-3 rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            <span>+ Create News Article</span>
          </button>
          <button
            onClick={() => setActiveModule('staff')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-3 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
          >
            <span>+ Add Faculty</span>
          </button>
        </div>
      </div>

      {/* Metrics Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveModule(stat.mod)}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                    {stat.count}
                  </span>
                  {stat.badge && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                      {stat.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className={`w-12 h-12 rounded-2xl ${stat.bg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Split: Recent Messages & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Contact Submissions */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-school-600" />
              Recent Contact Inquiries
            </h3>
            <button
              onClick={() => setActiveModule('messages')}
              className="text-xs font-semibold text-school-600 dark:text-school-400 hover:underline"
            >
              View All Messages
            </button>
          </div>

          <div className="space-y-3">
            {messages.slice(0, 4).map((msg) => (
              <div key={msg.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{msg.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      msg.reply_status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {msg.reply_status}
                    </span>
                  </div>
                  <p className="text-xs text-school-600 dark:text-school-400 font-medium">{msg.subject}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Activity Logs */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-school-600" />
              Recent Audit Log
            </h3>
            <button
              onClick={() => setActiveModule('logs')}
              className="text-xs font-semibold text-school-600 dark:text-school-400 hover:underline"
            >
              Full Log
            </button>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{log.user_name}</span>
                  <span className="text-[10px] text-slate-400">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">{log.action} • {log.module}</p>
                <p className="text-[11px] text-slate-500">{log.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
