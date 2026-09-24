import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { History, Search, ShieldCheck } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useSite();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log =>
    log.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div>
        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
          System Audit & Security Logs
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complete chronological record of administrator actions, updates, creations, and security events.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter logs by user, action, module, or keyword..."
          className="w-full bg-transparent outline-none text-xs text-slate-900 dark:text-white placeholder-slate-400"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">User Name</th>
              <th className="p-4">Action</th>
              <th className="p-4">Module</th>
              <th className="p-4">Details</th>
              <th className="p-4">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                <td className="p-4 text-slate-400 whitespace-nowrap">
                  {new Date(log.created_at).toLocaleString()}
                </td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">{log.user_name}</td>
                <td className="p-4 font-mono text-school-600 dark:text-school-400 font-semibold">{log.action}</td>
                <td className="p-4 font-medium">{log.module}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">{log.details}</td>
                <td className="p-4 font-mono text-slate-400 text-[11px]">{log.ip_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
