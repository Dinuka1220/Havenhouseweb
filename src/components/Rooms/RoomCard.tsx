import React from 'react';
import { Users, Bed, Maximize2, Star, Check, ArrowRight } from 'lucide-react';
import type { Room } from '../../data/roomsData';
import { useBooking } from '../../context/BookingContext';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { formatPrice, setSelectedRoom, setIsBookingModalOpen, setActiveRoomForDetails } = useBooking();

  const handleBookNow = () => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleViewDetails = () => {
    setActiveRoomForDetails(room);
  };

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/80 hover:border-[#C5A880]/50 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full text-left">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Room Tag */}
        {room.tag && (
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#8C765C] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            {room.tag}
          </span>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{room.rating}</span>
          <span className="text-stone-300 text-[10px]">({room.reviewsCount})</span>
        </div>

        {/* Price Overlay on Image bottom */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white drop-shadow-md">
                {formatPrice(room.pricePerNight)}
              </span>
              <span className="text-xs text-stone-200 font-light">/ night</span>
            </div>
            {room.originalPrice && (
              <span className="text-xs text-stone-300 line-through">
                {formatPrice(room.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleViewDetails}
            className="text-[11px] font-semibold uppercase tracking-wider text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Photos</span>
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <h3 className="font-serif-luxury text-xl font-bold text-stone-900 group-hover:text-[#B38E5D] transition-colors line-clamp-1">
            {room.name}
          </h3>

          <p className="text-xs sm:text-sm text-stone-500 line-clamp-2 font-light leading-relaxed">
            {room.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-stone-600 text-xs">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Up to {room.capacity.maxGuests} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="truncate">{room.bedType.split(' ')[0]} {room.bedType.split(' ')[1]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{room.sizeSqFt} sq ft</span>
            </div>
          </div>

          {/* Key Features Pill */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {room.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#FAF8F5] text-stone-600 border border-stone-200/70 px-2 py-0.5 rounded-md"
              >
                <Check className="w-2.5 h-2.5 text-[#C5A880]" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2.5">
          <button
            onClick={handleViewDetails}
            className="w-full py-2.5 rounded-xl border border-stone-300 hover:border-[#C5A880] text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-[#B38E5D] transition-all cursor-pointer text-center"
          >
            Details
          </button>

          <button
            onClick={handleBookNow}
            className="w-full gold-btn py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
