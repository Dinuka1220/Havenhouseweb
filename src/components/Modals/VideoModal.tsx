import React from 'react';
import { X, ShieldCheck, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const VideoModal: React.FC = () => {
  const { isVideoModalOpen, setIsVideoModalOpen, setIsBookingModalOpen } = useBooking();

  if (!isVideoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-[#0F1416] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/10 text-white">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#161B1E]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span className="font-serif-luxury font-bold text-sm tracking-wide text-white">
              Haven House Rooms, Barry — Virtual Suite Tour
            </span>
          </div>

          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player / Presentation */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&controls=1&rel=0&loop=1"
            title="Luxury Hotel Atmosphere Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-6 bg-[#161B1E] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Ready to experience Haven House in person? Book direct for exclusive complimentary perks.</span>
          </div>

          <button
            onClick={() => {
              setIsVideoModalOpen(false);
              setIsBookingModalOpen(true);
            }}
            className="gold-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap shadow-md"
          >
            Book This Experience
          </button>
        </div>

      </div>
    </div>
  );
};
