/*
    Name: R. Adulla
    File: about.js
    Purpose: Create the contact us form
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js"; // import all functions from firebase

import {getDatabase, ref, set, update, push, child, get, remove }
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

// Return instance of your app's firebase Realtime Database (FRD)
const db = getDatabase(app)                                 // get database from firebase initialization

let currentUser = null; // Initialize current user to null

function getUsername() {
  // Grab value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  // Grab user information passed from signIn.js
  if (keepLoggedIn == "yes") {
    currentUser = JSON.parse(localStorage.getItem('user'));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}

function sendMessage(userID, firstName, lastName, email, message){
  const messageListRef = ref(db, 'messages');
  const newMessageRef = push(messageListRef);
  set(newMessageRef, {
    userID: userID,
    name: firstName + " " + lastName,
    email: email,
    message: message
  })
  .then(() => {
    alert("Message sent successfully.");
  })
  .catch((error) => {
    alert("Your message could not be sent. " + error);
  });
}

window.addEventListener("load", () => {
  getUsername();
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    if (currentUser == null) {
      alert("You must be logged in to send a message.");
    } else {
      const firstName = document.getElementById("firstname").value;
      const lastName = document.getElementById("lastname").value;
      sendMessage(currentUser.uid, firstName, lastName, currentUser.email, message);
    }
});