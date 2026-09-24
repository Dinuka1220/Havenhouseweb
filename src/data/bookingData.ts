import type { AddOnItem, Currency } from '../types/booking';

export const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
  GBP: { symbol: '£', rate: 1 },
  USD: { symbol: '$', rate: 1.3 },
  EUR: { symbol: '€', rate: 1.18 }
};

export const ADD_ONS: AddOnItem[] = [
  {
    id: 'welsh-breakfast',
    name: 'Gourmet Welsh Breakfast Hamper (per night)',
    price: 15,
    perNight: true,
    category: 'dining'
  },
  {
    id: 'late-checkout',
    name: 'Guaranteed Late Check-out (1:00 PM)',
    price: 25,
    perNight: false,
    category: 'convenience'
  },
  {
    id: 'prosecco-welcome',
    name: 'Chilled Bottle of Prosecco & Welsh Truffles on Arrival',
    price: 28,
    perNight: false,
    category: 'celebration'
  },
  {
    id: 'valet-ev-charging',
    name: 'Dedicated 22kW EV Charging Bay Access (per night)',
    price: 12,
    perNight: true,
    category: 'transport'
  }
];

export const VALID_PROMO_CODES: Record<string, { discount: number; label: string }> = {
  SEASIDE30: { discount: 30, label: '30% Seaside Adventure Direct Discount' },
  ROMANCE25: { discount: 25, label: '25% Romantic Getaway Package' },
  HAVEN10: { discount: 15, label: '15% Direct Booking Discount' },
  WEEKEND40: { discount: 15, label: '15% Direct Special Rate' }
};
