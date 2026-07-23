import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  List, X, Wrench,
  House, CalendarBlank, Queue, Calculator, SignIn, UserPlus,
  UserCircle, SignOut, CaretDown, User, Bell
} from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import NotificationDropdown from '../notifications/NotificationDropdown';

const navLinks = [
  { label: 'Beranda', path: '/', Icon: House },
  { label: 'Booking', path: '/booking', Icon: CalendarBlank },
  { label: 'Status Antrian', path: '/queue', Icon: Queue },
  { label: 'Estimasi Biaya', path: '/estimasi', Icon: Calculator },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { unreadCount } = useNotification();
  const [notifOpen, setNotifOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#060606]/90 backdrop-blur-2xl border-b border-white/[0.06]">
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-[62px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="Messa Garage Logo" className="w-8 h-8 object-contain" />
          <div className="flex items-baseline gap-1">
            <span className="font-bebas text-[22px] text-white tracking-[0.08em] leading-none">MESSA</span>
            <span className="font-bebas text-[22px] text-amber-400 tracking-[0.08em] leading-none">GARAGE</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, path, Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 ${isActive(path)
                ? 'bg-amber-400/[0.12] text-amber-400'
                : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                }`}
            >
              <Icon size={14} weight={isActive(path) ? 'bold' : 'regular'} />
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                  className="notif-button relative p-2 text-white/60 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-200"
                >
                  <Bell size={20} weight={unreadCount > 0 ? 'fill' : 'regular'} className={unreadCount > 0 ? 'text-amber-400' : ''} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#060606]"></span>
                  )}
                </button>
                <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} className="absolute top-12 right-0 w-[340px]" />
              </div>

              {/* User sudah login: tampilkan avatar + dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                    <UserCircle size={18} className="text-amber-400" weight="fill" />
                  </div>
                  <span className="text-white/80 text-[13px] font-medium max-w-[100px] truncate">
                    {user?.name || 'User'}
                  </span>
                  <CaretDown
                    size={12}
                    className={`text-white/40 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f0f0f] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <p className="text-white text-[13px] font-semibold truncate">{user?.name}</p>
                      <p className="text-white/40 text-[11px] truncate">{user?.email}</p>
                    </div>
                    {/* Menu items */}
                    <div className="p-1.5">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-white/60 hover:bg-white/[0.05] hover:text-white transition-all duration-200 font-medium"
                      >
                        <User size={15} />
                        Profil Saya
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-amber-400 hover:bg-amber-400/10 transition-all duration-200 font-medium"
                        >
                          <Wrench size={15} weight="fill" />
                          Dashboard Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-red-400 hover:bg-red-500/10 transition-all duration-200 font-medium"
                      >
                        <SignOut size={15} weight="bold" />
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* User belum login: tampilkan tombol Masuk & Daftar */
            <>
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] text-white/50 hover:text-white hover:bg-white/[0.05] transition-all duration-200 font-medium"
              >
                <SignIn size={15} />
                Masuk
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] text-black bg-amber-400 hover:bg-amber-300 font-semibold transition-all duration-200 shadow-[0_0_16px_rgba(251,191,36,0.25)] hover:shadow-[0_0_24px_rgba(251,191,36,0.4)]"
              >
                <UserPlus size={14} weight="bold" />
                Daftar
              </Link>
            </>
          )}

        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-1">
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setMenuOpen(false); }}
                className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
              >
                <Bell size={20} weight={unreadCount > 0 ? 'fill' : 'regular'} className={unreadCount > 0 ? 'text-amber-400' : ''} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#060606]"></span>
                )}
              </button>
              {notifOpen && (
                <div className="fixed inset-x-4 top-[70px] z-[60]">
                  <NotificationDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} className="w-full max-w-[340px] mx-auto" />
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => { setMenuOpen(!menuOpen); setNotifOpen(false); }}
            className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
          >
            {menuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] px-5 py-4 space-y-1 bg-[#060606]/95 backdrop-blur-2xl animate-fade-in">
          {navLinks.map(({ label, path, Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(path)
                ? 'bg-amber-400/[0.12] text-amber-400'
                : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                }`}
            >
              <Icon size={16} weight={isActive(path) ? 'bold' : 'regular'} />
              {label}
            </Link>
          ))}

          <div className="pt-3 mt-3 border-t border-white/[0.06] space-y-2">
            {isAuthenticated ? (
              <>
                {/* Info user di mobile */}
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05] rounded-xl border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <UserCircle size={20} className="text-amber-400" weight="fill" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white text-[13px] font-semibold truncate">{user?.name}</p>
                    <p className="text-white/40 text-[11px] truncate">{user?.email}</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all"
                >
                  <SignOut size={15} weight="bold" />
                  Keluar dari Akun
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:border-white/20 hover:text-white transition-all font-medium"
                >
                  <SignIn size={14} />
                  Masuk
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 bg-amber-400 text-black font-semibold text-sm px-3 py-2.5 rounded-xl"
                >
                  <UserPlus size={14} weight="bold" />
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay untuk tutup dropdown profil saat klik di luar */}
      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;
