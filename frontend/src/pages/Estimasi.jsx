import React, { useState } from 'react';
import { Navbar, Footer } from '../components/home-page';
import { categories } from '../components/estimasi/EstimasiData';
import DamageSelector from '../components/estimasi/DamageSelector';
import CostSummary from '../components/estimasi/CostSummary';

const EstimasiPage = () => {
  const [openCategory, setOpenCategory] = useState('mesin');
  const [selected, setSelected] = useState({});

  const toggle = (catId, item) => {
    setSelected((prev) => {
      const key = `${catId}::${item.id}`;
      if (prev[key]) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: item };
    });
  };

  const selectedItems = Object.values(selected);
  const totalMin = selectedItems.reduce((s, i) => s + i.min, 0);
  const totalMax = selectedItems.reduce((s, i) => s + i.max, 0);

  return (
    <div className="min-h-screen bg-[#060606] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Navbar />
      <div className="relative max-w-5xl mx-auto px-5 md:px-8 py-16">
        <div className="mb-14 text-center md:text-left">
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-3">Kalkulator Biaya</p>
          <h1 className="font-bebas text-[48px] md:text-[56px] text-white tracking-tight leading-[0.95] mb-4">
            ESTIMASI <span className="text-white/30">BIAYA SERVIS</span>
          </h1>
          <p className="text-white/40 text-[14px] leading-relaxed max-w-xl mx-auto md:mx-0">
            Pilih jenis kerusakan atau layanan di bawah untuk mendapatkan estimasi biaya yang transparan sebelum booking antrian.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <DamageSelector
            categories={categories}
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
            selected={selected}
            toggle={toggle}
          />
          <CostSummary
            selectedItems={selectedItems}
            totalMin={totalMin}
            totalMax={totalMax}
          />
        </div>
      </div>
      <div className="pb-12" />
      <Footer />
    </div>
  );
};

export default EstimasiPage;
