import type { Room } from '../data/roomsData';

export type Currency = 'GBP' | 'USD' | 'EUR';

export interface BookingState {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  selectedRoom: Room | null;
  selectedAddOns: string[];
  appliedPromoCode: string;
  discountPercentage: number;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  perNight?: boolean;
  category?: 'dining' | 'convenience' | 'celebration' | 'transport';
}

export interface PriceBreakdown {
  roomSubtotal: number;
  addOnsTotal: number;
  discountAmount: number;
  finalTotal: number;
  nights: number;
}

export interface ToastNotification {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

export interface BookingContextType {
  booking: BookingState;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInGBP: number) => string;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setAdults: (num: number) => void;
  setChildren: (num: number) => void;
  setSelectedRoom: (room: Room | null) => void;
  toggleAddOn: (addonId: string) => void;
  applyPromo: (code: string) => { success: boolean; message: string; discount: number };
  calculateTotalNights: () => number;
  calculateTotalPrice: () => PriceBreakdown;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  activeRoomForDetails: Room | null;
  setActiveRoomForDetails: (room: Room | null) => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}
