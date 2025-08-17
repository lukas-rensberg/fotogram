// Configuration
const API_BASE = "https://picsum.photos";
const THUMB_SIZE = "300/300";
const FULL_SIZE = "1200/800";

// Photo collection - just one for now
const photos = [
  {
    thumbnail: `/assets/img/vw-kaefer.jpg`,
    fullsize: `/assets/img/vw-kaefer.jpg`,
    alt: "VW Käfer",
    caption: "VW Käfer"
  }
];

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
}

function buildHeader() {
  const headerEl = document.getElementById("header");
  if (!headerEl) return;
  
  // Build navigation markup
  headerEl.innerHTML += `
    <div class="navigation-container">
        <a href="/"><img id="fotogram_logo" src="/assets/img/logo.svg" alt="Fotogram Logo" /></a>
        <h1>Fotogram</h1>
        <nav class="navigation-desktop" aria-label="Hauptnavigation">
            <ul>
                <li><a class="navigation-link-desktop" href="./impressum">Impressum</a></li>
                <li><a class="navigation-link-desktop" href="./kontakt">Kontakt</a></li>
            </ul>
        </nav>

        <nav class="navigation-mobile" aria-label="Mobile Navigation">
            <button type="button" class="mobile-menu-button" onclick="handleMobileMenu()" aria-expanded="false" aria-controls="mobile-menu" aria-label="Navigationsmenü öffnen">
                <img class="mobile-menu-icon" src="./assets/img/burger-menu.svg" alt="Menü Symbol" />
            </button>
        </nav>
    </div>
  `;
}

function setupGallery() {
  const content = document.getElementById("content");
  
  content.innerHTML = `
    <section class="gallery-header">
      <h2 class="gallery-title">Deine Oldtimer Bildergalerie</h2>
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

function displayPhotos() {
  const grid = document.getElementById("photoGrid");
  if (!grid) return;
  
  photos.forEach((photo, idx) => {
    const item = document.createElement("article");
    item.className = "photo-item";
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Bild ${idx + 1} vergrößern: ${photo.alt}`);
    
    item.innerHTML = `
      <figure>
        <img src="${photo.thumbnail}" alt="${photo.alt}" loading="lazy">
        <figcaption>${photo.caption}</figcaption>
      </figure>
    `;
    
    // Event listeners
    item.onclick = () => showModal(idx);
    item.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showModal(idx);
      }
    };
    
    grid.appendChild(item);
  });
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
  const img = document.getElementById("modalImage");
  const caption = document.getElementById("modal-caption");
  
  // Update content
  const photo = photos[index];
  img.src = photo.fullsize;
  img.alt = photo.alt;
  caption.textContent = photo.caption;
  
  // Show modal
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  
  // Focus management
  document.getElementById("modalClose").focus();
  
  updateNavButtons();
}

function hideModal() {
  const modal = document.getElementById("photoModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
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
  const photo = photos[activeIndex];
  
  img.src = photo.fullsize;
  img.alt = photo.alt;
  caption.textContent = photo.caption;
}

function updateNavButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  prevBtn.disabled = activeIndex === 0;
  nextBtn.disabled = activeIndex === photos.length - 1;
}

// Mobile menu handler - placeholder for now
function handleMobileMenu() {
  console.log("Mobile menu clicked");
}