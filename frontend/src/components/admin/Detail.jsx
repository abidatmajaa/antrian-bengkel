import React from 'react';
import { X } from '@phosphor-icons/react';


const ModalDetail = ({ isOpen, detail, onClose, getStatusBadge }) => {
  if (!isOpen || !detail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bebas text-xl text-gray-800 tracking-wide">INFORMASI LENGKAP SERVIS</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Nomor & Status */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nomor Antrean</p>
              <p className="text-4xl font-bebas text-amber-500">{detail.queue_number}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
              <div className="mt-1">{getStatusBadge(detail.status)}</div>
            </div>
          </div>

          {/* Info Pelanggan & Kendaraan */}
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nama Pelanggan</p>
              <p className="text-sm font-bold text-gray-800">{detail.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">No. HP</p>
              <p className="text-sm font-medium text-gray-600">{detail.phone || '-'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kendaraan</p>
              <p className="text-sm font-bold text-gray-800">{detail.motor_brand} {detail.motor_type}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Plat Nomor</p>
              <p className="text-[11px] font-mono bg-gray-100 px-2 py-1 rounded border border-gray-200 inline-block text-gray-600 uppercase tracking-widest font-bold">
                {detail.plate}
              </p>
            </div>
          </div>

          {/* Layanan */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Layanan yang Dipilih</p>
            <div className="flex gap-2 flex-wrap">
              {detail.services && typeof detail.services === 'string' ? (
                (() => {
                  try {
                    return JSON.parse(detail.services).map((s, i) => (
                      <span key={i} className="bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-1 rounded text-xs font-medium">{s}</span>
                    ));
                  } catch (e) {
                    return <span className="bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-1 rounded text-xs font-medium">{detail.services}</span>;
                  }
                })()
              ) : detail.services && Array.isArray(detail.services) ? (
                detail.services.map((s, i) => (
                  <span key={i} className="bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-1 rounded text-xs font-medium">{s}</span>
                ))
              ) : '-'}
            </div>
          </div>

          {/* Catatan Keluhan */}
          <div className="pt-4 border-t border-gray-100 bg-amber-50 p-4 rounded border border-amber-100">
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-2">Catatan Keluhan</p>
            <p className="text-sm italic text-gray-600 leading-relaxed">
              {detail.notes ? `"${detail.notes}"` : 'Tidak ada catatan.'}
            </p>
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded font-bold text-sm text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;
