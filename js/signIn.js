/*
    Name: R. Adulla
    File: signIn.js
    Purpose: Authenticates and logs the user in
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get }
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
const auth = getAuth()
const db = getDatabase(app)

// ---------------------- Sign-In User ---------------------------------------//

document.getElementById('signIn').addEventListener('click', function(){
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value
    //console.log(email, password)


    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        let logDate = new Date()
        update(ref(db, 'users/' + user.uid + '/accountInfo'),{
            last_login: logDate,
        })
        .then(() => {
            alert("User signed in successfully")

            // get snapshot of all the user informatoin that will be passed to the login function and stored in either seesion or local storage
            get(ref(db, 'users/' + user.uid + '/accountInfo')).then((snapshot) => {
                if (snapshot.exists()){
                    console.log(snapshot.val())
                    logIn(snapshot.val())
                }
                else{
                    console.log('User does not exist')
                }
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error)
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    });
});

// ---------------- Keep User Logged In ----------------------------------//

function logIn(user){
    let keepLoggedIn = document.getElementById('keepLoggedInSwitch').ariaChecked

    if (!keepLoggedIn){
        sessionStorage.setItem('user', JSON.stringify(user))
        //console.log(JSON.stringify(user))
        window.location = "index.html"
    }
    else{
        localStorage.setItem('keepLoggedIn', 'yes')
        localStorage.setItem('user', JSON.stringify(user))
        //console.log(JSON.stringify(user))
        window.location = 'index.html'
    }
}