/**
 * Antixor Ocean - Centralized Destinations Dataset
 */

const DESTINATIONS_DATA = [
  {
    id: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    tagline: "Crystal Lagoons & Secluded Coral Atolls",
    shortDescription: "Anchor in turquoise lagoons, swim with manta rays, and enjoy private sandbank dining under starlit tropical skies.",
    longDescription: "The Maldives is the world's quintessential yachting paradise. With over 1,190 coral islands spread across 26 natural atolls, cruising by private yacht unlocks secluded sandbanks, vibrant underwater reefs, and exclusive access to luxury overwater sanctuaries far beyond the reach of day tourists.",
    highlights: [
      "Exclusive sandbank sunset champagne dining",
      "Baa Atoll UNESCO World Biosphere Reserve",
      "Manta ray and gentle whale shark encounters",
      "Pristine overwater villa lagoons & crystal coves"
    ],
    season: "Year-Round (Peak: Nov - Apr)",
    waterTemp: "28°C - 30°C",
    yachtCount: 6,
    image: "assets/images/destination-maldives.jpg",
    featured: true
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Cyclades, Greece",
    tagline: "Dramatic Caldera Cliffs & Legendary Sunsets",
    shortDescription: "Sail past whitewashed cliffside villages, explore volcanic hot springs, and witness the world's most romantic sunsets.",
    longDescription: "Rising sheer from the cobalt Aegean Sea, Santorini offers a dramatic maritime spectacle unlike any other. Glide along the volcanic caldera, anchor near the famous Red Beach and White Beach, swim in therapeutic volcanic sulfur springs, and toast chilled Assyrtiko wine as the sun sinks beneath the horizon of Oia.",
    highlights: [
      "Cruising directly beneath Oia's caldera cliffs",
      "Swimming in Nea Kameni volcanic sulfur springs",
      "Private mooring off Red Beach and White Beach",
      "Exclusive seaside tavern dining in Ammoudi Bay"
    ],
    season: "May to October (Peak: Jun - Sep)",
    waterTemp: "22°C - 26°C",
    yachtCount: 8,
    image: "assets/images/destination-santorini.jpg",
    featured: true
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "Futuristic Skylines & Glamorous Coastal Cruising",
    shortDescription: "Cruise along Dubai Marina, circle the iconic Palm Jumeirah, and enjoy world-class skyline views with five-star luxury service.",
    longDescription: "Dubai represents ultra-contemporary yachting glamour. Cruise smoothly out of the modern architectural canyon of Dubai Marina, glide around the perimeter of Palm Jumeirah with views of Atlantis The Royal, anchor in the calm waters of Burj Al Arab, and experience unparalleled VIP hospitality on the Arabian Gulf.",
    highlights: [
      "Panoramic views of Burj Al Arab & Dubai Eye",
      "Cruising the waterways of Palm Jumeirah",
      "Sunset and night skyline cruises with glowing lights",
      "World Islands offshore anchorage & water sports"
    ],
    season: "October to May (Optimal: Nov - Mar)",
    waterTemp: "24°C - 29°C",
    yachtCount: 10,
    image: "assets/images/destination-dubai.jpg",
    featured: true
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    tagline: "Tropical Island Escapes & Secret Surf Havens",
    shortDescription: "Explore the dramatic cliffs of Nusa Penida, dive with giant mantas in Crystal Bay, and soak in bohemian island luxury.",
    longDescription: "Cruising the Bali archipelago aboard a private charter opens a world of untouched volcanic beauty, emerald coastal jungles, and world-class marine life. Journey from Serangan or Benoa Harbor across the sparkling Badung Strait to Nusa Lembongan, Nusa Ceningan, and the dramatic sheer sea-cliffs of Nusa Penida.",
    highlights: [
      "Nusa Penida Kelingking 'T-Rex' cliff boat view",
      "Manta Point drift snorkeling with giant oceanic mantas",
      "Secluded private bay beach barbecues on Nusa Lembongan",
      "Sunset cruise back into Jimbaran Bay with ocean breeze"
    ],
    season: "April to October (Dry Season Peak: Jul - Sep)",
    waterTemp: "27°C - 29°C",
    yachtCount: 7,
    image: "assets/images/destination-bali.jpg",
    featured: true
  }
];

function getAllDestinations() {
  return DESTINATIONS_DATA;
}

function getDestinationById(id) {
  if (!id) return null;
  return DESTINATIONS_DATA.find(d => d.id.toLowerCase() === id.toLowerCase() || d.name.toLowerCase() === id.toLowerCase()) || null;
}

if (typeof window !== "undefined") {
  window.DESTINATIONS_DATA = DESTINATIONS_DATA;
  window.getAllDestinations = getAllDestinations;
  window.getDestinationById = getDestinationById;
}
