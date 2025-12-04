/** 
 * @author Christian Moloci
 * @description Music card used for music projects, stores data and generates HTML
 */

export class MusicCard {
    // Properties
    #url = "";
    #title;
    #artist;
    #releaseYear;

    // Constructor
    constructor(url, title, artist, releaseYear) {
        this.#url = url;
        this.#title = title;
        this.#artist = artist;
        this.#releaseYear = releaseYear;
    }


    // Getters

    get url() {
        return this.#url;
    }

    get title() {
        return this.#title;
    }

    get artist() {
        return this.#artist;
    }

    get releaseYear() {
        return this.#releaseYear;
    }

    // Generates HTML for an embedded spotify iframe
    generateHTML() {
        return `
        <div class="music-card">
            <iframe 
                data-testid="embed-iframe" 
                style="border-radius:12px" 
                src="${this.#url}" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowfullscreen="" 
                allow="autoplay; 
                clipboard-write; 
                encrypted-media; 
                fullscreen; 
                picture-in-picture" 
                loading="lazy">
                
            </iframe>
        </div>
        `
    }
}