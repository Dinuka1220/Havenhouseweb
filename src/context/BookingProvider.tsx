import React, { useState, useEffect } from 'react';
import type { Room } from '../data/roomsData';
import { roomsData } from '../data/roomsData';
import type {
  Currency,
  BookingState,
  PriceBreakdown,
  ToastNotification
} from '../types/booking';
import { currencyRates, ADD_ONS, VALID_PROMO_CODES } from '../data/bookingData';
import { BookingContext } from './BookingContextInstance';

const getTomorrow = (offsetDays = 1): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('haven_currency');
      if (saved === 'GBP' || saved === 'USD' || saved === 'EUR') return saved;
    } catch {
      // Fallback
    }
    return 'GBP';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('haven_currency', c);
    } catch {
      // ignore
    }
  };

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeRoomForDetails, setActiveRoomForDetails] = useState<Room | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 3800);
    return () => clearTimeout(timer);
  }, [toasts]);

  const [booking, setBooking] = useState<BookingState>(() => {
    const defaultIn = getTomorrow(1);
    const defaultOut = getTomorrow(3);
    try {
      const savedIn = localStorage.getItem('haven_checkin');
      const savedOut = localStorage.getItem('haven_checkout');
      const today = new Date().toISOString().split('T')[0];
      if (savedIn && savedOut && savedIn >= today && savedOut > savedIn) {
        return {
          checkInDate: savedIn,
          checkOutDate: savedOut,
          adults: 2,
          children: 0,
          selectedRoom: roomsData[0],
          selectedAddOns: [],
          appliedPromoCode: '',
          discountPercentage: 0
        };
      }
    } catch {
      // ignore
    }
    return {
      checkInDate: defaultIn,
      checkOutDate: defaultOut,
      adults: 2,
      children: 0,
      selectedRoom: roomsData[0],
      selectedAddOns: [],
      appliedPromoCode: '',
      discountPercentage: 0
    };
  });

  const formatPrice = (amountInGBP: number) => {
    const config = currencyRates[currency];
    const converted = Math.round(amountInGBP * config.rate);
    return `${config.symbol}${converted}`;
  };

  const setCheckInDate = (date: string) => {
    setBooking(prev => {
      let updatedCheckout = prev.checkOutDate;
      if (date >= updatedCheckout) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        updatedCheckout = nextDay.toISOString().split('T')[0];
      }
      try {
        localStorage.setItem('haven_checkin', date);
        localStorage.setItem('haven_checkout', updatedCheckout);
      } catch {
        // ignore
      }
      return { ...prev, checkInDate: date, checkOutDate: updatedCheckout };
    });
  };

  const setCheckOutDate = (date: string) => {
    setBooking(prev => {
      try {
        localStorage.setItem('haven_checkout', date);
      } catch {
        // ignore
      }
      return { ...prev, checkOutDate: date };
    });
  };

  const setAdults = (adults: number) => setBooking(prev => ({ ...prev, adults }));
  const setChildren = (children: number) => setBooking(prev => ({ ...prev, children }));
  const setSelectedRoom = (room: Room | null) => setBooking(prev => ({ ...prev, selectedRoom: room }));

  const toggleAddOn = (addonId: string) => {
    setBooking(prev => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(addonId)
        ? prev.selectedAddOns.filter(id => id !== addonId)
        : [...prev.selectedAddOns, addonId]
    }));
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = VALID_PROMO_CODES[clean];
    if (found) {
      setBooking(prev => ({
        ...prev,
        appliedPromoCode: clean,
        discountPercentage: found.discount
      }));
      addToast(`${found.discount}% promo code "${clean}" successfully applied!`, 'success');
      return {
        success: true,
        message: `${found.discount}% ${found.label} applied!`,
        discount: found.discount
      };
    }
    return { success: false, message: 'Invalid or expired promotional code', discount: 0 };
  };

  const calculateTotalNights = () => {
    if (!booking.checkInDate || !booking.checkOutDate) return 1;
    const start = new Date(booking.checkInDate).getTime();
    const end = new Date(booking.checkOutDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const calculateTotalPrice = (): PriceBreakdown => {
    const nights = calculateTotalNights();
    const roomRate = booking.selectedRoom ? booking.selectedRoom.pricePerNight : 125;
    const roomSubtotal = roomRate * nights;

    const addOnsTotal = booking.selectedAddOns.reduce((sum, addonId) => {
      const item = ADD_ONS.find(a => a.id === addonId);
      if (!item) return sum;
      return sum + (item.perNight ? item.price * nights : item.price);
    }, 0);

    const subtotal = roomSubtotal + addOnsTotal;
    const discountAmount = Math.round((subtotal * booking.discountPercentage) / 100);
    const finalTotal = subtotal - discountAmount;

    return {
      roomSubtotal,
      addOnsTotal,
      discountAmount,
      finalTotal,
      nights
    };
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        currency,
        setCurrency,
        formatPrice,
        setCheckInDate,
        setCheckOutDate,
        setAdults,
        setChildren,
        setSelectedRoom,
        toggleAddOn,
        applyPromo,
        calculateTotalNights,
        calculateTotalPrice,
        isBookingModalOpen,
        setIsBookingModalOpen,
        activeRoomForDetails,
        setActiveRoomForDetails,
        isVideoModalOpen,
        setIsVideoModalOpen,
        isContactModalOpen,
        setIsContactModalOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
