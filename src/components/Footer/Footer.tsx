import React from 'react';
import { Crown, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { hotelDetails } from '../../data/hotelDetails';
import { useBooking } from '../../context/BookingContext';
import { InstagramIcon, FacebookIcon, TripAdvisorIcon, WhatsAppIcon } from '../Common/SocialIcons';

export const Footer: React.FC = () => {
  const { setIsBookingModalOpen, setIsContactModalOpen } = useBooking();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0E10] text-[#A6ADB4] text-xs pt-16 pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C5A880] to-[#9E7D52] flex items-center justify-center text-white shadow-md">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-xl font-bold tracking-wide text-white">
                  Haven House
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                  Rooms • Barry
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Boutique coastal accommodation nestled in Barry, Vale of Glamorgan, South Wales. Discover bespoke luxury rooms, rainfall showers, and seamless digital check-in.
            </p>

            <div className="flex items-center gap-3 text-white">
              <a
                href={hotelDetails.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C5A880] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={hotelDetails.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C5A880] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={hotelDetails.socials.tripadvisor}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C5A880] flex items-center justify-center transition-colors"
                aria-label="TripAdvisor"
              >
                <TripAdvisorIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/441446738900?text=Hello%20Haven%20House%20Rooms%2C%20I%20have%20an%20enquiry%20regarding%20a%20stay"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {['Home', 'About Us', 'Facilities', 'Our Rooms', 'Special Offers', 'Testimonials', 'Gallery'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                    className="hover:text-[#C5A880] transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Accommodations */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-white">
              Rooms & Suites
            </h4>
            <ul className="space-y-2.5">
              {[
                'Deluxe King Sanctuary',
                'Executive Coastal Vista Room',
                'The Haven Signature Master Suite',
                'Family Coastal Retreat Apartment'
              ].map((roomName) => (
                <li key={roomName}>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="hover:text-[#C5A880] transition-colors text-left block cursor-pointer"
                  >
                    {roomName}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="gold-btn px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer shadow-md"
              >
                Check Real-Time Rates
              </button>
            </div>
          </div>

          {/* Col 4: Contact & Barry Location */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-wider text-white">
              Haven House Barry
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span className="text-slate-300">{hotelDetails.address.full}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${hotelDetails.contact.phone}`} className="hover:text-[#C5A880] text-slate-300">
                  {hotelDetails.contact.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${hotelDetails.contact.email}`} className="hover:text-[#C5A880] text-slate-300 truncate">
                  {hotelDetails.contact.email}
                </a>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Send direct enquiry / message →</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Payment badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Haven House Rooms, Barry. All Rights Reserved. Managed with care in Wales, UK.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">Secure Payments:</span>
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-[10px]">
              <span className="bg-white/10 px-2 py-0.5 rounded">VISA</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">MASTERCARD</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">AMEX</span>
              <span className="bg-white/10 px-2 py-0.5 rounded">APPLE PAY</span>
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-[#C5A880] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
