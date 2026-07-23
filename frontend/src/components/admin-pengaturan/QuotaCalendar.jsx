import React, { useState, useEffect, useCallback } from 'react';
import { CalendarBlank, CaretLeft, CaretRight } from '@phosphor-icons/react';
import DateModal from './DateModal';
import { API_BASE_URL } from '../../config/api';

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

const QuotaCalendar = ({ defaultQuota, showToast }) => {
  const today = new Date();
  const [curYear, setCurYear] = useState(today.getFullYear());
  const [curMonth, setCurMonth] = useState(today.getMonth());
  const [quotaMap, setQuotaMap] = useState({});
  const [loadingCal, setLoadingCal] = useState(false);
  const [modalDate, setModalDate] = useState(null);

  const monthKey = `${curYear}-${String(curMonth + 1).padStart(2, '0')}`;

  const fetchMonth = useCallback(async () => {
    setLoadingCal(true);
    try {
      const res = await fetch(`${API_BASE_URL}/date-quotas?month=${monthKey}`);
      const data = await res.json();
      if (data.code === 200) {
        const map = {};
        data.data.quotas.forEach(q => { map[q.date] = q; });
        setQuotaMap(map);
      }
    } catch { } finally { setLoadingCal(false); }
  }, [monthKey]);

  useEffect(() => { fetchMonth(); }, [fetchMonth]);

  const prevMonth = () => { if (curMonth === 0) { setCurMonth(11); setCurYear(y => y - 1); } else { setCurMonth(m => m - 1); } };
  const nextMonth = () => { if (curMonth === 11) { setCurMonth(0); setCurYear(y => y + 1); } else { setCurMonth(m => m + 1); } };

  const firstDay = new Date(curYear, curMonth, 1);
  const lastDay = new Date(curYear, curMonth + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const getCellTheme = (dateStr) => {
    const q = quotaMap[dateStr];
    if (!q) return {
      bg: 'bg-[#1a1a1a] hover:bg-[#222]',
      border: 'border-gray-800 hover:border-gray-600',
      text: 'text-gray-200',
      quotaText: 'text-gray-500'
    };
    if (q.max_quota === 0) return {
      bg: 'bg-red-500/10 hover:bg-red-500/20',
      border: 'border-red-500/30 hover:border-red-500/50',
      text: 'text-red-400',
      quotaText: 'text-red-500'
    };
    if (q.max_quota < defaultQuota) return {
      bg: 'bg-yellow-500/10 hover:bg-yellow-500/20',
      border: 'border-yellow-500/30 hover:border-yellow-500/50',
      text: 'text-yellow-400',
      quotaText: 'text-yellow-500'
    };
    return {
      bg: 'bg-green-500/10 hover:bg-green-500/20',
      border: 'border-green-500/30 hover:border-green-500/50',
      text: 'text-green-400',
      quotaText: 'text-green-500'
    };
  };

  return (
    <div className="bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden shadow-sm relative">

      {/* Calendar Header */}
      <div className="p-4 md:p-5 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-white">
            <CalendarBlank size={20} weight="duotone" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-white tracking-tight">Kapasitas Harian</h3>
            <p className="text-[12px] text-gray-400 font-medium">Klik pada tanggal untuk mengatur kapasitas khusus</p>
          </div>
        </div>

        {/* Month nav */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0a0a0a] border border-gray-800 rounded-lg">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-all">
            <CaretLeft size={14} weight="bold" />
          </button>
          <span className="text-[13px] font-bold text-white min-w-[110px] text-center tracking-wide">
            {MONTHS_ID[curMonth]} {curYear}
          </span>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-all">
            <CaretRight size={14} weight="bold" />
          </button>
        </div>
      </div>

      {/* Grid container */}
      <div className="p-4 md:p-5">

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-5">
          {[
            { color: 'bg-[#1a1a1a] border-gray-800', dot: 'bg-gray-500', label: `Default (${defaultQuota})` },
            { color: 'bg-green-500/10 border-green-500/30', dot: 'bg-green-400', label: 'Ditambah' },
            { color: 'bg-yellow-500/10 border-yellow-500/30', dot: 'bg-yellow-400', label: 'Dikurangi' },
            { color: 'bg-red-500/10 border-red-500/30', dot: 'bg-red-400', label: 'Tutup / Libur' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-md border ${l.color} flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${l.dot}`} />
              </div>
              <span className="text-[12px] font-semibold text-gray-400">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 mb-3">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[12px] font-bold uppercase tracking-widest text-gray-500">
              {d}
            </div>
          ))}
        </div>

        {loadingCal ? (
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-gray-800 border-t-yellow-400 rounded-full animate-spin" />
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest animate-pulse">Memuat kalender...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="min-h-[55px] md:min-h-[65px] rounded-lg bg-[#0a0a0a]" />;

              const dateStr = `${curYear}-${String(curMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const override = quotaMap[dateStr];
              const isPast = dateStr < todayStr;
              const isToday = dateStr === todayStr;

              const theme = getCellTheme(dateStr);

              return (
                <button
                  key={dateStr}
                  onClick={() => setModalDate(dateStr)}
                  className={`
                    relative rounded-lg border min-h-[55px] md:min-h-[65px] p-1.5 flex flex-col items-center justify-center
                    transition-all duration-200 group
                    ${theme.bg} ${theme.border}
                    ${isPast ? 'opacity-40 hover:opacity-80 grayscale' : 'hover:-translate-y-0.5'}
                  `}
                >
                  {/* Today Ring Glow */}
                  {isToday && (
                    <div className="absolute inset-0 rounded-lg border border-yellow-400 pointer-events-none" />
                  )}

                  <span className={`
                    text-[13px] font-bold z-10 w-6 h-6 flex items-center justify-center rounded-md mb-0.5
                    ${isToday ? 'bg-yellow-400 text-black' : theme.text}
                  `}>
                    {day}
                  </span>

                  {override ? (
                    <span className={`text-[10px] font-bold tracking-wide z-10 ${theme.quotaText}`}>
                      {override.max_quota === 0 ? 'TUTUP' : `${override.max_quota}Q`}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                      Atur
                    </span>
                  )}

                  {override?.note && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-yellow-400 rounded-full" title={override.note} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {modalDate && (
        <DateModal
          date={modalDate}
          existingQuota={quotaMap[modalDate] || null}
          defaultQuota={defaultQuota}
          onClose={() => setModalDate(null)}
          onSaved={() => { fetchMonth(); showToast(`Kapasitas ${modalDate} berhasil disimpan!`); }}
          onDeleted={() => { fetchMonth(); showToast(`Override ${modalDate} dihapus, kembali ke default.`); }}
        />
      )}
    </div>
  );
};

export default QuotaCalendar;
