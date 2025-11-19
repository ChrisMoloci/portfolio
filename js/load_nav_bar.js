// Loads Components for the home page

import { loadTemplate } from './html_loader.js'; // Import the template loader

const navBar = document.getElementById('nav-bar'); // Get the nav-bar element navBar;
const shareDialog = document.createElement('div');
shareDialog.id = 'share-dialog';
let closeShareDialogButton;
let copyLinkButton;

try {
    const navBarTemplate = await loadTemplate('nav-bar-template', '/components/nav_bar.html'); // Load the nav-bar template
    navBar.innerHTML = navBarTemplate.innerHTML; // Insert the nav-bar template into the nav-bar element
} catch (error) {
    console.error("Error loading nav-bar template:", error);
    navBar.innerHTML = "<p>Error loading navigation bar.</p>";
}

const hamburgerButton = document.getElementById('hamburger-button');
const hamburgerMenu = document.getElementById('hamburger-nav-menu');
const shareButton = document.querySelectorAll('#share-button'); // Gets the button from the main nav and the hamburger menu
const closeHamburgerMenu = document.getElementById('close-hamburger-menu');

// Add the event listener to all the share buttons
Array.from(shareButton).forEach((button) =>{
    button.addEventListener('click', async (event) => {
        if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

        console.log("clicked")

        if (shareDialog.children.length == 0) {
            try {
                const shareDialogTemplate = await loadTemplate('share-dialog', '/components/share-dialog.html'); // Load the nav-bar template
                shareDialog.innerHTML = shareDialogTemplate.innerHTML; // Insert the nav-bar template into the nav-bar element
                document.body.appendChild(shareDialog);
                closeShareDialogButton = document.getElementById('close-share-dialog');
                closeShareDialogButton.addEventListener('click', () => {
                    shareDialog.style.display = 'none';
                });
                copyLinkButton = document.getElementById('copy-link');
                copyLinkButton.addEventListener('click', () => {
                    navigator.clipboard.writeText("https://christianmoloci.com/");
                });
            } catch (error) {
                console.error("Error loading nav-bar template:", error);
                shareButton.innerHTML = "<p>Error loading navigation bar.</p>";
            }
        }

        if (shareDialog.style.display === 'block') {
            shareDialog.style.display = 'none';
        } else {
            hamburgerMenu.style.display = 'none';
            shareDialog.style.display = 'block';
        }
    })
});

hamburgerButton.addEventListener('click', (event) => {
    if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

    if (hamburgerMenu.style.display === 'none') {
        hamburgerMenu.style.display = 'block';
    } else {
        hamburgerMenu.style.display = 'none';
    }
    
});

closeHamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.style.display = 'none';
});