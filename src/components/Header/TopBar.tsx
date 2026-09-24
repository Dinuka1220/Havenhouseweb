import React from 'react';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { useBooking, type Currency } from '../../context/BookingContext';
import { hotelDetails } from '../../data/hotelDetails';

export const TopBar: React.FC = () => {
  const { currency, setCurrency } = useBooking();

  return (
    <div className="bg-[#0F1416] text-[#A6ADB4] text-xs border-b border-white/10 py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Contact Info */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
          <a
            href={`tel:${hotelDetails.contact.phone}`}
            className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{hotelDetails.contact.displayPhone}</span>
          </a>
          <a
            href={`mailto:${hotelDetails.contact.email}`}
            className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{hotelDetails.contact.email}</span>
          </a>
          <a
            href="https://wa.me/441446738900?text=Hello%20Haven%20House%20Rooms%2C%20I%20have%20an%20enquiry%20regarding%20a%20stay"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>WhatsApp Concierge</span>
          </a>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{hotelDetails.address.city}, {hotelDetails.address.county}, UK</span>
          </div>
        </div>

        {/* Right: Direct Perks & Currency */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 text-[#C5A880] bg-[#C5A880]/10 px-2.5 py-0.5 rounded-full border border-[#C5A880]/20 text-[11px] font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Book Direct & Save up to 15%</span>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-0.5 border border-white/10">
            <span className="text-slate-400 text-[11px]">Currency:</span>
            {(['GBP', 'USD', 'EUR'] as Currency[]).map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-[#C5A880] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {curr === 'GBP' ? '£ GBP' : curr === 'USD' ? '$ USD' : '€ EUR'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
