import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, ArrowLeft, EnvelopeSimple, Lock, User, Eye, EyeSlash } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setIsLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] flex flex-col relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-400/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

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

      <div className="flex-1 flex items-center justify-center px-5 py-12 relative z-10">
        <div className="w-full max-w-[420px]">
          <div className="text-center mb-10">
            <h1 className="font-bebas text-[42px] text-white tracking-wide mb-2 leading-none">BUAT AKUN</h1>
            <p className="text-white/40 text-[14px]">Daftar dan mulai pantau antrian servis kendaraan Anda</p>
          </div>

          <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] rounded-[24px] p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User size={18} className="text-white/30" />
                  </div>
                  <input
                    className="w-full bg-black/50 border border-white/[0.1] text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    required
                  />
                </div>
              </div>

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
                <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Kata Sandi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock size={18} className="text-white/30" />
                  </div>
                  <input
                    className="w-full bg-black/50 border border-white/[0.1] text-white text-sm rounded-xl pl-10 pr-11 py-3 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-white/20"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 karakter"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-[11px] font-semibold uppercase tracking-widest mb-2">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock size={18} className="text-white/30" />
                  </div>
                  <input
                    className={`w-full bg-black/50 border text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 transition-all placeholder:text-white/20 ${form.confirmPassword && form.password !== form.confirmPassword
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30'
                      : 'border-white/[0.1] focus:border-amber-400/50 focus:ring-amber-400/50'
                      }`}
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi kata sandi"
                    required
                  />
                </div>
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="text-red-400 text-[11px] mt-1.5">Password tidak cocok</p>
                )}
              </div>

              {form.password && (
                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${form.password.length >= level * 2
                          ? level <= 1 ? 'bg-red-500'
                            : level <= 2 ? 'bg-amber-500'
                              : level <= 3 ? 'bg-yellow-400'
                                : 'bg-green-400'
                          : 'bg-white/10'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-white/30 text-[11px]">
                    {form.password.length < 2 ? 'Terlalu pendek' :
                      form.password.length < 4 ? 'Lemah' :
                        form.password.length < 6 ? 'Sedang' :
                          form.password.length < 8 ? 'Kuat' : 'Sangat kuat'}
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-[13px] text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || (form.confirmPassword && form.password !== form.confirmPassword)}
                className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-[14px] py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_16px_rgba(251,191,36,0.2)] hover:shadow-[0_0_24px_rgba(251,191,36,0.4)] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
              </button>
            </form>
          </div>

          <p className="text-center text-white/40 text-[13px] mt-8">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-amber-400 font-semibold hover:underline">
              Masuk Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
