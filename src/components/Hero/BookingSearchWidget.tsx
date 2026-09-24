import React from 'react';
import { Calendar, Users, BedDouble, Search, ChevronDown } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { roomsData } from '../../data/roomsData';

export const BookingSearchWidget: React.FC = () => {
  const {
    booking,
    setCheckInDate,
    setCheckOutDate,
    setAdults,
    setChildren,
    setSelectedRoom,
    setIsBookingModalOpen
  } = useBooking();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto -mt-16 sm:-mt-20 relative z-30 px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200/80 p-4 sm:p-6 lg:p-7">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-end">
          {/* Check-In */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Check-In Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={booking.checkInDate}
                onChange={e => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Check-Out Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={booking.checkOutDate}
                onChange={e => setCheckOutDate(e.target.value)}
                min={booking.checkInDate || new Date().toISOString().split('T')[0]}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Guests: Adults & Children */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Guests</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={booking.adults}
                onChange={e => setAdults(Number(e.target.value))}
                className="bg-[#FAF8F5] border border-stone-200 rounded-xl px-2.5 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                ))}
              </select>
              <select
                value={booking.children}
                onChange={e => setChildren(Number(e.target.value))}
                className="bg-[#FAF8F5] border border-stone-200 rounded-xl px-2.5 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
              >
                {[0, 1, 2, 3].map(num => (
                  <option key={num} value={num}>{num} Child{num === 1 ? '' : 'ren'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Room Type */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Room Preference</span>
            </label>
            <div className="relative">
              <select
                value={booking.selectedRoom?.id || roomsData[0].id}
                onChange={e => {
                  const room = roomsData.find(r => r.id === e.target.value);
                  if (room) setSelectedRoom(room);
                }}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C5A880] appearance-none cursor-pointer pr-8"
              >
                {roomsData.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full gold-btn py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Check Rates</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
