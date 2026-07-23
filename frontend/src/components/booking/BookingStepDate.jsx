import React from 'react';
import { Calendar } from '@phosphor-icons/react';
import DatePicker from './DatePicker';

const BookingStepDate = ({ selectedDate, setDate, selectedServices }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Calendar size={24} className="text-amber-400" />
        <h2 className="font-bebas text-[28px] text-white tracking-wide">Pilih Tanggal</h2>
      </div>
      <DatePicker
        selectedDate={selectedDate}
        onDateSelect={setDate}
        selectedServices={selectedServices}
      />
    </div>
  );
};

export default BookingStepDate;
