// ============================================
// PERSON C — YOUR RESPONSIBILITY IS THIS FILE
// ============================================
// Your job: receive bookmark data → display it as HTML
// You do NOT touch storage.js directly
// You do NOT handle form or dropdown logic
//
// Each bookmark object you receive looks like this:
// {
//   id:          "1708342800000"
//   url:         "https://example.com"
//   title:       "Example Site"
//   description: "A cool site"
//   createdAt:   "2026-02-19T10:00:00Z"
//   likes:       0
// }
// ============================================

import { likeBookmark, getBookmarks, deleteBookmark } from "./bookmarks.js";

const bookmarkList = document.getElementById("bookmark-list");

// TASK C-1: formatDate(isoString)
function formatDate(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// TASK C-2: renderBookmarks(bookmarks)
export function renderBookmarks(bookmarks) {
  bookmarkList.innerHTML = "";

  if (bookmarks.length === 0) {
    const noBookmarkMsg = document.createElement("p");
    noBookmarkMsg.textContent =
      "💗 No bookmarks yet. Start saving your favorite links!";
    noBookmarkMsg.classList.add("no-bookmarks");
    bookmarkList.appendChild(noBookmarkMsg);
    return;
  }

  bookmarks.forEach((bookmark) => {
    const card = createBookmarkCard(bookmark);
    bookmarkList.appendChild(card);
  });
}

// TASK C-3: createBookmarkCard(bookmark)
function createBookmarkCard(bookmark) {
  const article = document.createElement("article");
  const userId = document.getElementById("user-select").value;
  article.innerHTML = `
    <h2><a href= "${bookmark.url}" target="_blank" rel="noopener">${bookmark.title}</a></h2>
    <p class="shared-by">Shared by User ${userId}</p>
    <p>${bookmark.description}</p>
    <time datetime="${bookmark.createdAt}">${formatDate(bookmark.createdAt)}</time>
    <div class="actions">
      <button class="like-btn">Like 💗<span class="like-count">${bookmark.likes}</span></button>
      <button class="copy-btn">Copy URL 🔗</button>
      <button class="delete-btn">Delete 🗑️</button>
    </div>
    `;

  const copyBtn = article.querySelector(".copy-btn");
  const likeBtn = article.querySelector(".like-btn");
  const likeCount = article.querySelector(".like-count");
  const deleteBtn = article.querySelector(".delete-btn");

  // TASK C-4: copy URL button behaviour
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(bookmark.url).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy URL 🔗"), 2000);
    });
  });

  // TASK C-5: like button behaviour
  likeBtn.addEventListener("click", async () => {
    const userId = document.getElementById("user-select").value;
    await likeBookmark(userId, bookmark.id);
    const updated = await getBookmarks(userId);
    renderBookmarks(updated);
  });

  // TASK C-6: delete button behaviour
  deleteBtn.addEventListener("click", async () => {
    const confirmed = confirm(
      `Delete "${bookmark.title}"? This cannot be undone.`,
    );
    if (confirmed) {
      deleteBookmark(userId, bookmark.id);
      article.remove();
    }
  });

  return article;
}
