// Bible verse switcher

// Buttons
const prevVerseButton = document.getElementById('prev-verse');
const nextVerseButton = document.getElementById('next-verse');

console.log(prevVerseButton, nextVerseButton);

// Verse DOM elements
const refElement = document.getElementById('verse-ref');
const textElement = document.getElementById('verse-content');

let currentVerseIndex = 0;
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
};

prevVerseButton.addEventListener('click', () => updateVerse(currentVerseIndex - 1));
nextVerseButton.addEventListener('click', () => updateVerse(currentVerseIndex + 1));

function updateVerse(verseIndex) {
    if (verseIndex < 0) return // Cannot go to a lower index
    if (verseIndex >= Object.keys(verses).length) return; // Cannot go to a higher index

    const ref = Object.keys(verses)[verseIndex]; // Gets the key at an index so we can get the data
    refElement.innerText = ref; // Update the ref to be the keys value (passage ref)
    textElement.innerHTML = verses[ref]; // Use the key to get the verse text
    currentVerseIndex = verseIndex; // Update the current index
}

updateVerse(0); // Init verse

// Images Slideshow
const imageElement = document.getElementById('image-slideshow');

let currentImageIndex = 0;

let imageElements = [
    // document.createElement('img').src = "/assets/images/pfp.png",
    // document.createElement('img').src = "/assets/images/chris.png",
    document.createElement('img').src = "/assets/images/slideshow/1.png",
    document.createElement('img').src = "/assets/images/slideshow/2.png",
    document.createElement('img').src = "/assets/images/slideshow/3.png",
    document.createElement('img').src = "/assets/images/slideshow/4.png",
    document.createElement('img').src = "/assets/images/slideshow/5.png",
    document.createElement('img').src = "/assets/images/slideshow/6.png",
    document.createElement('img').src = "/assets/images/slideshow/7.png",
];

imageElement.src = imageElements[0]; // Init image

setInterval(() => {
    if (currentImageIndex < imageElements.length - 1) currentImageIndex++;
    else currentImageIndex = 0;

    imageElement.style.animation = 'image-fade-in 0.5s ease-in-out';
    imageElement.src = imageElements[currentImageIndex];

    setTimeout(() => {
        imageElement.style.animation = '';
    }, 600);
}, 5000);

// Social image switching
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