
import { formatISO, addDays } from "date-fns";

// Types
export interface Flight {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  price: number;
  duration: string;
  stops: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
}

export interface TravelPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  description: string;
  inclusions: string[];
  image: string;
  flightIncluded: boolean;
  hotelIncluded: boolean;
  activities: string[];
  popularityScore: number;
}

export interface Reservation {
  id: string;
  type: 'flight' | 'hotel' | 'package';
  itemId: string;
  itemName: string;
  startDate: string;
  endDate: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  guests?: number;
  createdAt: string;
}

// Popular destinations based on trends (for smart recommendations)
export const popularDestinations = [
  {
    name: "Paris",
    country: "France",
    score: 98,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"
  },
  {
    name: "Santorini",
    country: "Greece",
    score: 96,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2069&auto=format&fit=crop"
  },
  {
    name: "Tokyo",
    country: "Japan",
    score: 95,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Bali",
    country: "Indonesia",
    score: 94,
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=2035&auto=format&fit=crop"
  },
  {
    name: "New York",
    country: "USA",
    score: 93,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Dubai",
    country: "UAE",
    score: 92,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
  }
];

// Mock Flights Data
export const flights: Flight[] = [
  {
    id: "f1",
    from: "New York (JFK)",
    to: "London (LHR)",
    departureTime: "2023-08-15T08:00:00Z",
    arrivalTime: "2023-08-15T20:00:00Z",
    airline: "British Airways",
    price: 650,
    duration: "7h 30m",
    stops: 0
  },
  {
    id: "f2",
    from: "Los Angeles (LAX)",
    to: "Tokyo (HND)",
    departureTime: "2023-08-18T10:00:00Z",
    arrivalTime: "2023-08-19T14:30:00Z",
    airline: "Japan Airlines",
    price: 1200,
    duration: "12h 30m",
    stops: 0
  },
  {
    id: "f3",
    from: "London (LHR)",
    to: "Paris (CDG)",
    departureTime: "2023-08-20T07:00:00Z",
    arrivalTime: "2023-08-20T09:20:00Z",
    airline: "Air France",
    price: 180,
    duration: "1h 20m",
    stops: 0
  },
  {
    id: "f4",
    from: "Singapore (SIN)",
    to: "Sydney (SYD)",
    departureTime: "2023-08-22T23:00:00Z",
    arrivalTime: "2023-08-23T10:00:00Z",
    airline: "Singapore Airlines",
    price: 750,
    duration: "8h",
    stops: 0
  },
  {
    id: "f5",
    from: "Dubai (DXB)",
    to: "New York (JFK)",
    departureTime: "2023-08-25T01:30:00Z",
    arrivalTime: "2023-08-25T14:00:00Z",
    airline: "Emirates",
    price: 980,
    duration: "14h 30m",
    stops: 0
  },
  {
    id: "f6",
    from: "Paris (CDG)",
    to: "Rome (FCO)",
    departureTime: "2023-08-28T10:00:00Z",
    arrivalTime: "2023-08-28T12:20:00Z",
    airline: "Alitalia",
    price: 220,
    duration: "2h 20m",
    stops: 0
  },
  {
    id: "f7",
    from: "Berlin (BER)",
    to: "Amsterdam (AMS)",
    departureTime: "2023-08-30T09:00:00Z",
    arrivalTime: "2023-08-30T10:30:00Z",
    airline: "KLM",
    price: 150,
    duration: "1h 30m",
    stops: 0
  },
  {
    id: "f8",
    from: "Mumbai (BOM)",
    to: "Dubai (DXB)",
    departureTime: "2023-09-02T14:00:00Z",
    arrivalTime: "2023-09-02T16:00:00Z",
    airline: "Emirates",
    price: 320,
    duration: "3h",
    stops: 0
  }
];

