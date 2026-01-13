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


async function gdpChart() {                                 // function to create the GDP growth rate chart
  //console.log("gdpChart running");          

  const years = [];                                         // create array for x and y values
  const growthRates = [];

  const dbRef = ref(db, 'data/growthRate');                 // create reference to growthRate folder in database

  try {                                                     // try to get snapshot, and if it works, create graph
    const snapshot = await get(dbRef);                      // get snapshot and await for getting database reference

    if (snapshot.exists()) {                                // if the snapshot exists, the data is there
      const data = snapshot.val();                          // define data as the snapshot

      for (const key in data) {                             // loop through to make sure data keys are all numbers
        if (!isNaN(key)) {
          years.push(key);
          growthRates.push(data[key]);
        }
      }

      const graph = document.getElementById("gdpChart");    // get the gdpChart element from events.html

      new Chart(graph, {                                    // create bar chart
        type: "bar",
        data: {                                             // data holds the label, datasets, and colors
          labels: years,
          datasets: [{
            label: "US GDP Growth Rate",
            data: growthRates,
            backgroundColor: growthRates.map(p =>
              p >= 0
                ? "rgba(60, 235, 54, 0.7)"
                : "rgba(255,99,132,0.7)"
            )
          }]
        },
        options: {
          plugins: {                                        // plugins has extra information, which gets disabled
            tooltip: { enabled: false }
          },
          scales: {
            x: {                                            // x values have title 'Year' and have ticks every 10 years
              title: {
                display: true,
                text: 'Year',
                font: { size: 14 }
              },
              ticks: {
                callback: function (value, index) {
                  return index % 5 === 0
                    ? this.getLabelForValue(value)
                    : '';
                }
              }
            },
            y: {                                            // y values have title 'Growth Rate' and have ticks every 2%
              title: {
                display: true,
                text: 'Growth Rate',
                font: { size: 14 }
              },
              min: -4,
              max: 8,
              ticks: { stepSize: 2 }
            }
          }
        }
      });

    } else {                                                // if the snapshot does not exist, log error message
      console.log("No GDP data found.");
    }
  } catch (error) {                                         // if the try block fails, log error message
    console.error("Error loading chart data:", error);
  }
}

function getData(year){                                     // function to get data from firebase, year is the year of data entered
  let rateVal = document.getElementById('rateVal')          // get data from events.html element with id 'rateVal'
  const dbref = ref(db)

  // provide node path
  get(child(dbref, 'data/growthRate/' + year))              // get data from growthRate folder with the year entered
  .then((snapshot) => {
    if (year === ''){                                       // if the year is blank tell the user to enter a year
      rateVal.textContent = `Please enter a year.`
    }
    else if (snapshot.exists()) {                           // if the snapshot exists, output the year, if not, say no data found
      const rate = snapshot.val();
      rateVal.textContent = `The GDP growth rate change for ${year} was ${rate}%.`;
    } 
    else {
      rateVal.textContent = `No GDP data found for ${year}.`;
    }
  })
  .catch((error) => {                                       // if there is no snapshot say that there is an error retrieving data
    console.error(error);
    rateVal.textContent = 'Error retrieving GDP data.';
  });
}

gdpChart();                                                 // run function to create the chart



document.getElementById('get').onclick = function(){        // when get button is clicked, get the value from html element with id 'getYear' and run function
    const year = document.getElementById('getYear').value
    getData(year)
  }