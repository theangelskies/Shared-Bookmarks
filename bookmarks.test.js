import assert from "node:assert";
import test from "node:test";

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

import { getUserIds, clearData, getData } from "./storage.js";
import {
  getUsers,
  getBookmarks,
  addBookmark,
  likeBookmark,
} from "./bookmarks.js";

const TEST_USER = "1";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("getUsers returns 5 users", () => {
  assert.equal(getUsers().length, 5);
});

test("getBookmarks returns empty array if user has no bookmarks", () => {
  clearData(TEST_USER);
  const bookmarks = getBookmarks(TEST_USER);
  assert.deepEqual(bookmarks, []);
});

test("addBookmark stores bookmark correctly", () => {
  clearData(TEST_USER);
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
  clearData(TEST_USER);
  addBookmark(TEST_USER, "url1", "t1", "d1");
  addBookmark(TEST_USER, "url2", "t2", "d2");
  const stored = getData(TEST_USER);
  assert.equal(stored.length, 2);
});

test("getBookmarks returns bookmarks in reverse chronological order", async () => {
  clearData(TEST_USER);
  const first = addBookmark(TEST_USER, "url1", "t1", "d1");
  await new Promise((r) => setTimeout(r, 10));
  const second = addBookmark(TEST_USER, "url2", "t2", "d2");

  const sorted = getBookmarks(TEST_USER);
  assert.equal(sorted[0].id, second.id);
  assert.equal(sorted[1].id, first.id);
});

test("likeBookmark increments like count", () => {
  clearData(TEST_USER);
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

test("likeBookmark only affects the correct bookmark", () => {
  clearData(TEST_USER);
  const b1 = addBookmark(TEST_USER, "url1", "t1", "d1");
  const b2 = addBookmark(TEST_USER, "url2", "t2", "d2");

  likeBookmark(TEST_USER, b1.id);

  const updated = getData(TEST_USER);
  const liked = updated.find((b) => b.id === b1.id);
  const untouched = updated.find((b) => b.id === b2.id);

  assert.equal(liked.likes, 1);
  assert.equal(untouched.likes, 0);
});
