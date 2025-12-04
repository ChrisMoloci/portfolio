/** 
 * @author Christian Moloci
 * @description Theme engine for managing which theme to set based on cookie and user changes
 */

import { getCookieAsArray } from "/js/get_cookie.js"

// Themeing based on: https://webdesign.tutsplus.com/color-schemes-with-css-variables-and-javascript--cms-36989t

let cookie; // Will hold the theme cookie
const themeTable = [
    "auto", "light", "dark"
] // Tracks class names for :root to set document elemet to
const iconTable = [
    "routine", "light_mode", "dark_mode"
]; // Tracks icon names for the set color theme
let themeIndex = 0;

// Get nav bar since it exists from init, we'll grab events from here and filter theme button events
const navBar = document.getElementById('nav-bar'); 

// Try to get the cookie and set the default theme
try {
    cookie = getCookieAsArray('theme');
    themeIndex = parseInt(cookie[1]);
    setTheme(themeIndex); // Set the last theme
} catch (e) {
    console.error('Could not retrieve cookies, setting theme to default theme:', e);
    cookie = getCookieAsArray('theme');
    setTheme(0); // Set to default theme
} finally {
    // Checks for system theme changes and updates if theme is set to auto
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setAutoTheme);

    // Waits for the nav bar DOM to be loaded before attempting to set the icon
    new MutationObserver(() => {
        // More on mutation observer: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
        console.log(navBar.cloneNode);
        navBar.querySelector('#theme-icon').textContent = iconTable[themeIndex];
    }).observe(navBar, { childList: true, subtree: false });
}

// Sets the theme based on the theme index
function setTheme(themeIndex) {
    // Validate theme index value before setting
    if (!(themeIndex >= 0 && themeIndex < themeTable.length)) {
        console.error(`Invalid theme: ${themeIndex}`);
        document.documentElement.className = 'light'; // fallback
        return;
    }

    // Update cookie
    document.cookie = `theme=${themeIndex}; path=/;`;
    cookie = getCookieAsArray('theme'); // Update local cookie value

    if (themeIndex === 0) {
        setAutoTheme(); // If theme is auto, set it based on system preference
    } else {
        // If theme is manual, set it to light or dark using lookup table
        document.documentElement.className = themeTable[themeIndex];
    }
}

// Sets the theme based on system preference if theme is set to auto
function setAutoTheme() {
    // Check if window.matchMedia exists on the browser
    if (window.matchMedia) {
        // Set theme if cookie is set to auto (0)
        if (Number(cookie[1]) === 0) { 
            // Set based on whether system is in dark mode or not
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.className = "dark";    
            } else {
                document.documentElement.className = "light";
            }
        }
    }
}

// Listens for theme toggle clicks
navBar.addEventListener('click', (event) => {
    // Ensures el is always #theme-toggle even if event was on it's child
    const el = event.target.closest("#theme-toggle");

    if (!el || !el.id == "#theme-toggle") return; // If event is not from theme toggle, ignore it

    // Set theme index by incrementing or wrapping around
    themeIndex >= 2 ? themeIndex = 0 : themeIndex++;
    setTheme(themeIndex);

    // Update the theme icon
    const icon = el.querySelector('#theme-icon');
    icon.textContent = iconTable[themeIndex];
});