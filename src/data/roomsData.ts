import img1 from '../assets/images/1.png';
import img2 from '../assets/images/2.png';
import img3 from '../assets/images/3.png';
import img5 from '../assets/images/5.png';
import r1 from '../assets/images/r1.jpg';
import r2 from '../assets/images/r2.jpeg';
import r3 from '../assets/images/r3.jpeg';
import r4 from '../assets/images/r4.png';
import r5 from '../assets/images/r5.png';
import r6 from '../assets/images/r6.png';
import r7 from '../assets/images/r7.png';

export interface Room {
  id: string;
  name: string;
  category: 'deluxe' | 'executive' | 'suite' | 'family';
  tag: string;
  pricePerNight: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  capacity: {
    adults: number;
    children: number;
    maxGuests: number;
  };
  bedType: string;
  sizeSqFt: number;
  images: string[];
  description: string;
  features: string[];
  amenities: string[];
  popular: boolean;
}

export const roomsData: Room[] = [
  {
    id: "deluxe-king-suite",
    name: "Deluxe King Sanctuary",
    category: "deluxe",
    tag: "Most Popular",
    pricePerNight: 125,
    originalPrice: 155,
    rating: 4.95,
    reviewsCount: 112,
    capacity: {
      adults: 2,
      children: 1,
      maxGuests: 3
    },
    bedType: "1 Super King Bed",
    sizeSqFt: 380,
    images: [r7, img1, r2],
    description: "Our signature Deluxe King Sanctuary combines understated elegance with supreme comfort. Enjoy ambient mood lighting, a luxury ensuite with walk-in rainfall shower, and plush Egyptian cotton linens.",
    features: ["Super King Bed", "Ensuite Rain Shower", "4K Smart TV", "Artisan Coffee Station", "Free High-Speed Wi-Fi"],
    amenities: [
      "Super King Pocket-Sprung Bed",
      "Designer Walk-in Rain Shower",
      "55\" 4K Smart TV with Netflix",
      "Nespresso Coffee Machine & Welsh Teas",
      "Ultra High-Speed Fiber Wi-Fi (150 Mbps)",
      "Bespoke Bathrobes & Luxury Slippers",
      "Silent Mini Fridge & Safe",
      "Organic Eco-Friendly Toiletries"
    ],
    popular: true
  },
  {
    id: "executive-coastal-room",
    name: "Executive Coastal Vista Room",
    category: "executive",
    tag: "Coastal View",
    pricePerNight: 145,
    originalPrice: 175,
    rating: 4.92,
    reviewsCount: 94,
    capacity: {
      adults: 2,
      children: 0,
      maxGuests: 2
    },
    bedType: "1 King Bed",
    sizeSqFt: 410,
    images: [r6, img2, r3],
    description: "Elevate your stay in the Executive Coastal Vista Room. Features expansive windows with gentle morning light, a curated workspace, luxury velvet seating area, and decadent marble vanity.",
    features: ["Panoramic Bay Views", "Luxury Marble Bath", "Dedicated Workspace", "Complimentary Prosecco"],
    amenities: [
      "Handcrafted King Bed",
      "Italian Marble Bathroom & Bath",
      "Executive Working Desk with Fast USB-C Hub",
      "Complimentary Mini-Bar & Prosecco",
      "Nespresso Vertuo & Artisan Welsh Treats",
      "Smart Climate Control",
      "Marshall Bluetooth Audio Speaker"
    ],
    popular: false
  },
  {
    id: "haven-signature-suite",
    name: "The Haven Signature Master Suite",
    category: "suite",
    tag: "Luxury Suite",
    pricePerNight: 195,
    originalPrice: 240,
    rating: 4.98,
    reviewsCount: 78,
    capacity: {
      adults: 2,
      children: 2,
      maxGuests: 4
    },
    bedType: "1 Emperor Bed + Lounge Daybed",
    sizeSqFt: 560,
    images: [r5, img3, r4],
    description: "The pinnacle of boutique hotel luxury at Haven House. Features a private standalone deep soaking tub, separate living room parlor, bespoke oak bar, and floor-to-ceiling windows.",
    features: ["Freestanding Soaking Tub", "Separate Living Salon", "Emperor Sized Bed", "VIP Welcome Hamper"],
    amenities: [
      "Emperor Size 7ft Bed",
      "Freestanding Designer Soaking Tub & Dual Sinks",
      "Separate Living Salon with Velvet Chesterfield",
      "65\" OLED TV with Cinema Soundbar",
      "Complimentary Welsh Gourmet Welcome Hamper",
      "Evening Turndown Service with Artisan Chocolates",
      "Private Keypad Express Entry"
    ],
    popular: true
  },
  {
    id: "family-coastal-apartment",
    name: "Family Coastal Retreat Apartment",
    category: "family",
    tag: "Spacious",
    pricePerNight: 170,
    originalPrice: 210,
    rating: 4.89,
    reviewsCount: 65,
    capacity: {
      adults: 3,
      children: 2,
      maxGuests: 5
    },
    bedType: "1 King Bed + 2 Twin Beds",
    sizeSqFt: 620,
    images: [img5, r1, r2],
    description: "Designed for families and groups visiting Barry Island and the South Wales coast. Offers two interconnecting bedrooms, kitchenette with dining table, and board games library.",
    features: ["2 Separate Bedrooms", "Kitchenette & Dining Area", "Child Friendly", "Smart TV in both rooms"],
    amenities: [
      "Master King Bedroom + Twin Bedroom",
      "Ensuite Family Bathroom with Tub & Shower",
      "Equipped Kitchenette & Dining Area",
      "Two Smart 4K TVs with Family Channels",
      "Beach Towels & Picnic Blanket Provided",
      "Complimentary Board Games & High Speed Wi-Fi"
    ],
    popular: false
  }
];
