// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

window.onload = function () {
  const users = getUserIds();
  document.querySelector("body").innerText = `There are ${users.length} users`;
};

// ============================================
// PERSON B — YOUR RESPONSIBILITY IS THIS FILE
// ============================================
// Your job: listen for events → call the right functions
// You do NOT write data logic
// You do NOT write HTML rendering
// ============================================

import { getUsers, addBookmark, getBookmarks } from "./bookmarks.js";
import { renderBookmarks } from "./render.js";

// ============================================
// TASK B-1: populateDropdown()
// - call getUsers() to get the list of user ids
// - for each userId, create an <option> element
// - set the option value to the userId
// - set the option text to something readable e.g. "User 1"
// - append each option to the #user-select dropdown
// ============================================
function populateDropdown() {}

// ============================================
// TASK B-2: dropdown onChange event
// - read the selected userId from the dropdown
// - if a user is selected:
//     show the form
//     call getBookmarks(userId)
//     pass result to renderBookmarks()
// - if no user is selected:
//     hide the form
//     call renderBookmarks with empty array
// ============================================

// ============================================
// TASK B-3: form submit event
// - prevent the page from reloading
// - read userId from the dropdown
// - if no user selected, show an alert and stop
// - read url, title, description from the form inputs
// - call addBookmark() with all values
// - reset the form inputs after submit
// - call getBookmarks() again to get the fresh list
// - pass fresh list to renderBookmarks()
// ============================================

// ============================================
// TASK B-4: page load
// - call populateDropdown() when the page first loads
// ============================================
