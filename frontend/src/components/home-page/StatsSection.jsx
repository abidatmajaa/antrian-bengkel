import React from 'react';
import { Users, Star, Trophy, Lightning } from '@phosphor-icons/react';

const stats = [
  { value: '2.500+', label: 'Kendaraan Diservis', Icon: Users },
  { value: '4.9/5', label: 'Rating Pelanggan', Icon: Star },
  { value: '8 Tahun', label: 'Pengalaman Bengkel', Icon: Trophy },
  { value: '< 5 Mnt', label: 'Rata-rata Waktu Cek-in', Icon: Lightning },
];

const StatsSection = () => {
  return (
    <section className="py-20 md:py-24 bg-amber-950/10 border-y border-amber-900/20 bg-dot-pattern relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map(({ value, label, Icon }, idx) => (
            <div
              key={label}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              className="bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-6 text-center hover:bg-[#111] hover:border-amber-400/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white/[0.03] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/10 transition-colors">
                <Icon size={24} weight="duotone" className="text-white/40 group-hover:text-amber-400 transition-colors" />
              </div>
              <p className="font-bebas text-[40px] leading-none text-white mb-1 tracking-wider">{value}</p>
              <p className="text-white/40 text-[12px] font-medium tracking-wide uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
