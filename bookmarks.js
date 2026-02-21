import { getData, setData, getUserIds } from "./storage.js";

export function getUsers() {
  return getUserIds();
}

export function getBookmarks(userId) {
  const data = getData(userId);
  if (!Data || data.length === 0) return [];
  return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addBookmark(userId, url, title, description) {
  const bookmark = {
    id: Date.now().toString(),
    url,
    title,
    description,
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  setData(userId, bookmark);
  return bookmark;
}

export function likeBookmark(userId, bookmarkId) {
  const bookmarks = getData(userId);
  const target = bookmarks.find((b) => b.id === bookmarkId);
  if (target) {
    target.likes += 1;
    setData(userId, target);
  }
}
