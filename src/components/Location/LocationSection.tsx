import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Car,
  Plane,
  Train,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Phone,
  Mail,
  Zap,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { hotelDetails, faqs } from '../../data/hotelDetails';
import { useBooking } from '../../context/BookingContext';

interface LandmarkSpot {
  id: string;
  title: string;
  distance: string;
  time: string;
  icon: typeof MapPin;
  category: string;
  query: string;
  embedQuery: string;
}

export const LocationSection: React.FC = () => {
  const { setIsContactModalOpen } = useBooking();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSpotId, setActiveSpotId] = useState<string>('hotel');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const spots: LandmarkSpot[] = [
    {
      id: 'hotel',
      title: "Haven House Rooms (Hotel Location)",
      distance: "At Harbour Crescent",
      time: "Barry Town Centre",
      icon: MapPin,
      category: "Boutique Hotel",
      query: "Harbour+Crescent+Barry+Vale+of+Glamorgan+CF62+8PB",
      embedQuery: "Harbour+Crescent+Barry+CF62+8PB"
    },
    {
      id: 'beach',
      title: "Barry Island Beach & Promenade",
      distance: "0.8 miles",
      time: "4 mins drive / 15 mins walk",
      icon: Navigation,
      category: "Seaside Coast",
      query: "Barry+Island+Pleasure+Park+Barry+Wales",
      embedQuery: "Barry+Island+Beach+Wales"
    },
    {
      id: 'station',
      title: "Barry Docks Railway Station",
      distance: "0.5 miles",
      time: "Direct trains to Cardiff Central (20 mins)",
      icon: Train,
      category: "Rail Transport",
      query: "Barry+Docks+Railway+Station+Wales",
      embedQuery: "Barry+Docks+Station"
    },
    {
      id: 'airport',
      title: "Cardiff Wales Airport (CWL)",
      distance: "3.8 miles",
      time: "9 mins drive / taxi",
      icon: Plane,
      category: "International Flights",
      query: "Cardiff+Airport+Vale+of+Glamorgan",
      embedQuery: "Cardiff+Airport+Wales"
    },
    {
      id: 'cardiff-bay',
      title: "Cardiff Bay & Millennium Centre",
      distance: "8.5 miles",
      time: "18 mins drive",
      icon: Car,
      category: "Culture & Dining",
      query: "Cardiff+Bay+Wales",
      embedQuery: "Cardiff+Bay+Wales"
    }
  ];

  const activeSpot = spots.find(s => s.id === activeSpotId) || spots[0];

  return (
    <section id="location" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Location & Travel Guide
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1416] tracking-tight">
            Explore Barry & The Glamorgan Coast
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            Ideally situated at Harbour Crescent in Barry, Vale of Glamorgan. Unwind in coastal tranquility with swift connections to Cardiff City Centre and Cardiff Wales Airport.
          </p>
        </div>

        {/* Location & Nearby Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Interactive Map & Travel Points */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md space-y-6">
              
              {/* Hotel Address Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                      Haven House Rooms
                    </h3>
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Free Parking
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{hotelDetails.address.full}</span>
                  </p>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeSpot.query)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="gold-btn px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100">
                <iframe
                  title={`Map showing ${activeSpot.title}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${activeSpot.embedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />

                {/* Map Active Landmark Overlay Pill */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-md flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
                  <span className="font-semibold text-stone-800 truncate max-w-[200px] sm:max-w-xs">
                    {activeSpot.title}
                  </span>
                </div>
              </div>

              {/* Interactive Landmark Selector Tabs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Select Destination to Preview Route
                  </span>
                  <span className="text-[11px] text-[#9E7D52] font-semibold">
                    Click to view on map
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {spots.map((spot) => {
                    const Icon = spot.icon;
                    const isSelected = activeSpotId === spot.id;

                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveSpotId(spot.id)}
                        className={`text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-xs'
                            : 'bg-white border-stone-100 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-[#C5A880] text-white'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <span className="font-bold text-xs text-stone-900 block truncate">
                              {spot.title}
                            </span>
                            <span className="text-[10px] text-stone-400 block truncate">
                              {spot.time}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#9E7D52] block">
                            {spot.distance}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free Parking & EV Badge */}
              <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">
                      Complimentary Private Parking & 22kW EV Chargers
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Gated CCTV parking on-site for all staying guests.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Reserved Bays</span>
                </div>
              </div>

              {/* Fast Direct Contacts */}
              <div className="pt-2 flex flex-wrap gap-5 border-t border-stone-100 text-xs text-stone-600">
                <a
                  href={`tel:${hotelDetails.contact.phone}`}
                  className="flex items-center gap-1.5 hover:text-[#B38E5D] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{hotelDetails.contact.displayPhone}</span>
                </a>
                <a
                  href={`mailto:${hotelDetails.contact.email}`}
                  className="flex items-center gap-1.5 hover:text-[#B38E5D] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{hotelDetails.contact.email}</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive FAQ Accordion */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#C5A880]" />
                <span>Frequently Asked Questions</span>
              </h3>

              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="text-xs font-bold text-[#B38E5D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask Concierge</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif-luxury font-bold text-sm sm:text-base text-stone-900 hover:text-[#B38E5D] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C5A880] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 font-light leading-relaxed border-t border-stone-100 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Barry Tourism Quick Tip Card */}
            <div className="bg-gradient-to-br from-[#0F1416] to-[#1C2529] rounded-3xl p-6 text-white text-left space-y-3 shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                Local Insider Tip
              </span>
              <h4 className="font-serif-luxury text-lg font-bold">
                Visiting Gavin & Stacey Sights or Wales Coast Path?
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Barry Island beach and the famous seafront arcade are just 4 minutes away. Our 24/7 digital concierge can recommend the best coastal walking routes and scenic dining spots in the Vale of Glamorgan.
              </p>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="gold-btn px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Request Local Guide</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
