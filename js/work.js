import { WorkCard } from "./classes/WorkCard.js";

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

codingWorkContent.innerHTML = generateWorkCards(); // Init

// Switch between coding and music work
workTypeNav.addEventListener("click", (event) => {
    if (!event.target.id == "coding-nav-item" && !event.target.id == "music-nav-item") return; // Ignore clicks outside nav items

    console.log(event.target)

    if (event.target.id == "coding-nav-item") {
        // Populate dom with coding project cards
        codingWorkContent.innerHTML = generateWorkCards(searchBar.value, selectedWorkTags)
    } else if (event.target.id == "music-nav-item") {
        // Populate dom with music project cards
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

    codingWorkContent.innerHTML = generateWorkCards(searchBar.value, selectedWorkTags);
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

/**
 * Music Card Data and DOM Manipulation
 */