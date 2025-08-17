// ========================================
// GALLERY FUNCTIONALITY
// ========================================

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
