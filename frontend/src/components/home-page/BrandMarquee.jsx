import React from 'react';

// Using simple SVG placeholders or text for brands to ensure it looks good immediately
const BRANDS = [
  "HONDA", "YAMAHA", "SUZUKI", "KAWASAKI", "VESPA", "KTM", "DUCATI", "APRILIA"
];

const BrandMarquee = () => {
  return (
    <div className="w-full bg-[#030303] border-y border-white/[0.03] py-8 overflow-hidden relative">
      {/* Gradient masks for smooth fade effect on edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="flex w-max animate-marquee">
        {/* We double the array to create the infinite loop effect seamlessly */}
        {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-12 md:px-20 group"
          >
            <span className="font-bebas text-3xl md:text-4xl tracking-widest text-white/10 group-hover:text-white/40 transition-colors duration-300 select-none">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;
