/**
 * Antixor Ocean - Shared Website Configuration & Demonstration Data
 * Categories, Testimonials, and Fleet Statistics
 */

const SITE_DATA = {
  brandName: "Antixor Ocean",
  tagline: "Luxury Yacht Rentals & Bespoke Boat Charters",
  contact: {
    phone: "+1 (800) 845-9224",
    email: "concierge@antixorocean.com",
    address: "Port Hercules Marina, Suite 402, 98000 Monaco",
    hours: "24/7 Global Concierge"
  },
  
  // Demonstrative statistics configuration (editable)
  statistics: [
    { value: "500+", label: "Boats Available", description: "Vetted luxury yachts, catamarans, and tenders worldwide" },
    { value: "120+", label: "Destinations", description: "Pristine ports and coastal anchorages across 5 continents" },
    { value: "98%", label: "Happy Clients", description: "Demonstration satisfaction rate from five-star charter guests" },
    { value: "24/7", label: "VIP Concierge", description: "Dedicated charter specialist for bespoke maritime itineraries" }
  ],

  // Boat Categories
  categories: [
    {
      id: "luxury-yachts",
      name: "Luxury Yachts",
      tagline: "The Pinnacle of Elegance",
      description: "Full-beam flybridges, master staterooms, onboard private chefs, and five-star hospitality.",
      image: "assets/images/category-luxury-yachts.jpg",
      count: "18+ Vessels"
    },
    {
      id: "speed-boats",
      name: "Speed Boats",
      tagline: "Adrenaline & Agility",
      description: "High-performance coastal cruisers engineered for quick day trips, island hopping, and water sports.",
      image: "assets/images/category-speedboats.jpg",
      count: "12+ Vessels"
    },
    {
      id: "sailing-boats",
      name: "Sailing Boats",
      tagline: "Pure Nautical Romance",
      description: "Harness the natural sea breeze under crisp white canvas with classic maritime tradition.",
      image: "assets/images/category-sailing.jpg",
      count: "10+ Vessels"
    },
    {
      id: "catamarans",
      name: "Catamarans",
      tagline: "Vast Space & Stability",
      description: "Twin hulls delivering enormous deck trampolines, zero roll, and shallow draft for lagoon cruising.",
      image: "assets/images/category-catamarans.jpg",
      count: "14+ Vessels"
    }
  ],

  // Demonstration Testimonials
  testimonials: [
    {
      id: 1,
      name: "Lord Marcus Sterling",
      location: "London, United Kingdom",
      avatar: "assets/images/avatar-2.jpg",
      initials: "MS",
      rating: 5,
      yachtChartered: "Princess 62 in Maldives",
      headline: "An Unrivaled Maritime Masterpiece",
      quote: "Our week cruising the North Malé Atoll aboard the Princess 62 exceeded every expectation. The captain navigated us to untouched sandbanks where our private chef served Michelin-quality seafood under the stars. Flawless concierge service from start to finish.",
      date: "Demonstration Review • October 2026"
    },
    {
      id: 2,
      name: "Sophia Chen-Vanderbilt",
      location: "Geneva, Switzerland",
      avatar: "assets/images/avatar-1.jpg",
      initials: "SC",
      rating: 5,
      yachtChartered: "Azimut 55 Fly in Santorini",
      headline: "The Gold Standard for Mediterranean Charters",
      quote: "Watching the Santorini sunset directly beneath Oia's volcanic cliffs from the flybridge of the Azimut was sheer magic. The crew was attentive yet discreet, and the yacht was in immaculate showroom condition. We will only book through Antixor Ocean from now on.",
      date: "Demonstration Review • September 2026"
    },
    {
      id: 3,
      name: "Elena Rostova",
      location: "Monaco",
      avatar: "assets/images/avatar-3.jpg",
      initials: "ER",
      rating: 5,
      yachtChartered: "Ferretti 720 in Bali",
      headline: "Unmatched Luxury & Island Hopping Comfort",
      quote: "Chartering the Ferretti 720 around Nusa Penida transformed our Indonesian holiday. The upper deck Jacuzzi and water toys kept our family entertained for three days straight. Booking via Antixor was seamless, transparent, and utterly professional.",
      date: "Demonstration Review • August 2026"
    }
  ]
};

if (typeof window !== "undefined") {
  window.SITE_DATA = SITE_DATA;
}
