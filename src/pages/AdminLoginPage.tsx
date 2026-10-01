import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { verifyPassword } from '../utils/password';
import { GraduationCap, ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccessLogin: () => void;
  onNavigatePublic: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccessLogin, onNavigatePublic }) => {
  const { login } = useAuth();
  const { users, updateUser } = useSite();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const matchedUser = users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (!matchedUser || !matchedUser.is_active) {
        setError('Invalid email or password.');
        return;
      }

      const valid = await verifyPassword(password, matchedUser.password_hash);
      if (!valid) {
        setError('Invalid email or password.');
        return;
      }

      updateUser(matchedUser.id, { last_login: new Date().toISOString() });
      login(`jwt_token_${matchedUser.id}_${Date.now()}`, matchedUser);
      onSuccessLogin();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8f0ed] text-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <div
            onClick={onNavigatePublic}
            className="w-16 h-16 rounded-2xl bg-[#032f23] shadow-md mx-auto cursor-pointer hover:scale-105 transition flex items-center justify-center"
          >
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold font-heading tracking-tight text-[#032f23]">Ibn Seena Admin Portal</h1>
          <p className="text-xs text-slate-500">School Management Content Management System</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#c5d5ce] shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-[#c5d5ce] pb-4">
            <h2 className="text-lg font-bold font-heading text-[#032f23] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#054433]" />
              Staff Authentication
            </h2>
            <button
              onClick={onNavigatePublic}
              className="text-xs text-[#032f23] font-semibold hover:underline"
            >
              Public Website →
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs" autoComplete="on">
            <div>
              <label className="block font-bold uppercase mb-1 text-[#032f23]">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#054433] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] outline-none text-slate-900 focus:border-[#032f23] transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase mb-1 text-[#032f23]">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#054433] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#e8f0ed] border border-[#c5d5ce] outline-none text-slate-900 focus:border-[#032f23] transition text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#032f23] hover:bg-[#054433] text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-60"
            >
              <span>{submitting ? 'Signing in...' : 'Sign In to Admin Panel'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
