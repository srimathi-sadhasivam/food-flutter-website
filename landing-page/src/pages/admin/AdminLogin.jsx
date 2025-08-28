import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [email, setEmail] = useState('admin@wellfood.local');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await adminLogin(email, password);
    setLoading(false);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-purple-900">
      {/* Decorative food icons */}
      <div className="pointer-events-none select-none">
        <svg className="absolute top-10 left-6 w-10 h-10 text-green-400/30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8Zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/></svg>
        <svg className="absolute bottom-16 left-10 w-12 h-12 text-orange-500/20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6h10l1 6a6 6 0 0 1-6 6 6 6 0 0 1-6-6l1-6Zm3 10h4a2 2 0 0 1-4 0Z"/></svg>
        <svg className="absolute top-24 right-10 w-12 h-12 text-yellow-400/20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.5 0 10 3.6 10 8 0 4.1-3.9 7.5-9 8v3l-3-3c-4.2-.4-8-3.9-8-8 0-4.4 4.5-8 10-8Z"/></svg>
        <svg className="absolute bottom-10 right-16 w-10 h-10 text-white/15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.8 0 5 2.2 5 5 0 .8-.2 1.6-.6 2.3L17 12h-2l-1-3-1 3H8l.6-2.7C8.2 9.6 8 8.8 8 8c0-2.8 2.2-5 5-5Z"/></svg>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {/* Glassmorphism card */}
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10h10v2H7v-2Zm0 4h10v2H7v-2ZM6 7h12l1 13H5L6 7Zm2-3h8v2H8V4Z"/></svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">WellFood Admin</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-white/80 mb-1">Admin ID (Email)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-white/60">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12c0 1.1-.9 2-2 2H4a2 2 0 0 1-2-2V6Zm2 0 8 5 8-5H4Zm16 12V8l-8 5-8-5v10h16Z"/></svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/50 transition"
                  placeholder="admin@wellfood.local"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-white/80 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-white/60">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 10V8a6 6 0 1 1 12 0v2h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1Zm2 0h8V8a4 4 0 0 0-8 0v2Z"/></svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-orange-500/60 focus:border-orange-500/50 transition"
                  placeholder="Enter your admin password"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-300 bg-red-900/30 border border-red-800/40 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-rose-500 shadow-lg shadow-orange-900/20 hover:from-orange-400 hover:to-rose-400 active:scale-[.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;


