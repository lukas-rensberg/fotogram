// ========================================
// GALLERY FUNCTIONALITY
// ========================================

function setupGallery() {
  const content = document.getElementById("content");

  content.innerHTML += createHeaderTemplate();
  content.innerHTML += createGalleryTemplate();
  content.innerHTML += createModalTemplate();

  // Populate the grid
  displayPhotos();
}

function displayPhotos(filter = "all") {
  const grid = document.getElementById("photoGrid");
  if (!grid) return;

  // Clear existing photos
  grid.innerHTML = "";

  // Filter photos based on category and update global state
  filteredPhotos =
    filter === "all"
      ? photos
      : photos.filter((photo) => photo.category === filter);

  filteredPhotos.forEach((photo, idx) => {
    const item = createPhotoItemTemplate(photo);

    // Add event listeners
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

// Filter photos by category
function filterPhotos(category) {
  currentFilter = category;

  // Update active filter button
  document.querySelectorAll(".category-filter").forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute("aria-selected", "false");
  });

  const activeBtn = document.querySelector(`[data-category="${category}"]`);
  activeBtn.classList.add("active");
  activeBtn.setAttribute("aria-selected", "true");

  // Display filtered photos
  displayPhotos(category);
}

// Handle image loading
function handleImageLoad(img) {
  const photoItem = img.closest(".photo-item");
  if (photoItem) {
    photoItem.classList.remove("loading");
    img.classList.add("loaded");
  }
}

function createModalTemplate() {
  return `
    <div class="modal" id="photoModal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 id="modal-title" class="modal-title">Fahrzeug-Details</h3>
          <button class="modal-close-button" id="modalClose" type="button" aria-label="Dialog schließen">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="modal-content-wrapper">
            <div class="modal-image-section">
              <figure class="modal-photo-figure">
                <img class="modal-image" id="modalImage" src="" alt="">
                <figcaption id="modal-caption" class="modal-photo-caption"></figcaption>
              </figure>
            </div>
            
            <div class="modal-details-section">
              <div class="technical-specifications">
                <h4 class="specs-title">Technische Daten</h4>
                <div class="technical-data-grid" id="technicalDataGrid">
                  <!-- Technical data will be populated here -->
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <div class="modal-navigation">
            <button class="nav-button nav-button--prev" id="prevBtn" type="button" aria-label="Vorheriges Fahrzeug">
              <span class="nav-icon">←</span>
              <span class="nav-text">Zurück</span>
            </button>
            <div class="image-counter">
              <span id="dialogCounter">1 / 6</span>
            </div>
            <button class="nav-button nav-button--next" id="nextBtn" type="button" aria-label="Nächstes Fahrzeug">
              <span class="nav-text">Weiter</span>
              <span class="nav-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createGalleryTemplate() {
  return `
    <section class="photo-grid" id="photoGrid" role="region" aria-label="Fotogalerie">
    </section>
  `;
}

function createHeaderTemplate() {
  return `
    <section class="gallery-header">
      <h1 class="gallery-title">Fotogram</h1>
      <h2 class="gallery-subtitle">Deine Oldtimer Bildergalerie</h2>
      <div class="category-filters" role="tablist" aria-label="Kategoriefilter">
        ${Object.entries(categories)
          .map(
            ([key, label]) => `
          <button 
            class="category-filter ${key === "all" ? "active" : ""}" 
            data-category="${key}"
            role="tab"
            aria-selected="${key === "all"}"
            onclick="filterPhotos('${key}')"
          >
            ${label}
          </button>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

function createPhotoItemTemplate(photo) {
  const item = document.createElement("article");
  item.className = "photo-item";
  item.tabIndex = 0;
  item.setAttribute("data-category", photo.category);
  item.setAttribute("aria-label", `Bild vergrößern: ${photo.alt}`);

  // Create placeholder image if needed
  const imgSrc = photo.isPlaceholder
    ? createPlaceholderImage(photo)
    : photo.thumbnail;

  item.innerHTML = `
      <figure>
        <img src="${imgSrc}" alt="${photo.alt}" loading="lazy" class="${photo.isPlaceholder ? "placeholder-img" : ""}" onload="handleImageLoad(this)">
        <figcaption class="photo-caption">
          <h3>${photo.caption}</h3>
          <p class="photo-year">${photo.year}</p>
          <p class="photo-description">${photo.description}</p>
        </figcaption>
      </figure>
    `;

  // Add loading class initially
  if (!photo.isPlaceholder) {
    item.classList.add("loading");
  }

  return item;
}
