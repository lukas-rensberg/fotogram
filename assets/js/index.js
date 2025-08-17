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

let currentFilter = 'all';

let activeIndex = 0;
let previousFocus = null;

// Wait for page to load
document.addEventListener("DOMContentLoaded", init);

function init() {
  buildHeader();
  if (document.getElementById("content")) {
    setupGallery();
    prepareModal();
  }
  addPageTransitions();
}

function buildHeader() {
  const headerEl = document.getElementById("header");
  if (!headerEl) return;
  
  // Build navigation markup
  headerEl.innerHTML += `
    <div class="navigation-container">
        <a href="/fotogram/"><img id="fotogram_logo" src="/fotogram/assets/img/logo.svg" alt="Fotogram Logo" /></a>
        <h1>Fotogram</h1>
        <nav class="navigation-desktop" aria-label="Hauptnavigation">
            <ul>
                <li><a class="navigation-link-desktop" href="/fotogram/impressum">Impressum</a></li>
                <li><a class="navigation-link-desktop" href="/fotogram/kontakt">Kontakt</a></li>
            </ul>
        </nav>

        <nav class="navigation-mobile" aria-label="Mobile Navigation">
            <button type="button" class="mobile-menu-button" onclick="handleMobileMenu()" aria-expanded="false" aria-controls="mobile-menu" aria-label="Navigationsmenü öffnen">
                <img class="mobile-menu-icon" src="/fotogram/assets/img/burger-menu.svg" alt="" aria-hidden="true" />
            </button>
            <div class="mobile-menu-dropdown" id="mobile-menu" aria-hidden="true">
                <ul>
                    <li><a class="mobile-menu-link" href="/fotogram/impressum">Impressum</a></li>
                    <li><a class="mobile-menu-link" href="/fotogram/kontakt">Kontakt</a></li>
                </ul>
            </div>
        </nav>
    </div>
  `;
}

function setupGallery() {
  const content = document.getElementById("content");
  
  content.innerHTML = `
    <section class="gallery-header">
      <h2 class="gallery-title">Deine Oldtimer Bildergalerie</h2>
      <div class="category-filters" role="tablist" aria-label="Kategoriefilter">
        ${Object.entries(categories).map(([key, label]) => `
          <button 
            class="category-filter ${key === 'all' ? 'active' : ''}" 
            data-category="${key}"
            role="tab"
            aria-selected="${key === 'all'}"
            onclick="filterPhotos('${key}')"
          >
            ${label}
          </button>
        `).join('')}
      </div>
    </section>
    <section class="photo-grid" id="photoGrid" role="region" aria-label="Fotogalerie">
    </section>
    
    <div class="modal" id="photoModal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
      <div class="modal-content">
        <h3 id="modal-title" class="screen-reader-only">Vergrößerte Bildansicht</h3>
        <button class="modal-close-button" id="modalClose" type="button" aria-label="Dialog schließen">&times;</button>
        <button class="modal-navigation-button modal-navigation-button--previous" id="prevBtn" type="button" aria-label="Vorheriges Bild">&#8249;</button>
        <figure>
          <img class="modal-image" id="modalImage" src="" alt="">
          <figcaption id="modal-caption" class="screen-reader-only"></figcaption>
        </figure>
        <button class="modal-navigation-button modal-navigation-button--next" id="nextBtn" type="button" aria-label="Nächstes Bild">&#8250;</button>
      </div>
    </div>
  `;
  
  // Populate the grid
  displayPhotos();
}

function displayPhotos(filter = 'all') {
  const grid = document.getElementById("photoGrid");
  if (!grid) return;
  
  // Clear existing photos
  grid.innerHTML = '';
  
  // Filter photos based on category
  const filteredPhotos = filter === 'all' ? photos : photos.filter(photo => photo.category === filter);
  
  filteredPhotos.forEach((photo, idx) => {
    const item = document.createElement("article");
    item.className = "photo-item";
    item.tabIndex = 0;
    item.setAttribute("data-category", photo.category);
    item.setAttribute("aria-label", `Bild vergrößern: ${photo.alt}`);
    
    // Create placeholder image if needed
    const imgSrc = photo.isPlaceholder ? createPlaceholderImage(photo) : photo.thumbnail;
    
    item.innerHTML = `
      <figure>
        <img src="${imgSrc}" alt="${photo.alt}" loading="lazy" class="${photo.isPlaceholder ? 'placeholder-img' : ''}" onload="handleImageLoad(this)" onerror="handleImageError(this)">
        <figcaption class="photo-caption">
          <h3>${photo.caption}</h3>
          <p class="photo-year">${photo.year}</p>
          <p class="photo-description">${photo.description}</p>
        </figcaption>
      </figure>
    `;
    
    // Add loading class initially
    if (!photo.isPlaceholder) {
      item.classList.add('loading');
    }
    
    // Event listeners - use original index for modal
    const originalIndex = photos.indexOf(photo);
    item.onclick = () => showModal(originalIndex);
    item.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showModal(originalIndex);
      }
    };
    
    grid.appendChild(item);
  });
}

// Filter photos by category
function filterPhotos(category) {
  currentFilter = category;
  
  // Update active filter button
  document.querySelectorAll('.category-filter').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  
  const activeBtn = document.querySelector(`[data-category="${category}"]`);
  activeBtn.classList.add('active');
  activeBtn.setAttribute('aria-selected', 'true');
  
  // Display filtered photos
  displayPhotos(category);
}

