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

import {
  getUsers,
  getBookmarks,
  addBookmark,
  likeBookmark,
} from "./bookmarks.js";
import { getUserIds, getData, clearData } from "./storage.js";
const TEST_USER = "1";
test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});
test("getUsers returns 5 users", () => {
  const users = getUsers();
  assert.equal(users.length, 5);
});
test("getBookmarks returns empty array for new user", () => {
  clearData(TEST_USER);
  const bookmarks = getBookmarks(TEST_USER);
  assert.deepEqual(bookmarks, []);
});
