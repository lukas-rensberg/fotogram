// ========================================
// MODAL FUNCTIONALITY
// ========================================

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
  if (index < 0 || index >= filteredPhotos.length) return;
  
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
  if (!filteredPhotos || filteredPhotos.length === 0) {
    console.error('No filtered photos available');
    return;
  }
  
  if (activeIndex > 0) {
    activeIndex--;
    updateModalContent();
    updateNavButtons();
  }
}

function goToNext() {
  if (!filteredPhotos || filteredPhotos.length === 0) {
    console.error('No filtered photos available');
    return;
  }
  
  if (activeIndex < filteredPhotos.length - 1) {
    activeIndex++;
    updateModalContent();
    updateNavButtons();
  }
}

function updateModalContent() {
  const img = document.getElementById("modalImage");
  const caption = document.getElementById("modal-caption");
  const modalTitle = document.getElementById("modal-title");
  const technicalDataGrid = document.getElementById("technicalDataGrid");
  
  // Check if elements exist and if we have valid data
  if (!img || !caption || !modalTitle || !technicalDataGrid || !filteredPhotos || activeIndex < 0 || activeIndex >= filteredPhotos.length) {
    console.error('Modal elements or photo data not found');
    return;
  }
  
  const photo = filteredPhotos[activeIndex];
  if (!photo) {
    console.error('Photo not found at index:', activeIndex);
    return;
  }
  
  img.src = photo.fullsize || photo.thumbnail || '';
  img.alt = photo.alt || '';
  caption.textContent = photo.caption || '';
  modalTitle.textContent = `Vergrößerte Bildansicht: ${photo.alt} (Bild ${activeIndex + 1} von ${filteredPhotos.length})`;
  
  // Update technical data
  updateTechnicalData(photo.technicalData || {});
  
  // Announce to screen readers
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'screen-reader-only';
  announcement.textContent = `Bild ${activeIndex + 1} von ${filteredPhotos.length}: ${photo.alt}`;
  document.body.appendChild(announcement);
  
  // Remove announcement after screen reader has processed it
  setTimeout(() => {
    if (announcement.parentNode) {
      announcement.parentNode.removeChild(announcement);
    }
  }, 1000);
}

function updateTechnicalData(technicalData) {
  const technicalDataGrid = document.getElementById("technicalDataGrid");
  if (!technicalDataGrid) return;
  
  // Clear existing content
  technicalDataGrid.innerHTML = '';
  
  // Technical data labels in German
  const labels = {
    motor: 'Motor',
    leistung: 'Leistung',
    hubraum: 'Hubraum',
    getriebe: 'Getriebe',
    hoechstgeschwindigkeit: 'Höchstgeschwindigkeit',
    verbrauch: 'Verbrauch',
    gewicht: 'Gewicht'
  };
  
  // Create technical data items
  Object.entries(technicalData).forEach(([key, value]) => {
    if (labels[key] && value) {
      const dataItem = document.createElement('div');
      dataItem.className = 'technical-data-item';
      
      const label = document.createElement('span');
      label.className = 'technical-data-label';
      label.textContent = labels[key];
      
      const valueSpan = document.createElement('span');
      valueSpan.className = 'technical-data-value';
      valueSpan.textContent = value;
      
      dataItem.appendChild(label);
      dataItem.appendChild(valueSpan);
      technicalDataGrid.appendChild(dataItem);
    }
  });
}

function updateNavButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  if (!prevBtn || !nextBtn || !filteredPhotos) {
    console.error('Navigation buttons or filtered photos not found');
    return;
  }
  
  prevBtn.disabled = activeIndex === 0;
  nextBtn.disabled = activeIndex === filteredPhotos.length - 1;
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
