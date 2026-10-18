/**
 * Antixor Ocean - Centralized Yacht Fleet Dataset
 * All yacht listings, specifications, and demo pricing
 */

const BOATS_DATA = [
  {
    id: "azimut-55-fly",
    name: "Azimut 55 Fly",
    subtitle: "Italian Elegance on the Open Sea",
    category: "luxury-yachts",
    categoryName: "Luxury Yachts",
    location: "Santorini",
    locationCountry: "Greece",
    pricePerDay: 2500,
    priceHalfDay: 1500,
    priceHourly: 450,
    capacity: 12,
    cabins: 3,
    bathrooms: 2,
    length: "55 ft (16.9 m)",
    beam: "16.2 ft",
    cruisingSpeed: "26 knots",
    maxSpeed: "32 knots",
    engine: "2 x 800 hp MAN i6",
    builder: "Azimut Yachts (Italy)",
    year: 2023,
    badge: "Popular",
    featured: true,
    image: "assets/images/yacht-azimut.jpg",
    gallery: [
      "assets/images/yacht-azimut.jpg",
      "assets/images/lifestyle-deck.jpg",
      "assets/images/yacht-interior-1.jpg",
      "assets/images/hero-yacht.jpg"
    ],
    description: "The Azimut 55 Fly combines sculpted aerodynamic lines with sophisticated Italian interior styling. Designed for sun-seekers and refined ocean adventurers, she features a vast sun-drenched flybridge, open-concept salon with panoramic 360° glazing, and three opulent staterooms with bespoke finishes.",
    specifications: {
      "Length Overall": "16.90 m / 55 ft 5 in",
      "Beam": "4.95 m / 16 ft 3 in",
      "Draft": "1.50 m / 4 ft 11 in",
      "Cruising Speed": "26 Knots",
      "Maximum Speed": "32 Knots",
      "Fuel Capacity": "2,560 Liters",
      "Water Capacity": "590 Liters",
      "Guest Cabins": "3 Luxury Staterooms",
      "Crew Capacity": "2 Dedicated Crew Members",
      "Year Built": "2023 (Refit 2024)"
    },
    amenities: [
      { name: "Expansive Teak Flybridge", icon: "flybridge" },
      { name: "Sunbathing Foredeck Cushions", icon: "sun" },
      { name: "Professional Captain & Hostess", icon: "crew" },
      { name: "Sonos Marine High-End Audio", icon: "music" },
      { name: "Hydraulic Swimming Platform", icon: "anchor" },
      { name: "Williams Tender & Snorkel Gear", icon: "diver" },
      { name: "Full Air Conditioning Throughout", icon: "wind" },
      { name: "High-Speed Starlink Satellite WiFi", icon: "wifi" },
      { name: "Gourmet Galley & Nespresso Bar", icon: "coffee" },
      { name: "Champagne Refrigerator & Ice Maker", icon: "wine" }
    ],
    includedServices: [
      "Licensed Master Captain & Deckhand",
      "Welcome Champagne & Gourmet Fruit Platter",
      "Snorkeling Masks, Fins & Stand-Up Paddleboard",
      "Fuel for local cruising route (up to 4 hours runtime)",
      "Towels, Mineral Water & Soft Beverages"
    ]
  },
  {
    id: "princess-62",
    name: "Princess 62",
    subtitle: "British Craftsmanship & Unrivaled Space",
    category: "luxury-yachts",
    categoryName: "Luxury Yachts",
    location: "Maldives",
    locationCountry: "Maldives",
    pricePerDay: 3800,
    priceHalfDay: 2200,
    priceHourly: 650,
    capacity: 16,
    cabins: 4,
    bathrooms: 3,
    length: "62.4 ft (19.3 m)",
    beam: "16.6 ft",
    cruisingSpeed: "28 knots",
    maxSpeed: "34 knots",
    engine: "2 x 900 hp Volvo Penta D13",
    builder: "Princess Yachts (UK)",
    year: 2024,
    badge: "Featured",
    featured: true,
    image: "assets/images/yacht-princess.jpg",
    gallery: [
      "assets/images/yacht-princess.jpg",
      "assets/images/yacht-interior-2.jpg",
      "assets/images/lifestyle-deck.jpg",
      "assets/images/hero-yacht.jpg"
    ],
    description: "The Princess 62 encapsulates pristine British engineering with an unmistakable presence on the water. Boasting a massive flybridge with wet bar, barbecue, and dining area for twelve, she offers unrivaled entertaining potential across the sparkling lagoons of the Maldives.",
    specifications: {
      "Length Overall": "19.34 m / 63 ft 5 in",
      "Beam": "5.03 m / 16 ft 6 in",
      "Draft": "1.49 m / 4 ft 11 in",
      "Cruising Speed": "28 Knots",
      "Maximum Speed": "34 Knots",
      "Fuel Capacity": "3,400 Liters",
      "Water Capacity": "773 Liters",
      "Guest Cabins": "4 Staterooms + Crew Quarters",
      "Crew Capacity": "3 Crew (Captain, Chef, Steward)",
      "Year Built": "2024"
    },
    amenities: [
      { name: "Giant Flybridge with Wet Bar & Grill", icon: "flybridge" },
      { name: "Full-Beam Master Stateroom", icon: "bed" },
      { name: "Dedicated Private Executive Chef", icon: "chef" },
      { name: "Seabob Underwater Scooter & Jet Ski", icon: "rocket" },
      { name: "Hydraulic Submersible Bathing Platform", icon: "anchor" },
      { name: "Bowers & Wilkins Surround Sound", icon: "music" },
      { name: "Starlink Maritime Broadband", icon: "wifi" },
      { name: "Climate-Controlled Living Saloon", icon: "wind" },
      { name: "Expansive Aft Deck Al Fresco Dining", icon: "table" },
      { name: "Underwater Lighting System", icon: "bulb" }
    ],
    includedServices: [
      "Captain, First Mate & Onboard Chef",
      "Maldivian Lagoon Cruising Fuel Package",
      "Premium Seabob & Water Toys Allocation",
      "Chef-prepared Canapés & Ocean Sunset Tapas",
      "Fresh Tropical Juices, Refreshments & Towels"
    ]
  },
  {
    id: "sunseeker-manhattan-52",
    name: "Sunseeker Manhattan 52",
    subtitle: "Dynamic Performance & Seamless Open Living",
    category: "luxury-yachts",
    categoryName: "Luxury Yachts",
    location: "Dubai",
    locationCountry: "United Arab Emirates",
    pricePerDay: 2200,
    priceHalfDay: 1350,
    priceHourly: 400,
    capacity: 10,
    cabins: 3,
    bathrooms: 2,
    length: "52.6 ft (17.2 m)",
    beam: "16.0 ft",
    cruisingSpeed: "24 knots",
    maxSpeed: "31 knots",
    engine: "2 x 725 hp Volvo Penta IPS 950",
    builder: "Sunseeker International (UK)",
    year: 2023,
    badge: "Popular",
    featured: true,
    image: "assets/images/yacht-sunseeker.jpg",
    gallery: [
      "assets/images/yacht-sunseeker.jpg",
      "assets/images/lifestyle-deck.jpg",
      "assets/images/yacht-interior-1.jpg",
      "assets/images/hero-yacht.jpg"
    ],
    description: "The Sunseeker Manhattan 52 is an icon of contemporary luxury. Designed to maximize entertainment and coastal social living, her standout aft 'Beach Club' features an integrated hydraulic platform, overhead shower, and fold-down seating right at water level alongside Dubai's glittering coastal skyline.",
    specifications: {
      "Length Overall": "17.21 m / 56 ft 6 in",
      "Beam": "4.87 m / 16 ft 0 in",
      "Draft": "1.26 m / 4 ft 2 in",
      "Cruising Speed": "24 Knots",
      "Maximum Speed": "31 Knots",
      "Fuel Capacity": "2,200 Liters",
      "Water Capacity": "600 Liters",
      "Guest Cabins": "3 En-suite Staterooms",
      "Crew Capacity": "2 Professional Crew",
      "Year Built": "2023"
    },
    amenities: [
      { name: "Beach Club with Fold-down Stern Seat", icon: "umbrella" },
      { name: "Panoramic Curved Flybridge", icon: "flybridge" },
      { name: "Fusion Marine Bluetooth Sound System", icon: "music" },
      { name: "Hydraulic Swim Step & Rain Shower", icon: "shower" },
      { name: "Modern Galley-Aft Layout", icon: "coffee" },
      { name: "High Speed Satellite WiFi", icon: "wifi" },
      { name: "Full Tropics Air Conditioning", icon: "wind" },
      { name: "Foredeck Sunbed with Sunshade", icon: "sun" },
      { name: "Inflatable Floating Island Lounge", icon: "anchor" },
      { name: "Wine Chiller & Crystal Stemware", icon: "wine" }
    ],
    includedServices: [
      "Experienced Captain & Dedicated Host",
      "Dubai Marina / Palm Jumeirah Cruise Route",
      "Chilled Soft Drinks, Ice & Mineral Water",
      "Safety Briefing & Lifejackets",
      "Bluetooth Sound Pairing & Photography Support"
    ]
  },
  {
    id: "ferretti-720",
    name: "Ferretti 720",
    subtitle: "The Benchmark of Haute Horlogerie Superyachts",
    category: "luxury-yachts",
    categoryName: "Luxury Yachts",
    location: "Bali",
    locationCountry: "Indonesia",
    pricePerDay: 4500,
    priceHalfDay: 2800,
    priceHourly: 800,
    capacity: 14,
    cabins: 4,
    bathrooms: 4,
    length: "73.2 ft (22.3 m)",
    beam: "18.8 ft",
    cruisingSpeed: "28 knots",
    maxSpeed: "32 knots",
    engine: "2 x 1400 hp MAN V12",
    builder: "Ferretti Yachts (Italy)",
    year: 2024,
    badge: "Superyacht",
    featured: true,
    image: "assets/images/yacht-ferretti.jpg",
    gallery: [
      "assets/images/yacht-ferretti.jpg",
      "assets/images/lifestyle-deck.jpg",
      "assets/images/yacht-interior-2.jpg",
      "assets/images/hero-yacht.jpg"
    ],
    description: "The Ferretti 720 represents the pinnacle of Italian nautical architecture. With an 18-foot beam, immense 30-square-meter flybridge in carbon fiber, and floor-to-ceiling glass in the main salon, she offers a genuine floating villa experience cruising Bali's exotic Nusa islands.",
    specifications: {
      "Length Overall": "22.30 m / 73 ft 2 in",
      "Beam": "5.70 m / 18 ft 8 in",
      "Draft": "1.80 m / 5 ft 11 in",
      "Cruising Speed": "28 Knots",
      "Maximum Speed": "32 Knots",
      "Fuel Capacity": "4,700 Liters",
      "Water Capacity": "1,000 Liters",
      "Guest Cabins": "4 Full Suites with Private Heads",
      "Crew Capacity": "3 Specialized Crew",
      "Year Built": "2024"
    },
    amenities: [
      { name: "Huge 30m² Carbon Hardtop Flybridge", icon: "flybridge" },
      { name: "Private Jacuzzi Tub on Upper Deck", icon: "hot-tub" },
      { name: "Dedicated 5-Star Executive Chef", icon: "chef" },
      { name: "Two Seabobs & Stand-Up Jet Ski", icon: "rocket" },
      { name: "Williams Jet Tender for Shore Excursions", icon: "boat" },
      { name: "Starlink High-Speed Satellite Internet", icon: "wifi" },
      { name: "Bang & Olufsen Acoustic System", icon: "music" },
      { name: "Stern Beach Club with Ocean Sunloungers", icon: "umbrella" },
      { name: "Walk-in Master Wardrobe & En-suite", icon: "bed" },
      { name: "Fin Stabilizers for Zero-Roll at Anchor", icon: "anchor" }
    ],
    includedServices: [
      "Master Captain, Chef & Senior Stewardess",
      "Tailored 5-Course Tasting Menu Experience",
      "Nusa Lembongan / Penida Excursion Fuel",
      "Unlimited Snorkel Gear & Water Sports Coaching",
      "Champagne Welcome & Open Wine Bar"
    ]
  },
  {
    id: "riva-rivale-56",
    name: "Riva Rivale 56",
    subtitle: "Legendary Mahogany Accent & Thrilling Speed",
    category: "speed-boats",
    categoryName: "Speed Boats",
    location: "Dubai",
    locationCountry: "United Arab Emirates",
    pricePerDay: 1950,
    priceHalfDay: 1200,
    priceHourly: 380,
    capacity: 8,
    cabins: 2,
    bathrooms: 2,
    length: "56.7 ft (17.2 m)",
    beam: "15.5 ft",
    cruisingSpeed: "34 knots",
    maxSpeed: "38 knots",
    engine: "2 x 1200 hp MAN V8",
    builder: "Riva Yacht (Italy)",
    year: 2023,
    badge: "Speed & Style",
    featured: false,
    image: "assets/images/yacht-riva.jpg",
    gallery: [
      "assets/images/yacht-riva.jpg",
      "assets/images/category-speedboats.jpg",
      "assets/images/yacht-interior-1.jpg"
    ],
    description: "An open sport yacht with pure Italian glamour, the Riva 56 Rivale features glossy metallic paint, polished stainless steel accents, and hand-stitched leather. She delivers exhilarating speed across the Arabian Gulf with sublime comfort and unmistakable prestige.",
    specifications: {
      "Length Overall": "17.27 m / 56 ft 8 in",
      "Beam": "4.74 m / 15 ft 7 in",
      "Draft": "1.45 m / 4 ft 9 in",
      "Cruising Speed": "34 Knots",
      "Maximum Speed": "38 Knots",
      "Fuel Capacity": "2,700 Liters",
      "Water Capacity": "400 Liters",
      "Guest Cabins": "2 Cabins (Master & VIP)",
      "Crew Capacity": "1 Captain & 1 Deckhand",
      "Year Built": "2023"
    },
    amenities: [
      { name: "Electro-Hydraulic Bimini Top", icon: "umbrella" },
      { name: "Aft Teak Sundeck with Padded Loungers", icon: "sun" },
      { name: "Cockpit Wet Bar & Teppanyaki Griddle", icon: "coffee" },
      { name: "Garmin Touch Glass Bridge Navigation", icon: "compass" },
      { name: "Premium Fusion Bluetooth Marine Audio", icon: "music" },
      { name: "Hydraulic Swimming Ladder", icon: "anchor" },
      { name: "Full Interior Air Conditioning", icon: "wind" },
      { name: "Onboard Satellite Internet", icon: "wifi" }
    ],
    includedServices: [
      "Licensed Offshore Speed Captain",
      "Fuel for Dubai Coastline High-Speed Run",
      "Chilled Champagne, Soft Drinks & Ice",
      "Snorkel Equipment & Fresh Beach Towels"
    ]
  },
  {
    id: "lagoon-52-fly",
    name: "Lagoon 52 Flybridge Catamaran",
    subtitle: "The Ultimate Floating Sanctuary of Space and Stability",
    category: "catamarans",
    categoryName: "Catamarans",
    location: "Maldives",
    locationCountry: "Maldives",
    pricePerDay: 2800,
    priceHalfDay: 1750,
    priceHourly: 500,
    capacity: 14,
    cabins: 5,
    bathrooms: 5,
    length: "52.0 ft (15.8 m)",
    beam: "28.3 ft",
    cruisingSpeed: "10 knots",
    maxSpeed: "14 knots",
    engine: "2 x 75 hp Yanmar Diesel + Sails",
    builder: "Lagoon Catamarans (France)",
    year: 2023,
    badge: "Spacious",
    featured: false,
    image: "assets/images/yacht-lagoon.jpg",
    gallery: [
      "assets/images/yacht-lagoon.jpg",
      "assets/images/category-catamarans.jpg",
      "assets/images/lifestyle-deck.jpg"
    ],
    description: "With an extraordinary 28-foot beam, the Lagoon 52 Fly catamaran offers double the living space of a conventional monohull. Stable at anchor and underway, she features expansive forward trampolines for lounging above turquoise Maldivian atolls and five independent en-suite staterooms.",
    specifications: {
      "Length Overall": "15.84 m / 52 ft 0 in",
      "Beam": "8.60 m / 28 ft 3 in",
      "Draft": "1.55 m / 5 ft 1 in",
      "Cruising Speed": "10 Knots",
      "Maximum Speed": "14 Knots under Sail",
      "Fuel Capacity": "992 Liters",
      "Water Capacity": "960 Liters + Watermaker",
      "Guest Cabins": "5 Queen En-suite Staterooms",
      "Crew Capacity": "3 (Captain, Cook, Steward)",
      "Year Built": "2023"
    },
    amenities: [
      { name: "Vast Forward Sun Trampolines", icon: "umbrella" },
      { name: "Upper Helm & Flybridge Lounge", icon: "flybridge" },
      { name: "Zero-Heel Rock Stability Catamaran", icon: "anchor" },
      { name: "Kayaks, Stand-up Paddleboards & Seabob", icon: "diver" },
      { name: "Full Watermaker Desalination System", icon: "water" },
      { name: "Cockpit Dining for 14 Guests", icon: "table" },
      { name: "High-Capacity Starlink WiFi", icon: "wifi" },
      { name: "Individual Cabin Air Conditioning", icon: "wind" }
    ],
    includedServices: [
      "Catamaran Captain, Chef & Deckhand",
      "Atoll Island Hopping Itinerary",
      "Three Meals Daily (Multi-day Charters)",
      "Snorkeling with Manta Rays Equipment",
      "Dinghy Transfers to Deserted Sandbanks"
    ]
  },
  {
    id: "oceanis-51",
    name: "Oceanis 51.1 Sailing Yacht",
    subtitle: "Pure Nautical Freedom Under Billowing White Sails",
    category: "sailing-boats",
    categoryName: "Sailing Boats",
    location: "Santorini",
    locationCountry: "Greece",
    pricePerDay: 1650,
    priceHalfDay: 1050,
    priceHourly: 300,
    capacity: 10,
    cabins: 4,
    bathrooms: 3,
    length: "52.4 ft (15.9 m)",
    beam: "15.9 ft",
    cruisingSpeed: "8.5 knots",
    maxSpeed: "12 knots",
    engine: "80 hp Yanmar + Full Sail Rigging",
    builder: "Beneteau (France)",
    year: 2023,
    badge: "Classic Sail",
    featured: false,
    image: "assets/images/category-sailing.jpg",
    gallery: [
      "assets/images/category-sailing.jpg",
      "assets/images/lifestyle-deck.jpg",
      "assets/images/yacht-interior-1.jpg"
    ],
    description: "Savor the romance of the Aegean Sea on the Oceanis 51.1. Boasting a stepped hull and taut sail lines, she slices through Santorini's sparkling waters effortlessly while offering a tranquil, wind-powered voyage around the famous volcanic caldera and red beaches.",
    specifications: {
      "Length Overall": "15.94 m / 52 ft 4 in",
      "Beam": "4.80 m / 15 ft 9 in",
      "Draft": "2.30 m / 7 ft 7 in",
      "Cruising Speed": "8.5 Knots",
      "Maximum Speed": "12 Knots",
      "Fuel Capacity": "400 Liters",
      "Water Capacity": "770 Liters",
      "Guest Cabins": "4 Comfortable Cabins",
      "Crew Capacity": "1 Skipper & 1 Co-Skipper",
      "Year Built": "2023"
    },
    amenities: [
      { name: "Twin Helm Cockpit with Teak Inlay", icon: "compass" },
      { name: "Drop-Down Teak Swimming Platform", icon: "anchor" },
      { name: "Full Mainsail & Furling Genoa", icon: "wind" },
      { name: "Santorini Caldera Sunset Sundeck", icon: "sun" },
      { name: "Cockpit Refrigerator & Folding Table", icon: "coffee" },
      { name: "Snorkel Equipment & Pool Noodles", icon: "diver" },
      { name: "Bose Surround Sound Bluetooth", icon: "music" },
      { name: "Onboard Solar Panel Charging", icon: "bulb" }
    ],
    includedServices: [
      "Professional Aegean Sailing Skipper",
      "Santorini Caldera & Hot Springs Cruise",
      "Traditional Greek Meze & Local Wine",
      "Snorkeling Equipment & Fresh Towels",
      "Port & Mooring Fees Included"
    ]
  },
  {
    id: "axopar-37-sun-top",
    name: "Axopar 37 Sun-Top",
    subtitle: "The King of Day Cruising & Coastal Exploration",
    category: "speed-boats",
    categoryName: "Speed Boats",
    location: "Bali",
    locationCountry: "Indonesia",
    pricePerDay: 1400,
    priceHalfDay: 850,
    priceHourly: 250,
    capacity: 9,
    cabins: 1,
    bathrooms: 1,
    length: "37.9 ft (11.5 m)",
    beam: "11.0 ft",
    cruisingSpeed: "32 knots",
    maxSpeed: "48 knots",
    engine: "2 x 350 hp Mercury Verado V10",
    builder: "Axopar Boats (Finland)",
    year: 2024,
    badge: "Day Tour Pick",
    featured: false,
    image: "assets/images/category-speedboats.jpg",
    gallery: [
      "assets/images/category-speedboats.jpg",
      "assets/images/yacht-interior-1.jpg",
      "assets/images/yacht-riva.jpg"
    ],
    description: "Known as the most versatile offshore adventure boat in the world, the Axopar 37 Sun-Top provides full sun protection with an electric sliding canvas roof. Ideal for exhilarating day charters to Nusa Penida, manta ray feeding grounds, and secret surf breaks in Bali.",
    specifications: {
      "Length Overall": "11.50 m / 37 ft 9 in",
      "Beam": "3.35 m / 11 ft 0 in",
      "Draft": "0.85 m / 2 ft 9 in",
      "Cruising Speed": "32 Knots",
      "Maximum Speed": "48 Knots",
      "Fuel Capacity": "730 Liters",
      "Water Capacity": "100 Liters",
      "Guest Cabins": "1 Queen Day Berth",
      "Crew Capacity": "1 Captain & 1 Deckhand",
      "Year Built": "2024"
    },
    amenities: [
      { name: "Power Retractable Canvas Sun-Roof", icon: "sun" },
      { name: "Walk-Around Twin Step Offshore Hull", icon: "compass" },
      { name: "JL Audio Marine Sound System", icon: "music" },
      { name: "Foredeck Sunbed & Aft Dining Table", icon: "table" },
      { name: "Dual Top-Loading Ice Boxes", icon: "coffee" },
      { name: "Freshwater Transom Shower", icon: "shower" },
      { name: "Full Snorkel Gear & Fins for 9", icon: "diver" },
      { name: "Underwater LED Night Lighting", icon: "bulb" }
    ],
    includedServices: [
      "Experienced Bali Waters Captain & Guide",
      "Cruising Route to Manta Bay & Crystal Bay",
      "Tropical Fresh Fruit & Cold Coconut Water",
      "Snorkeling Masks & Safety Vests for all Guests",
      "GoPro Action Cam Footage Included"
    ]
  }
];

// Reusable Helper Functions for Yacht Fleet
function getAllBoats() {
  return BOATS_DATA;
}

function getFeaturedBoats() {
  return BOATS_DATA.filter(b => b.featured);
}

function getBoatById(id) {
  if (!id) return null;
  return BOATS_DATA.find(b => b.id.toLowerCase() === id.toLowerCase()) || null;
}

function getRelatedBoats(currentId, limit = 3) {
  const current = getBoatById(currentId);
  if (!current) return BOATS_DATA.slice(0, limit);
  return BOATS_DATA
    .filter(b => b.id !== current.id)
    .sort((a, b) => {
      // Prioritize same category or same location
      const aScore = (a.category === current.category ? 2 : 0) + (a.location === current.location ? 1 : 0);
      const bScore = (b.category === current.category ? 2 : 0) + (b.location === current.location ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}

// Make accessible to all scripts
if (typeof window !== "undefined") {
  window.BOATS_DATA = BOATS_DATA;
  window.getAllBoats = getAllBoats;
  window.getFeaturedBoats = getFeaturedBoats;
  window.getBoatById = getBoatById;
  window.getRelatedBoats = getRelatedBoats;
}
