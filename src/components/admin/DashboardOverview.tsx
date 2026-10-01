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
    { label: "Published News", count: news.filter(n => n.status === 'published').length, mod: 'news', icon: Newspaper, bg: 'bg-[#032f23]' },
    { label: "Faculty & Staff", count: staff.length, mod: 'staff', icon: Users, bg: 'bg-[#054433]' },
    { label: "Contact Inquiries", count: messages.length, badge: `${pendingMessages.length} pending`, mod: 'messages', icon: Mail, bg: 'bg-[#0a5c47]' },
    { label: "Media & Photos", count: galleryItems.length, mod: 'gallery', icon: ImageIcon, bg: 'bg-[#032f23]' },
    { label: "Active Downloads", count: downloads.length, mod: 'downloads', icon: Download, bg: 'bg-[#054433]' },
    { label: "School Events", count: events.length, mod: 'events', icon: Calendar, bg: 'bg-[#0a5c47]' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="bg-[#032f23] rounded-3xl p-8 text-white border border-[#054433] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            School CMS Administration Dashboard
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-white">
            Welcome Back, Alexander!
          </h2>
          <p className="text-white/90 text-sm leading-relaxed">
            All system modules are online. You have <strong className="text-white">{pendingMessages.length} pending contact form submissions</strong> awaiting response.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => setActiveModule('news')}
            className="bg-white hover:bg-[#e8f0ed] text-[#032f23] font-semibold text-xs px-4 py-3 rounded-xl shadow-lg transition"
          >
            <span>+ Create News Article</span>
          </button>
          <button
            onClick={() => setActiveModule('staff')}
            className="bg-[#054433] hover:bg-[#021f18] text-white font-semibold text-xs px-4 py-3 rounded-xl border border-white/20 transition"
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
              className="bg-white p-6 rounded-3xl border border-[#c5d5ce] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center justify-between group"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-heading text-[#032f23]">
                    {stat.count}
                  </span>
                  {stat.badge && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
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
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#c5d5ce] shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#c5d5ce] pb-4">
            <h3 className="text-lg font-bold font-heading text-[#032f23] flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#054433]" />
              Recent Contact Inquiries
            </h3>
            <button
              onClick={() => setActiveModule('messages')}
              className="text-xs font-semibold text-[#032f23] hover:underline"
            >
              View All Messages
            </button>
          </div>

          <div className="space-y-3">
            {messages.slice(0, 4).map((msg) => (
              <div key={msg.id} className="p-4 rounded-2xl bg-[#e8f0ed] border border-[#c5d5ce] flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{msg.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      msg.reply_status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-[#e8f0ed] text-[#032f23]'
                    }`}>
                      {msg.reply_status}
                    </span>
                  </div>
                  <p className="text-xs text-[#032f23] font-medium">{msg.subject}</p>
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
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#c5d5ce] shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#c5d5ce] pb-4">
            <h3 className="text-lg font-bold font-heading text-[#032f23] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#054433]" />
              Recent Audit Log
            </h3>
            <button
              onClick={() => setActiveModule('logs')}
              className="text-xs font-semibold text-[#032f23] hover:underline"
            >
              Full Log
            </button>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{log.user_name}</span>
                  <span className="text-[10px] text-slate-400">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-slate-600 font-mono text-[11px]">{log.action} • {log.module}</p>
                <p className="text-[11px] text-slate-500">{log.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
