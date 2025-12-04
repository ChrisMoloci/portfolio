/**
 * @author: Christian Moloci
 * @description Helper function to parse HTML data from other HTML files
 */


/**
 * Loads HTML from a specified file and gets a tag with the given templateId
 * @param {*} templateId 
 * @param {*} file 
 * @returns HTML element from a file with a specific templateId
 */
export async function loadTemplate(templateId, file) {
    // Since we are working with files, we should use a try catch
    try {
        // https://developer.mozilla.org/en-US/docs/Web/API/Response/text

        const response = await fetch(file); // Fetch the file
        const html = await response.text(); // Get the text from the file
        const temp = document.createElement('div'); // Create a temporary div to hold the HTML
        temp.innerHTML = html; // Set the innerHTML of the temp div to the fetched HTML

        // Finds the specific element in temp based on the templateId
        // This needs to be done this way since querySelector.content returns a document fragment which is a fancy array of DOM objects
        const templateContentArray = temp.querySelector(`#${templateId}`).content.children;

        const template = document.createElement('div'); // Will store the actual template

        // Append each element form templateContentArray to template
        for (let el of templateContentArray) {
            template.appendChild(el.cloneNode(true));
        }

        return template; // Return the template
    } catch (error) {
        console.error("Error loading template:", error);
        return null;
    }
}