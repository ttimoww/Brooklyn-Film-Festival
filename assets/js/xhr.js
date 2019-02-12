/**
* Returns data from api/rest provided to the function.
* The function handles (network) errors
* To use this file in other js files use: import { get } from './xhr.js' & load file as type="module"
* @param {string} url The url of the api/rest you want to get data from.
*/
export function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Create the XHR request
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // .onload Will always be called, even with 404 so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        reject(Error(req.statusText));
      }
    };

    // Catch any network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the actual request
    req.send();
  });
}
