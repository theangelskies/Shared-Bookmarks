import { getUsers, addBookmark, getBookmarks } from "./bookmarks.js";
import { renderBookmarks } from "./render.js";

// --- DOM elements ---
const userSelect = document.getElementById("user-select");
const formContainer = document.getElementById("form-container");
const bookmarkForm = document.getElementById("bookmark-form");
const toggleBtn = document.getElementById("toggle-btn");

// --- Populate the user dropdown ---
function populateDropdown() {
  const users = getUsers();

  // Clear previous options except the default
  userSelect.innerHTML =
    '<option value="" disabled selected>Pick A User</option>';

  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}

// --- Handle user selection ---
function handleUserSelection() {
  userSelect.addEventListener("change", async () => {
    const userId = userSelect.value;

    if (userId) {
      formContainer.classList.remove("hidden");
      toggleBtn.textContent = "👆 Hide Bookmark Form";
    } else {
      formContainer.classList.add("hidden");
      toggleBtn.textContent = "👇 Create New Bookmark";
    }
    // Load and render bookmarks
    const bookmarks = userId ? await getBookmarks(userId) : [];
    renderBookmarks(bookmarks, userId);
  });
}

// --- Handle form submit ---
function handleFormSubmit() {
  bookmarkForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = userSelect.value;
    if (!userId) return alert("Please select a user first.");

    const title = document.getElementById("title").value;
    const url = document.getElementById("url").value;
    const description = document.getElementById("description").value;

    // Add bookmark
    addBookmark(userId, url, title, description);

    // Reset form
    bookmarkForm.reset();

    // Render updated bookmarks
    const bookmarks = await getBookmarks(userId);
    renderBookmarks(bookmarks, userId);
  });
}

// --- Toggle form visibility ---
function handleToggleBtn() {
  // Sync button text on load
  toggleBtn.textContent = formContainer.classList.contains("hidden")
    ? "👇 Create New Bookmark"
    : "👆 Hide Bookmark Form";

  toggleBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");

    if (formContainer.classList.contains("hidden")) {
      toggleBtn.textContent = "👇 Create New Bookmark";
    } else {
      toggleBtn.textContent = "👆 Hide Bookmark Form";
    }
  });
}

// --- Page load ---
window.addEventListener("DOMContentLoaded", () => {
  populateDropdown();
  handleUserSelection();
  handleFormSubmit();
  handleToggleBtn();
});
