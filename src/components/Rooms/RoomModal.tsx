import React, { useState } from 'react';
import { X, Users, Bed, Maximize2, Check, Star, ShieldCheck, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const RoomModal: React.FC = () => {
  const {
    activeRoomForDetails,
    setActiveRoomForDetails,
    formatPrice,
    setSelectedRoom,
    setIsBookingModalOpen
  } = useBooking();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!activeRoomForDetails) return null;

  const room = activeRoomForDetails;

  const handleBookNow = () => {
    setSelectedRoom(room);
    setActiveRoomForDetails(null);
    setIsBookingModalOpen(true);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 text-left">
        {/* Close Button */}
        <button
          onClick={() => setActiveRoomForDetails(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          aria-label="Close Room Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Gallery Carousel */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-stone-900 overflow-hidden">
          <img
            src={room.images[activeImageIndex]}
            alt={`${room.name} photo ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Nav arrows */}
          {room.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
            {room.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'bg-[#C5A880] w-6' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C5A880]/15 text-[#9E7D52] px-3 py-0.5 rounded-full">
                  {room.tag}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{room.rating} ({room.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
                {room.name}
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#B38E5D]">
                {formatPrice(room.pricePerNight)}
              </span>
              <span className="text-xs text-stone-500 block">per night • taxes included</span>
            </div>
          </div>

          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80">
            <div className="flex items-center gap-2 text-stone-700 text-xs">
              <Users className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-semibold">Guests</span>
                <span className="font-bold">Up to {room.capacity.maxGuests}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-stone-700 text-xs">
              <Bed className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-semibold">Bed Type</span>
                <span className="font-bold">{room.bedType}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-stone-700 text-xs">
              <Maximize2 className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-semibold">Room Size</span>
                <span className="font-bold">{room.sizeSqFt} sq ft</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-stone-700 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="text-[10px] text-stone-400 block uppercase font-semibold">Cancellation</span>
                <span className="font-bold text-emerald-600">Free 48h</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              About This Room
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              {room.description}
            </p>
          </div>

          {/* Full Amenities Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Room Amenities & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-100 shadow-2xs">
                  <div className="w-4 h-4 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#9E7D52] shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Actions Footer */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              ✓ Instant confirmation • ✓ Keyless smart entry PIN sent on arrival
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setActiveRoomForDetails(null)}
                className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-stone-300 text-xs font-bold uppercase text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleBookNow}
                className="w-1/2 sm:w-auto gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve {formatPrice(room.pricePerNight)}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
