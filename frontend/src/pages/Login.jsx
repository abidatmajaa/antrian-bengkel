import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Wrench, ArrowLeft, EnvelopeSimple, Lock, WhatsappLogo, GoogleLogo } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(form.email, form.password);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('Email atau password salah');
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] flex flex-col relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-400/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

      {/* Minimal Header */}
      <header className="px-6 py-5 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="Messa Garage Logo" className="w-8 h-8 object-contain" />
          <div className="flex items-baseline gap-1">
            <span className="font-bebas text-[22px] text-white tracking-[0.08em] leading-none">MESSA</span>
            <span className="font-bebas text-[22px] text-amber-400 tracking-[0.08em] leading-none">GARAGE</span>
          </div>
        </Link>

        <Link to="/" className="flex items-center gap-2 text-white/40 text-[13px] font-medium hover:text-white transition-colors bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.05] hover:border-white/20">
          <ArrowLeft size={14} weight="bold" />
          Beranda
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-5 py-12 relative z-10">
        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="font-bebas text-[42px] text-white tracking-wide mb-2 leading-none">MASUK AKUN</h1>
            <p className="text-white/40 text-[14px]">Pantau antrian dan riwayat servis kendaraan Anda</p>
          </div>

          {/* Card */}
          <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] rounded-[24px] p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Alamat Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <EnvelopeSimple size={18} className="text-white/30" />
                  </div>
                  <input
                    className="w-full bg-black/50 border border-white/[0.1] text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest">Kata Sandi</label>
                  <a href="#" className="text-amber-400 text-[11px] hover:underline font-medium">Lupa sandi?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock size={18} className="text-white/30" />
                  </div>
                  <input
                    className="w-full bg-black/50 border border-white/[0.1] text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-[13px] text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-[14px] py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_16px_rgba(251,191,36,0.2)] hover:shadow-[0_0_24px_rgba(251,191,36,0.4)] mt-2 disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
              </button>
            </form>

          </div>

          {/* Sign up link */}
          <p className="text-center text-white/40 text-[13px] mt-8">
            Belum punya akun?{' '}
            <Link to="/register" className="text-amber-400 font-semibold hover:underline">Daftar Sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
