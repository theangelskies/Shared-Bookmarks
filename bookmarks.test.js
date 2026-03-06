import assert from "node:assert";
import test from "node:test";

// Mock localStorage for Node
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

// Imports
import { getUserIds, clearData, getData } from "./storage.js";
import {
  getUsers,
  getBookmarks,
  addBookmark,
  likeBookmark,
} from "./bookmarks.js";

const TEST_USER = "1";

// Helper: wait for ms
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Clear storage before each test
test.beforeEach(() => {
  clearData(TEST_USER);
});

// TESTS

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("getUsers returns 5 users", () => {
  assert.equal(getUsers().length, 5);
});

test("getBookmarks returns empty array if user has no bookmarks", () => {
  const bookmarks = getBookmarks(TEST_USER);
  assert.deepEqual(bookmarks, []);
});

test("addBookmark stores bookmark correctly", () => {
  const bookmark = addBookmark(
    TEST_USER,
    "https://example.com",
    "Example",
    "Description",
  );

  const stored = getData(TEST_USER);

  assert.equal(stored.length, 1);
  assert.equal(stored[0].url, "https://example.com");
  assert.equal(stored[0].title, "Example");
  assert.equal(stored[0].description, "Description");
  assert.equal(stored[0].likes, 0);
  assert.ok(bookmark.id);
});

test("addBookmark does not overwrite existing bookmarks", () => {
  addBookmark(TEST_USER, "url1", "t1", "d1");
  addBookmark(TEST_USER, "url2", "t2", "d2");
  const stored = getData(TEST_USER);
  assert.equal(stored.length, 2);
});

test("getBookmarks returns bookmarks in reverse chronological order", async () => {
  const first = addBookmark(TEST_USER, "url1", "t1", "d1");
  await delay(5); // small delay for unique IDs
  const second = addBookmark(TEST_USER, "url2", "t2", "d2");

  const sorted = getBookmarks(TEST_USER);
  assert.equal(sorted[0].id, second.id);
  assert.equal(sorted[1].id, first.id);
});

test("likeBookmark increments like count", () => {
  const bookmark = addBookmark(
    TEST_USER,
    "https://example.com",
    "Example",
    "Description",
  );

  likeBookmark(TEST_USER, bookmark.id);

  const updated = getData(TEST_USER);
  assert.equal(updated[0].likes, 1);
});

test("likeBookmark only affects the correct bookmark", async () => {
  const b1 = addBookmark(TEST_USER, "url1", "t1", "d1");
  await delay(5);
  const b2 = addBookmark(TEST_USER, "url2", "t2", "d2");

  likeBookmark(TEST_USER, b1.id);

  const updated = getData(TEST_USER);
  const liked = updated.find((b) => b.id === b1.id);
  const untouched = updated.find((b) => b.id === b2.id);

  assert.equal(liked.likes, 1);
  assert.equal(untouched.likes, 0);
});

test("getBookmarks returns empty array for unknown user", () => {
  const bookmarks = getBookmarks("999");
  assert.deepEqual(bookmarks, []);
});

test("likeBookmark does nothing if user has no bookmarks", () => {
  likeBookmark(TEST_USER, "non-existent-id");
  const stored = getData(TEST_USER);
  assert.deepEqual(stored, []);
});

test("addBookmark generates unique ids", async () => {
  const b1 = addBookmark(TEST_USER, "url1", "t1", "d1");
  await delay(5);
  const b2 = addBookmark(TEST_USER, "url2", "t2", "d2");
  assert.notEqual(b1.id, b2.id);
});

test("createdAt is a valid ISO date string", () => {
  const bookmark = addBookmark(TEST_USER, "url", "title", "desc");
  const parsedDate = new Date(bookmark.createdAt);
  assert.ok(!isNaN(parsedDate.getTime()));
});

test("getBookmarks returns array type", () => {
  const bookmarks = getBookmarks(TEST_USER);
  assert.equal(Array.isArray(bookmarks), true);
});

test("likes start at zero for every new bookmark", () => {
  const b1 = addBookmark(TEST_USER, "url1", "t1", "d1");
  const b2 = addBookmark(TEST_USER, "url2", "t2", "d2");
  const stored = getData(TEST_USER);
  assert.equal(stored[0].likes, 0);
  assert.equal(stored[1].likes, 0);
});

test("adding bookmark with empty strings still creates bookmark object", () => {
  const bookmark = addBookmark(TEST_USER, "", "", "");
  assert.ok(bookmark);
  assert.equal(bookmark.url, "");
  assert.equal(bookmark.title, "");
  assert.equal(bookmark.description, "");
});

test("bookmarks persist in storage after multiple operations", () => {
  const b1 = addBookmark(TEST_USER, "url1", "t1", "d1");
  likeBookmark(TEST_USER, b1.id);
  const stored = getData(TEST_USER);
  assert.equal(stored.length, 1);
  assert.equal(stored[0].likes, 1);
});

test("getUsers returns same result as getUserIds", () => {
  const ids = getUserIds();
  const users = getUsers();
  assert.deepEqual(users, ids);
});
