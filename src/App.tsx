import { useState, useEffect } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { TopBar } from './components/Header/TopBar';
import { Navbar } from './components/Header/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { FacilitiesSection } from './components/Facilities/FacilitiesSection';
import { RoomsSection } from './components/Rooms/RoomsSection';
import { RoomModal } from './components/Rooms/RoomModal';
import { TestimonialsSection } from './components/Testimonials/TestimonialsSection';
import { VirtualTourSection } from './components/VirtualTour/VirtualTourSection';
import { SpecialOffersSection } from './components/SpecialOffers/SpecialOffersSection';
import { InstagramSection } from './components/InstagramGallery/InstagramSection';
import { LocationSection } from './components/Location/LocationSection';
import { NewsletterSection } from './components/Newsletter/NewsletterSection';
import { Footer } from './components/Footer/Footer';
import { BookingModal } from './components/Modals/BookingModal';
import { VideoModal } from './components/Modals/VideoModal';
import { ContactModal } from './components/Modals/ContactModal';
import { WhatsAppIcon } from './components/Common/SocialIcons';
import { ArrowUp, Calendar, CheckCircle2, Info, AlertCircle, X, ShieldCheck } from 'lucide-react';

/* Global Toast Notifications Container */
function ToastContainer() {
  const { toasts, removeToast } = useBooking();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-stone-900/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-white/15 flex items-center justify-between gap-3 text-xs animate-fade-in"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#C5A880] shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
            <span className="font-medium text-stone-100">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

/* Floating Actions: WhatsApp Concierge + Back to Top */
function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex flex-col items-center gap-3">
      {/* WhatsApp Concierge */}
      <a
        href="https://wa.me/441446738900?text=Hello%20Haven%20House%20Rooms%2C%20I%20have%20an%20enquiry%20regarding%20a%20stay"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer group"
        aria-label="Chat with Haven House on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 fill-current text-white" />
        <span className="absolute right-14 bg-stone-900 text-white text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          WhatsApp Concierge
        </span>
      </a>

      {/* Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:text-[#B38E5D] border border-stone-200/80 shadow-lg flex items-center justify-center transition-all hover:scale-110 cursor-pointer animate-fade-in"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/* Floating Sticky Mobile Booking Bar */
function MobileBookingBar() {
  const { setIsBookingModalOpen, formatPrice } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 py-3 shadow-2xl flex items-center justify-between gap-3 animate-fade-in">
      <div className="text-left">
        <span className="text-[10px] uppercase font-bold text-[#8C765C] tracking-wider block">
          Haven House Barry
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-stone-500">From</span>
          <span className="font-serif-luxury font-bold text-base text-stone-900">
            {formatPrice(95)}
          </span>
          <span className="text-[10px] text-stone-400">/ night</span>
        </div>
      </div>

      <button
        onClick={() => setIsBookingModalOpen(true)}
        className="gold-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Now</span>
      </button>
    </div>
  );
}

/* UK GDPR Cookie Notice */
function CookieConsent() {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('haven_cookie_consent') === 'accepted';
    } catch {
      return false;
    }
  });

  const handleAccept = () => {
    try {
      localStorage.setItem('haven_cookie_consent', 'accepted');
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200 text-left text-xs text-stone-700 animate-fade-in">
      <div className="flex items-start gap-2.5 mb-2">
        <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
        <p className="font-medium text-stone-900 leading-snug">
          Privacy & Secure Reservations
        </p>
      </div>
      <p className="text-[11px] text-stone-500 leading-relaxed mb-3">
        We use essential cookies to power our booking system, keep your selected dates saved, and ensure keyless check-in access.
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={handleAccept}
          className="gold-btn px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider cursor-pointer"
        >
          Accept
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="px-3 py-1.5 rounded-full border border-stone-300 text-[11px] font-medium text-stone-600 hover:bg-stone-50 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function AppContent() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col selection:bg-[#C5A880] selection:text-white">
      {/* Top Contact & Currency Bar */}
      <TopBar />

      {/* Sticky Main Header Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 1. Hero with Background Banner & Floating Booking Bar */}
        <HeroSection />

        {/* 2. Welcome / About Section with Overlapping Visuals */}
        <AboutSection />

        {/* 3. Hotel Facilities & Amenities */}
        <FacilitiesSection />

        {/* 4. Our Luxury Rooms & Suites Grid + Details */}
        <RoomsSection />

        {/* 5. Verified Guest Reviews Carousel */}
        <TestimonialsSection />

        {/* 6. Virtual Tour / Atmosphere Ambient Showcase */}
        <VirtualTourSection />

        {/* 7. Special Offers & Package Deals */}
        <SpecialOffersSection />

        {/* 8. Instagram Showcase & Photo Gallery */}
        <InstagramSection />

        {/* 9. Barry Location, Travel Distances & FAQ Accordions */}
        <LocationSection />

        {/* 10. Newsletter Direct Booking Incentive */}
        <NewsletterSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <RoomModal />
      <BookingModal />
      <VideoModal />
      <ContactModal />

      {/* Floating UX Enhancements */}
      <ToastContainer />
      <FloatingActions />
      <MobileBookingBar />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
