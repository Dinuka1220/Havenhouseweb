import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Crown } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Navbar: React.FC = () => {
  const { setIsBookingModalOpen } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Our Rooms', href: '#rooms' },
    { label: 'Special Offers', href: '#offers' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-stone-200/80 text-stone-800'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-stone-100 text-stone-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group text-left"
          aria-label="Haven House Rooms Home"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A880] to-[#9E7D52] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-xl sm:text-2xl font-semibold tracking-wide text-[#0F1416] group-hover:text-[#B38E5D] transition-colors leading-tight">
              Haven House
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C765C] font-semibold">
              Rooms • Barry
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-[#B38E5D] transition-colors py-1 relative group cursor-pointer"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="gold-btn px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="gold-btn px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 sm:hidden"
          >
            <span>Book</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-stone-200 shadow-2xl py-6 px-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-sm font-semibold uppercase tracking-wider text-stone-800 hover:text-[#B38E5D] transition-colors py-2 border-b border-stone-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-stone-400">→</span>
              </button>
            ))}
            <div className="pt-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBookingModalOpen(true);
                }}
                className="w-full gold-btn py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Room</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
