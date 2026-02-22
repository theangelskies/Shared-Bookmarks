// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData } from "./storage.js";

// ============================================
// PERSON B — YOUR RESPONSIBILITY IS THIS FILE
// ============================================
// Your job: listen for events → call the right functions
// You do NOT write data logic
// You do NOT write HTML rendering
// ============================================

import { addBookmark, getBookmarks } from "./bookmarks.js";
//import { renderBookmarks } from "./render.js";

// ============================================
// TASK B-1: populateDropdown()
// - call getUsers() to get the list of user ids
// - for each userId, create an <option> element
// - set the option value to the userId
// - set the option text to something readable e.g. "User 1"
// - append each option to the #user-select dropdown
// ============================================
function populateDropdown() {
  const dropdownSelect = document.getElementById("user-select");
  dropdownSelect.innerHTML = '<option value="">Select a user</option>'; // default option

  const userIds = getUserIds();
  userIds.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    dropdownSelect.appendChild(option);
  });
}

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
function handleUserSelection() {
  const dropdownSelect = document.getElementById("user-select");
  const form = document.getElementById("bookmark-form");

  dropdownSelect.addEventListener("change", (event) => {
    const userId = event.target.value;
    if (userId) {
      form.style.display = "block";
      const bookmarks = getBookmarks(userId);

      if (!bookmarks || bookmarks.length === 0) {
        //renderBookmarks([]);
        console.log("No bookmarks for this user");
      } else {
        //renderBookmarks(bookmarks);
        console.log(`Bookmarks for User ${userId}:`, bookmarks);
      } else {
      form.style.display = "none";
      //renderBookmarks([]);
      console.log("No user selected");
    }
  });
}

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
function handleFormSubmit() {
  const form = document.getElementById("bookmark-form");
  const dropdown = document.getElementById("user-select");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // STOP page refresh

    const userId = dropdown.value;

    if (!userId) {
      alert("Please select a user first.");
      return;
    }

    const url = document.getElementById("url").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    // Add bookmark
    addBookmark(userId, url, title, description);

    // Reset form fields
    form.reset();

    // Reload updated bookmarks
    const updatedBookmarks = getBookmarks(userId);
    console.log(`Updated bookmarks for User ${userId}:`, updatedBookmarks);
    //renderBookmarks(updatedBookmarks);
  });
}

// ============================================
// TASK B-4: page load
// - call populateDropdown() when the page first loads
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  populateDropdown();
  handleUserSelection();
  handleFormSubmit();
});
