import { WorkCard } from "./classes/WorkCard.js";
import { MusicCard } from "./classes/MusicCard.js";

// DOM Elements
const workTypeNav = document.getElementById("work-type-nav");
const workFilters = document.getElementById("work-filters"); // Filter tags container
const search = document.getElementById("search");
const searchBar = document.getElementById("search-bar"); // Search bar in search

const projectIndicator = document.getElementById("project-indicator"); // Shows what type of work is being displayed (coding or music)

/**
 * Work Card Data and DOM Manipulation
 */

// HTML Grid that stores the coding work cards
const codingWorkContent = document.getElementById("coding-work-content");

// Work Filter Tags Data
const workFilterWords = [
    "HTML", "CSS", "JavaScript",, "Web", "Java", "JavaFX", "Utility", "Library", "Game"
];
workFilterWords.forEach(tag => {
    // Create an li element for each tag and add it to the workFilters ul
    const li = document.createElement("li");
    li.textContent = tag;
    workFilters.appendChild(li);
});
let selectedWorkTags = []; // Will hold any tags selected by the user
let filterCloseButton = document.createElement("div"); // Gets added to any tag the user wants to selects
filterCloseButton.textContent = "X";
filterCloseButton.classList.add("filter-close-button");

// Work Card Data
let workCards = [
    new WorkCard("Portfolio", "Dive into the world of Christian Moloci with this beautiful portfolio showcasing projects, skills, and his personal life. Find both coding and music projects.", "/projects/portfolio.html", "portfolio-0.png", "Portfolio Screenshot", ["HTML", "CSS", "JavaScript", "Web"]),
    new WorkCard("QR Code Generator", "<strong>(Unreleased)</strong> One of the most customizable QR code generator library and app. Generate version 1-40 QR codes in any error correction level, masking pattern, and encoding mode. Plus, customize every aspect of the QR code from the shape of each module down to the individual color.", "/projects/qr_code_generator.html", "qr_code_generator-0.png", "QR Code Generator Screenshot", ["HTML", "CSS", "JavaScript", "Web", "Library", "Utility"]),
    new WorkCard("Late Night Cruise", "A music-oriented driving game written in JavaFX. Objective: drive around collecting gas to keep your tank above empty and collect coins to buy music that can be added to playlists to listen to in-game.", "/projects/late_night_cruise.html", "late_night_cruise-0.png", "Late Night Cruise Screenshot", ["Java", "JavaFX", "Game"]),
    new WorkCard("Chronos", "A JavaFX-based calendar app. Connect to any MySQL relational database and start storing reminders and events.", "/projects/chronos.html", "chronos-0.png", "Chronos Screenshot", ["Java", "JavaFX", "Utility"]),
];

/**
 * Music Card Data and DOM Manipulation
 */
const musicWorkContent = document.getElementById("music-work-content"); // HTML Grid that stores the music work cards

// Work Card Data
const musicWorkCards = [
    new MusicCard("https://open.spotify.com/embed/track/6q5kuV3bxd7wzynGhVDknY?utm_source=generator", "Nocturnal Rhythm", "Christian Moloci", "2024"),
    new MusicCard("https://open.spotify.com/embed/track/52FTd07gvsWSlMcsUbzR3C?utm_source=generator", "Sunrise Over Detroit", "Christian Moloci", "2024"),
    new MusicCard("https://open.spotify.com/embed/track/2lJn6xQA0fbBEA5M6Oi8rd?utm_source=generator", "Sonorous Chamber", "Christian Moloci", "2024"),
];

/**
 * Shared Functions and Event Listeners
 */

codingWorkContent.innerHTML = generateWorkCards(); // Init

