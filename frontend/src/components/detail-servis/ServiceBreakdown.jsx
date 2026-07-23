import React from 'react';
import { Wrench, Receipt, PencilSimple, Package } from '@phosphor-icons/react';
import { categories } from '../estimasi/EstimasiData';

const formatRp = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};

const ServiceBreakdown = ({ antrian }) => {
  const { services, estimated_price, final_items, final_price, notes } = antrian;
  
  // Parse services if stringified array
  let parsedServices = services;
  if (typeof services === 'string') {
      try {
          parsedServices = JSON.parse(services);
      } catch (e) {
          parsedServices = [services];
      }
  }
  
  let totalMin = 0;
  let totalMax = 0;
  
  const mappedServices = parsedServices.map(svcId => {
    let matchedItem = null;
    categories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.id === svcId) matchedItem = item;
      });
    });
    if (matchedItem) {
      totalMin += matchedItem.min;
      totalMax += matchedItem.max;
      return matchedItem;
    }
    return { label: svcId.replace('-', ' ') };
  });

  const isFinal = final_items && final_items.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* ── Tindakan Servis / Rincian Akhir ───────────────────────────────── */}
      <section className="flex flex-col gap-sm">
        <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase px-xs flex items-center gap-xs">
          {isFinal ? <Receipt size={13} /> : <Wrench size={13} />} 
          {isFinal ? 'Rincian Tagihan Akhir' : 'Layanan Dipilih (Estimasi)'}
        </h2>
        <div className="border border-border rounded-lg bg-surface-container-lowest flex flex-col overflow-hidden">
          
          {isFinal ? (
            final_items.map((item, i) => {
                const name = typeof item === 'object' ? item.name : item;
                const price = typeof item === 'object' ? item.price : 0;
                return (
                  <div key={i} className={`p-md flex justify-between items-center ${i < final_items.length - 1 ? 'border-b border-border' : ''}`}>
                    <span className="font-body-md text-body-md text-text-primary flex-1 pr-md">{name}</span>
                    <span className="font-data-numeric text-data-numeric text-text-primary whitespace-nowrap">{formatRp(price)}</span>
                  </div>
                );
            })
          ) : (
            mappedServices.map((svc, i) => (
              <div key={i} className={`p-md flex justify-between items-center ${i < mappedServices.length - 1 ? 'border-b border-border' : ''}`}>
                <span className="font-body-md text-body-md text-text-primary capitalize flex-1 pr-md">{svc.label}</span>
                {svc.min && <span className="font-data-numeric text-data-numeric text-text-primary/50 text-[12px] whitespace-nowrap">{formatRp(svc.min)} - {formatRp(svc.max)}</span>}
              </div>
            ))
          )}

          <div className="p-md flex justify-between items-center bg-surface-container border-t border-border">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                {isFinal ? 'Total Bayar' : 'Estimasi Total'}
            </span>
            <span className="font-data-numeric text-data-numeric text-on-surface font-bold text-sm sm:text-base">
              {isFinal ? formatRp(final_price) : (totalMax > 0 ? `${formatRp(totalMin)} - ${formatRp(totalMax)}` : formatRp(estimated_price))}
            </span>
          </div>
        </div>
      </section>

      {/* ── Grand Total ──────────────────────────────────────────────────── */}
      <section className="bg-primary-container border border-primary p-md rounded-lg flex flex-col items-end shadow-gold-sm">
        <span className="font-label-caps text-label-caps text-on-primary-container uppercase opacity-80 mb-xs tracking-[0.12em]">
          {isFinal ? 'Total Pembayaran' : 'Total Estimasi Awal'}
        </span>
        <span className="font-display-xl-mobile text-display-xl-mobile text-on-primary-container tracking-wider text-right">
          {isFinal ? formatRp(final_price) : (totalMax > 0 ? `${formatRp(totalMin)} - ${formatRp(totalMax)}` : formatRp(estimated_price))}
        </span>
      </section>

      {/* ── Perhatian / Catatan ────────────────────────────────────────── */}
      {!isFinal && (
        <section className="bg-surface-card border border-border p-md rounded-lg flex gap-md items-start">
          <PencilSimple size={20} weight="duotone" className="text-primary mt-1 flex-shrink-0" />
          <div className="flex flex-col gap-xs">
            <span className="font-label-caps text-label-caps text-text-primary uppercase tracking-[0.12em]">
              Perhatian
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant italic">Ini adalah harga perkiraan awal. Rincian biaya aktual (jasa & suku cadang) akan dicantumkan saat pengerjaan selesai.</p>
          </div>
        </section>
      )}

    </div>
  );
};

export default ServiceBreakdown;
