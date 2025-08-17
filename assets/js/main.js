// ========================================
// MAIN APPLICATION INITIALIZATION
// ========================================

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
