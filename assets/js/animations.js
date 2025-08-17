// ========================================
// ANIMATIONS & TRANSITIONS
// ========================================

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
