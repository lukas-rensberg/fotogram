/**
 * @fileoverview Modal functionality for photo gallery
 */

/**
 * Prepares the modal by setting up event listeners for navigation and keyboard controls
 */
function prepareModal() {
  const modal = document.getElementById("photoModal");
  const closeBtn = document.getElementById("modalClose");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!modal) return;

  closeBtn.addEventListener("click", hideModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });

  prevBtn.onclick = (e) => {
    e.stopPropagation();
    goToPrevious();
  };

  nextBtn.onclick = (e) => {
    e.stopPropagation();
    goToNext();
  };

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    switch (e.key) {
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

/**
 * Shows the modal with the specified photo index
 * @param {number} index - Index of the photo to display
 */
function showModal(index) {
  if (index < 0 || index >= filteredPhotos.length) return;

  activeIndex = index;
  previousFocus = document.activeElement;

  const modal = document.getElementById("photoModal");

  updateModalContent();

  modal.style.display = "flex";
  modal.offsetHeight;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const closeButton = document.getElementById("modalClose");
  closeButton.focus();

  trapFocus(modal);

  updateNavButtons();
}

/**
 * Hides the modal and restores focus to the previous element
 */
function hideModal() {
  const modal = document.getElementById("photoModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);

  document.body.style.overflow = "";

  if (previousFocus) {
    previousFocus.focus();
    previousFocus = null;
  }
}

/**
 * Navigates to the previous photo in the modal
 */
function goToPrevious() {
  if (!filteredPhotos || filteredPhotos.length === 0) {
    console.error("No filtered photos available");
    return;
  }

  if (activeIndex > 0) {
    activeIndex--;
    updateModalContent();
    updateNavButtons();
  }
}

/**
 * Navigates to the next photo in the modal
 */
function goToNext() {
  if (!filteredPhotos || filteredPhotos.length === 0) {
    console.error("No filtered photos available");
    return;
  }

  if (activeIndex < filteredPhotos.length - 1) {
    activeIndex++;
    updateModalContent();
    updateNavButtons();
  }
}

/**
 * Updates the modal content with the current photo data
 */
function updateModalContent() {
  const elements = getModalElements();
  if (!validateModalElements(elements)) return;

  const photo = filteredPhotos[activeIndex];
  if (!photo) {
    console.error("Photo not found at index:", activeIndex);
    return;
  }

  updateModalDisplay(elements, photo);
  updateTechnicalData(photo.technicalData || {});
  announcePhotoChange(photo);
}

/**
 * Gets modal elements by their IDs
 * @returns {Object} Modal elements object
 */
function getModalElements() {
  return {
    img: document.getElementById("modalImage"),
    caption: document.getElementById("modal-caption"),
    modalTitle: document.getElementById("modal-title"),
    technicalDataGrid: document.getElementById("technicalDataGrid"),
    dialogCounter: document.getElementById("dialogCounter"),
  };
}

/**
 * Validates that all required modal elements exist
 * @param {Object} elements - Modal elements object
 * @returns {boolean} Whether validation passed
 */
function validateModalElements(elements) {
  const { img, caption, modalTitle, technicalDataGrid } = elements;

  if (
    !img ||
    !caption ||
    !modalTitle ||
    !technicalDataGrid ||
    !filteredPhotos ||
    activeIndex < 0 ||
    activeIndex >= filteredPhotos.length
  ) {
    console.error("Modal elements or photo data not found");
    return false;
  }
  return true;
}

/**
 * Updates the modal display with photo data
 * @param {Object} elements - Modal elements object
 * @param {Object} photo - Photo data object
 */
function updateModalDisplay(elements, photo) {
  const { img, caption, modalTitle, dialogCounter } = elements;

  img.src = photo.fullsize || photo.thumbnail || "";
  img.alt = photo.alt || "";
  caption.textContent = photo.caption || "";
  modalTitle.textContent = `${photo.alt}`;

  if (dialogCounter) {
    dialogCounter.textContent = `${activeIndex + 1} / ${filteredPhotos.length}`;
  }
}

/**
 * Announces photo changes to screen readers
 * @param {Object} photo - Photo data object
 */
function announcePhotoChange(photo) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "screen-reader-only";
  announcement.textContent = `Bild ${activeIndex + 1} von ${
    filteredPhotos.length
  }: ${photo.alt}`;
  document.body.appendChild(announcement);

  setTimeout(() => {
    if (announcement.parentNode) {
      announcement.parentNode.removeChild(announcement);
    }
  }, 1000);
}

/**
 * Updates the technical data section with photo specifications
 * @param {Object} technicalData - Technical data object
 */
function updateTechnicalData(technicalData) {
  const technicalDataGrid = document.getElementById("technicalDataGrid");
  if (!technicalDataGrid) return;

  technicalDataGrid.innerHTML = "";
  const labels = getTechnicalDataLabels();

  Object.entries(technicalData).forEach(([key, value]) => {
    if (labels[key] && value) {
      technicalDataGrid.appendChild(
        createTechnicalDataCard(key, value, labels)
      );
    }
  });
}

/**
 * Gets the technical data labels configuration
 * @returns {Object} Labels configuration object
 */
function getTechnicalDataLabels() {
  return {
    motor: { label: "Motor" },
    leistung: { label: "Leistung" },
    hubraum: { label: "Hubraum" },
    getriebe: { label: "Getriebe" },
    hoechstgeschwindigkeit: { label: "Höchstgeschwindigkeit" },
    verbrauch: { label: "Verbrauch" },
    gewicht: { label: "Gewicht" },
  };
}

/**
 * Creates a technical data card element
 * @param {string} key - Data key
 * @param {string} value - Data value
 * @param {Object} labels - Labels configuration
 * @returns {HTMLElement} Technical data card element
 */
function createTechnicalDataCard(key, value, labels) {
  const dataCard = document.createElement("div");
  dataCard.className = "technical-data-card";

  dataCard.innerHTML = `
    <div class="technical-data-card-content">
      <div class="technical-data-card-label">${labels[key].label}</div>
      <div class="technical-data-card-value">${value}</div>
    </div>
  `;

  return dataCard;
}

/**
 * Updates the navigation button states based on current photo index
 */
function updateNavButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!prevBtn || !nextBtn || !filteredPhotos) {
    console.error("Navigation buttons or filtered photos not found");
    return;
  }

  prevBtn.disabled = activeIndex === 0;
  nextBtn.disabled = activeIndex === filteredPhotos.length - 1;
}

/**
 * Focus trap utility for modal accessibility
 * @param {HTMLElement} element - Modal element to trap focus within
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
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
