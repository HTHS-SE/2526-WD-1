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

const countries = ["China", "India", "Russia", "Germany"];
const countryParagraphs = [
  `China’s GDP is the second largest globally but still around $10 trillion USD less than the US. 
  China is often called the “world’s factory” due to its massive industrial output and manufacturing 
  exports. Unlike the US, China runs a trade surplus, meaning it exports far more than it imports. 
  As you can see in the image, China's GDP has been rapidly growing in recent years, due to an 
  increase in production. However, China is slowly shifting to a more consumer-based economy as 
  production is moving elsewhere around the world.`,
  `India’s GDP is lower than that of the US and China, but it has been growing rapidly in 
  recent years, as India shifts into becoming a major world power. Its economy relies heavily 
  on services such as information technology and customer support, as well as farming. India’s 
  large population provides a huge labor force, but being an underdeveloped nation limit its overall 
  GDP compared to more developed nations such as the US and China. Infrastructure challenges and 
  income inequality also play a role in its GDP limitations.`,
  `Russia’s GDP is much smaller than that of the US, largely because it depends heavily on 
  natural resources such as oil and gas. Energy exports make up a major share of its economy, 
  which makes Russia very vulnerable to global market price changes. Unlike the US, Russia has a 
  smaller service sector and limited technological diversification. Russia's economic and political 
  instability also restrict foreign investment and slows growth compared to Western economies.`,
  `Germany has one of the largest economies in Europe, with a GDP that ranks third globally. The GDP 
  disparity between the top three countries is shocking, as Germany's GDP is around 1/4 of China's 
  and 1/7 of the US's. Germanny is known for its strong manufacturing base, particularly in vehicles,
  machinery, and chemical prodiction. Unlike the US, Germany maintains a significant trade surplus 
  due to its large export economy. However, its economic growth is more moderate, as it relies heavily on 
  global demand for its products which can drastically change over time.`
];
const countrySelect = document.getElementById("country-select");
const countryTitle = document.getElementById("country-title");
const countryParagraph = document.getElementById("country-paragraph");

countrySelect.addEventListener("change", (event) => {
  countryTitle.innerText = countries[event.target.selectedIndex];
  countryParagraph.innerText = countryParagraphs[event.target.selectedIndex];
});