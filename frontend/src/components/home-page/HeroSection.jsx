import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarBlank, Calculator, ArrowRight,
  CheckCircle, Clock, Star, ShieldCheck,
  Motorcycle, Wrench, Money
} from '@phosphor-icons/react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#060606]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://blog.indoteknik.com/wp-content/uploads/2025/03/day-6-71.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#060606]/80 via-[#060606]/60 to-[#060606] pointer-events-none" />

      {/* Ambient glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-amber-400/[0.08] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[600px] h-[600px] bg-amber-500/[0.06] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-center">

          {/* ── Left Column ── */}
          <div className="flex flex-col gap-7">
            {/* Heading */}
            <div className="space-y-1">
              <h1 data-aos="fade-up" data-aos-delay="50" className="font-bebas text-[64px] md:text-[80px] lg:text-[88px] leading-[0.92] text-white tracking-[-0.01em]">
                SERVIS MOTOR
              </h1>
              <h1
                data-aos="fade-up" data-aos-delay="100"
                className="font-bebas text-[64px] md:text-[80px] lg:text-[88px] leading-[0.92] tracking-[-0.01em] text-amber-400"
              >
                TANPA ANTRI
              </h1>
              <h1 data-aos="fade-up" data-aos-delay="150" className="font-bebas text-[64px] md:text-[80px] lg:text-[88px] leading-[0.92] text-white/20 tracking-[-0.01em]">
                LAMA
              </h1>
            </div>

            {/* CTAs */}
            <div data-aos="fade-up" data-aos-delay="250" className="flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm px-6 py-3.5 rounded-2xl transition-all duration-200 shadow-[0_0_24px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.45)]"
              >
                <CalendarBlank size={17} weight="bold" />
                Booking Antrian
                <ArrowRight size={15} weight="bold" />
              </Link>
              <Link
                to="/estimasi"
                className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.18] text-white font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all duration-200"
              >
                <Calculator size={17} />
                Cek Estimasi Biaya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
