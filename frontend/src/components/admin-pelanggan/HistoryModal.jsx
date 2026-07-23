import React, { useState, useEffect } from 'react';
import { X } from '@phosphor-icons/react';
import StatusBadge from './StatusBadge';
import { API_BASE_URL } from '../../config/api';

const HistoryModal = ({ isOpen, onClose, user }) => {
  const [antrians, setAntrians] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json();
        if (data.code === 200) setAntrians(data.data.antrians || []);
      } catch {
        setAntrians([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [isOpen, user]);

  const formatRupiah = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n || 0);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
          <div>
            <h3 className="font-bebas text-xl text-gray-800 tracking-wide">Riwayat Servis</h3>
            <p className="text-xs text-gray-500 mt-0.5">{user.name} — {user.email}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {loading ? (
            <div className="text-center py-12 text-emerald-500 text-sm font-bold animate-pulse uppercase tracking-widest">
              Memuat riwayat...
            </div>
          ) : antrians.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              Pelanggan ini belum memiliki riwayat servis.
            </div>
          ) : (
            <div className="space-y-3">
              {antrians.map((a) => (
                <div key={a.id} className="border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="font-mono text-[11px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase tracking-wider">
                          {a.booking_id}
                        </span>
                        <StatusBadge status={a.status} />
                      </div>
                      <p className="text-sm font-bold text-gray-800">{a.motor_brand} {a.motor_type}</p>
                      <p className="text-xs text-gray-500 font-mono">{a.plate}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-emerald-600">{formatRupiah(a.final_price || a.estimated_price)}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {new Date(a.booking_date || a.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-between items-center">
          <span className="text-xs text-gray-500 font-medium">{antrians.length} riwayat servis</span>
          <button onClick={onClose} className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-gray-700 transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
