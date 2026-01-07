import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

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

// Return instance of your app's firebase Realtime Databse (FRD)
const db = getDatabase(app)


async function gdpChart() {
  console.log("gdpChart running");

  const years = [];
  const growthRates = [];

  const dbRef = ref(db, 'data');

  try {
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const key in data) {
        if (!isNaN(key)) {
          years.push(key);
          growthRates.push(data[key]);
        }
      }

      const graph = document.getElementById("gdpChart");

      new Chart(graph, {
        type: "bar",
        data: {
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
          plugins: {
            tooltip: { enabled: false }
          },
          scales: {
            x: {
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
            y: {
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

    } else {
      console.log("No GDP data found.");
    }
  } catch (error) {
    console.error("Error loading chart data:", error);
  }
}

function getData(year){
    let rateVal = document.getElementById('rateVal')
    const dbref = ref(db)

    // provide node path
    get(child(dbref, 'data/' + year))
    .then((snapshot) => {
      if (year === ''){
        rateVal.textContent = `Please enter a year.`
      }
      else if (snapshot.exists()) {
        const rate = snapshot.val();
        rateVal.textContent = `The GDP growth rate change for ${year} was ${rate}%.`;
      } else {
        rateVal.textContent = `No GDP data found for ${year}.`;
      }
    })
    .catch((error) => {
      console.error(error);
      rateVal.textContent = 'Error retrieving GDP data.';
    });
  }

gdpChart();



document.getElementById('get').onclick = function(){
    const year = document.getElementById('getYear').value
    getData(year)
  }