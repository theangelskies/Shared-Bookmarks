# Shared Bookmarks – A.Y.I Project

As developers, we often read useful articles and resources online. It can be helpful to save these links so we can revisit them later and share them with others. The Shared Bookmarks web application allows users to store, view, and interact with bookmarked links.

This project was built using HTML, CSS, and JavaScript, focusing mainly on implementing the required logic rather than complex UI design.
# Live Website

https://oursharedbookmark.netlify.app/

# GitHub Repository

https://github.com/theangelskies/Shared-Bookmarks

# Project Objectives

The main objectives of this project were to:

Build a web application using HTML, CSS, and JavaScript

Implement bookmark management functionality

Allow multiple users to view and manage bookmarks

Store bookmark data using the provided storage functions

Implement interactive features such as copying URLs and liking bookmarks

Ensure the website is accessible and keyboard-friendly

Write unit tests to verify important logic

Deploy the website online with automatic deployment from GitHub

# Features
User Selection

The application includes a dropdown menu with five users. Selecting a user loads and displays the bookmarks associated with that user.

If the selected user has no bookmarks saved, the application displays a message informing the user that no bookmarks are currently available.

Bookmark Display

Each bookmark displays the following information:

Title – displayed as a clickable link that opens the bookmarked webpage

Description – short explanation of the bookmarked resource

Timestamp – shows when the bookmark was created

Bookmarks are displayed in reverse chronological order, meaning the most recently added bookmarks appear first.

Bookmark Actions

Each bookmark includes interactive actions:

Copy URL

A Copy button allows users to copy the bookmark URL directly to the clipboard.

This makes it easy to quickly share links without manually selecting and copying them.

Like Button

Each bookmark includes a Like button and counter.

The like counter starts at 0

Every time the button is clicked, the counter increases

The like count is stored so that it persists across sessions

Add New Bookmarks

Users can add new bookmarks using a form that includes the following inputs:

URL

Title

Description

After submitting the form:

The bookmark is saved for the currently selected user

The bookmark list refreshes automatically

The new bookmark appears at the top of the list

The form is designed to be accessible, meaning it can be used with a keyboard and screen readers.

# Technologies Used

The project was developed using the following technologies:

HTML5 – for structuring the web pages

CSS3 – for basic styling and layout

JavaScript (ES Modules) – for application logic

Node.js – used for running tests

Git & GitHub – version control and collaboration

Netlify – hosting and automatic deployment

# Data Storage

The application uses the provided storage.js module to manage bookmark data.

The following functions are used:

getUserIds() – retrieves the list of users

getData(userId) – retrieves bookmarks for a specific user

setData(userId, data) – stores bookmark data for a user

clearData(userId) – clears stored data (used during development)

The application does not implement its own storage system, as the provided functions handle persistence.

# Project Structure - Shared-Bookmarks
```
Shared-Bookmarks
│
├── assets/               # Images and other assets
│
├── index.html            # Main application page
├── about.html            # About page
├── contact.html          # Contact page
│
├── style.css             # Application styling
│
├── script.js             # Main application logic
├── render.js             # Bookmark rendering functions
├── bookmarks.js          # Bookmark data logic
├── storage.js            # Provided storage functions
│
├── bookmarks.test.js     # Unit tests
│
├── package.json          # Project configuration
├── package-lock.json
│
└── README.md
```
# Testing

Unit tests were created to verify that the bookmark logic works correctly.

Tests ensure that bookmark functions behave as expected and help detect potential issues during development.

To run the tests:

npm test
# Accessibility

Accessibility was an important requirement for this project.

The website was designed to follow accessibility best practices:

Proper HTML semantics

Labels for form inputs

Keyboard-friendly navigation

Clear button labels

Readable content structure

The goal is to achieve a Lighthouse Accessibility score of 100.

# Deployment

The website is hosted using Netlify.

Deployment is automated:

Code is pushed to the GitHub repository

Netlify automatically builds and deploys the site

The live website updates whenever new changes are merged

# Authors

A.Y.I Shared Bookmark – Group Project
2026