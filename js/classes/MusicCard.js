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

    /**
     * @constructor
     * @param {*} url 
     * @param {*} title 
     * @param {*} artist 
     * @param {*} releaseYear 
     */
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

    /**
     * @description Generates HTML for an embedded spotify iframe
     * @returns Custom HTML based on stored data
     */
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