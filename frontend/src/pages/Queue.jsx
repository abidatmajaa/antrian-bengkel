import React from 'react';
import { Navbar, Footer } from '../components/home-page';
import { useQueue } from '../context/QueueContext';
import { useBooking } from '../context/BookingContext';
import { WhatsappLogo } from '@phosphor-icons/react';
import { QueueNumbers, QueueProgress, QueueEstimates, QueueAlert } from '../components/queue';

const QueuePage = () => {
  const { myQueueInfo, isLoading, lastUpdatedLabel } = useQueue();
  const { booking, isBooked } = useBooking();

  const displayName = isBooked ? booking.form.name : (myQueueInfo?.name || '-');
  const displayMotor = isBooked
    ? `${booking.form.motorBrand} ${booking.form.motorType} · ${booking.form.plate}`
    : (myQueueInfo?.motor ? `${myQueueInfo.motor} · ${myQueueInfo.plate}` : '-');
  const displayService = isBooked && booking.selectedServices.length > 0
    ? `${booking.selectedServices.length} layanan dipilih`
    : (myQueueInfo?.service || '-');
  const displayCost = isBooked
    ? `Rp ${booking.totalPrice.toLocaleString('id-ID')}`
    : (myQueueInfo?.estimateCost || '-');



  return (
    <div className="min-h-screen bg-[#060606] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-sky-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <div className="relative max-w-2xl mx-auto px-5 md:px-8 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">Pantau Antrian</p>
          <h1 className="font-bebas text-[48px] text-white tracking-wide leading-none">STATUS ANTRIAN</h1>
        </div>



        <div className="relative bg-[#0a0a0a] border border-white/[0.08] rounded-[32px] p-8 overflow-hidden mb-8 shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-amber-400/[0.06] to-transparent pointer-events-none" />

          <div className="relative z-10">
            <QueueNumbers myQueueInfo={myQueueInfo} isLoading={isLoading} />
            <QueueProgress myQueueInfo={myQueueInfo} />
            <QueueEstimates myQueueInfo={myQueueInfo} />
            <QueueAlert myQueueInfo={myQueueInfo} />
          </div>
        </div>



        {/* WhatsApp button */}
        <a
          href="https://wa.me/628123456789"
          target="_blank"
          rel="noreferrer"
          className="mt-6 w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-[15px] py-4 rounded-[16px] transition-all duration-300 shadow-[0_8px_24px_rgba(37,211,102,0.2)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.35)] hover:-translate-y-0.5"
        >
          <WhatsappLogo size={22} weight="fill" />
          Hubungi via WhatsApp
        </a>
      </div>
      <div className="pb-16" />
      <Footer />
    </div>
  );
};

export default QueuePage;
