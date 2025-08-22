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
    description: "Ein wunderschöner VW Käfer in restauriertem Zustand",
    technicalData: {
      motor: "1.6L Boxer, 4-Zylinder",
      leistung: "50 PS (37 kW)",
      hubraum: "1584 cm³",
      getriebe: "4-Gang manuell",
      hoechstgeschwindigkeit: "135 km/h",
      verbrauch: "8.5L/100km",
      gewicht: "820 kg",
      test1: "Test Wert 1",
      test2: "Test Wert 2",
      test3: "Test Wert 3",
      test4: "Test Wert 4",
      test5: "Test Wert 5",
    },
  },
  {
    thumbnail: `/fotogram/assets/img/porsche-911.jpg`,
    fullsize: `/fotogram/assets/img/porsche-911.jpg`,
    alt: "Porsche 911 Sportwagen",
    caption: "Porsche 911",
    category: "sportwagen",
    year: "1973",
    description:
      "Klassischer Porsche 911 - der Traum jedes Oldtimer-Liebhabers",
    technicalData: {
      motor: "2.7L Boxer, 6-Zylinder",
      leistung: "210 PS (154 kW)",
      hubraum: "2687 cm³",
      getriebe: "5-Gang manuell",
      hoechstgeschwindigkeit: "230 km/h",
      verbrauch: "12.8L/100km",
      gewicht: "1075 kg",
    },
  },
  {
    thumbnail: `/fotogram/assets/img/mercedes-w123.jpg`,
    fullsize: `/fotogram/assets/img/mercedes-w123.jpg`,
    alt: "Mercedes W123 Klassiker",
    caption: "Mercedes W123",
    category: "klassiker",
    year: "1982",
    description: "Mercedes-Benz W123 - Zuverlässigkeit und Eleganz vereint",
    technicalData: {
      motor: "2.0L Reihen-4-Zylinder",
      leistung: "109 PS (80 kW)",
      hubraum: "1997 cm³",
      getriebe: "4-Gang manuell",
      hoechstgeschwindigkeit: "170 km/h",
      verbrauch: "9.2L/100km",
      gewicht: "1380 kg",
    },
  },
  {
    thumbnail: `/fotogram/assets/img/bmw-2002.jpg`,
    fullsize: `/fotogram/assets/img/bmw-2002.jpg`,
    alt: "BMW 2002 Youngtimer",
    caption: "BMW 2002",
    category: "youngtimer",
    year: "1975",
    description: "BMW 2002 - Der Beginn der sportlichen BMW-Ära",
    technicalData: {
      motor: "2.0L Reihen-4-Zylinder",
      leistung: "100 PS (74 kW)",
      hubraum: "1990 cm³",
      getriebe: "4-Gang manuell",
      hoechstgeschwindigkeit: "165 km/h",
      verbrauch: "10.5L/100km",
      gewicht: "1020 kg",
    },
  },
  {
    thumbnail: `/fotogram/assets/img/jaguar-e-type.jpg`,
    fullsize: `/fotogram/assets/img/jaguar-e-type.jpg`,
    alt: "Jaguar E-Type Sportwagen",
    caption: "Jaguar E-Type",
    category: "sportwagen",
    year: "1969",
    description: "Jaguar E-Type - Einer der schönsten Sportwagen aller Zeiten",
    technicalData: {
      motor: "4.2L Reihen-6-Zylinder",
      leistung: "220 PS (162 kW)",
      hubraum: "4235 cm³",
      getriebe: "4-Gang manuell",
      hoechstgeschwindigkeit: "240 km/h",
      verbrauch: "14.2L/100km",
      gewicht: "1315 kg",
    },
  },
  {
    thumbnail: `/fotogram/assets/img/ford-mustang.jpg`,
    fullsize: `/fotogram/assets/img/ford-mustang.jpg`,
    alt: "Ford Mustang Youngtimer",
    caption: "Ford Mustang",
    category: "youngtimer",
    year: "1978",
    description:
      "Ford Mustang - Amerikanische Muskelkraft im klassischen Design",
    technicalData: {
      motor: "5.0L V8",
      leistung: "140 PS (103 kW)",
      hubraum: "4942 cm³",
      getriebe: "3-Gang automatik",
      hoechstgeschwindigkeit: "180 km/h",
      verbrauch: "15.8L/100km",
      gewicht: "1520 kg",
    },
  },
];

const categories = {
  all: "Alle",
  klassiker: "Klassiker",
  sportwagen: "Sportwagen",
  youngtimer: "Youngtimer",
};

// Global state
let activeIndex = 0;
let previousFocus = null;
let currentFilter = "all";
let filteredPhotos = [...photos]; // Initialize with all photos
