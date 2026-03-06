import { likeBookmark, getBookmarks, deleteBookmark } from "./bookmarks.js";

const bookmarkList = document.getElementById("bookmark-list");

// Format ISO date to human-readable string
function formatDate(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Render all bookmarks
export function renderBookmarks(bookmarks, userId) {
  bookmarkList.innerHTML = "";

  if (bookmarks.length === 0) {
    const msg = document.createElement("p");
    msg.classList.add("no-bookmarks");
    msg.textContent =
      "💗 No bookmarks yet. Select a user above to get started and create bookmark NOW!";
    bookmarkList.appendChild(msg);
    return;
  }

  bookmarks.forEach((bookmark) => {
    const card = createBookmarkCard(bookmark, userId);
    bookmarkList.appendChild(card);
  });
}

// Create a single bookmark card
function createBookmarkCard(bookmark, userId) {
  const article = document.createElement("article");

  article.innerHTML = `
    <h2><a href="${bookmark.url}" target="_blank" rel="noopener">${bookmark.title}</a></h2>
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
  const deleteBtn = article.querySelector(".delete-btn");

  // Copy URL
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(bookmark.url).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy URL 🔗"), 2000);
    });
  });

  // Like bookmark
  likeBtn.addEventListener("click", async () => {
    await likeBookmark(userId, bookmark.id);
    const updated = await getBookmarks(userId);
    renderBookmarks(updated, userId);
  });

  // Delete bookmark
  deleteBtn.addEventListener("click", () => {
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
