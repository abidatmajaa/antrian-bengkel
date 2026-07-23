import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight, Lock } from '@phosphor-icons/react';
import { API_BASE_URL } from '../../config/api';


const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const DatePicker = ({ selectedDate, onDateSelect, selectedServices = [] }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const offset = (firstDay + 6) % 7;

  useEffect(() => {
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/antrian/availability?month=${currentMonth + 1}&year=${currentYear}`
        );
        const data = await res.json();
        if (data.code === 200) {
          setAvailability(data.data);
        }
      } catch (err) {
        console.error('Error fetching availability:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, [currentMonth, currentYear]);

  // Return 'available' | 'full' | 'closed'
  const getStatus = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const info = availability[dateStr];
    if (!info) return 'available'; // optimistic while loading
    return info.status; // 'available' | 'full' | 'closed'
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  return (
    <div className="space-y-6 relative">
      {loading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center rounded-[24px]">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Calendar */}
      <div className="bg-black/40 border border-white/[0.08] rounded-[24px] p-6">

        {/* Month Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-[16px] tracking-wide">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 mb-3">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-white/30 text-[11px] font-semibold uppercase tracking-widest py-1">{d}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty offset cells */}
          {[...Array(offset)].map((_, i) => <div key={`e${i}`} />)}

          {/* Day cells */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const status = getStatus(day);
            const isSelected = selectedDate === dateStr;
            const cellDate = new Date(currentYear, currentMonth, day);
            const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isPast = cellDate < todayDate;
            const isDisabled = isPast || status === 'full' || status === 'closed';
            const info = availability[dateStr];

            let classes = 'aspect-square flex flex-col items-center justify-center rounded-xl text-[13px] font-medium transition-all duration-200 relative ';

            if (isPast) {
              classes += 'text-white/10 cursor-not-allowed';
            } else if (status === 'closed') {
              classes += 'bg-red-500/[0.08] text-red-400/40 border border-red-500/10 cursor-not-allowed';
            } else if (status === 'full') {
              classes += 'bg-red-500/[0.05] text-red-400/40 border border-red-500/10 cursor-not-allowed';
            } else if (isSelected) {
              classes += 'bg-amber-400 text-black font-bold shadow-[0_4px_16px_rgba(251,191,36,0.3)] scale-105 z-10';
            } else {
              classes += 'bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 cursor-pointer';
            }

            return (
              <button
                key={day}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onDateSelect(dateStr)}
                className={classes}
                title={
                  status === 'closed'
                    ? 'Bengkel tutup / libur'
                    : status === 'full'
                      ? `Penuh (${info?.booked ?? '?'}/${info?.quota ?? '?'} antrian)`
                      : ''
                }
              >
                <span>{day}</span>
                {/* Closed lock icon */}
                {!isPast && status === 'closed' && (
                  <Lock size={8} className="text-red-400/40 mt-0.5" weight="fill" />
                )}
                {/* Availability sub-text for available dates */}
                {!isPast && !isSelected && status === 'available' && info && (
                  <span className="text-[8px] text-emerald-400/50 leading-none mt-0.5">
                    {info.quota - info.booked} sisa
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-5 mt-6 pt-5 border-t border-white/[0.05]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
            <span className="text-white/40 text-[11px] font-medium tracking-wide">Tersedia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/10" />
            <span className="text-white/40 text-[11px] font-medium tracking-wide">Penuh</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/10 border border-red-500/10 flex items-center justify-center">
            </span>
            <span className="text-white/40 text-[11px] font-medium tracking-wide">Libur / Tutup</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <span className="text-white/40 text-[11px] font-medium tracking-wide">Dipilih</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