// Switch between coding and music work
workTypeNav.addEventListener("click", (event) => {
    if (!event.target.id == "coding-nav-item" && !event.target.id == "music-nav-item") return; // Ignore clicks outside nav items

    searchBar.value = ""; // Clear search bar on switch

    // Remove select class from all nav items
    workTypeNav.querySelectorAll("div").forEach(element => {
        element.classList.remove("selected");
    });

    if (event.target.id == "coding-nav-item") {
        // Populate dom with coding project cards
        event.target.classList.add("selected"); // Update the selected nav item
        projectIndicator.textContent = "Coding Projects:"; // Update title

        // Generate coding work cards
        codingWorkContent.innerHTML = generateWorkCards(searchBar.value, selectedWorkTags);

        // Hide/show respective grids
        musicWorkContent.style.display = "none";
        codingWorkContent.style.display = "grid";
        workFilters.parentElement.style.display = "flex";
    } else if (event.target.id == "music-nav-item") {
        // Populate dom with music project cards
        event.target.classList.add("selected"); // Update the selected nav item
        projectIndicator.textContent = "Music Projects:";// Update title

        // Generate coding work cards
        musicWorkContent.innerHTML = generateMusicCards(searchBar.value);

        // Hide/show respective grids
        musicWorkContent.style.display = "grid";
        codingWorkContent.style.display = "none";
        workFilters.parentElement.style.display = "none";
    }
});

// Filters event listener
workFilters.addEventListener("click", (event) => {
    if (event.target.tagName != 'LI') return; // Ignore clicks outside list items
    console.log(event.target);

    if (selectedWorkTags.includes(event.target.textContent)) {
        // Unselect a tag
        selectedWorkTags = selectedWorkTags.filter(tag => tag !== event.target.textContent);
        event.target.classList.remove("selected");
    } else {
        // Select a tag
        selectedWorkTags.push(event.target.textContent);
        event.target.classList.add("selected");
    }
    console.log("Selected tags: ", selectedWorkTags);

    // Regenerate work cards based on selected tags
    codingWorkContent.innerHTML = generateWorkCards(searchBar.value, selectedWorkTags)
});

// Seach bar event listener
search.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    // Check which content to search and display (coding or music) based on which grid is visible
    if (codingWorkContent.style.display != "none") {
        // Search coding
        codingWorkContent.innerHTML = generateWorkCards(searchBar.value, selectedWorkTags);
    } else if (musicWorkContent.style.display != "none") {
        // Search music
        musicWorkContent.innerHTML = generateMusicCards(searchBar.value);
    }
});

// Generate work cards HTML based on search filter and tags
function generateWorkCards(searchFilter = "", tags = []) {
    let filteredWorkCards; // Will hold the filtered array of work cards
    console.log(tags);
    if (searchFilter == "" && tags.length == 0) {
        // If both are empty, show all work cards
        filteredWorkCards = workCards;
    } else {
        if (tags.length > 0) {
            // Filter by tags if any
            filteredWorkCards = workCards.filter(card => {
                let foundTags = []
                card.tags.forEach(tag => {
                    if (tags.includes(tag)) foundTags.push(tag);
                });
                return foundTags.length === tags.length; // Returns a boolean
            });
        } else {
            // If no tags are selected, add all work cards
            filteredWorkCards = workCards;
        }

        if (searchFilter != "") {
            // If searchFilter is not empty, filter by search term on top of the filtered tags
            filteredWorkCards = filteredWorkCards.filter(card => {
                // If a match if found either in the title or the descpription, add the item to the array
                if (card.title.toUpperCase().includes(searchFilter.toUpperCase()) || card.description.toUpperCase().includes(searchFilter.toUpperCase())) {
                    return true;
                }
            });
        }
        console.log(filteredWorkCards);
    }

    // Return an array of DOM elements by calling the generateHTML method on and joining them as a string (prevents commas)
    return filteredWorkCards.map(card => card.generateHTML()).join("");
}

// Generate music cards HTML based on search filter
function generateMusicCards(searchFilter = "") {
    let filteredMusicCards; // Will hold the filtered array of music cards
    if (searchFilter == "") {
        // If search filter is empty, show all music cards
        filteredMusicCards = musicWorkCards;
    } else {
        // Filter by search term
        filteredMusicCards = musicWorkCards.filter(card => {
            if (
                card.title.toUpperCase().includes(searchFilter.toUpperCase()) ||
                card.artist.toUpperCase().includes(searchFilter.toUpperCase()) ||
                card.releaseYear.toUpperCase().includes(searchFilter.toUpperCase())
            ) {
                // If a match if found either in the title, artist, or release year, add the item to the array
                return true;
            }
        });
    }

    // Return an array of DOM elements by calling the generateHTML method on and joining them as a string (prevents commas)
    return filteredMusicCards.map(musicCard => musicCard.generateHTML()).join("");
}