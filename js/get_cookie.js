export function getCookieAsArray(name) {
    const cookies = document.cookie.split('; ');
    let cookie;

    cookies.forEach(c => {
        if (c.split('=')[0] === name) {
            cookie = c.split('=');
            return;
        }
    });
    return cookie;
}