// Create placeholder image
function createPlaceholderImage(photo) {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  
  // Gradient background
  const gradient = ctx.createLinearGradient(0, 0, 400, 400);
  gradient.addColorStop(0, '#2a4a5a');
  gradient.addColorStop(1, '#1a2832');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);
  
  // Car silhouette (simple rectangle representing a car)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(80, 180, 240, 80);
  ctx.fillRect(100, 160, 200, 20);
  
  // Wheels
  ctx.beginPath();
  ctx.arc(130, 260, 20, 0, 2 * Math.PI);
  ctx.arc(270, 260, 20, 0, 2 * Math.PI);
  ctx.fill();
  
  // Text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(photo.caption, 200, 320);
  
  ctx.font = '16px Arial';
  ctx.fillText('Coming Soon', 200, 350);
  
  return canvas.toDataURL();
}

// Handle image loading
function handleImageLoad(img) {
  const photoItem = img.closest('.photo-item');
  if (photoItem) {
    photoItem.classList.remove('loading');
    img.classList.add('loaded');
  }
}

// Handle image loading errors
function handleImageError(img) {
  const photoItem = img.closest('.photo-item');
  if (photoItem) {
    photoItem.classList.remove('loading');
    // Create a simple error placeholder
    const photo = photos.find(p => img.alt === p.alt);
    if (photo) {
      img.src = createPlaceholderImage(photo);
      img.classList.add('placeholder-img');
    }
  }
}

// Add smooth page transitions
function addPageTransitions() {
  // Add entrance animation to header
  const header = document.getElementById('header');
  if (header) {
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    header.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Add entrance animation to footer
  const footer = document.querySelector('footer');
  if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
      footer.style.opacity = '1';
      footer.style.transform = 'translateY(0)';
    }, 800);
  }
}

function prepareModal() {
  const modal = document.getElementById("photoModal");
  const closeBtn = document.getElementById("modalClose");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  if (!modal) return;
  
  // Close button
  closeBtn.addEventListener("click", hideModal);
  
  // Background click to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });
  
  // Navigation buttons
  prevBtn.onclick = (e) => {
    e.stopPropagation();
    goToPrevious();
  };
  
  nextBtn.onclick = (e) => {
    e.stopPropagation();
    goToNext();
  };
  
  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    
    switch(e.key) {
      case "Escape":
        hideModal();
        break;
      case "ArrowLeft":
        goToPrevious();
        break;
      case "ArrowRight":
        goToNext();
        break;
    }
  });
}

function showModal(index) {
  if (index < 0 || index >= photos.length) return;
  
  activeIndex = index;
  previousFocus = document.activeElement;
  
  const modal = document.getElementById("photoModal");
  
  // Update content
  updateModalContent();
  
  // Show modal with animation
  modal.style.display = 'flex';
  modal.offsetHeight; // Force reflow
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  
  // Focus management - focus the modal container first
  const closeButton = document.getElementById("modalClose");
  closeButton.focus();
  
  // Trap focus within modal
  trapFocus(modal);
  
  updateNavButtons();
}

function hideModal() {
  const modal = document.getElementById("photoModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  
  // Hide modal after animation completes
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  
  document.body.style.overflow = "";
  
  // Restore focus
  if (previousFocus) {
    previousFocus.focus();
    previousFocus = null;
  }
}

function goToPrevious() {
  if (activeIndex > 0) {
    activeIndex--;
    updateModalContent();
    updateNavButtons();
  }
}

function goToNext() {
  if (activeIndex < photos.length - 1) {
    activeIndex++;
    updateModalContent();
    updateNavButtons();
  }
}

function updateModalContent() {
  const img = document.getElementById("modalImage");
  const caption = document.getElementById("modal-caption");
  const modalTitle = document.getElementById("modal-title");
  const photo = photos[activeIndex];
  
  img.src = photo.fullsize;
  img.alt = photo.alt;
  caption.textContent = photo.caption;
  modalTitle.textContent = `Vergrößerte Bildansicht: ${photo.alt} (Bild ${activeIndex + 1} von ${photos.length})`;
  
  // Announce to screen readers
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'screen-reader-only';
  announcement.textContent = `Bild ${activeIndex + 1} von ${photos.length}: ${photo.alt}`;
  document.body.appendChild(announcement);
  
  // Remove announcement after screen reader has processed it
  setTimeout(() => {
    if (announcement.parentNode) {
      announcement.parentNode.removeChild(announcement);
    }
  }, 1000);
}

function updateNavButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  prevBtn.disabled = activeIndex === 0;
  nextBtn.disabled = activeIndex === photos.length - 1;
}

// Mobile menu handler
function handleMobileMenu() {
  const button = document.querySelector('.mobile-menu-button');
  const dropdown = document.getElementById('mobile-menu');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  // Toggle aria-expanded
  button.setAttribute('aria-expanded', !isExpanded);
  dropdown.setAttribute('aria-hidden', isExpanded);
  
  // Update aria-label
  button.setAttribute('aria-label', !isExpanded ? 'Navigationsmenü schließen' : 'Navigationsmenü öffnen');
  
  // Toggle dropdown visibility
  dropdown.classList.toggle('mobile-menu-open', !isExpanded);
  
  // Close menu when clicking outside
  if (!isExpanded) {
    document.addEventListener('click', closeMobileMenuOnClickOutside);
  } else {
    document.removeEventListener('click', closeMobileMenuOnClickOutside);
  }
}

// Close mobile menu when clicking outside
function closeMobileMenuOnClickOutside(event) {
  const mobileNav = document.querySelector('.navigation-mobile');
  if (!mobileNav.contains(event.target)) {
    const button = document.querySelector('.mobile-menu-button');
    const dropdown = document.getElementById('mobile-menu');
    
    button.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-label', 'Navigationsmenü öffnen');
    dropdown.classList.remove('mobile-menu-open');
    
    document.removeEventListener('click', closeMobileMenuOnClickOutside);
  }
}

// Focus trap utility for modal accessibility
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}