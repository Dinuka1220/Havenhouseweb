import React from 'react';
import {
  KeyRound,
  Sparkles,
  Wifi,
  Car,
  Coffee,
  Compass,
  Tv,
  Thermometer,
  ShieldAlert,
  CupSoda
} from 'lucide-react';
import { facilitiesData } from '../../data/amenitiesData';

const iconMap: Record<string, React.ElementType> = {
  KeyRound,
  Sparkles,
  Wifi,
  Car,
  Coffee,
  Compass,
  Tv,
  Thermometer,
  ShieldAlert,
  CupSoda
};

export const FacilitiesSection: React.FC = () => {
  return (
    <section id="facilities" className="py-20 sm:py-28 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Curated For Comfort
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1416] tracking-tight">
            Hotel Facilities & Amenities
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            Every detail at Haven House Rooms has been carefully considered to provide you with an effortless, restful, and memorable stay.
          </p>
        </div>

        {/* Facilities Grid matching the reference cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facilitiesData.map(item => {
            const Icon = iconMap[item.iconName] || Sparkles;

            return (
              <div
                key={item.id}
                className="group relative bg-[#FAF8F5] hover:bg-white rounded-2xl p-7 sm:p-8 border border-stone-200/80 hover:border-[#C5A880]/50 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center text-center"
              >
                {/* Badge if present */}
                {item.badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-[#9E7D52] bg-[#C5A880]/15 px-2.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}

                {/* Icon Container with Gold Glow */}
                <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#C5A880] group-hover:to-[#9E7D52] border border-stone-200 group-hover:border-transparent flex items-center justify-center text-[#B38E5D] group-hover:text-white shadow-sm transition-all duration-300 mb-6 group-hover:scale-110">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="font-serif-luxury text-lg font-bold text-stone-900 group-hover:text-[#B38E5D] transition-colors mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Subtle bottom decorative line */}
                <div className="w-10 h-[2px] bg-stone-200 group-hover:w-16 group-hover:bg-[#C5A880] transition-all duration-300 mt-6" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
