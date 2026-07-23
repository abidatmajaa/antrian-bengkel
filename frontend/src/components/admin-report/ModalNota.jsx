import React from 'react';
import { X } from '@phosphor-icons/react';

const ModalNota = ({ isOpen, onClose, selectedAntrian, formatRupiah }) => {
  if (!isOpen || !selectedAntrian) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bebas text-xl text-gray-800 tracking-wide">
            Rincian Tagihan (Nota)
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="text-center mb-6 border-b border-dashed border-gray-200 pb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nota Servis</p>
            <h4 className="font-bebas text-3xl text-gray-800">{selectedAntrian.booking_id}</h4>
            <p className="text-sm text-gray-500">{selectedAntrian.name} - {selectedAntrian.plate}</p>
          </div>

          <div className="space-y-3">
            {selectedAntrian.final_items && (typeof selectedAntrian.final_items === 'string' ? JSON.parse(selectedAntrian.final_items) : selectedAntrian.final_items).map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{item.name}</span>
                <span className="font-bold text-gray-800">{formatRupiah(item.price)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Bayar</span>
          <span className="font-bebas text-2xl text-emerald-600">{formatRupiah(selectedAntrian.final_price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ModalNota;
