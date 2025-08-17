// ========================================
// CONFIGURATION & DATA
// ========================================

// Photo collection with categories
const photos = [
  {
    thumbnail: `/fotogram/assets/img/vw-kaefer.jpg`,
    fullsize: `/fotogram/assets/img/vw-kaefer.jpg`,
    alt: "VW Käfer Klassiker",
    caption: "VW Käfer",
    category: "klassiker",
    year: "1967",
    description: "Ein wunderschöner VW Käfer in restauriertem Zustand"
  },
  {
    thumbnail: `/fotogram/assets/img/placeholder-porsche.jpg`,
    fullsize: `/fotogram/assets/img/placeholder-porsche.jpg`,
    alt: "Porsche 911 Sportwagen",
    caption: "Porsche 911",
    category: "sportwagen",
    year: "1973",
    description: "Klassischer Porsche 911 - der Traum jedes Oldtimer-Liebhabers",
    isPlaceholder: true
  },
  {
    thumbnail: `/fotogram/assets/img/placeholder-mercedes.jpg`,
    fullsize: `/fotogram/assets/img/placeholder-mercedes.jpg`,
    alt: "Mercedes-Benz W123 Klassiker",
    caption: "Mercedes W123",
    category: "klassiker",
    year: "1982",
    description: "Mercedes-Benz W123 - Zuverlässigkeit und Eleganz vereint",
    isPlaceholder: true
  },
  {
    thumbnail: `/fotogram/assets/img/placeholder-bmw.jpg`,
    fullsize: `/fotogram/assets/img/placeholder-bmw.jpg`,
    alt: "BMW 2002 Youngtimer",
    caption: "BMW 2002",
    category: "youngtimer",
    year: "1975",
    description: "BMW 2002 - Der Beginn der sportlichen BMW-Ära",
    isPlaceholder: true
  },
  {
    thumbnail: `/fotogram/assets/img/placeholder-jaguar.jpg`,
    fullsize: `/fotogram/assets/img/placeholder-jaguar.jpg`,
    alt: "Jaguar E-Type Sportwagen",
    caption: "Jaguar E-Type",
    category: "sportwagen",
    year: "1969",
    description: "Jaguar E-Type - Einer der schönsten Sportwagen aller Zeiten",
    isPlaceholder: true
  },
  {
    thumbnail: `/fotogram/assets/img/placeholder-ford.jpg`,
    fullsize: `/fotogram/assets/img/placeholder-ford.jpg`,
    alt: "Ford Mustang Youngtimer",
    caption: "Ford Mustang",
    category: "youngtimer",
    year: "1978",
    description: "Ford Mustang - Amerikanische Muskelkraft im klassischen Design",
    isPlaceholder: true
  }
];

const categories = {
  all: "Alle",
  klassiker: "Klassiker",
  sportwagen: "Sportwagen",
  youngtimer: "Youngtimer"
};

// Global state
let activeIndex = 0;
let previousFocus = null;
let currentFilter = 'all';
