import React from 'react';
import { User, ChatCircle, Calendar, Hash } from '@phosphor-icons/react';

const ServiceInfoCard = ({ antrian }) => {
  return (
    <div className="bg-surface-container border border-outline rounded-[24px] p-6 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
      
      <div className="flex justify-between items-start border-b border-border pb-4">
        <div>
          <p className="text-on-surface-variant text-sm flex items-center gap-2 mb-1">
             <Hash size={16} /> ID Booking
          </p>
          <p className="text-text-primary font-bold text-lg">{antrian.booking_id}</p>
        </div>
        <div className="text-right">
          <p className="text-on-surface-variant text-sm flex items-center gap-2 justify-end mb-1">
             <Calendar size={16} /> Tanggal
          </p>
          <p className="text-text-primary font-bold text-lg">{antrian.booking_date}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <p className="text-on-surface-variant text-sm flex items-center gap-2 mb-1">
             <User size={16} /> Pelanggan
          </p>
          <p className="text-text-primary font-medium">{antrian.name}</p>
          <p className="text-on-surface-variant text-xs mt-0.5">{antrian.phone}</p>
        </div>
        <div>
           <p className="text-on-surface-variant text-sm flex items-center gap-2 mb-1">
             <ChatCircle size={16} /> Catatan / Keluhan
          </p>
          <p className="text-text-primary font-medium italic text-sm line-clamp-2">"{antrian.notes || 'Tidak ada catatan'}"</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoCard;
