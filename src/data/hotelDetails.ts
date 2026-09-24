export interface HotelDetails {
  name: string;
  tagline: string;
  subTagline: string;
  description: string;
  shortDescription: string;
  address: {
    street: string;
    city: string;
    county: string;
    country: string;
    postcode: string;
    full: string;
  };
  contact: {
    phone: string;
    displayPhone: string;
    email: string;
    bookingEmail: string;
    receptionHours: string;
  };
  checkIn: string;
  checkOut: string;
  rating: number;
  reviewsCount: number;
  socials: {
    instagram: string;
    facebook: string;
    tripadvisor: string;
  };
  highlights: {
    title: string;
    description: string;
  }[];
}

export const hotelDetails: HotelDetails = {
  name: "Haven House Rooms",
  tagline: "Luxury Stay Hotel Experience Comfort & Elegance",
  subTagline: "Boutique Coastal Sanctuary in Barry, South Wales",
  description: "Nestled in the historic coastal town of Barry, Haven House Rooms offers an exquisite blend of contemporary luxury, bespoke furnishings, and Welsh hospitality. Whether visiting for a relaxing coastal escape near Barry Island or exploring the Vale of Glamorgan and Cardiff, indulge in our meticulously appointed rooms designed for unrivaled comfort.",
  shortDescription: "Discover luxury boutique accommodation in Barry, South Wales. Experience peaceful elegance, premium amenities, and coastal charm.",
  address: {
    street: "14-16 Harbour Crescent",
    city: "Barry",
    county: "Vale of Glamorgan",
    country: "United Kingdom",
    postcode: "CF62 8PB",
    full: "14-16 Harbour Crescent, Barry, Vale of Glamorgan, CF62 8PB, United Kingdom"
  },
  contact: {
    phone: "+441446738900",
    displayPhone: "+44 (0) 1446 738900",
    email: "stay@havenhousebarry.co.uk",
    bookingEmail: "reservations@havenhousebarry.co.uk",
    receptionHours: "24/7 Digital Concierge & Guest Support"
  },
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
  rating: 4.9,
  reviewsCount: 384,
  socials: {
    instagram: "https://instagram.com/havenhousebarry",
    facebook: "https://facebook.com/havenhousebarry",
    tripadvisor: "https://tripadvisor.com"
  },
  highlights: [
    {
      title: "Prime Barry Location",
      description: "Moments from Barry Island beach, charming promenade, and Barry Docks station with direct links to Cardiff Central."
    },
    {
      title: "Bespoke Luxury Design",
      description: "King-sized pocket sprung mattresses, Egyptian cotton linens, and designer rain showers in every room."
    },
    {
      title: "Seamless Self Check-In",
      description: "Smart keyless keypad access anytime 24/7 with dedicated on-call concierge assistance."
    },
    {
      title: "Complimentary Welsh Hospitality",
      description: "Artisan Welsh cakes, speciality tea & Nespresso coffee pods replenished daily."
    }
  ]
};

export const faqs = [
  {
    question: "What are the check-in and check-out times at Haven House Rooms?",
    answer: "Standard check-in starts from 3:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be requested during booking subject to availability."
  },
  {
    question: "Is there private parking available on-site?",
    answer: "Yes, we offer complimentary private guest parking on-site with secure CCTV monitoring and EV charging stations available."
  },
  {
    question: "How close is Haven House Rooms to Barry Island beach?",
    answer: "We are located just a 4-minute drive or a pleasant 15-minute coastal stroll to the sandy Barry Island beach, Whitmore Bay, and the vibrant seaside cafes."
  },
  {
    question: "How do I access my room upon arrival?",
    answer: "We utilize state-of-the-art secure keyless smart locks. On the morning of your arrival, you will receive a personal digital access pin code via SMS and email."
  },
  {
    question: "Are breakfast options provided?",
    answer: "Every room features a deluxe refreshment station with Nespresso coffee and Welsh tea. You can also add our Gourmet Welsh Artisan Breakfast Hamper delivered to your door."
  }
];
