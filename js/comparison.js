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

let currentUser = null; // Initialize current user to null

// ----------------------- Get User's Name'Name ------------------------------

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

// ------------------------Set (insert) data into FRD ------------------------
function updateData(userID, country, year, gdp){
  // Must use brackets around variable name to use it as a key
  update(ref(db, 'users/' + userID + '/data/' + country),{
    [year]: gdp
  })
  .then(() => {
    alert("Data stored successfully")
  })
  .catch((error) => {
    alert("There was an error. Error: " + error);
  });
}

// -------------------------Delete a years's data from FRD ---------------------
function deleteData(userID, country, year){
  remove(ref(db, 'users/' + userID + '/data/' + country + '/' + year))
  .then(() => {
    alert('Data removed successfully');
  })
  .catch((error) => {
    alert('Unsuccessful, error' + error)
  })
}

// ---------------------------Get a country's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph
async function getDataSet(country){

  const years = [];
  const gdp = [];


  const dbref = ref(db);  // firebase parameter to access database

  await get(child(dbref, 'data/' + country)).then((snapshot) => {
    if(snapshot.exists()){
      console.log(snapshot.val());

      snapshot.forEach(child => {
        console.log(child.key, child.val());
        // Push values to the corresponding arrays
        years.push(child.key);
        gdp.push(child.val());
      }); 
    }
    else {
      alert('No data found');
    }
  })
  .catch((error) => {
    alert('Unsuccessful, error: ' + error);
  });

  return years.map((x, i) => ({x, y: gdp[i]}));
}

async function getCountries() {
  const countries = [];

  const dbref = ref(db);  // firebase parameter to access database

  await get(child(dbref, 'data')).then((snapshot) => {
    if(snapshot.exists()){
      snapshot.forEach(child => {
        if (child.key !== "growthRate") {
          countries.push(child.key);
        }
      });
    }
    else {
      alert('No data found');
    }
  })
  .catch((error) => {
    alert('Unsuccessful, error: ' + error);
  });

  return countries;
}

async function createChart(country, id){
    const dataUS = await getDataSet("United States"); // createChart will wait for getData() to process CSV
    let dataOther;
    let datasets = [
        {
            label:    `United States GDP`,     // Dataset label for legend
            data:     dataUS,    
            fill:     false,           // Fill area under the linechart (true = yes, false = no)
            backgroundColor:  'rgba(255, 0, 132, 0.2)',    // Color for data marker
            borderColor:      'rgba(255, 0, 132, 1)',      // Color for data marker border
            borderWidth:      1   // Data marker border width
        },
    ];

    if (country !== "United States") {
      dataOther = await getDataSet(country);
      datasets.push( {
          label:    `${country} GDP`,     // Dataset label for legend
          data:     dataOther,    
          fill:     false,           // Fill area under the linechart (true = yes, false = no)
          backgroundColor:  'rgba(0, 132, 255, 0.2)',    // Color for data marker
          borderColor:      'rgba(0, 132, 255, 1)',      // Color for data marker border
          borderWidth:      1   // Data marker border width
      } );
    }

    const lineChart = document.getElementById(id);

    return new Chart(lineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            datasets
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: true,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Year',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                        callback: function(val, index, ticks){
                            // Set the tick marks at every 5 years
                            return String(val);
                        },
                        stepSize: 5,
                        font: {
                            size: 14  
                        },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: `GDP in US dollar value`,     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        callback: function(value, index, ticks) {
                          return new Intl.NumberFormat('en-US', {
                            notation: 'compact',
                            maximumFractionDigits: 1
                          }).format(value);
                        },
                        min: 0,                   
                        maxTicksLimit: 20,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'GDP vs. Year',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }       
    });
}

let countries = [];
const countryParagraphs = {
  China: `China’s GDP is the second largest globally but still around $10 trillion USD less than the US. China is often called the “world’s factory” due to its massive industrial output and manufacturing exports. Unlike the US, China runs a trade surplus, meaning it exports far more than it imports. As you can see in the image, China's GDP has been rapidly growing in recent years, due to an increase in production. However, China is slowly shifting to a more consumer-based economy as production is moving elsewhere around the world.`,
  India: `India’s GDP is lower than that of the US and China, but it has been growing rapidly in recent years, as India shifts into becoming a major world power. Its economy relies heavily on services such as information technology and customer support, as well as farming. India’s large population provides a huge labor force, but being an underdeveloped nation limit its overall GDP compared to more developed nations such as the US and China. Infrastructure challenges and income inequality also play a role in its GDP limitations.`,
  Russia: `Russia’s GDP is much smaller than that of the US, largely because it depends heavily on natural resources such as oil and gas. Energy exports make up a major share of its economy, which makes Russia very vulnerable to global market price changes. Unlike the US, Russia has a smaller service sector and limited technological diversification. Russia's economic and political instability also restrict foreign investment and slows growth compared to Western economies.`,
  Germany: `Germany has one of the largest economies in Europe, with a GDP that ranks third globally. The GDP disparity between the top three countries is shocking, as Germany's GDP is around 1/4 of China's and 1/7 of the US's. Germany is known for its strong manufacturing base, particularly in vehicles,machinery, and chemical production. Unlike the US, Germany maintains a significant trade surplus due to its large export economy. However, its economic growth is more moderate, as it relies heavily on global demand for its products which can drastically change over time.`
};
const countrySelect = document.getElementById("country-select");
const countryParagraph = document.getElementById("country-paragraph");
let chart2;

window.addEventListener('load', async function(){
  countries = await getCountries();
  for (const country of countries) {
    const option = new Option(country, country);
    countrySelect.add(option);
  }
  countrySelect.value = "China";
  
  createChart('United States', 'lineChart1');
  chart2 = await createChart(countrySelect.value, 'lineChart2');
  console.log(countrySelect.value);

  getUsername();  // Get current user's first name
  
  document.getElementById('update').onclick = function(){
    const name = document.getElementById('customName').value;
    const year = document.getElementById('customYear').value;
    const gdp = document.getElementById('customGDP').value;
    const userID = currentUser.uid;

    updateData(userID, name, year, gdp);
  }
  // chart3 = await createChart()
});

countrySelect.addEventListener("change", async (event) => {
  const country = event.target.value;
  if (country in countryParagraphs) {
    countryParagraph.innerText = countryParagraphs[country];
  }
  else {
    countryParagraph.innerText = "";
  }
  chart2.destroy();
  chart2 = await createChart(country, 'lineChart2');
});




