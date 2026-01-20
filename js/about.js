/*
    Name: R. Adulla
    File: about.js
    Purpose: Create the contact us form
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js"; // import all functions from firebase

import {getDatabase, ref, set, update, child, get, remove }
  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js"

const firebaseConfig = { // configure firebase
  apiKey: "AIzaSyBxTmX9T2G7XyjejGV6-8fQwE4bjGRL1pU",
  authDomain: "us-gdp-project-se.firebaseapp.com",
  databaseURL: "https://us-gdp-project-se-default-rtdb.firebaseio.com",
  projectId: "us-gdp-project-se",
  storageBucket: "us-gdp-project-se.firebasestorage.app",
  messagingSenderId: "482979417992",
  appId: "1:482979417992:web:821d52fd18d01f5931b43d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  // initialize firebase as app

// Return instance of your app's firebase Realtime Databse (FRD)
const db = getDatabase(app)                                 // get database from firebase initialization

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault()

    alert("Form submitted successfully!");                // alert for form submission
});