import React from 'react';
import { ChartLineUp } from '@phosphor-icons/react';

/**
 * Tombol aksi cepat di dashboard (Tambah Antrean & Laporan Bengkel).
 * @param {Function} onAddClick  - Buka modal tambah antrean
 * @param {Function} onLaporanClick - Navigasi ke laporan
 */
const DashboardActions = ({ onAddClick, onLaporanClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div
      onClick={onAddClick}
      className="bg-[#cc181e] text-white p-6 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-[#b01217] transition-colors rounded"
    >
      <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0">
        <span className="text-2xl font-light">+</span>
      </div>
      <div>
        <h3 className="font-bebas text-xl tracking-wide">TAMBAH ANTREAN BARU</h3>
        <p className="text-white/70 text-xs font-medium">Input antrean pelanggan offline</p>
      </div>
    </div>

    <div
      onClick={onLaporanClick}
      className="bg-[#248a52] text-white p-6 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-[#1c6f41] transition-colors rounded"
    >
      <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0">
        <ChartLineUp size={20} />
      </div>
      <div>
        <h3 className="font-bebas text-xl tracking-wide">LAPORAN BENGKEL</h3>
        <p className="text-white/80 text-xs font-medium">Analisis servis &amp; pendapatan</p>
      </div>
    </div>
  </div>
);

export default DashboardActions;
