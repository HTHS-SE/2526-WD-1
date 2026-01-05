// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
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
// ---------------- Register New Uswer --------------------------------//
document.getElementById('submitData').onclick = function(){
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('userEmail').value
  const password = document.getElementById('userPass').value

  if(!validation(firstName, lastName, email, password)){
    return;
  }
  // Create new app user using email/password authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User account created and signed in successfully
      const user = userCredential.user;
      // Add user account info to realtime database
      // 'set' will create a new reference or completely replace an existing one
      // each new user will be placed under the 'users' node
      set(ref(db, 'users/' + user.uid + '/accountInfo'), {
        uid: user.uid, // save the userID for home.js reference
        email: email,
        firstName: firstName,
        lastName: lastName
      })
      .then(() => {
        alert ("User created successfuly")
      })
      .catch((error)=>{
        alert(error)
      })

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
}

// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//

function validation(firstName, lastName, email, password){
  let fNameRegex = /^[a-zA-Z]+$/
  let lNameRegex = /^[a-zA-Z]+$/
  let emailRegex = /^[a-zA-Z0-9]+@ctemc\.org$/
  
  if (isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces(email) || isEmptyorSpaces(password)){
    alert("Please complete all fields")
    return false;
  }
  
  if(!fNameRegex.test(firstName)){
    alert("The first name should only contain letters")
    console.log(fNameRegex)
    return false;
  }
  
  if(!lNameRegex.test(lastName)){
    alert("The last name should only contain letters")
    console.log(lNameRegex)
    return false;
  }

  if(!emailRegex.test(email)){
    alert("Please enter a valid email")
    console.log(emailRegex)
    return false;
  }

  return true;
}