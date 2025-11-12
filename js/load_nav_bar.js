// Loads Components for the home page

import { loadTemplate } from './html_loader.js'; // Import the template loader

const navBar = document.getElementById('nav-bar'); // Get the nav-bar element navBar;

try {
    const navBarTemplate = await loadTemplate('nav-bar-template', '/components/nav_bar.html'); // Load the nav-bar template
    navBar.innerHTML = navBarTemplate.innerHTML; // Insert the nav-bar template into the nav-bar element
} catch (error) {
    console.error("Error loading nav-bar template:", error);
    navBar.innerHTML = "<p>Error loading navigation bar.</p>";
}

const hamburgerButton = document.getElementById('hamburger-button');
const hamburgerMenu = document.getElementById('hamburger-nav-menu');
const closeHamburgerMenu = document.getElementById('close-hamburger-menu');

hamburgerButton.addEventListener('click', (event) => {
    if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

    if (hamburgerMenu.style.display === 'none') {
        hamburgerMenu.style.display = 'flex';
    } else {
        hamburgerMenu.style.display = 'none';
    }
    
});

closeHamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.style.display = 'none';
});