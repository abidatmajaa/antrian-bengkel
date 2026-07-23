import React from 'react';
import { CaretDown, Check } from '@phosphor-icons/react';

const DamageSelector = ({ categories, openCategory, setOpenCategory, selected, toggle }) => {
  const selectedItems = Object.values(selected);

  return (
    <div className="lg:col-span-3 space-y-4">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.06] rounded-[20px] overflow-hidden transition-all duration-300">
          {/* Category header */}
          <button
            type="button"
            onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
            className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openCategory === cat.id ? 'bg-amber-400/10 text-amber-400' : 'bg-white/[0.05] text-white/40'}`}>
                {cat.Icon && <cat.Icon size={20} weight={openCategory === cat.id ? "duotone" : "regular"} />}
              </div>
              <span className="font-semibold text-white text-[15px] tracking-wide">{cat.label}</span>
              {selectedItems.filter((i) => Object.keys(selected).some((k) => k.startsWith(cat.id))).length > 0 && (
                <span className="bg-amber-400/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  {Object.keys(selected).filter((k) => k.startsWith(cat.id)).length} dipilih
                </span>
              )}
            </div>
            <CaretDown size={20} weight="bold" className={`text-white/30 transition-transform duration-300 ${openCategory === cat.id ? 'rotate-180 text-amber-400' : ''}`} />
          </button>

          {/* Items */}
          <div className={`overflow-hidden transition-all duration-300 ${openCategory === cat.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="border-t border-white/[0.05] bg-black/20">
              {cat.items.map((item) => {
                const key = `${cat.id}::${item.id}`;
                const isSelected = !!selected[key];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(cat.id, item)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left border-b border-white/[0.03] last:border-0 transition-all duration-200 group ${isSelected ? 'bg-amber-400/[0.08]' : 'hover:bg-white/[0.04]'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-[6px] border-[1.5px] flex items-center justify-center transition-all ${isSelected ? 'border-amber-400 bg-amber-400' : 'border-white/20 group-hover:border-white/40'
                        }`}
                      >
                        {isSelected && <Check size={14} weight="bold" className="text-black" />}
                      </div>
                      <span className={`text-[14px] font-medium transition-colors ${isSelected ? 'text-amber-400' : 'text-white/70 group-hover:text-white'}`}>
                        {item.label}
                      </span>
                    </div>
                    <span className={`text-[13px] whitespace-nowrap transition-colors ${isSelected ? 'text-amber-400/70 font-medium' : 'text-white/30 group-hover:text-white/50'}`}>
                      Rp {item.min.toLocaleString('id-ID')} – {item.max.toLocaleString('id-ID')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DamageSelector;
