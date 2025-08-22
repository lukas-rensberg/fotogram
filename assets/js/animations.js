/**
 * @fileoverview Animation and transition functionality for page elements
 */

/**
 * Adds smooth entrance animations to page elements
 * @returns {void}
 */
function addPageTransitions() {
  animateHeader();
  animateFooter();
}

/**
 * Animates the header with entrance effect
 * @returns {void}
 */
function animateHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  header.style.opacity = "0";
  header.style.transform = "translateY(-20px)";
  header.style.transition = "all 0.6s ease";

  setTimeout(() => {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }, 100);
}

/**
 * Animates the footer with entrance effect
 * @returns {void}
 */
function animateFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.style.opacity = "0";
  footer.style.transform = "translateY(20px)";
  footer.style.transition = "all 0.6s ease";

  setTimeout(() => {
    footer.style.opacity = "1";
    footer.style.transform = "translateY(0)";
  }, 800);
}

document.addEventListener("DOMContentLoaded", addPageTransitions);
