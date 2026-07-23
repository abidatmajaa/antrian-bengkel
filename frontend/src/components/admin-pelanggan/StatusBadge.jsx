import React from 'react';

const StatusBadge = ({ status }) => {
  const map = {
    waiting: { label: 'Menunggu', cls: 'bg-amber-100 text-amber-700 border border-amber-200' },
    in_progress: { label: 'Dikerjakan', cls: 'bg-sky-100 text-sky-700 border border-sky-200' },
    done: { label: 'Selesai', cls: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
    cancelled: { label: 'Dibatalkan', cls: 'bg-red-100 text-red-700 border border-red-200' },
  };
  const s = map[status] || map['waiting'];
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${s.cls}`}>
      {s.label}
    </span>
  );
};

export default StatusBadge;
