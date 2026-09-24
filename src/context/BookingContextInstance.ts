import { createContext } from 'react';
import type { BookingContextType } from '../types/booking';

export const BookingContext = createContext<BookingContextType | undefined>(undefined);
