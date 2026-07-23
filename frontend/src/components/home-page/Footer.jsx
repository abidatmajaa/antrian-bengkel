import React from 'react';
import { Link } from 'react-router-dom';
import {
  InstagramLogo,
  FacebookLogo,
  WhatsappLogo,
  Wrench,
  MapPin,
  Phone,
  Clock,
  EnvelopeSimple,
  ArrowRight
} from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer className="bg-[#040404] border-t border-white/[0.05]">
      {/* CTA Banner */}
      <div className="bg-amber-400/[0.03] border-b border-amber-400/[0.08]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-bebas text-[32px] md:text-[40px] text-white tracking-wide leading-none mb-2">READY TO BOOK?</h3>
            <p className="text-white/50 text-[14px]">Booking antrian sekarang dan hemat waktu tunggu Anda.</p>
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-[0_0_24px_rgba(251,191,36,0.2)] hover:shadow-[0_0_40px_rgba(251,191,36,0.35)] whitespace-nowrap"
          >
            Booking Antrian Sekarang
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        {/* Brand - Takes up more space on desktop */}
        <div className="md:col-span-12 lg:col-span-4">
          <Link to="/" className="flex items-center gap-2 mb-6 group w-fit">
            <img src="/logo.png" alt="Messa Garage Logo" className="w-8 h-8 object-contain" />

            <div className="flex items-baseline gap-1">
              <span className="font-bebas text-[24px] text-white tracking-[0.08em] leading-none">MESSA</span>
              <span className="font-bebas text-[24px] text-amber-400 tracking-[0.08em] leading-none">GARAGE</span>
            </div>
          </Link>
          <p className="text-white/40 text-[13px] leading-[1.8] mb-8 pr-4">
            Bengkel motor terpercaya dengan sistem antrian digital. Nikmati servis profesional, harga transparan, dan waktu pengerjaan yang efisien tanpa perlu menunggu lama.
          </p>
          {/* Social Links */}
          <div className="flex gap-3">
            {[
              { Icon: InstagramLogo, label: 'Instagram' },
              { Icon: FacebookLogo, label: 'Facebook' },
              { Icon: WhatsappLogo, label: 'WhatsApp' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.05] flex items-center justify-center text-white/50 hover:bg-amber-400/10 hover:border-amber-400/30 hover:text-amber-400 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={18} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        {/* Layanan */}
        <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
          <h4 className="font-bebas text-[18px] text-white tracking-widest mb-6">LAYANAN</h4>
          <ul className="space-y-3.5">
            {['Tune Up', 'Ganti Oli', 'Servis Besar', 'Ganti Ban', 'Scan ECU', 'Ganti Aki'].map((item) => (
              <li key={item}>
                <Link to="/booking" className="text-white/40 text-[13px] hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors" />
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Fitur */}
        <div className="md:col-span-4 lg:col-span-2">
          <h4 className="font-bebas text-[18px] text-white tracking-widest mb-6">FITUR</h4>
          <ul className="space-y-3.5">
            {[
              { label: 'Booking Online', to: '/booking' },
              { label: 'Status Antrian', to: '/queue' },
              { label: 'Estimasi Biaya', to: '/estimasi' },
              { label: 'Masuk Akun', to: '/login' },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-white/40 text-[13px] hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="font-bebas text-[18px] text-white tracking-widest mb-6">KONTAK</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={18} weight="fill" className="text-white/30 shrink-0 mt-0.5" />
              <p className="text-white/40 text-[13px] leading-relaxed">
                Jl. Raya Motor No. 88, Bekasi, Jawa Barat 17111
              </p>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} weight="fill" className="text-white/30 shrink-0" />
              <a href="https://wa.me/628123456789" className="text-white/40 text-[13px] hover:text-amber-400 transition-colors">
                +62 812-3456-789
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={18} weight="fill" className="text-white/30 shrink-0" />
              <p className="text-white/40 text-[13px]">
                Senin–Sabtu: 08.00–18.00
              </p>
            </li>
            <li className="flex items-center gap-3">
              <EnvelopeSimple size={18} weight="fill" className="text-white/30 shrink-0" />
              <a href="mailto:info@messagarage.id" className="text-white/40 text-[13px] hover:text-amber-400 transition-colors">
                info@messagarage.id
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05] bg-[#020202]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[12px]">© {new Date().getFullYear()} Messa Garage. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privasi', 'Syarat & Ketentuan', 'FAQ'].map((link) => (
              <a key={link} href="#" className="text-white/30 text-[12px] hover:text-white/70 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
