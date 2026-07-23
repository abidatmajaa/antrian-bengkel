import React from 'react';
import { Users, Wrench, CheckCircle } from '@phosphor-icons/react';


const DashboardStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white p-6 shadow-sm border-l-4 border-amber-500 flex items-center justify-between">
      <div>
        <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">Total Antrean</h3>
        <p className="text-4xl font-bebas text-gray-800">{stats.total}</p>
      </div>
      <div className="w-12 h-12 rounded bg-gray-50 flex items-center justify-center text-amber-500 border border-gray-100">
        <Users size={24} weight="fill" />
      </div>
    </div>

    <div className="bg-white p-6 shadow-sm border-l-4 border-sky-500 flex items-center justify-between">
      <div>
        <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">Sedang Dikerjakan</h3>
        <p className="text-4xl font-bebas text-gray-800">{stats.inProgress}</p>
      </div>
      <div className="w-12 h-12 rounded bg-gray-50 flex items-center justify-center text-sky-500 border border-gray-100">
        <Wrench size={24} weight="fill" />
      </div>
    </div>

    <div className="bg-white p-6 shadow-sm border-l-4 border-emerald-500 flex items-center justify-between">
      <div>
        <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">Servis Selesai</h3>
        <p className="text-4xl font-bebas text-gray-800">{stats.finished}</p>
      </div>
      <div className="w-12 h-12 rounded bg-gray-50 flex items-center justify-center text-emerald-500 border border-gray-100">
        <CheckCircle size={24} weight="fill" />
      </div>
    </div>
  </div>
);

export default DashboardStats;
