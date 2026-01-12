// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } 
  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {getDatabase, ref, set, update, child, get, remove }
  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const auth = getAuth()

// Return instance of your app's firebase Realtime Databse (FRD)
const db = getDatabase(app)


async function getData(){
    const response = await fetch('../data/country-gdp.csv');   // .. to moveup one level in folder structure
    const data = await response.text()                  // CSV to Text format
    console.log(data);

    // \n - new line character
    // split('\n') - will seperate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index "start" up and including "end"

    const table = data.split('\n').slice(1); // Split by line and remove first row
    console.log(table);

    table.forEach(row => {
        const columns = row.split(',');
        const country = columns[0];    // assign year value (type: string)
        const year = columns[2];
        const gdp = columns[3];    // assign global temp. deviation value (string)

        console.log();

        updateData(country, year, gdp)
    })

}

// -------------------------Update data in database --------------------------
function updateData(country, year, gdp){
  // Must use brackets around variable name to use it as a key
  update(ref(db, 'data/' + country),{
    [year]: gdp
  })
  .then(() => {
    alert("Data updated successfully")
  })
  .catch((error) => {
    alert("There was an error. Error: " + error)
  })
}

window.onload = function(){
    document.getElementById('updateData').onclick = getData();
}