/** 
    * @author Christian Moloci
    * @description Helper function to get a specific cookie based on its name
 */

/**
 * @description Returns a cookie based on its key
 * @param {*} name 
 * @returns array of 2 values, [0] key, [1] value
 */
export function getCookieAsArray(name) {
    // Get all the cookies and split them into an array
    const cookies = document.cookie.split('; ');
    let cookie; // Will hold the cookie

    // Iterate through our cookies array
    cookies.forEach(c => {
        // Split the cookie one more time to get the key and value
        if (c.split('=')[0] === name) {
            // If the key matches name, this is our cookie
            cookie = c.split('='); // turn cookie into an array with a key and value
            return; // Stop iterating
        }
    });
    return cookie; // Return the cookie array or null
}