// Mock Hotels Data
export const hotels: Hotel[] = [
  {
    id: "h1",
    name: "The Grand Palace Hotel",
    location: "Paris, France",
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    description: "Luxurious 5-star hotel in the heart of Paris with stunning views of the Eiffel Tower.",
    amenities: ["Free Wi-Fi", "Pool", "Spa", "Fitness Center", "Restaurant", "Bar", "Room Service", "Concierge"]
  },
  {
    id: "h2",
    name: "Sakura Ryokan",
    location: "Tokyo, Japan",
    price: 280,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop",
    description: "Traditional Japanese ryokan offering authentic cultural experience in Tokyo.",
    amenities: ["Free Wi-Fi", "Hot Springs", "Traditional Japanese Breakfast", "Tatami Rooms", "Garden View"]
  },
  {
    id: "h3",
    name: "Ocean View Resort",
    location: "Bali, Indonesia",
    price: 220,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop",
    description: "Beachfront resort with private villas and stunning sunset views.",
    amenities: ["Free Wi-Fi", "Private Pool", "Spa", "Beach Access", "Restaurant", "Bar", "Water Sports"]
  },
  {
    id: "h4",
    name: "Manhattan Skyline Hotel",
    location: "New York, USA",
    price: 420,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop",
    description: "Modern hotel in the heart of Manhattan with skyline views and luxury amenities.",
    amenities: ["Free Wi-Fi", "Fitness Center", "Restaurant", "Bar", "Business Center", "Concierge"]
  },
  {
    id: "h5",
    name: "Desert Oasis Resort",
    location: "Dubai, UAE",
    price: 580,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=2072&auto=format&fit=crop",
    description: "Luxury desert resort offering unique experiences and world-class service.",
    amenities: ["Free Wi-Fi", "Private Pool", "Spa", "Desert Safari", "Restaurant", "Bar", "24/7 Room Service"]
  },
  {
    id: "h6",
    name: "Santorini Blue Villas",
    location: "Santorini, Greece",
    price: 450,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2069&auto=format&fit=crop",
    description: "Cliffside villas with private terraces and stunning caldera views.",
    amenities: ["Free Wi-Fi", "Private Pool", "Breakfast", "Sunset Views", "Air Conditioning", "Concierge"]
  }
];

