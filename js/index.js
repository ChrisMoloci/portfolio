import { loadTemplate } from "./html_loader.js";

const socials = document.getElementById("socials");
const lightSocials = document.getElementById("light-socials");
const darkSocials = document.getElementById("dark-socials");

updateSocials(); // Initial update

// Listen for attribut changes on the document element to update socials on theme change
new MutationObserver(() => {
    updateSocials();
}).observe(document.documentElement, { attributes: true });

// Updates socials images based on current theme (checks class on document)
function updateSocials() {
    if (document.documentElement.className == "dark") {
        socials.innerHTML = lightSocials.innerHTML;
    } else {
        socials.innerHTML = darkSocials.innerHTML;
    }
}

// Image tilting effect
const image = document.getElementById("profile-image");

image.addEventListener("mousemove", (event) => {
    const rect = image.getBoundingClientRect();
    let x = event.clientX - rect.left; // x position within the element
    let y = event.clientY - rect.top;  // y position within the element

    const rectWidth = rect.width;
    const rectHeight = rect.height;

    x-= rectWidth / 2;
    y-= rectHeight / 2;

    x/= 150
    y/= 150

    // const skewX = x / 100;

    image.style.transform = `skew(${x}deg, ${y}deg)`;

    console.log(`Mouse X: ${x}, Mouse Y: ${y}`);
});


// Projects Navigation on Home Page

// Vars for project navigation elements
const projectsNav = document.getElementById("projects-nav");
const projectsContainer = document.getElementById("projects-container");

// Store loaded project card templates
let projectCardTemplates = {};

try {
    const workCardsFile = "/components/home.work_cards.html";

    // Load both templates
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
projectsNav.addEventListener("click", async (event) => {
    if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

    const targetId = event.target.id; // Get the ID of the clicked element (code or music)

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
        event.target.classList.add("selected");
    } catch (error) {
        console.error("Error loading project template:", error);
        projectsContainer.innerHTML = "<p>Error loading projects. Please try again later.</p>";
    }

});

// Languages section Navigation

// Vars for language navigation elements
const languagesNav = document.getElementById("language-nav");
const languagesContainer = document.getElementById("language-container");
const languageTitle = document.getElementById("language-title");

let languageTemplates = {};

try {
    const languageCardsFile = "/components/home.language_cards.html";

    languageTemplates = {
        "web": loadTemplate("languages-web", languageCardsFile),
        "oop": loadTemplate("languages-oop", languageCardsFile),
        "ux": loadTemplate("languages-ux", languageCardsFile),
        "software": loadTemplate("languages-software", languageCardsFile),
    };

    // Expands cards when clicked on by setting their class to expanded and collapsing if already expanded
    languagesContainer.addEventListener('click', (event) => {
        event.stopPropagation();
        const card = event.target.closest('.language-card'); // adjust selector to your card element

        if (card.classList.contains('expanded-language-card')) {
            card.classList.remove('expanded-language-card');
            return;
        } else {
            card.classList.add('expanded-language-card');
            console.log(card);
        }
    });

    languagesContainer.innerHTML = (await languageTemplates["web"]).innerHTML;
} catch(error) {
    // Handle errors during template loading and display them in the DOM
    console.error("Error loading language templates:", error);
    languagesContainer.innerHTML = "<p>Error loading languages. Please try again later.</p>";
}


languagesNav.addEventListener("click", async (event) => {
    if (event.target.tagName == 'NAV') return; // Ignore clicks on the nav container itself

    const targetId = event.target.id; // Get the ID of the clicked element)

    function clearSelectionClass() {
        Array.from(languagesNav.children).forEach(element => {
            element.classList.remove("selected");
        });
    }

    try {
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
        event.target.classList.add("selected");
    } catch (error) {
        // Handle errors during template loading and display them in the DOM
        console.error("Error loading language template:", error);
        languagesContainer.innerHTML = "<p>Error loading languages. Please try again later.</p>";
    }
});