import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { roomsData } from '../../data/roomsData';
import { RoomCard } from './RoomCard';

export const RoomsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Rooms & Suites' },
    { id: 'deluxe', label: 'Deluxe Rooms' },
    { id: 'executive', label: 'Executive Vista' },
    { id: 'suite', label: 'Master Suites' },
    { id: 'family', label: 'Family Apartments' },
  ];

  const filteredRooms = activeCategory === 'all'
    ? roomsData
    : roomsData.filter(room => room.category === activeCategory);

  return (
    <section id="rooms" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
              Accommodations
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1416] tracking-tight">
              Our Luxury Rooms & Suites
            </h2>
            <p className="text-sm text-stone-500 max-w-xl font-light leading-relaxed">
              Designed with timeless elegance and high-specification comfort. Each room includes private ensuite bathrooms, smart keyless entry, and luxury toiletries.
            </p>
          </div>

          {/* Guarantee Badge */}
          <div className="hidden lg:flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#B38E5D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-stone-900 block">Best Price Guarantee</span>
              <span className="text-[11px] text-stone-500">Free Cancellation up to 48h before check-in</span>
            </div>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'gold-btn text-white shadow-md'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

      </div>
    </section>
  );
};
