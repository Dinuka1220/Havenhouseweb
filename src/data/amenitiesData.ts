export interface Facility {
  id: string;
  iconName: string;
  title: string;
  description: string;
  badge?: string;
}

export const facilitiesData: Facility[] = [
  {
    id: "smart-checkin",
    iconName: "KeyRound",
    title: "Keyless 24/7 Smart Entry",
    description: "Arrive at your leisure with instant digital access codes sent to your phone for effortless, secure check-in.",
    badge: "Seamless"
  },
  {
    id: "luxury-linens",
    iconName: "Sparkles",
    title: "Plush Bedding & Linens",
    description: "Sink into 400 thread-count Egyptian cotton, hypoallergenic pillows, and pocket-sprung mattress bliss.",
    badge: "5-Star Comfort"
  },
  {
    id: "fiber-wifi",
    iconName: "Wifi",
    title: "Ultra-Fast Fiber Wi-Fi",
    description: "Complimentary dedicated 150+ Mbps fiber internet throughout all rooms and guest lounge spaces.",
    badge: "Free & Fast"
  },
  {
    id: "private-parking",
    iconName: "Car",
    title: "Free On-Site Private Parking",
    description: "Stress-free secure parking on property with CCTV surveillance and EV charging points available.",
    badge: "Complimentary"
  },
  {
    id: "artisan-coffee",
    iconName: "Coffee",
    title: "Artisan Coffee & Welsh Treats",
    description: "Nespresso coffee bar, speciality teas, and authentic complimentary Welsh cakes replenished daily.",
    badge: "Fresh Daily"
  },
  {
    id: "coastal-location",
    iconName: "Compass",
    title: "Prime Coastal Location",
    description: "Just minutes from Barry Island Beach, Whitmore Bay, waterfront dining, and Cardiff rail connections.",
    badge: "Barry, Wales"
  }
];
