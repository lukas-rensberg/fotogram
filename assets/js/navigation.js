// ========================================
// NAVIGATION FUNCTIONALITY
// ========================================

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
