// Loads Components for the home page

import { loadTemplate } from './html_loader.js'; // Import the template loader

const navBar = document.getElementById('nav-bar'); // Get the nav-bar element
const navBarTemplate = await loadTemplate('nav-bar-template', '/components/nav_bar.html'); // Load the nav-bar template

navBar.innerHTML = navBarTemplate.innerHTML; // Insert the nav-bar template into the nav-bar element