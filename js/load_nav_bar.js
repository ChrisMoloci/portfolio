/** 
 * @author Christian Moloci
 * @description Loads the nav bar on any page that includes it and and has a nav element with an id of nav-bar
 */

import { loadTemplate } from './html_loader.js'; // Import the template loader

const navBar = document.getElementById('nav-bar'); // Get the nav-bar element navBar;
const shareDialog = document.createElement('div'); // An element opened by the share button
shareDialog.id = 'share-dialog'; // Set the id of the share dialog
let closeShareDialogButton; // A button that will exist in the share dialog to close it
let copyLinkButton; // A button that will exist in the share dialog to copy the portfolio link

// Try to load the nav bar from the nav_bar.html file
try {
    const navBarTemplate = await loadTemplate('nav-bar-template', '/components/nav_bar.html'); // Load the nav-bar template
    navBar.innerHTML = navBarTemplate.innerHTML; // Insert the nav-bar template into the nav-bar element
} catch (error) {
    console.error("Error loading nav-bar template:", error);
    navBar.innerHTML = "<p>Error loading navigation bar.</p>";
}

// Get elements that exist in the nav bar
const hamburgerButton = document.getElementById('hamburger-button');
const hamburgerMenu = document.getElementById('hamburger-nav-menu');
const shareButton = document.querySelectorAll('#share-button'); // Gets both buttons from the main nav and the hamburger menu
const closeHamburgerMenu = document.getElementById('close-hamburger-menu');

/**
 * @description Add the event listener to all the share buttons
 * @author Christian Moloci
 */
Array.from(shareButton).forEach((button) =>{
    button.addEventListener('click', async (event) => {
        if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

        // If share dialog has not already been generated yet
        if (shareDialog.children.length == 0) {
            try {
                const shareDialogTemplate = await loadTemplate('share-dialog', '/components/share-dialog.html'); // Load the nav-bar template
                shareDialog.innerHTML = shareDialogTemplate.innerHTML; // Insert the nav-bar template into the nav-bar element
                document.body.appendChild(shareDialog); // Add the share dialog to the webpage

                // Get the close button and set closeShareDialogButton to it
                closeShareDialogButton = document.getElementById('close-share-dialog');
                closeShareDialogButton.addEventListener('click', () => {
                    shareDialog.style.display = 'none';
                }); // When button is clicked, close the share dialog

                // Get the copy link button and set copyLinkButton to it
                copyLinkButton = document.getElementById('copy-link');
                copyLinkButton.addEventListener('click', () => {
                    navigator.clipboard.writeText("https://christianmoloci.com/");
                }); // When button is clicked, copy the portfolio link to clipboard
            } catch (error) {
                console.error("Error loading nav-bar template:", error);
                shareButton.innerHTML = "<p>Error loading navigation bar.</p>";
            }
        }

        // If share dialog is already generated, just show or hide it depending on its visibility
        if (shareDialog.style.display === 'block') {
            // Hide the share dialog
            shareDialog.style.display = 'none';
        } else {
            // Show the share dialog and close hamburger menu if it's open (mobile)
            hamburgerMenu.style.display = 'none';
            shareDialog.style.display = 'block';
        }
    })
});

/**
 * @description Shows or hides the hamburger menu when the hamburger menu button is clicked (mobile)
 * @author Christian Moloci
 */
hamburgerButton.addEventListener('click', (event) => {
    if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

    if (hamburgerMenu.style.display === 'none') {
        // Show the hamburger menu
        hamburgerMenu.style.display = 'block';
    } else {
        // Hide the hamburger menu
        hamburgerMenu.style.display = 'none';
    }
    
});

/**
 * @description Closes the hamburger menu when the close button is clicked (mobile)
 * @author Christian Moloci
 */
closeHamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.style.display = 'none';
});