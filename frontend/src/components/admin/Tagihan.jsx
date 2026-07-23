import React from 'react';
import { X } from '@phosphor-icons/react';


const ModalTagihan = ({
  isOpen,
  isViewOnly,
  extraItems,
  onClose,
  onAddItem,
  onChangeItem,
  onRemoveItem,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 className="font-bebas text-xl text-gray-800 tracking-wide">
            {isViewOnly ? 'Rincian Tagihan (Nota)' : 'Input Tagihan Akhir (Fix)'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {!isViewOnly && (
            <div className="mb-2 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700 leading-relaxed">
              <span className="font-bold">Info:</span> Masukkan semua rincian final di sini (termasuk Jasa dan Sparepart).
            </div>
          )}

          {extraItems.map((item, index) => (
            <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded border border-gray-100">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Nama Item (Jasa / Part)
                </label>
                <input
                  type="text"
                  className={`w-full border rounded p-2.5 text-sm transition-all ${isViewOnly
                    ? 'bg-gray-100 border-transparent text-gray-600'
                    : 'bg-white border-gray-200 text-gray-800 focus:outline-none focus:border-amber-500'
                    }`}
                  value={item.name}
                  onChange={(e) => onChangeItem(index, 'name', e.target.value)}
                  readOnly={isViewOnly}
                />
              </div>
              <div className="w-1/3">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  className={`w-full border rounded p-2.5 text-sm transition-all ${isViewOnly
                    ? 'bg-gray-100 border-transparent text-gray-600'
                    : 'bg-white border-gray-200 text-gray-800 focus:outline-none focus:border-amber-500'
                    }`}
                  placeholder="0"
                  value={item.price}
                  onChange={(e) => onChangeItem(index, 'price', e.target.value)}
                  readOnly={isViewOnly}
                />
              </div>
              {!isViewOnly && extraItems.length > 1 && (
                <button
                  onClick={() => onRemoveItem(index)}
                  className="mt-6 text-red-400 hover:text-red-600 p-2 transition-colors"
                >
                  <X size={16} weight="bold" />
                </button>
              )}
            </div>
          ))}

          {!isViewOnly && (
            <button
              onClick={onAddItem}
              className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded text-gray-500 text-xs font-bold uppercase tracking-widest hover:border-amber-500 hover:text-amber-600 transition-colors"
            >
              + Tambah Item Lain
            </button>
          )}

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Tagihan Fix:</span>
            <span className="text-xl font-bebas text-emerald-600 tracking-wide">
              Rp {extraItems.reduce((sum, item) => sum + (parseInt(item.price) || 0), 0).toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded font-bold text-sm text-gray-500 hover:bg-gray-200 transition-colors"
          >
            {isViewOnly ? 'TUTUP' : 'BATAL'}
          </button>
          {!isViewOnly && (
            <button
              onClick={onSave}
              className="px-5 py-2 rounded font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors"
            >
              SIMPAN TAGIHAN FIX
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalTagihan;
