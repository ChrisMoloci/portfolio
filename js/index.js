/** 
 * @author Christian Moloci
 * @description js file for index.html tasks
 */

import { loadTemplate } from "./html_loader.js";


// --- Social image switching (Same logic applied in bio.js) ---
const socials = document.getElementById("socials");
const lightSocials = document.getElementById("light-socials");
const darkSocials = document.getElementById("dark-socials");

updateSocials(); // Initial update

/**
 * @description Listen for attribute changes on the document element to update socials on theme change
 * @author Christian Moloci
 */
new MutationObserver(() => {
    // More on mutation observer: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    updateSocials();
}).observe(document.documentElement, { attributes: true });

/**
 * @description Updates socials images based on current theme (checks class on document)
 * @author Christian Moloci
 */
function updateSocials() {
    // If the class on the document element is set to dark, use light icons on dark background
    if (document.documentElement.className == "dark") {
        socials.innerHTML = lightSocials.innerHTML;
    } else {
        // If its not dark, use white regardless of actual setting (this way we also have a fallback)
        socials.innerHTML = darkSocials.innerHTML;
    }
}


// --- Image tilting effect (WIP) ---

const image = document.getElementById("profile-image");

/**
 * @description Tilts the image based on mouse position over the image (does not properly work)
 * @author Christian Moloci
 */
image.addEventListener("mousemove", (event) => {
    const rect = image.getBoundingClientRect();
    let x = event.clientX - rect.left; // x position within the element
    let y = event.clientY - rect.top;  // y position within the element

    // Store the width and height of the image
    const rectWidth = rect.width;
    const rectHeight = rect.height;

    // Offset x and y to center
    x-= rectWidth / 2;
    y-= rectHeight / 2;

    // Reduce value to make tilt less aggressive
    x/= 150
    y/= 150

    // Skew the image based on x and y
    image.style.transform = `skew(${x}deg, ${y}deg)`;
});


// --- Navigation for projects in index.html ---

// Vars for project navigation elements
const projectsNav = document.getElementById("projects-nav"); // Nav for selecting type
const projectsContainer = document.getElementById("projects-container"); // The actual content element

// Stores loaded project card templates
let projectCardTemplates = {};

try {
    // The location of the the file with our work card templates
    const workCardsFile = "/components/home.work_cards.html";

    // Load both templates from the file
    projectCardTemplates = {
        "code-cards": await loadTemplate("code-cards", workCardsFile),
        "music-cards": await loadTemplate("music-cards", workCardsFile),
    };

    // Display initial cards (code cards)
    projectsContainer.innerHTML = projectCardTemplates["code-cards"].innerHTML;

} catch (error) {
    console.error("Error loading code cards template:", error);
    projectsContainer.innerHTML = "<p>Error loading projects. Please try again later.</p>";
}

// Event listener for navigating between code and music projects on home page
/**
 * @description Handles click events in projact nav to switch between what projects are displayed
 * @author Christian Moloci
 */
projectsNav.addEventListener("click", async (event) => {
    if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

    const targetId = event.target.id; // Get the ID of the clicked element (code or music)

    /**
     * @function
     * @description Removes the class called selected from all elements in project nav
     */
    function clearSelectionClass() {
        Array.from(projectsNav.children).forEach(element => {
            element.classList.remove("selected");
        });
    }

    try {        
        switch (targetId) {
            case "projects:code":
                // If "Code" is clicked, load code cards
                projectsContainer.innerHTML = (await projectCardTemplates["code-cards"]).innerHTML;
                break;
            case "projects:music":
                // If "Music" is clicked, load music cards
                projectsContainer.innerHTML = (await projectCardTemplates["music-cards"]).innerHTML;
                break;
            default:
                // If an unknown element is clicked inside the nav, log an error
                console.error("Unknown element interacted with:", event.target);
                projectsContainer.innerHTML = "<p>Error loading projects. Please try again later.</p>";
                break;
        }
    
        // Reset style for selected nav element
        clearSelectionClass();
        event.target.classList.add("selected"); // Add selected class to selected nav element
    } catch (error) {
        // Show an error in DOM if template could not be loaded or another error occurrs
        console.error("Error loading project template:", error);
        projectsContainer.innerHTML = "<p>Error loading projects. Please try again later.</p>";
    }

});


