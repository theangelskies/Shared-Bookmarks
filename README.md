Shared Bookmarks – A.Y.I Project

As developers, we often read useful articles and resources online. It can be helpful to save these links so we can revisit them later and share them with others. The Shared Bookmarks web application allows users to store, view, and interact with bookmarked links.

This project was built using HTML, CSS, and JavaScript, focusing mainly on implementing the required logic rather than complex UI design.

Live Website

🌐 https://oursharedbookmark.netlify.app/

GitHub Repository

(Add your repo link here)

Project Overview

The A.Y.I Shared Bookmark website allows users to:

Select a user from a dropdown list

View bookmarks shared by that user

Add new bookmarks using a form

Copy bookmark links to the clipboard

Like bookmarks

Each bookmark displays:

Title (as a clickable link)

Description

Creation timestamp

Copy URL button

Like counter

Bookmarks are displayed in reverse chronological order, meaning the newest bookmarks appear first.

Features
User Selection

A dropdown menu allows users to choose which user's bookmarks to view.

Bookmark Display

Bookmarks show:

Title (clickable link)

Description

Creation date and time

Like button with counter

Copy link button

Add Bookmark

Users can add a new bookmark by filling out a form with:

URL

Title

Description

After submission, the bookmark is saved and immediately displayed.

Copy to Clipboard

Each bookmark includes a copy button that copies the URL to the user's clipboard.

Like Counter

Bookmarks include a like button. Each click increases the like count, and the value persists across sessions.

Data Storage

This project uses the provided storage.js module which includes:

getUserIds() – returns available user IDs

getData(userId) – retrieves bookmarks for a user

setData(userId, data) – stores bookmark data

clearData(userId) – clears stored data (used for development)

No custom storage system was implemented, as required by the project instructions.

Accessibility

Accessibility was considered throughout development:

Forms are fully keyboard accessible

Labels are connected to inputs

Semantic HTML elements are used

Lighthouse accessibility score: 100

Unit Testing

Unit tests were written for bookmark logic functions to verify that the bookmark creation and data handling work correctly.

Tests were implemented using Node.js testing and ensure the core functionality behaves as expected.

Deployment

The project is hosted using Netlify.

Deployment is automatically triggered when updates are pushed to the GitHub repository.

Technologies Used

HTML

CSS

JavaScript (ES Modules)

Node.js (for unit testing)

Netlify (deployment)

Git & GitHub

Project Structure
project-folder
│
├── index.html
├── about.html
├── contact.html
├── style.css
├── script.js
├── bookmark.js
├── storage.js
├── bookmarks.test.js
└── README.md
Authors

A.Y.I Shared Bookmark – Group Project
2026