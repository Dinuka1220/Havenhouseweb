import React from 'react';
import { Play, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { BookingSearchWidget } from './BookingSearchWidget';

import heroImg from '../../assets/images/r7.png';

export const HeroSection: React.FC = () => {
  const { setIsBookingModalOpen, setIsVideoModalOpen } = useBooking();

  return (
    <section id="home" className="relative">
      {/* Hero Banner with Luxury Background Image */}
      <div className="relative min-h-[620px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Ambient Zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url(${heroImg})`
          }}
        />

        {/* Multi-layered Dark & Gold Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1416] via-[#0F1416]/65 to-[#0F1416]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0F1416]/40 to-[#0F1416]/80" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-24 sm:pb-32">
          {/* Top Small Luxury Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFCAAB] text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>5-Star Boutique Experience in Barry, Wales</span>
          </div>

          {/* Main Editorial Serif Heading */}
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12] mb-6 drop-shadow-lg">
            Luxury Stay Hotel Experience <br className="hidden sm:block" />
            <span className="gold-gradient-text italic font-normal">Comfort & Elegance</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200/90 font-light leading-relaxed mb-8">
            Haven House Rooms offers an oasis of calm on the South Wales coast.
            Indulge in handcrafted suites, designer rain showers, and effortless modern living.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full sm:w-auto gold-btn px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer shadow-xl hover:scale-105 transition-all"
            >
              Book Your Stay
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-[#C5A880] text-[#0F1416] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Virtual Tour</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-300 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Direct Booking Best Rate Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#C5A880]" />
              <span>4 Mins to Barry Island Beach</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>4.9★ Guest Satisfaction (380+ Reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Booking Search Bar Widget */}
      <BookingSearchWidget />
    </section>
  );
};
