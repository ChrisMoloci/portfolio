const navBar = document.getElementById('project-nav');
const content = document.getElementById('content');

const content1 = document.getElementById('content-1');
const content2 = document.getElementById('content-2');

let currentNav;

content.innerHTML = content1.innerHTML; // Init

navBar.addEventListener('click', (event) => {
    if (event.target.tagName !== "DIV") return; // Only respond to div clicks
    if (event.target.id === currentNav) return; // Do nothing if the same nav is clicked

    currentNav = event.target.id; // Update current nav so we can ignore same click

    Array.from(navBar.children).forEach(child => {
        child.classList.remove('selected');
    })

    if (event.target.id === "nav-1") {
        content.innerHTML = content1.innerHTML;
        event.target.classList.add('selected');
    } else if (event.target.id === "nav-2") {
        content.innerHTML = content2.innerHTML;
        event.target.classList.add('selected');
    } else {
        console.error("Unknown nav item clicked");
    }
});