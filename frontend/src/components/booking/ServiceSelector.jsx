import React, { useState } from 'react';
import { Check, CaretDown, Info } from '@phosphor-icons/react';
import { categories } from '../estimasi/EstimasiData';

const FAQ = [
  {
    id: 'f1',
    q: 'Apakah harga yang tertera sudah final?',
    a: 'Harga yang tertera adalah estimasi (perkiraan min-max). Harga final akan ditentukan oleh mekanik setelah pengecekan langsung kondisi motor Anda.',
  },
  {
    id: 'f2',
    q: 'Apakah saya bisa memilih lebih dari satu layanan?',
    a: 'Tentu bisa. Anda bebas memilih kombinasi layanan apa saja (misalnya ganti oli mesin sekaligus ganti kampas rem). Estimasi total akan otomatis dihitung.',
  },
  {
    id: 'f3',
    q: 'Bagaimana jika saya tidak tahu nama kerusakannya?',
    a: 'Tidak masalah. Pilih saja layanan yang paling mendekati (misal "Tune Up"), lalu tuliskan detail keluhan Anda (misal: "motor brebet saat digas") di kolom Catatan.',
  },
  {
    id: 'f4',
    q: 'Apakah ada garansi setelah servis?',
    a: 'Ya, kami memberikan garansi perbaikan 7 hari untuk servis ringan dan 30 hari untuk perbaikan berat.',
  },
];

const ServiceSelector = ({ selected, onSelect }) => {
  const [openCategory, setOpenCategory] = useState(categories[0]?.id || null);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-10">
      {/* Services Accordion */}
      <div className="flex flex-col gap-4">
        {categories.map((cat) => {
          const CatIcon = cat.Icon;
          const isCatOpen = openCategory === cat.id;
          const selectedCount = cat.items.filter(item => selected.includes(item.id)).length;

          return (
            <div key={cat.id} className={`border rounded-[20px] overflow-hidden transition-all duration-300 ${isCatOpen ? 'bg-black/60 border-amber-400/30' : 'bg-black/40 border-white/[0.08] hover:border-white/20'}`}>
              <button
                type="button"
                onClick={() => setOpenCategory(isCatOpen ? null : cat.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 transition-colors duration-300 ${isCatOpen || selectedCount > 0 ? 'bg-amber-400/20 text-amber-400' : 'bg-white/[0.05] text-white/40'}`}>
                    <CatIcon size={24} weight={isCatOpen || selectedCount > 0 ? "duotone" : "regular"} />
                  </div>
                  <div>
                    <p className={`font-semibold text-[16px] transition-colors ${isCatOpen || selectedCount > 0 ? 'text-amber-400' : 'text-white'}`}>
                      {cat.label}
                    </p>
                    <p className="text-white/40 text-[12px] mt-0.5">
                      {cat.items.length} Layanan Tersedia
                      {selectedCount > 0 && <span className="text-amber-400 font-bold ml-1.5">• {selectedCount} Dipilih</span>}
                    </p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isCatOpen ? 'bg-amber-400/10 text-amber-400' : 'bg-white/[0.05] text-white/40'}`}>
                  <CaretDown size={16} weight="bold" className={`transition-transform duration-300 ${isCatOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Accordion Content */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isCatOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-5 pt-0 border-t border-white/[0.05] mt-2 space-y-2">
                  {cat.items.map(item => {
                    const isSelected = selected.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(item.id);
                        }}
                        className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                          isSelected 
                            ? 'bg-amber-400/[0.08] border-amber-400/40 shadow-[0_2px_10px_rgba(251,191,36,0.1)]' 
                            : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          <div className={`w-5 h-5 rounded-[6px] border-[1.5px] flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-amber-400 bg-amber-400' : 'border-white/30 group-hover:border-white/50'}`}>
                            {isSelected && <Check size={14} weight="bold" className="text-black" />}
                          </div>
                          <span className={`text-[14px] font-medium text-left transition-colors ${isSelected ? 'text-amber-400' : 'text-white/80'}`}>
                            {item.label}
                          </span>
                        </div>
                        <div className={`text-[12px] font-mono tracking-wide sm:text-right ml-8 sm:ml-0 ${isSelected ? 'text-amber-400' : 'text-white/50'}`}>
                          Rp {item.min.toLocaleString('id-ID')} - {item.max.toLocaleString('id-ID')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] rounded-[24px] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Info size={24} weight="duotone" className="text-amber-400" />
          <h3 className="font-bebas text-[24px] text-white tracking-wide">Tanya Jawab Seputar Servis</h3>
        </div>
        
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <div
              key={item.id}
              className={`border rounded-[16px] transition-all duration-300 overflow-hidden ${
                openFaq === item.id 
                  ? 'bg-amber-400/[0.03] border-amber-400/20' 
                  : 'bg-black/40 border-white/[0.06] hover:bg-white/[0.02] hover:border-white/10'
              }`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 md:px-5 text-left"
                onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
              >
                <span className={`text-[14px] font-semibold transition-colors pr-4 ${openFaq === item.id ? 'text-amber-400' : 'text-white/80'}`}>
                  {item.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === item.id ? 'bg-amber-400/10 text-amber-400' : 'bg-white/[0.05] text-white/40'}`}>
                  <CaretDown size={16} weight="bold" className={`transition-transform duration-300 ${openFaq === item.id ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === item.id ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 pt-0 md:px-5 pb-5 text-white/50 text-[13px] leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;
