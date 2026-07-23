import React from 'react';
import { X } from '@phosphor-icons/react';


const ModalTambahAntrean = ({
  isOpen,
  form,
  services,
  isSubmitting,
  onClose,
  onSubmit,
  onFormChange,
  onServicesChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bebas text-xl text-gray-800 tracking-wide">TAMBAH ANTREAN OFFLINE</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Nama Pelanggan</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => onFormChange('name', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded text-sm text-gray-800 outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">No. WhatsApp</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => onFormChange('phone', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded text-sm text-gray-800 outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Merek Motor</label>
              <input
                type="text"
                value={form.motorBrand}
                onChange={(e) => onFormChange('motorBrand', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded text-sm text-gray-800 outline-none focus:border-amber-500"
                placeholder="Misal: Honda"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Tipe Motor</label>
              <input
                type="text"
                value={form.motorType}
                onChange={(e) => onFormChange('motorType', e.target.value)}
                className="w-full p-2 border border-gray-200 rounded text-sm text-gray-800 outline-none focus:border-amber-500"
                placeholder="Misal: Vario 150"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Plat Nomor</label>
            <input
              type="text"
              value={form.plate}
              onChange={(e) => onFormChange('plate', e.target.value)}
              className="w-full p-2 border border-gray-200 rounded font-mono text-sm text-gray-800 outline-none focus:border-amber-500 uppercase"
              placeholder="B 1234 ABC"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">Layanan Servis</label>
            <div className="flex gap-4">
              {['servis-bulanan', 'servis-besar'].map((svc) => (
                <label key={svc} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={services.includes(svc)}
                    onChange={(e) => onServicesChange(svc, e.target.checked)}
                    className="w-4 h-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {svc === 'servis-bulanan' ? 'Servis Bulanan' : 'Servis Besar'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Catatan Keluhan</label>
            <textarea
              value={form.notes}
              onChange={(e) => onFormChange('notes', e.target.value)}
              className="w-full p-2 border border-gray-200 rounded text-sm text-gray-800 outline-none focus:border-amber-500 min-h-[80px]"
              placeholder="Opsional..."
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded font-bold text-sm text-gray-500 hover:bg-gray-200 transition-colors"
            >
              BATAL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded font-bold text-sm text-white bg-amber-500 hover:bg-amber-600 shadow-md transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'MENYIMPAN...' : 'TAMBAH ANTREAN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTambahAntrean;
