/**
 * @fileoverview Gallery functionality for the photo gallery application
 */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("content")) {
    setupGallery();
    prepareModal();
  }
});

/**
 * Sets up the gallery by creating header, gallery grid, and modal templates
 * and populating the photo grid with initial data
 */
function setupGallery() {
  const content = document.getElementById("content");

  content.innerHTML += createHeaderTemplate();
  content.innerHTML += createGalleryTemplate();
  content.innerHTML += createModalTemplate();

  displayPhotos();
}

/**
 * Displays photos in the gallery grid, optionally filtered by category
 * @param {string} [filter="all"] - Category filter to apply
 */
function displayPhotos(filter = "all") {
  const grid = document.getElementById("photoGrid");
  if (!grid) return;

  grid.innerHTML = "";
  filteredPhotos = getFilteredPhotos(filter);
  populatePhotoGrid(grid);
}

/**
 * Filters photos by category
 * @param {string} filter - Category filter to apply
 * @returns {Array} Filtered photos array
 */
function getFilteredPhotos(filter) {
  return filter === "all"
    ? photos
    : photos.filter((photo) => photo.category === filter);
}

/**
 * Populates the photo grid with filtered photos
 * @param {HTMLElement} grid - Grid container element
 */
function populatePhotoGrid(grid) {
  filteredPhotos.forEach((photo, idx) => {
    const item = createPhotoItemTemplate(photo);
    setupPhotoItemEvents(item, idx);
    grid.appendChild(item);
  });
}

/**
 * Sets up click and keyboard events for photo items
 * @param {HTMLElement} item - Photo item element
 * @param {number} idx - Photo index
 */
function setupPhotoItemEvents(item, idx) {
  item.onclick = () => showModal(idx);
  item.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showModal(idx);
    }
  };
}

/**
 * Filters photos by category and updates the UI accordingly
 * @param {string} category - Category to filter by
 */
function filterPhotos(category) {
  currentFilter = category;
  updateFilterButtonStates(category);
  displayPhotos(category);
}

/**
 * Updates the active state of filter buttons
 * @param {string} activeCategory - Currently active category
 */
function updateFilterButtonStates(activeCategory) {
  document.querySelectorAll(".category-filter").forEach((btn) => {
    btn.classList.remove("active");
    btn.setAttribute("aria-selected", "false");
    btn.setAttribute("tabindex", "-1");
  });

  const activeBtn = document.querySelector(
    `[data-category="${activeCategory}"]`
  );
  activeBtn.classList.add("active");
  activeBtn.setAttribute("aria-selected", "true");
  activeBtn.setAttribute("tabindex", "0");
}

/**
 * Handles image loading completion by removing loading state
 * @param {HTMLImageElement} img - The loaded image element
 */
function handleImageLoad(img) {
  const photoItem = img.closest(".photo-item");
  if (photoItem) {
    photoItem.classList.remove("loading");
    img.classList.add("loaded");
  }
}

/**
 * Creates the HTML template for the modal dialog
 * @returns {string} Modal HTML template
 */
function createModalTemplate() {
  return `
    <div class="modal" id="photoModal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
      <div class="modal-dialog">
        ${createModalHeader()}
        ${createModalBody()}
        ${createModalFooter()}
      </div>
    </div>
  `;
}

/**
 * Creates the modal header template
 * @returns {string} Modal header HTML
 */
function createModalHeader() {
  return `
    <div class="modal-header">
      <h3 id="modal-title" class="modal-title">Fahrzeug-Details</h3>
      <button class="modal-close-button" id="modalClose" type="button" aria-label="Dialog schließen">&times;</button>
    </div>
  `;
}

/**
 * Creates the modal body template
 * @returns {string} Modal body HTML
 */
function createModalBody() {
  return `
    <div class="modal-body">
      <div class="modal-content-wrapper">
        ${createModalImageSection()}
        ${createModalDetailsSection()}
      </div>
    </div>
  `;
}

/**
 * Creates the modal image section template
 * @returns {string} Modal image section HTML
 */
function createModalImageSection() {
  return `
    <div class="modal-image-section">
      <figure class="modal-photo-figure">
        <img class="modal-image" id="modalImage" src="" alt="">
        <figcaption id="modal-caption" class="modal-photo-caption"></figcaption>
      </figure>
    </div>
  `;
}

/**
 * Creates the modal details section template
 * @returns {string} Modal details section HTML
 */
