import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

interface AdminLoginPageProps {
  onSuccessLogin: () => void;
  onNavigatePublic: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccessLogin, onNavigatePublic }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@apexacademy.edu');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    if (email === 'admin@apexacademy.edu' && (password === 'password123' || password === 'admin')) {
      login('jwt_token_demo_123456789', {
        id: 1,
        name: 'Alexander Wright',
        email: 'admin@apexacademy.edu',
        role: 'Super Admin',
        role_id: 1,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        is_active: true,
        created_at: new Date().toISOString()
      });
      onSuccessLogin();
    } else {
      setError('Invalid admin credentials. Use admin@apexacademy.edu / password123');
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-school-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-school-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-3">
          <div 
            onClick={onNavigatePublic}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-school-700 via-school-600 to-indigo-600 p-0.5 shadow-2xl mx-auto cursor-pointer hover:scale-105 transition"
          >
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-9 h-9 text-school-400" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold font-heading tracking-tight">Apex Admin Portal</h1>
          <p className="text-xs text-slate-400">School Management Content Management System</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-school-400" />
              Staff Authentication
            </h2>
            <button 
              onClick={onNavigatePublic}
              className="text-xs text-school-400 hover:underline"
            >
              Public Website →
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase mb-1 text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 outline-none text-white focus:border-school-500 transition text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block font-bold uppercase text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-school-400 hover:underline text-[11px]"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 outline-none text-white focus:border-school-500 transition text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-school-600 to-indigo-700 hover:from-school-700 hover:to-indigo-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm mt-2"
            >
              <span>Sign In to Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo shortcut */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              onClick={() => { setEmail('admin@apexacademy.edu'); setPassword('password123'); }}
              className="text-[11px] text-slate-400 hover:text-school-400 transition"
            >
              🔑 Click here to autofill Super Admin Demo Credentials
            </button>
          </div>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold font-heading text-white">Reset Admin Password</h3>
              <button onClick={() => setShowForgotModal(false)}>✕</button>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs text-center">
                Password reset instructions have been dispatched to your email!
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4 text-xs">
                <p className="text-slate-400">Enter your registered staff email address to receive a secure reset link.</p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@apexacademy.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm outline-none"
                />
                <button type="submit" className="w-full py-3 bg-school-600 text-white font-bold rounded-xl">
                  Send Recovery Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
