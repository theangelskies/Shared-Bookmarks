// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData } from "./storage.js";
import { addBookmark, getBookmarks } from "./bookmarks.js";
import { renderBookmarks } from "./render.js";

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
  const bookmarkList = document.getElementById("bookmark-list");

  dropdownSelect.addEventListener("change", (event) => {
    const userId = event.target.value;

    if (userId) {
      form.style.display = "block";
      const bookmarks = getBookmarks(userId);

      if (!bookmarks || bookmarks.length === 0) {
        renderBookmarks([]);
      } else {
        renderBookmarks(bookmarks);
      }
    } else {
      form.style.display = "none";
      renderBookmarks([]);
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
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

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
    const bookmark = addBookmark(userId, url, title, description);

    // Reset form fields
    form.reset();

    // Reload updated bookmarks
    const updatedBookmarks = getBookmarks(userId);

    renderBookmarks(updatedBookmarks);
  });

  // toggleBtn
  const toggleBtn = document.getElementById("toggle-btn");
  const formContainer = document.getElementById("form-container");
  toggleBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");

    if (formContainer.classList.contains("hidden")) {
      toggleBtn.textContent = "👇 Create New Bookmark";
    } else {
      toggleBtn.textContent = "👆 Hide Bookmark Form";
    }
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
