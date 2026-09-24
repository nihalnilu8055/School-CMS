import React from 'react';
import { useSite } from '../../context/SiteContext';
import { Shield, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

export const RoleManager: React.FC = () => {
  const { roles } = useSite();

  const permissionsMatrix = [
    { module: 'User Accounts', perm: 'manage_users' },
    { module: 'Page Management', perm: 'manage_pages' },
    { module: 'News & Press', perm: 'manage_news' },
    { module: 'Staff Directory', perm: 'manage_staff' },
    { module: 'Media & Gallery', perm: 'manage_gallery' },
    { module: 'Academics & Downloads', perm: 'manage_academics' },
    { module: 'Site Branding & SEO', perm: 'manage_settings' },
    { module: 'Contact Inquiries', perm: 'view_messages' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div>
        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
          Roles & Permissions Matrix (RBAC)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Role-based access control rules governing system modules and action privileges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <div className="w-10 h-10 rounded-xl bg-school-50 dark:bg-slate-800 text-school-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-heading text-slate-900 dark:text-white text-base">{role.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{role.description}</p>
            </div>
            <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-school-100 text-school-700">
              {role.permissions_count} Allowed Modules
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md p-6 space-y-4">
        <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">Detailed Permissions Matrix</h3>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase">
            <tr>
              <th className="p-3">Module Feature</th>
              <th className="p-3">Super Admin</th>
              <th className="p-3">Admin</th>
              <th className="p-3">Editor</th>
              <th className="p-3">Staff</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {permissionsMatrix.map((item, idx) => (
              <tr key={idx}>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">{item.module}</td>
                <td className="p-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></td>
                <td className="p-3">{idx > 0 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-slate-300" />}</td>
                <td className="p-3">{[1, 2, 4, 5].includes(idx) ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-slate-300" />}</td>
                <td className="p-3">{[3, 7].includes(idx) ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4 text-slate-300" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
