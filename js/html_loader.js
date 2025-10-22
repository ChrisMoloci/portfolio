export async function loadTemplate(templateId, file) {
    try {
        const response = await fetch(file);
        const html = await response.text();
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const documentFragment = temp.querySelector(`#${templateId}`).content.children;

        // console.log(documentFragment);

        const template = document.createElement('div');

        for (let fragment of documentFragment) {
            template.appendChild(fragment.cloneNode(true));
        }

        // console.log(template);

        return template;
    } catch (error) {
        console.error("Error loading template:", error);
        return null;
    }
}

export function test() {
    console.log("HTML Loader Test Function");
}