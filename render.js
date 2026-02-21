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

import { likeBookmark, getBookmarks } from "./bookmarks.js";

const bookmarkList = document.getElementById("bookmark-list");

// ============================================
// TASK C-1: formatDate(isoString)
// - receives a date string like "2026-02-19T10:32:00.000Z"
// - return a human readable string like "Feb 19, 2026, 10:32 AM"
// - hint: look up toLocaleString()
// ============================================
function formatDate(isoString) {}

// ============================================
// TASK C-2: renderBookmarks(bookmarks)
// - this function is called by Person B with an array of bookmarks
// - first clear the current #bookmark-list contents
// - if the array is empty, show a "No bookmarks yet" message and stop
// - if array has items, loop over them
// - for each bookmark call createBookmarkCard()
// - append each card to #bookmark-list
// - remember to export this function so Person B can import it
// ============================================
function renderBookmarks(bookmarks) {}

// ============================================
// TASK C-3: createBookmarkCard(bookmark)
// - create an <article> element for one bookmark
// - inside it must include ALL of the following:
//     title as a clickable <a href> link (opens in new tab)
//     description as a paragraph
//     createdAt inside a <time> tag (use datetime attribute)
//     a like button showing the current like count
//     a copy URL button
// - return the article element
// - hint: use innerHTML or createElement
// ============================================
function createBookmarkCard(bookmark) {}

// ============================================
// TASK C-4: copy URL button behaviour
// - when clicked, copy the bookmark's url to clipboard
// - hint: look up navigator.clipboard.writeText()
// - optionally change button text to "Copied!" for 2 seconds
//   then reset back to original text
// ============================================

// ============================================
// TASK C-5: like button behaviour
// - when clicked, call likeBookmark(userId, bookmark.id)
// - userId comes from reading #user-select value from the DOM
// - after liking, call getBookmarks(userId) to get fresh data
// - call renderBookmarks() again to update the display
// - the like count must persist after page refresh
// ============================================
