export interface Review {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  stayType: string;
  comment: string;
  roomName: string;
}

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    author: "Sarah & David Jenkins",
    location: "Bristol, UK",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    date: "Stayed September 2024",
    stayType: "Couples Weekend",
    comment: "Haven House Rooms in Barry completely surpassed our expectations! The bed was exceptionally comfortable, the smart digital check-in was seamless, and being just a stone's throw from Barry Island made our weekend getaway truly memorable.",
    roomName: "The Haven Signature Master Suite"
  },
  {
    id: "rev-2",
    author: "Gareth Evans",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    date: "Stayed August 2024",
    stayType: "Solo Business & Leisure",
    comment: "Immaculately clean and beautifully appointed rooms. The high-speed fiber Wi-Fi made remote work effortless, and the private parking was a major bonus. Will definitely book again when in South Wales.",
    roomName: "Executive Coastal Vista Room"
  },
  {
    id: "rev-3",
    author: "Emma & Mark Taylor",
    location: "Birmingham, UK",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    date: "Stayed August 2024",
    stayType: "Family Holiday",
    comment: "We stayed in the Family Apartment with our two kids. So spacious, spotlessly clean, and the thoughtful touches like complimentary Welsh cakes and coffee pods made us feel so welcome. Outstanding hospitality!",
    roomName: "Family Coastal Retreat Apartment"
  },
  {
    id: "rev-4",
    author: "Dr. Alistair Morgan",
    location: "Cardiff, Wales",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    date: "Stayed July 2024",
    stayType: "Boutique Coastal Break",
    comment: "The aesthetic, tranquility, and quality of Haven House are second to none in the Vale of Glamorgan. The rainfall shower and Egyptian cotton sheets felt like a 5-star hotel in London, but with warm Welsh charm.",
    roomName: "Deluxe King Sanctuary"
  }
];

export interface GalleryPhoto {
  id: string;
  image: string;
  title: string;
  category: string;
  likes: number;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "gal-1",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
    title: "Deluxe King Bedroom",
    category: "Rooms",
    likes: 248
  },
  {
    id: "gal-2",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    title: "Luxury Bathroom & Soaking Tub",
    category: "Ensuite",
    likes: 312
  },
  {
    id: "gal-3",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
    title: "Executive Coastal Vista",
    category: "Views",
    likes: 189
  },
  {
    id: "gal-4",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    title: "Haven Signature Suite Lounge",
    category: "Suites",
    likes: 420
  },
  {
    id: "gal-5",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
    title: "Boutique Ambient Lighting",
    category: "Interiors",
    likes: 275
  },
  {
    id: "gal-6",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    title: "Barry Island Coastal Sunset",
    category: "Barry Coastal",
    likes: 560
  }
];
