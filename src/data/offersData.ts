export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  originalPrice: number;
  discountBadge: string;
  promoCode: string;
  inclusions: string[];
  isLarge?: boolean;
}

export const offersData: SpecialOffer[] = [
  {
    id: "family-fun-seaside",
    title: "Family Seaside Adventure Package",
    subtitle: "Barry Island Coastal Escape",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    price: 149,
    originalPrice: 210,
    discountBadge: "Save 30%",
    promoCode: "SEASIDE30",
    inclusions: [
      "2 Nights Family Suite stay",
      "Barry Island Pleasure Beach family passes",
      "Gourmet Welsh Breakfast Hamper",
      "Complimentary beach kit & late 12PM checkout"
    ],
    isLarge: true
  },
  {
    id: "romantic-haven-break",
    title: "Romantic Couples Retreat",
    subtitle: "Chilled Prosecco & Late Checkout",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    price: 139,
    originalPrice: 185,
    discountBadge: "25% Off",
    promoCode: "ROMANCE25",
    inclusions: [
      "King Executive Vista Room",
      "Chilled bottle of Prosecco & Welsh chocolates",
      "Luxury bathrobes & slippers to keep",
      "Guaranteed late 1:00 PM checkout"
    ],
    isLarge: false
  },
  {
    id: "coastal-weekend-getaway",
    title: "Weekend Coastal Getaway",
    subtitle: "Friday to Sunday Relaxation",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    price: 119,
    originalPrice: 160,
    discountBadge: "Save £40/night",
    promoCode: "WEEKEND40",
    inclusions: [
      "2+ Nights in any Deluxe Room",
      "Complimentary private parking & EV charge",
      "Artisan Welsh morning treat basket",
      "Free room upgrade (subject to availability)"
    ],
    isLarge: false
  }
];
