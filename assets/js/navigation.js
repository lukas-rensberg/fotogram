/**
 * @fileoverview Navigation functionality for the application header
 */

/**
 * Builds the header navigation with desktop and mobile menus
 */
function buildHeader() {
  const headerEl = document.getElementById("header");
  if (!headerEl) return;

  headerEl.innerHTML += `
    <div class="navigation-container">
        ${createLogo()}
        ${createDesktopNavigation()}
        ${createMobileNavigation()}
    </div>
  `;
}

/**
 * Creates the logo element
 * @returns {string} Logo HTML
 */
function createLogo() {
  return `<a href="/fotogram/"><img class="logo-fotogram" src="/fotogram/assets/img/logo.svg" alt="Fotogram Logo" /></a>`;
}

/**
 * Creates the desktop navigation
 * @returns {string} Desktop navigation HTML
 */
function createDesktopNavigation() {
  return `
    <nav class="navigation-desktop" aria-label="Hauptnavigation">
        <ul>
            <li><a class="navigation-link-desktop" href="/fotogram/impressum">Impressum</a></li>
        </ul>
    </nav>
  `;
}

/**
 * Creates the mobile navigation
 * @returns {string} Mobile navigation HTML
 */
function createMobileNavigation() {
  return `
    <nav class="navigation-mobile" aria-label="Mobile Navigation">
        ${createMobileMenuButton()}
        ${createMobileMenuDropdown()}
    </nav>
  `;
}

/**
 * Creates the mobile menu button
 * @returns {string} Mobile menu button HTML
 */
function createMobileMenuButton() {
  return `
    <button type="button" class="mobile-menu-button" onclick="handleMobileMenu()" aria-expanded="false" aria-controls="mobile-menu" aria-label="Navigationsmenü öffnen">
        <img class="mobile-menu-icon" src="/fotogram/assets/img/burger-menu.svg" alt="" aria-hidden="true" />
    </button>
  `;
}

/**
 * Creates the mobile menu dropdown
 * @returns {string} Mobile menu dropdown HTML
 */
function createMobileMenuDropdown() {
  return `
    <div class="mobile-menu-dropdown" id="mobile-menu" aria-hidden="true">
        <ul>
            <li><a class="mobile-menu-link" href="/fotogram/impressum">Impressum</a></li>
        </ul>
    </div>
  `;
}

/**
 * Handles mobile menu toggle functionality
 */
function handleMobileMenu() {
  const button = document.querySelector(".mobile-menu-button");
  const dropdown = document.getElementById("mobile-menu");
  const isExpanded = button.getAttribute("aria-expanded") === "true";

  button.setAttribute("aria-expanded", !isExpanded);
  dropdown.setAttribute("aria-hidden", isExpanded);

  button.setAttribute(
    "aria-label",
    !isExpanded ? "Navigationsmenü schließen" : "Navigationsmenü öffnen"
  );

  dropdown.classList.toggle("mobile-menu-open", !isExpanded);

  if (!isExpanded) {
    document.addEventListener("click", closeMobileMenuOnClickOutside);
  } else {
    document.removeEventListener("click", closeMobileMenuOnClickOutside);
  }
}

/**
 * Closes mobile menu when clicking outside of it
 * @param {Event} event - Click event
 */
function closeMobileMenuOnClickOutside(event) {
  const mobileNav = document.querySelector(".navigation-mobile");
  if (!mobileNav.contains(event.target)) {
    const button = document.querySelector(".mobile-menu-button");
    const dropdown = document.getElementById("mobile-menu");

    button.setAttribute("aria-expanded", "false");
    dropdown.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-label", "Navigationsmenü öffnen");
    dropdown.classList.remove("mobile-menu-open");

    document.removeEventListener("click", closeMobileMenuOnClickOutside);
  }
}

document.addEventListener("DOMContentLoaded", buildHeader);
