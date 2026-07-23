import React from 'react';
import { Wallet } from '@phosphor-icons/react';

const HistoryTable = ({ reportData, loading, openNotaModal, formatRupiah }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-[15px] font-bold text-gray-800 uppercase tracking-wide">Riwayat Servis Selesai</h2>
        {loading && <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest animate-pulse">Memuat data...</span>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Waktu Selesai</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Pelanggan</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Motor & Plat</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Pendapatan</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">Rincian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reportData.history.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm">
                  Belum ada riwayat servis pada rentang waktu ini.
                </td>
              </tr>
            ) : (
              reportData.history.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-700">
                      {new Date(q.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(q.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-800">{q.name}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">{q.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-700">{q.motor_brand} {q.motor_type}</div>
                    <div className="text-[11px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 inline-block mt-1 uppercase tracking-wider">{q.plate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      {formatRupiah(q.final_price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openNotaModal(q)}
                      className="px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                    >
                      <Wallet size={14} weight="bold" /> Nota
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