// --- Languages section Navigation ---

// Vars for language navigation elements
const languagesNav = document.getElementById("language-nav");
const languagesContainer = document.getElementById("language-container");
const languageTitle = document.getElementById("language-title");

let languageTemplates = {};

try {
    // File path to language card section templates
    const languageCardsFile = "/components/home.language_cards.html";

    // Load all language card section templates
    languageTemplates = {
        "web": loadTemplate("languages-web", languageCardsFile),
        "oop": loadTemplate("languages-oop", languageCardsFile),
        "ux": loadTemplate("languages-ux", languageCardsFile),
        "software": loadTemplate("languages-software", languageCardsFile),
    };

    /**
     * @description Handles click events on language cards to expand or collapse them
     * @author Christian Moloci
     */
    languagesContainer.addEventListener('click', (event) => {
        event.stopPropagation();
        const card = event.target.closest('.language-card'); // adjust selector to your card element

        // Handle expanging/collapsing card using css classes
        if (card.classList.contains('expanded-language-card')) {
            card.classList.remove('expanded-language-card');
            return;
        } else {
            card.classList.add('expanded-language-card');
            console.log(card);
        }
    });

    // The first language section with language cards initially displayed
    languagesContainer.innerHTML = (await languageTemplates["web"]).innerHTML;
} catch(error) {
    // Handle errors during template loading and display them in the DOM
    console.error("Error loading language templates:", error);
    languagesContainer.innerHTML = "<p>Error loading languages. Please try again later.</p>";
}

/**
 * @description Handles click events on language nav to switch between language sections
 * @author Christian Moloci
 */
languagesNav.addEventListener("click", async (event) => {
    if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

    const targetId = event.target.id; // Get the ID of the clicked element)

    // Clears the "selected" class from all elements in the nav
    function clearSelectionClass() {
        Array.from(languagesNav.children).forEach(element => {
            element.classList.remove("selected");
        });
    }

    try {
        // Switch between section based on the ID of the clicked nav element
        switch (targetId) {
            case "languages:web":
                // If "Web Development" is clicked, load web development languages
                languagesContainer.innerHTML = (await languageTemplates["web"]).innerHTML;
                languageTitle.textContent = "Web Development:";
                break;
            case "languages:oop":
                // If "Object-Oriented Programming" is clicked, load object-oriented programming languages
                languagesContainer.innerHTML = (await languageTemplates["oop"]).innerHTML;
                languageTitle.textContent = "Object-Oriented Programming:";
                break;
            case "languages:ux":
                // If "Software/Tools" is clicked, load software/tools languages
                languagesContainer.innerHTML = (await languageTemplates["ux"]).innerHTML;
                languageTitle.textContent = "Software/Tools:";
                break;
            case "languages:software":
                // If "Operating Systems" is clicked, load operating systems languages
                languagesContainer.innerHTML = (await languageTemplates["software"]).innerHTML;
                languageTitle.textContent = "Operating Systems:";
                break;
            default:
                // If an unknown element is clicked inside the nav, log an error
                console.error("Unknown element interacted with:", event.target);
                languagesContainer.innerHTML = "<p>Error loading languages. Please try again later.</p>";
                break;
        }
        // Reset style for selected nav element
        clearSelectionClass();
        event.target.classList.add("selected"); // Add the "selected" class to the selected nav element
    } catch (error) {
        // Handle errors during template loading and display them in the DOM
        console.error("Error loading language template:", error);
        languagesContainer.innerHTML = "<p>Error loading languages. Please try again later.</p>";
    }
});