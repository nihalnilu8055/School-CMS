import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { ContactMessage } from '../../types';
import { Mail, Search, Download, Trash2, CheckCircle, Clock, Archive, Filter, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { ConfirmModal } from './ConfirmModal';

export const MessagesManager: React.FC = () => {
  const { messages, updateMessageStatus, deleteMessage } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'replied' | 'archived'>('all');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.reply_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Subject", "Message", "Status", "Date"];
    const rows = filteredMessages.map(m => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${(m.phone || '').replace(/"/g, '""')}"`,
      `"${m.subject.replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      m.reply_status,
      m.created_at
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `school_contact_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Excel using XLSX
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredMessages.map(m => ({
      ID: m.id,
      Name: m.name,
      Email: m.email,
      Phone: m.phone || '',
      Subject: m.subject,
      Message: m.message,
      Status: m.reply_status,
      SubmittedAt: m.created_at
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Messages");
    XLSX.writeFile(workbook, `School_Contact_Messages_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Contact Form Submissions Database
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View, reply to, track status, and export inquiries received from the public website.
          </p>
        </div>
        
        {/* Export Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-school-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by applicant name, email, or subject..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-xs text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-xs text-slate-900 dark:text-white cursor-pointer"
          >
            <option value="all">All Statuses ({messages.length})</option>
            <option value="pending">Pending</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Sender Info</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message Snippet</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{msg.name}</p>
                    <p className="text-slate-400 text-[11px]">{msg.email} • {msg.phone || 'No phone'}</p>
                  </td>
                  <td className="p-4 font-semibold text-school-600 dark:text-school-400">
                    {msg.subject}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                    {msg.message}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      msg.reply_status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      msg.reply_status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {msg.reply_status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => { setSelectedMsg(msg); setAdminNotes(msg.admin_notes || ''); }}
                      className="px-3 py-1.5 rounded-xl bg-school-50 text-school-600 font-semibold hover:bg-school-100 transition"
                    >
                      View & Reply
                    </button>
                    <button
                      onClick={() => setDeleteId(msg.id)}
                      className="p-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message View & Reply Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">Inquiry Details</h3>
              <button onClick={() => setSelectedMsg(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-1">
                <p><strong className="text-slate-900 dark:text-white">From:</strong> {selectedMsg.name} ({selectedMsg.email})</p>
                <p><strong className="text-slate-900 dark:text-white">Phone:</strong> {selectedMsg.phone || 'N/A'}</p>
                <p><strong className="text-slate-900 dark:text-white">Subject:</strong> {selectedMsg.subject}</p>
                <p><strong className="text-slate-900 dark:text-white">Submitted:</strong> {new Date(selectedMsg.created_at).toLocaleString()}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Message Text</h4>
                <p className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-sm leading-relaxed border border-slate-200 dark:border-slate-700">
                  "{selectedMsg.message}"
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">Internal Admin Notes</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record call details or internal notes..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { updateMessageStatus(selectedMsg.id, 'replied', adminNotes); setSelectedMsg(null); }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow"
                  >
                    Mark as Replied
                  </button>
                  <button
                    onClick={() => { updateMessageStatus(selectedMsg.id, 'archived', adminNotes); setSelectedMsg(null); }}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        title="Delete Contact Message"
        message="Are you sure you want to delete this message submission from the database?"
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteMessage(deleteId)}
      />

    </div>
  );
};
