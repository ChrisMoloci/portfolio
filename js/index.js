import { loadTemplate, test } from "./html_loader.js";

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
        "web-development": loadTemplate("languages-web", languageCardsFile),
        "object-oriented-programming": loadTemplate("languages-object-oriented-programming", languageCardsFile),
        "software-tools": loadTemplate("languages-software-tools", languageCardsFile),
        "operating-systems": loadTemplate("languages-operating-systems", languageCardsFile),
    };

    languagesContainer.innerHTML = (await languageTemplates["web-development"]).innerHTML;
} catch(error) {
    // Handle errors during template loading and display them in the DOM
    console.error("Error loading language templates:", error);
    languagesContainer.innerHTML = "<p>Error loading languages. Please try again later.</p>";
}


languagesNav.addEventListener("click", async (event) => {
    const targetId = event.target.id; // Get the ID of the clicked element

    function clearSelectionClass() {
        Array.from(languagesNav.children).forEach(element => {
            element.classList.remove("selected");
        });
    }

    try {
        switch (targetId) {
            case "languages:web-development":
                // If "Web Development" is clicked, load web development languages
                languagesContainer.innerHTML = (await languageTemplates["web-development"]).innerHTML;
                languageTitle.textContent = "Web Development:";
                break;
            case "languages:object-oriented-programming":
                // If "Object-Oriented Programming" is clicked, load object-oriented programming languages
                languagesContainer.innerHTML = (await languageTemplates["object-oriented-programming"]).innerHTML;
                languageTitle.textContent = "Object-Oriented Programming:";
                break;
            case "languages:software-tools":
                // If "Software/Tools" is clicked, load software/tools languages
                languagesContainer.innerHTML = (await languageTemplates["software-tools"]).innerHTML;
                languageTitle.textContent = "Software/Tools:";
                break;
            case "languages:operating-systems":
                // If "Operating Systems" is clicked, load operating systems languages
                languagesContainer.innerHTML = (await languageTemplates["operating-systems"]).innerHTML;
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