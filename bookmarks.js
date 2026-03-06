import { getData, setData, getUserIds } from "./storage.js";

// Get all user IDs
export function getUsers() {
  return getUserIds();
}

// Get bookmarks for a specific user, newest first
export function getBookmarks(userId) {
  const data = getData(userId);
  if (!data || data.length === 0) return [];
  return [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
}

// Add a new bookmark
export function addBookmark(userId, url, title, description) {
  const existing = getData(userId) || [];
  const bookmark = {
    id: Date.now().toString(),
    url,
    title,
    description,
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  const updated = [...existing, bookmark];
  setData(userId, updated);
  return bookmark;
}

// Like a bookmark
export function likeBookmark(userId, bookmarkId) {
  const bookmarks = getData(userId) || [];
  const updated = bookmarks.map((b) =>
    b.id === bookmarkId ? { ...b, likes: b.likes + 1 } : b,
  );
  setData(userId, updated);
}

// Delete a bookmark
export function deleteBookmark(userId, bookmarkId) {
  const bookmarks = getData(userId) || [];
  const updated = bookmarks.filter((b) => b.id !== bookmarkId);
  setData(userId, updated);
}
