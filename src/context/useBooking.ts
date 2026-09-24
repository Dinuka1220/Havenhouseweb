import { useContext } from 'react';
import { BookingContext } from './BookingContextInstance';
import type { BookingContextType } from '../types/booking';

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
