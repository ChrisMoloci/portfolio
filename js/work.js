import { WorkCard } from "./classes/WorkCard.js";
import { MusicCard } from "./classes/MusicCard.js";

// DOM Elements
const workTypeNav = document.getElementById("work-type-nav");
const workFilters = document.getElementById("work-filters"); // Filter tags container
const search = document.getElementById("search");
const searchBar = document.getElementById("search-bar"); // Search bar in search

/**
 * Work Card Data and DOM Manipulation
 */

const codingWorkContent = document.getElementById("coding-work-content");

// Work Card Data
let workCards = [
    new WorkCard("Test", "This is a test description", "/html/projects/projectTemplate/template.html", "placeholder2.png", "Test Image", ["JavaScript", "HTML", "Web", "CSS"]),
    new WorkCard("Another test", "This is another test description", "/html/projects/projectTemplate/template.html", "placeholder2.png", "Test Image", ["JavaScript", "HTML", "Java"]),
    new WorkCard("Another test", "This is another test description", "/html/projects/projectTemplate/template.html", "placeholder2.png", "Test Image", ["JavaScript", "HTML", "Java"]),
    new WorkCard("Another test", "This is another test description", "/html/projects/projectTemplate/template.html", "placeholder2.png", "Test Image", ["JavaScript", "HTML", "Java"]),
    new WorkCard("Another test", "This is another test description", "/html/projects/projectTemplate/template.html", "placeholder2.png", "Test Image", ["JavaScript", "HTML", "Java"]),
];

// Work Filter Tags Data
const workFilterWords = [
    "Web", "HTML", "CSS", "JavaScript", "Java", "Utility", "Library"
];
workFilterWords.forEach(tag => {
    const li = document.createElement("li");
    li.textContent = tag;
    workFilters.appendChild(li);
});
let selectedWorkTags = [];
let filterCloseButton = document.createElement("div");
filterCloseButton.textContent = "X";
filterCloseButton.classList.add("filter-close-button");

/**
 * Music Card Data and DOM Manipulation
 */
const musicWorkContent = document.getElementById("music-work-content");

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

    console.log(event.target)

    workTypeNav.querySelectorAll("div").forEach(element => {
        element.classList.remove("selected");
    });

    if (event.target.id == "coding-nav-item") {
        // Populate dom with coding project cards
        event.target.classList.add("selected");
        codingWorkContent.innerHTML = generateWorkCards(searchBar.value, selectedWorkTags)

        musicWorkContent.style.display = "none";
        codingWorkContent.style.display = "grid";
        workFilters.parentElement.style.display = "flex";
    } else if (event.target.id == "music-nav-item") {
        // Populate dom with music project cards
        event.target.classList.add("selected");
        musicWorkContent.innerHTML = generateMusicCards(searchBar.value);
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
        selectedWorkTags = selectedWorkTags.filter(tag => tag !== event.target.textContent);
        event.target.classList.remove("selected");
    } else {
        selectedWorkTags.push(event.target.textContent);
        event.target.classList.add("selected");
    }
    console.log("Selected tags: ", selectedWorkTags);

    codingWorkContent.innerHTML = generateWorkCards(searchBar.value, selectedWorkTags)
});

// Seach bar event listener
search.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    // Check which content to search and display (coding or music) based on which grid is visible
    if (codingWorkContent.style.display != "none") {
        codingWorkContent.innerHTML = generateWorkCards(searchBar.value, selectedWorkTags);
    } else if (musicWorkContent.style.display != "none") {
        musicWorkContent.innerHTML = generateMusicCards(searchBar.value);
    }
});

// Generate work cards HTML based on search filter and tags
function generateWorkCards(searchFilter = "", tags = []) {
    let filteredWorkCards;
    console.log(tags);
    if (searchFilter == "" && tags.length == 0) {
        filteredWorkCards = workCards;
    } else {
        // Filter by tags
        if (tags.length > 0) {
            filteredWorkCards = workCards.filter(card => {
                // let tagFound = false;
                let foundTags = []
                card.tags.forEach(tag => {
                    if (tags.includes(tag)) foundTags.push(tag);
                });
                return foundTags.length === tags.length; // Returns a boolean
            });
        } else {
            filteredWorkCards = workCards;
        }

        if (searchFilter != "") {
            filteredWorkCards = filteredWorkCards.filter(card => {
                if (card.title.toUpperCase().includes(searchFilter.toUpperCase()) || card.description.toUpperCase().includes(searchFilter.toUpperCase())) {
                    return true;
                }
            });
        }
        console.log(filteredWorkCards);
    }

    return filteredWorkCards.map(card => card.generateHTML()).join("");
}

function generateMusicCards(searchFilter = "") {
    let filteredMusicCards;
    if (searchFilter == "") {
        filteredMusicCards = musicWorkCards;
    } else {
        filteredMusicCards = musicWorkCards.filter(card => {
            if (
                card.title.toUpperCase().includes(searchFilter.toUpperCase()) ||
                card.artist.toUpperCase().includes(searchFilter.toUpperCase()) ||
                card.releaseYear.toUpperCase().includes(searchFilter.toUpperCase())
            ) {
                return true;
            }
        });
    }
    return filteredMusicCards.map(musicCard => musicCard.generateHTML()).join("");
}