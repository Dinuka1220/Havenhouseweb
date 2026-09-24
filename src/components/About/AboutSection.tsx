import React from 'react';
import { Star, CheckCircle2, Award } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { hotelDetails } from '../../data/hotelDetails';

import aboutImg1 from '../../assets/images/r4.png';
import aboutImg2 from '../../assets/images/r2.jpeg';
import aboutImg3 from '../../assets/images/r3.jpeg';

export const AboutSection: React.FC = () => {
  const { setIsBookingModalOpen } = useBooking();

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overlapping Luxury Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Primary Image */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
                <img
                  src={aboutImg1}
                  alt="Haven House Luxury Bedroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>

              {/* Secondary Floating Overlap Image */}
              <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-44 sm:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img
                  src={aboutImg2}
                  alt="Ensuite Bathroom & Rain Shower"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Third Bottom Overlap Image */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-48 sm:w-60 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img
                  src={aboutImg3}
                  alt="Haven House Executive Suite"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-4 right-4 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200 flex items-center gap-3 animate-float">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C5A880] to-[#9E7D52] flex items-center justify-center text-white shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-stone-800 ml-1">4.9/5</span>
                  </div>
                  <p className="text-[11px] font-semibold text-stone-500">Top Rated in Barry & Vale</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A880]">
                Welcome To Haven House
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1416] tracking-tight leading-tight">
                Where Coastal Calm Meets <br />
                <span className="italic font-normal text-[#B38E5D]">Refined Luxury</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {hotelDetails.description}
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Whether you are catching the seaside breeze along Whitmore Bay, visiting friends and family, or commuting into Cardiff, Haven House Rooms offers your private haven of peace with designer appointments and seamless 24/7 keyless check-in.
            </p>

            {/* Key Perks Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {hotelDetails.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{item.title}</h4>
                    <p className="text-[11px] text-stone-500 leading-normal mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="gold-btn px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md hover:shadow-lg"
              >
                Book Your Stay
              </button>

              <a
                href="#facilities"
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-[#B38E5D] border border-stone-300 hover:border-[#C5A880] transition-colors"
              >
                Explore Facilities ↓
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
