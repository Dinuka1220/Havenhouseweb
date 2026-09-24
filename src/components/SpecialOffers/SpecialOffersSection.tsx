import React from 'react';
import { Tag, Sparkles, ArrowRight, Check } from 'lucide-react';
import { offersData } from '../../data/offersData';
import { useBooking } from '../../context/BookingContext';

export const SpecialOffersSection: React.FC = () => {
  const { formatPrice, applyPromo, setIsBookingModalOpen } = useBooking();

  const handleClaimOffer = (promoCode: string) => {
    applyPromo(promoCode);
    setIsBookingModalOpen(true);
  };

  const largeOffer = offersData.find(o => o.isLarge) || offersData[0];
  const sideOffers = offersData.filter(o => !o.isLarge);

  return (
    <section id="offers" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Limited Time Specials
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1416] tracking-tight">
            Our Special Offers & Packages
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            Enhance your visit to Barry with curated experiential packages designed for romance, family vacations, and weekend breaks.
          </p>
        </div>

        {/* Asymmetrical Special Offers Layout matching the screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Large Left Featured Offer */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="group relative bg-[#0F1416] text-white rounded-3xl overflow-hidden border border-stone-800 shadow-xl flex-1 flex flex-col justify-between">
              
              {/* Image Section */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={largeOffer.image}
                  alt={largeOffer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1416] via-[#0F1416]/40 to-transparent" />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-[#C5A880] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{largeOffer.discountBadge}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#C5A880] text-xs font-semibold uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo: {largeOffer.promoCode}</span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white group-hover:text-[#DFCAAB] transition-colors">
                    {largeOffer.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-400 font-light">
                    {largeOffer.subtitle}
                  </p>

                  {/* Inclusions list */}
                  <div className="space-y-2 pt-2">
                    {largeOffer.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block">Starting from</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#C5A880]">
                        {formatPrice(largeOffer.price)}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        {formatPrice(largeOffer.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClaimOffer(largeOffer.promoCode)}
                    className="gold-btn px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Claim Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Stacked Offers */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {sideOffers.map(offer => (
              <div
                key={offer.id}
                className="group relative bg-[#0F1416] text-white rounded-3xl overflow-hidden border border-stone-800 shadow-lg flex flex-col sm:flex-row flex-1 text-left"
              >
                {/* Image */}
                <div className="relative w-full sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden shrink-0">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0F1416]/20 to-[#0F1416] hidden sm:block" />
                  
                  <span className="absolute top-3 left-3 bg-[#C5A880] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    {offer.discountBadge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#C5A880] tracking-wider uppercase flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Code: {offer.promoCode}
                    </span>

                    <h4 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#DFCAAB] transition-colors">
                      {offer.title}
                    </h4>

                    <div className="space-y-1.5 pt-1">
                      {offer.inclusions.slice(0, 3).map((inc, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-300">
                          <Check className="w-3 h-3 text-[#C5A880] shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold font-serif-luxury text-[#C5A880]">
                        {formatPrice(offer.price)}
                      </span>
                      <span className="text-[11px] text-stone-400 block">per night</span>
                    </div>

                    <button
                      onClick={() => handleClaimOffer(offer.promoCode)}
                      className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#C5A880] hover:text-white bg-white/5 hover:bg-[#C5A880] border border-[#C5A880]/40 transition-all cursor-pointer"
                    >
                      Apply & Book →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
