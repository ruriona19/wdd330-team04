// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * Returns true if the local storage object that contains the
 * data related to the Key passes as a parameter is empty
 * @param {String} localStorageKey The name of the localStorage key.
 * @return {Boolean} A boolean flag to determine wheter the local storage object is empty or not.
 */
export function isLocalStorageObjectEmpty(localStorageKey) {
  return (getLocalStorage(localStorageKey) === null) ? true : false;
}
