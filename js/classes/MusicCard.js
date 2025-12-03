/* 
    Author: Christian Moloci
    Music Work Card rendered in work.html
*/

export class MusicCard {
    #url = "";
    #title;
    #artist;
    #releaseYear;

    constructor(url, title, artist, releaseYear) {
        this.#url = url;
        this.#title = title;
        this.#artist = artist;
        this.#releaseYear = releaseYear;
    }

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