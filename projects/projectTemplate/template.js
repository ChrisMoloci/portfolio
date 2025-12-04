/** 
 * @author Christian Moloci
 * @description Template JS file for project pages, do not use directly, make a copy
 */

const navBar = document.getElementById('project-nav');
const content = document.getElementById('content');

const content1 = document.getElementById('content-1');
const content2 = document.getElementById('content-2');

let currentNav;

content.innerHTML = content1.innerHTML; // Init

/**
 * @description Switches the main content based on the content nav bar clicks
 * @author Christian Moloci
 */
navBar.addEventListener('click', (event) => {
    if (event.target.tagName !== "DIV") return; // Only respond to div clicks
    if (event.target.id === currentNav) return; // Do nothing if the same nav is clicked

    currentNav = event.target.id; // Update current nav so we can ignore same click

    // Remove the "selected" class from all the nav buttons
    Array.from(navBar.children).forEach(child => {
        child.classList.remove('selected');
    })

    if (event.target.id === "nav-1") {
        // Show content 1
        content.innerHTML = content1.innerHTML;
        event.target.classList.add('selected'); // Set nav button to "selected" class
    } else if (event.target.id === "nav-2") {
        // Show content 2
        content.innerHTML = content2.innerHTML;
        event.target.classList.add('selected'); // Set nav button to "selected" class
    } else {
        // For unknown nav items, log an error
        console.error("Unknown nav item clicked");
    }
});