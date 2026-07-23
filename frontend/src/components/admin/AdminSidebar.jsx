import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Wallet, CalendarCheck, ChartLineUp, Wrench, SignOut, Star
} from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ activeMenu = 'dashboard' }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'dashboard',
      label: 'DASHBOARD',
      icon: CalendarCheck,
      path: '/admin/dashboard',
    },
    {
      key: 'laporan',
      label: 'LAPORAN BENGKEL',
      icon: ChartLineUp,
      path: '/admin/laporan',
    },
    {
      key: 'pelanggan',
      label: 'PELANGGAN',
      icon: Users,
      path: '/admin/pelanggan',
    },
    {
      key: 'review',
      label: 'REVIEW PELANGGAN',
      icon: Star,
      path: '/admin/review',
    },
  ];

  return (
    <aside className="w-64 bg-[#1a1a1a] flex flex-col h-full shadow-2xl z-20 shrink-0">
      {/* Sidebar Header / Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10 bg-[#141414]">
        <h2 className="flex items-center gap-3 mt-1">
          <img src="/logo.png" alt="Messa Garage Logo" className="w-8 h-8 object-contain" />
          <div className="flex items-baseline gap-1">
            <span className="font-bebas text-[22px] text-white tracking-[0.08em] leading-none">MESSA</span>
            <span className="font-bebas text-[22px] text-amber-400 tracking-[0.08em] leading-none">GARAGE</span>
          </div>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <div className="mb-4 px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Menu Utama</p>
        </div>
        <div className="px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded font-medium transition-all text-left ${isActive
                  ? 'bg-amber-500 text-black font-bold shadow-md'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>


        <div className="px-3 space-y-1">
          {[
            { key: 'pengaturan', label: 'PENGATURAN', icon: Wrench, path: '/admin/pengaturan' },
          ].map((item) => {
            const isActive = activeMenu === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded font-medium transition-all text-left ${isActive
                  ? 'bg-amber-500 text-black font-bold shadow-md'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-5 border-t border-white/5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
            <Users size={20} weight="fill" />
          </div>
          <div className="overflow-hidden">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider truncate">Logged in as</p>
            <p className="text-white font-medium text-sm truncate">{user?.name || 'Administrator'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-lg transition-colors font-bold text-sm"
        >
          <SignOut size={16} weight="bold" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
