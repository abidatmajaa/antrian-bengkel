import React from 'react';
import { Wrench, Pencil, Check, Wallet, Info } from '@phosphor-icons/react';


const QueueTable = ({
  queue,
  loading,
  getStatusBadge,
  onDetail,
  onKerjakan,
  onTagihan,
  onSelesai,
  onNota,
}) => (
  <div className="bg-white shadow-sm border border-gray-200">
    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
      <h2 className="text-[15px] font-bold text-gray-800 uppercase tracking-wide">
        Antrean Berjalan (Live Queue)
      </h2>
      {loading && (
        <span className="text-amber-500 text-xs font-bold uppercase tracking-widest animate-pulse">
          Memuat data...
        </span>
      )}
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">No</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Pelanggan</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Motor</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Layanan</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Tagihan</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {queue.length === 0 && !loading ? (
            <tr>
              <td colSpan="7" className="px-6 py-12 text-center text-gray-400 text-sm font-medium">
                Belum ada antrean hari ini.
              </td>
            </tr>
          ) : (
            queue.map((q) => (
              <tr key={q.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-bebas text-xl text-gray-800 group-hover:text-amber-500 transition-colors">
                    {q.queue_number}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-700">{q.name}</div>
                  <div className="text-xs text-gray-500">{q.phone || '-'}</div>
                </td>
                <td className="px-6 py-4 min-w-[150px]">
                  <div className="text-sm font-bold text-gray-700">{q.motor_brand} {q.motor_type}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500 min-w-[150px]">
                  {q.services && typeof q.services === 'string' ? (
                    <span className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-xs mb-1 inline-block whitespace-nowrap">
                      {(() => { try { return JSON.parse(q.services).join(', '); } catch (e) { return q.services; } })()}
                    </span>
                  ) : q.services && Array.isArray(q.services) ? (
                    <span className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-xs mb-1 inline-block whitespace-nowrap">
                      {q.services.join(', ')}
                    </span>
                  ) : '-'}
                  {q.final_items && q.final_items.length > 0 && (
                    <div className="mt-2">
                      <span className="bg-amber-100 text-amber-700 border border-amber-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide whitespace-nowrap inline-block">
                        ✓ Rincian Final
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">
                  {q.final_price > 0 ? (
                    <div>
                      <span className="line-through text-gray-400 text-[11px] block font-medium">
                        Rp {(q.estimated_price || 0).toLocaleString('id-ID')} (Est)
                      </span>
                      <span className="text-emerald-600 text-[15px]">
                        Rp {q.final_price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500">
                      Rp {(q.estimated_price || 0).toLocaleString('id-ID')}{' '}
                      <span className="text-[10px] font-normal">(Est)</span>
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{getStatusBadge(q.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onDetail(q)}
                      className="px-3 py-1.5 rounded bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-200 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                    >
                      <Info size={14} weight="bold" /> Detail
                    </button>
                    {q.status === 'waiting' && (
                      <button
                        onClick={() => onKerjakan(q.id)}
                        className="px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                      >
                        <Wrench size={14} weight="bold" /> Kerjakan
                      </button>
                    )}
                    {q.status === 'in_progress' && (
                      <>
                        <button
                          onClick={() => onTagihan(q)}
                          className="px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                        >
                          <Pencil size={14} weight="bold" /> Tagihan
                        </button>
                        <button
                          onClick={() => onSelesai(q.id)}
                          className="px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                        >
                          <Check size={14} weight="bold" /> Selesai
                        </button>
                      </>
                    )}
                    {q.status === 'done' && (
                      <button
                        onClick={() => onNota(q)}
                        className="px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                      >
                        <Wallet size={14} weight="bold" /> Nota
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default QueueTable;
