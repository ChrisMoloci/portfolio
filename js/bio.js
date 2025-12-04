/**
 * @author: Christian Moloci
 * @description js file for general bio.html taksks
 * */ 

// --- Bible verse switcher ---

// Buttons
const prevVerseButton = document.getElementById('prev-verse'); // Goes to previous verse
const nextVerseButton = document.getElementById('next-verse'); // Goes to next verse

// Verse DOM elements
const refElement = document.getElementById('verse-ref');
const textElement = document.getElementById('verse-content');

let currentVerseIndex = 0; // Stores the index of the currently selected verse
const verses = {
    "Collosians 3:17 (ESV)": "<strong>17</strong> And whatever you do, in word or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him.",
    "Psalm 119:9-11 (ESV)": "<strong>9</strong> How can a young man keep his way pure? By guarding it according to your word. <strong>10</strong> With my whole heart I seek you; let me not wander from your commandments!",
    "John 15:5 (ESV)": "<strong>5</strong> I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.",
    "Galatians 5:16-17 (ESV)": "<strong>16</strong> But I say, walk by the Spirit, and you will not gratify the desires of the flesh. <strong>17</strong> For the desires of the flesh are against the Spirit, and the desires of the Spirit are against the flesh, for these are opposed to each other, to keep you from doing the things you want to do.",
    "Philippians 4:13 (ESV)": "<strong>13</strong> Brothers, I do not consider that I have made it my own. But one thing I do: forgetting what lies behind and straining forward to what lies ahead, ",
    "Acts 4:13 (ESV)": "<strong>13</strong> Now when they saw the boldness of Peter and John, and perceived that they were uneducated, common men, they were astonished. And they recognized that they had been with Jesus. ",
    "Philippians 4:4-7 (ESV)": "<strong>4</strong> Rejoice in the Lord always; again I will say, rejoice. <strong>5</strong> Let your reasonableness be known to everyone. The Lord is at hand; <strong>6</strong> do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. <strong>7</strong> And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
    "John 1:1-3 (ESV)": "<strong>1</strong> In the beginning was the Word, and the Word was with God, and the Word was God. <strong>2</strong> He was in the beginning with God. <strong>3</strong> All things were made through him, and without him was not any thing made that was made.",
    "Collosians 3:15-16 (ESV)": "<strong>15</strong> And let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful. <strong>16</strong> Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in your hearts to God.",
}; // Verse data

// Add event listeners to both buttons to call the same method with with different arguments
prevVerseButton.addEventListener('click', () => updateVerse(currentVerseIndex - 1));
nextVerseButton.addEventListener('click', () => updateVerse(currentVerseIndex + 1));

/**
 * Takes in a verse index and updates the displayed verse data in refElement and textElement
 * @param {*} verseIndex 
 * @returns 
 * @author Christian Moloci
 */
function updateVerse(verseIndex) {
    if (verseIndex < 0) return // Cannot go to a lower index
    if (verseIndex >= Object.keys(verses).length) return; // Cannot go to a higher index

    const ref = Object.keys(verses)[verseIndex]; // Gets the key at an index so we can get the data
    refElement.innerText = ref; // Update the ref to be the key (passage ref)
    textElement.innerHTML = verses[ref]; // Use the key to get the verse text and display it
    currentVerseIndex = verseIndex; // Update the current index
}

updateVerse(0); // Display the first verse initially

// --- Images Slideshow ---
const imageElement = document.getElementById('image-slideshow'); // The element that will contain the images

let currentImageIndex = 0; // Stores the index of the currently displayed image

let imageElements = [
    document.createElement('img').src = "/assets/images/slideshow/1.png",
    document.createElement('img').src = "/assets/images/slideshow/2.png",
    document.createElement('img').src = "/assets/images/slideshow/3.png",
    document.createElement('img').src = "/assets/images/slideshow/4.png",
    document.createElement('img').src = "/assets/images/slideshow/5.png",
    document.createElement('img').src = "/assets/images/slideshow/6.png",
    document.createElement('img').src = "/assets/images/slideshow/7.png",
]; // Image elements

imageElement.src = imageElements[0]; // Set an initailly displayed image

/**
 * @description Switches the displayed image every 5 seconds with a custom fade-in animation
 * @author Christian Moloci
 */
setInterval(() => {
    // If image is not the last one, display raise imageIndex
    if (currentImageIndex < imageElements.length - 1) currentImageIndex++;
    else currentImageIndex = 0; // If image index is the last, go back to beginning

    // Set the animation to our custom keyframe animation
    imageElement.style.animation = 'image-fade-in 0.5s ease-in-out';

    // Set the image using the current index
    imageElement.src = imageElements[currentImageIndex];

    setTimeout(() => {
        // Remvoe the animation so we can add it back next time to display the animation each time
        imageElement.style.animation = '';
    }, 600);
}, 5000);

// --- Social image switching (Same logic applied in index.js) ---
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