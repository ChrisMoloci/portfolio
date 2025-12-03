/* 
    Author: Christian Moloci
    Coding Work Card rendered in work.html
*/


export class WorkCard {
    #title;
    #description
    #pageLink;
    #imgSrc;
    #imgAlt;
    #tags;

    constructor(title, description, pageLink, imgSrc, imgAlt, tags) {
        this.#title = title;
        this.#description = description;
        this.#pageLink = pageLink;
        this.#pageLink = pageLink;
        this.#imgSrc = imgSrc;
        this.#imgAlt = imgAlt;
        this.#tags = tags;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get pageLink() {
        return this.#pageLink;
    }

    get imgSrc() {
        return this.#imgSrc;
    }

    get imgAlt() {
        return this.#imgAlt;
    }

    get description() {
        return this.#description;
    }

    get tags() {
        return this.#tags;
    }

    addTag(tag) {
        this.#tags.push(tag);
    }

    generateHTML() {
        return `
            <div class="work-card">
                <img src="/assets/images/Projects/${this.#imgSrc}" alt="${this.#imgAlt}" class="work-card-image">
                <div class="work-card-content">
                    <header class="work-card-header">
                        <h2>${this.#title}</h2>
                        <div class="link-button">
                            <a href="${this.#pageLink}">Explore</a>
                        </div>
                    </header>
                    <p>${this.#description}</p>
                </div>
            </div>
        `
    }
}