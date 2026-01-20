/*
    Name: A. Oh
    File: navbarUser.js
    Purpose: Updates the navbar on every page when signed in to show first name and sign out button
*/

// ----------------- Page Loaded After User Sign-in -------------------------//
// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get, remove }
  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBxTmX9T2G7XyjejGV6-8fQwE4bjGRL1pU",
authDomain: "us-gdp-project-se.firebaseapp.com",
databaseURL: "https://us-gdp-project-se-default-rtdb.firebaseio.com",
projectId: "us-gdp-project-se",
storageBucket: "us-gdp-project-se.firebasestorage.app",
messagingSenderId: "482979417992",
appId: "1:482979417992:web:821d52fd18d01f5931b43d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth();

// Return instance of your app's Firebase Realtime Database (FRD)
const db = getDatabase();


// ---------------------// Get reference values -----------------------------

let userLink = document.getElementById('userLink');   // Username for navbar
let navList = document.getElementById('navList'); // Navbar list
let currentUser = null; // Initialize currentUser to null

// ----------------------- Get User's Name ------------------------------

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

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD
function signOutUser() {
  sessionStorage.removeItem('user');  // Clear session storage
  localStorage.removeItem('user');    // Clear local storage
  localStorage.removeItem('keepLoggedIn');

  signOut(auth).then(() => {
    // Sign out successful
  }).catch((error) => {
    // Error occured
  });
}


// --------------------------- Home Page Loading -----------------------------
window.addEventListener('load', function() {
  // ------------------------- Set Welcome Message -------------------------
  getUsername();  // Get current user's first name
  if (currentUser == null) {
    userLink.innerText = "Sign In";
    userLink.href = "signIn.html";
  } else {
    userLink.innerText = currentUser.firstName;
    userLink.href = "#";

    const signOutHTML = `<li class="nav-item">
                             <a id="signOut" href="index.html" class="text-light nav-link hover-underline-animation nbMenuItem px-3">Sign Out</a>
                         </li>`;

    navList.insertAdjacentHTML("beforeend", signOutHTML);
    document.getElementById('signOut').onclick = function() {
      signOutUser();
    }
  }
});