function createModalDetailsSection() {
  return `
    <div class="modal-details-section">
      <div class="technical-specifications">
        <h4 class="specs-title">Technische Daten</h4>
        <div class="technical-data-grid" id="technicalDataGrid">
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates the modal footer template
 * @returns {string} Modal footer HTML
 */
function createModalFooter() {
  return `
    <div class="modal-footer">
      <div class="modal-navigation">
        ${createNavButton("prev", "←", "Zurück", "Vorheriges Fahrzeug")}
        <div class="image-counter">
          <span id="dialogCounter">1 / 6</span>
        </div>
        ${createNavButton("next", "→", "Weiter", "Nächstes Fahrzeug")}
      </div>
    </div>
  `;
}

/**
 * Creates a navigation button template
 * @param {string} type - Button type (prev/next)
 * @param {string} icon - Button icon
 * @param {string} text - Button text
 * @param {string} ariaLabel - Aria label for accessibility
 * @returns {string} Navigation button HTML
 */
function createNavButton(type, icon, text, ariaLabel) {
  const order =
    type === "prev"
      ? `<span class="nav-icon">${icon}</span><span class="nav-text">${text}</span>`
      : `<span class="nav-text">${text}</span><span class="nav-icon">${icon}</span>`;
  return `
    <button class="nav-button nav-button--${type}" id="${type}Btn" type="button" aria-label="${ariaLabel}">
      ${order}
    </button>
  `;
}

/**
 * Creates the HTML template for the photo gallery grid
 * @returns {string} Gallery grid HTML template
 */
function createGalleryTemplate() {
  return `
    <section class="photo-grid" id="photoGrid" aria-label="Fotogalerie">
    </section>
  `;
}

/**
 * Creates the HTML template for the gallery header with filters
 * @returns {string} Header HTML template with category filters
 */
function createHeaderTemplate() {
  return `
    <section class="gallery-header">
      <h1 class="gallery-title">Fotogram</h1>
      <h2 class="gallery-subtitle">Deine Oldtimer Bildergalerie</h2>
      ${createCategoryFilters()}
    </section>
  `;
}

/**
 * Creates the category filter buttons
 * @returns {string} Category filters HTML
 */
function createCategoryFilters() {
  const filterButtons = Object.entries(categories)
    .map(([key, label]) => createFilterButton(key, label))
    .join("");

  return `
    <div class="category-filters" role="tablist" aria-label="Kategoriefilter" onkeydown="handleTablistKeydown(event)">
      ${filterButtons}
    </div>
  `;
}

/**
 * Creates a single filter button
 * @param {string} key - Category key
 * @param {string} label - Category label
 * @returns {string} Filter button HTML
 */
function createFilterButton(key, label) {
  const isActive = key === "all";
  return `
    <button 
      class="category-filter ${isActive ? "active" : ""}" 
      data-category="${key}"
      role="tab"
      aria-selected="${isActive}"
      tabindex="${isActive ? "0" : "-1"}"
      onclick="filterPhotos('${key}')"
    >
      ${label}
    </button>
  `;
}

/**
 * Creates a photo item element for the gallery grid
 * @param {Object} photo - Photo data object
 * @returns {HTMLElement} Photo item DOM element
 */
function createPhotoItemTemplate(photo) {
  const item = document.createElement("article");
  setupPhotoItemAttributes(item, photo);
  item.innerHTML = createPhotoItemHTML(photo);

  if (!photo.isPlaceholder) {
    item.classList.add("loading");
  }

  return item;
}

/**
 * Sets up attributes for a photo item element
 * @param {HTMLElement} item - Photo item element
 * @param {Object} photo - Photo data object
 */
function setupPhotoItemAttributes(item, photo) {
  item.className = "photo-item";
  item.setAttribute("data-category", photo.category);
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");
  item.setAttribute("aria-label", `Bild vergrößern: ${photo.alt}`);
}

/**
 * Creates the HTML content for a photo item
 * @param {Object} photo - Photo data object
 * @returns {string} Photo item HTML content
 */
function createPhotoItemHTML(photo) {
  const imgSrc = photo.isPlaceholder
    ? createPlaceholderImage(photo)
    : photo.thumbnail;
  const imgClass = photo.isPlaceholder ? "placeholder-img" : "";

  return `
    <figure>
      <img src="${imgSrc}" alt="${photo.alt}" loading="lazy" class="${imgClass}" onload="handleImageLoad(this)">
      <figcaption class="photo-caption">
        <h3>${photo.caption}</h3>
        <p class="photo-year">${photo.year}</p>
        <p class="photo-description">${photo.description}</p>
      </figcaption>
    </figure>
  `;
}

/**
 * Handles keyboard navigation for the category filter tablist
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleTablistKeydown(event) {
  const tabs = Array.from(document.querySelectorAll(".category-filter"));
  const currentIndex = tabs.findIndex(
    (tab) => tab.getAttribute("tabindex") === "0"
  );

  const newIndex = calculateNewTabIndex(event.key, currentIndex, tabs.length);
  if (newIndex === -1) return;

  updateTabFocus(tabs, currentIndex, newIndex);
}

/**
 * Calculates new tab index based on keyboard input
 * @param {string} key - Pressed key
 * @param {number} currentIndex - Current tab index
 * @param {number} tabCount - Total number of tabs
 * @returns {number} New tab index or -1 if no change needed
 */
function calculateNewTabIndex(key, currentIndex, tabCount) {
  switch (key) {
    case "ArrowLeft":
    case "ArrowUp":
      return currentIndex > 0 ? currentIndex - 1 : tabCount - 1;
    case "ArrowRight":
    case "ArrowDown":
      return currentIndex < tabCount - 1 ? currentIndex + 1 : 0;
    case "Home":
      return 0;
    case "End":
      return tabCount - 1;
    default:
      return -1;
  }
}

/**
 * Updates tab focus from current to new index
 * @param {Array} tabs - Array of tab elements
 * @param {number} currentIndex - Current tab index
 * @param {number} newIndex - New tab index
 */
function updateTabFocus(tabs, currentIndex, newIndex) {
  tabs[currentIndex].setAttribute("tabindex", "-1");
  tabs[newIndex].setAttribute("tabindex", "0");
  tabs[newIndex].focus();
}
