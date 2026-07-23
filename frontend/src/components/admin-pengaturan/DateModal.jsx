import React, { useState } from 'react';
import { X, Lock, UsersThree, Trash, FloppyDisk } from '@phosphor-icons/react';
import { API_BASE_URL } from '../../config/api';

const DateModal = ({ date, existingQuota, defaultQuota, onClose, onSaved, onDeleted }) => {
  const [quota, setQuota] = useState(existingQuota != null ? String(existingQuota.max_quota) : '');
  const [note, setNote] = useState(existingQuota?.note || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOverride = existingQuota != null;
  const dateObj = new Date(date + 'T00:00:00');
  const dateLabel = dateObj.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const handleSave = async () => {
    const q = parseInt(quota);
    if (isNaN(q) || q < 0 || q > 200) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/date-quotas/${date}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ max_quota: q, note }),
      });
      const data = await res.json();
      if (data.code === 200) { onSaved(); onClose(); }
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/date-quotas/${date}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (data.code === 200) { onDeleted(); onClose(); }
    } catch { } finally { setDeleting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300">
      <div className="bg-[#141414] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden transform scale-100 animate-[zoomIn_0.2s_ease-out]">

        <div className="relative p-6 pb-4 flex items-start justify-between border-b border-gray-800/50">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Atur Kapasitas</h3>
            <p className="text-[13px] text-gray-400 mt-1 font-medium">{dateLabel}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {isOverride ? (
            <div className="flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-4">
              <div className="p-2 bg-yellow-400/20 rounded-lg">
                <Lock size={16} className="text-yellow-400 shrink-0" weight="fill" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-yellow-500 uppercase tracking-widest">Override Aktif</span>
                <span className="text-[13px] text-yellow-100 font-medium mt-0.5">
                  {existingQuota.max_quota === 0 ? 'Tutup (Libur)' : `${existingQuota.max_quota} antrian`}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <UsersThree size={16} className="text-gray-400 shrink-0" weight="fill" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Kapasitas Default</span>
                <span className="text-[13px] text-gray-200 font-medium mt-0.5">{defaultQuota} antrian</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
              Kapasitas Khusus
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number" min={0} max={200}
                value={quota}
                onChange={e => setQuota(e.target.value)}
                placeholder={String(defaultQuota)}
                className="w-24 px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-center text-xl font-bold text-white tracking-wide focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
              />
              <span className="text-sm font-medium text-gray-400">antrian</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[0, 5, 10, 15, 20, 25].map(p => {
              const isSelected = parseInt(quota) === p;
              return (
                <button
                  key={p}
                  onClick={() => setQuota(String(p))}
                  className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all duration-200 ${isSelected
                    ? 'bg-yellow-400 text-black'
                    : 'bg-[#0a0a0a] border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                    }`}
                >
                  {p === 0 ? 'Tutup' : p}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
              Keterangan <span className="normal-case text-[11px] text-gray-600 font-medium">(opsional)</span>
            </label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Cth: Libur Nasional..."
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
            />
          </div>
        </div>

        <div className="p-6 pt-4 flex gap-3 border-t border-gray-800/50 bg-[#0a0a0a]/50">
          {isOverride && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2.5 border border-red-500/30 bg-red-500/10 text-red-400 text-[13px] font-bold rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              <Trash size={16} weight="bold" />
            </button>
          )}
          <div className="flex gap-3 ml-auto">
            <button onClick={onClose} className="px-5 py-2.5 text-[13px] font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Batal</button>
            <button
              onClick={handleSave}
              disabled={saving || quota === ''}
              className="flex items-center gap-2 px-6 py-2.5 bg-yellow-400 text-black text-[13px] font-bold rounded-lg hover:bg-yellow-300 transition-all disabled:opacity-50"
            >
              <FloppyDisk size={16} weight="bold" />{saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default DateModal;
