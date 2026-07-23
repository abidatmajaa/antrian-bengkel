import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/api';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Rizal H.",
    text: "Booking mudah, servis cepat, dan hasilnya memuaskan. Motor saya kembali prima setelah overhaul di sini.",
    rating: 5,
  },
  {
    id: 2,
    name: "Budi Santoso",
    text: "Mantap! Ga perlu antri lama lagi. Dateng, motor langsung diproses. 10/10 recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sari Wulandari",
    text: "Booking online gampang banget. Estimasi biaya di awal bikin tenang, ga ada biaya kejutan saat selesai.",
    rating: 5,
  },
  {
    id: 4,
    name: "Eko Prasetyo",
    text: "Teknisinya profesional dan ramah. Laporan servisnya lengkap, sangat transparan.",
    rating: 5,
  },
  {
    id: 5,
    name: "Andi P.",
    text: "Pengerjaan sangat rapi dan mekaniknya komunikatif. Sangat memuaskan!",
    rating: 5,
  }
];


const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews/featured`);
        const data = await res.json();
        if (res.ok && data.data && data.data.length > 0) {
          const formatted = data.data.map(r => ({
            id: r.id,
            name: r.User?.name || 'Pelanggan',
            text: r.comment || 'Pelayanan sangat memuaskan.',
            rating: r.rating,
          }));
          setReviews(formatted);
        } else {
          setReviews(TESTIMONIALS_DATA);
        }
      } catch (err) {
        setReviews(TESTIMONIALS_DATA);
      }
    };

    fetchReviews();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayData = reviews.length > 0 ? reviews : TESTIMONIALS_DATA;
  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, displayData.length - visibleCount);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [maxIndex, currentIndex]);

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  return (
    <section id="ulasan" aria-label="Ulasan pelanggan" className="py-20 px-4 bg-gradient-to-b from-[#050914] to-[#02040a] relative overflow-hidden">

      {/* Header Section */}
      <div className="text-center mb-16 relative z-10">
        <p className="text-amber-400 text-[12px] font-bold uppercase tracking-[0.2em] mb-3 flex justify-center items-center gap-2">
          <span className="w-4 h-[2px] bg-amber-400"></span>
          ULASAN
          <span className="w-4 h-[2px] bg-amber-400"></span>
        </p>
        <h2 className="font-bebas text-[56px] tracking-wide leading-none mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">KATA</span> <span className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">PELANGGAN</span>
        </h2>
        <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-[1100px] mx-auto">
        {/* Slider Track Wrapper */}
        <div className="overflow-hidden w-full -mx-3 px-3">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.333)}%)` }}
          >
            {displayData.map((t) => (
              <div key={t.id} className="w-full md:w-1/3 shrink-0 px-3">
                <article className="bg-[#121212] rounded-[24px] p-8 flex flex-col justify-between h-full">
                  <div className="mb-8">
                    {/* Yellow Quote Icon (dari Gambar 2) */}
                    <svg className="w-10 h-10 text-amber-400 mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 6.79086 11.8079 5 14.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56929 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56929 8 6.017 8H2.017C1.46472 8 1.017 8.44772 1.017 9V12C1.017 12.5523 0.569287 13 0.017 13H-1.983C-2.53528 13 -2.983 12.5523 -2.983 12V9C-2.983 6.79086 -1.19214 5 1.017 5H6.017C8.22614 5 10.017 6.79086 10.017 9V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z" />
                    </svg>

                    {/* Italic Text */}
                    <p className="text-white/90 text-[16px] leading-relaxed italic font-light">
                      {t.text}
                    </p>
                  </div>

                  {/* Footer Card: Name & Stars */}
                  <div>
                    <p className="text-white font-bold text-[16px] mb-2">{t.name}</p>
                    <div className="flex gap-1" aria-label={`Rating ${t.rating} Bintang`}>
                      {[...Array(t.rating)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-[18px]">★</span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation (Tombol & Dots di bawah) */}
        <div className="flex justify-center items-center gap-8 mt-12">

          {/* Prev Button (Hitam Border Kuning) */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full border border-amber-400 flex items-center justify-center text-amber-400 bg-transparent disabled:opacity-30 hover:bg-amber-400/10 transition-all cursor-pointer disabled:cursor-not-allowed"
            aria-label="Testimoni sebelumnya"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2.5">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-6 bg-amber-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                aria-label={`Pergi ke halaman ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button (Kuning Solid) */}
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-black disabled:opacity-30 hover:bg-amber-300 transition-all cursor-pointer disabled:cursor-not-allowed shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            aria-label="Testimoni selanjutnya"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