// Mock Travel Packages Data
export const travelPackages: TravelPackage[] = [
  {
    id: "p1",
    name: "Romantic Paris Getaway",
    destination: "Paris, France",
    duration: "5 days, 4 nights",
    price: 1200,
    description: "Experience the city of love with this romantic package including Eiffel Tower visit, Seine river cruise, and luxury accommodations.",
    inclusions: ["Round-trip flights", "4-star hotel stay", "Daily breakfast", "Seine river cruise", "Guided Louvre Museum tour", "Eiffel Tower visit"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    flightIncluded: true,
    hotelIncluded: true,
    activities: ["Seine River Cruise", "Louvre Museum Visit", "Eiffel Tower Visit", "Wine Tasting"],
    popularityScore: 98
  },
  {
    id: "p2",
    name: "Tokyo Cultural Immersion",
    destination: "Tokyo, Japan",
    duration: "7 days, 6 nights",
    price: 2200,
    description: "Immerse yourself in Japanese culture with this comprehensive Tokyo experience including traditional tea ceremonies and modern attractions.",
    inclusions: ["Round-trip flights", "Traditional ryokan stay", "Daily breakfast", "Tokyo city tour", "Mt. Fuji excursion", "Tea ceremony experience"],
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop",
    flightIncluded: true,
    hotelIncluded: true,
    activities: ["Tea Ceremony", "Mt. Fuji Excursion", "Tsukiji Fish Market Visit", "Sumo Wrestling Experience"],
    popularityScore: 95
  },
  {
    id: "p3",
    name: "Bali Paradise Retreat",
    destination: "Bali, Indonesia",
    duration: "6 days, 5 nights",
    price: 1800,
    description: "Relax and rejuvenate in the paradise island of Bali with beach stays, spa treatments, and cultural experiences.",
    inclusions: ["Round-trip flights", "Beachfront villa", "Daily breakfast", "Spa treatments", "Ubud tour", "Temple visits"],
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=2035&auto=format&fit=crop",
    flightIncluded: true,
    hotelIncluded: true,
    activities: ["Spa Treatments", "Ubud Tour", "Temple Visits", "Cooking Class", "Surfing Lesson"],
    popularityScore: 94
  },
  {
    id: "p4",
    name: "New York City Explorer",
    destination: "New York, USA",
    duration: "5 days, 4 nights",
    price: 1650,
    description: "Experience the Big Apple with this comprehensive package including Broadway shows, iconic landmarks, and luxury accommodations.",
    inclusions: ["Round-trip flights", "4-star Manhattan hotel", "Daily breakfast", "Broadway show tickets", "NYC city pass", "Statue of Liberty tour"],
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    flightIncluded: true,
    hotelIncluded: true,
    activities: ["Broadway Show", "Statue of Liberty Tour", "Empire State Building Visit", "Central Park Bike Tour"],
    popularityScore: 93
  },
  {
    id: "p5",
    name: "Dubai Luxury Experience",
    destination: "Dubai, UAE",
    duration: "6 days, 5 nights",
    price: 2800,
    description: "Indulge in luxury with this exclusive Dubai package featuring desert safaris, Burj Khalifa visits, and 5-star accommodations.",
    inclusions: ["Round-trip flights", "5-star hotel stay", "Daily breakfast", "Desert safari", "Burj Khalifa observation deck", "Dubai Mall shopping experience"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    flightIncluded: true,
    hotelIncluded: true,
    activities: ["Desert Safari", "Burj Khalifa Visit", "Dubai Mall Shopping", "Yacht Cruise", "Aquaventure Waterpark"],
    popularityScore: 92
  }
];

// Mock Reservations Data
export const reservations: Reservation[] = [
  {
    id: "r1",
    type: "flight",
    itemId: "f1",
    itemName: "New York (JFK) to London (LHR)",
    startDate: formatISO(addDays(new Date(), 30)),
    endDate: formatISO(addDays(new Date(), 37)),
    price: 650,
    status: "confirmed",
    createdAt: formatISO(addDays(new Date(), -5))
  },
  {
    id: "r2",
    type: "hotel",
    itemId: "h3",
    itemName: "Ocean View Resort",
    startDate: formatISO(addDays(new Date(), 20)),
    endDate: formatISO(addDays(new Date(), 25)),
    price: 220 * 5, // 5 nights
    status: "confirmed",
    guests: 2,
    createdAt: formatISO(addDays(new Date(), -10))
  },
  {
    id: "r3",
    type: "package",
    itemId: "p2",
    itemName: "Tokyo Cultural Immersion",
    startDate: formatISO(addDays(new Date(), 45)),
    endDate: formatISO(addDays(new Date(), 52)),
    price: 2200,
    status: "pending",
    guests: 2,
    createdAt: formatISO(addDays(new Date(), -2))
  },
  {
    id: "r4",
    type: "flight",
    itemId: "f5",
    itemName: "Dubai (DXB) to New York (JFK)",
    startDate: formatISO(addDays(new Date(), 15)),
    endDate: formatISO(addDays(new Date(), 22)),
    price: 980,
    status: "cancelled",
    createdAt: formatISO(addDays(new Date(), -8))
  }
];

// Helper functions
export const getDestinationsByPopularity = () => {
  return [...popularDestinations].sort((a, b) => b.score - a.score);
};

export const getRecommendedPackagesByDestination = (destination: string) => {
  return travelPackages.filter(pkg => 
    pkg.destination.toLowerCase().includes(destination.toLowerCase())
  );
};

export const getPackagesByPopularity = () => {
  return [...travelPackages].sort((a, b) => b.popularityScore - a.popularityScore);
};

export const searchFlights = (from?: string, to?: string) => {
  let results = [...flights];
  
  if (from) {
    results = results.filter(flight => 
      flight.from.toLowerCase().includes(from.toLowerCase())
    );
  }
  
  if (to) {
    results = results.filter(flight => 
      flight.to.toLowerCase().includes(to.toLowerCase())
    );
  }
  
  return results;
};

export const searchHotels = (location?: string) => {
  if (!location) return hotels;
  
  return hotels.filter(hotel => 
    hotel.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const calculateFlightPrice = (basePrice: number, age: number) => {
  if (age < 2) {
    // Infant price (10% of adult fare)
    return basePrice * 0.1;
  } else if (age < 12) {
    // Child price (75% of adult fare)
    return basePrice * 0.75;
  } else if (age >= 65) {
    // Senior discount (90% of adult fare)
    return basePrice * 0.9;
  } else {
    // Regular adult price
    return basePrice;
  }
};

export const getFlightById = (id: string) => {
  return flights.find(flight => flight.id === id);
};

export const getHotelById = (id: string) => {
  return hotels.find(hotel => hotel.id === id);
};

export const getPackageById = (id: string) => {
  return travelPackages.find(pkg => pkg.id === id);
};

export const getReservationById = (id: string) => {
  return reservations.find(reservation => reservation.id === id);
};

export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
};

export const getSeasonalDestinations = () => {
  const season = getCurrentSeason();
  
  const seasonalMap = {
    spring: ["Paris", "Amsterdam", "Tokyo"],
    summer: ["Santorini", "Bali", "Barcelona"],
    autumn: ["New York", "Rome", "Seoul"],
    winter: ["Dubai", "Sydney", "Singapore"]
  };
  
  const destinations = seasonalMap[season as keyof typeof seasonalMap];
  return popularDestinations.filter(dest => destinations.includes(dest.name));
};
