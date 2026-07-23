import React from 'react';
import { Users, MagnifyingGlass, CheckCircle } from '@phosphor-icons/react';

const SummaryCards = ({ usersLength, filteredLength }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 shadow-sm border-l-4 border-emerald-500 flex items-center justify-between rounded-r-lg">
        <div>
          <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">Total Pelanggan</h3>
          <p className="text-4xl font-bebas text-gray-800">{usersLength} <span className="text-lg text-gray-400 font-sans tracking-normal">Akun</span></p>
        </div>
        <div className="w-12 h-12 rounded bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 shrink-0">
          <Users size={24} weight="fill" />
        </div>
      </div>
      <div className="bg-white p-6 shadow-sm border-l-4 border-sky-500 flex items-center justify-between rounded-r-lg">
        <div>
          <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">Hasil Pencarian</h3>
          <p className="text-4xl font-bebas text-gray-800">{filteredLength} <span className="text-lg text-gray-400 font-sans tracking-normal">Ditemukan</span></p>
        </div>
        <div className="w-12 h-12 rounded bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100 shrink-0">
          <MagnifyingGlass size={24} weight="fill" />
        </div>
      </div>
      <div className="bg-white p-6 shadow-sm border-l-4 border-amber-500 flex items-center justify-between rounded-r-lg">
        <div>
          <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">Info</h3>
          <p className="text-sm font-medium text-gray-600">Kelola akun pelanggan bengkel</p>
        </div>
        <div className="w-12 h-12 rounded bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shrink-0">
          <CheckCircle size={24} weight="fill" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
