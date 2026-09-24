import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

import tourBg from '../../assets/images/r5.png';

export const VirtualTourSection: React.FC = () => {
  const { setIsVideoModalOpen } = useBooking();

  return (
    <section className="relative py-28 sm:py-36 bg-stone-900 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url(${tourBg})`
        }}
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1416]/90 via-[#0F1416]/70 to-[#0F1416]/80" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white space-y-6">
        
        {/* Pulsating Luxury Play Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="relative group cursor-pointer"
            aria-label="Play Virtual Tour Video"
          >
            {/* Outer Glowing Ripple */}
            <div className="absolute -inset-4 rounded-full bg-[#C5A880]/30 animate-pulse-slow blur-sm group-hover:bg-[#C5A880]/50 transition-colors" />
            
            {/* Middle Ring */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#C5A880] to-[#9E7D52] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 border-2 border-white/40">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </button>
        </div>

        {/* Small Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFCAAB] text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Interactive 360° Walkthrough</span>
        </div>

        {/* Title */}
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
          Immerse Yourself in the Sanctuary of <br />
          <span className="gold-gradient-text italic font-normal">Haven House Rooms, Barry</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Take a look inside our designer suites, relaxing rain showers, and bespoke amenities before your stay. Experience the pinnacle of coastal luxury in South Wales.
        </p>

      </div>
    </section>
  );
};
