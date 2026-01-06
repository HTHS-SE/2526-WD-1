async function gdpChart() {
  console.log("gdpChart running");

  const response = await fetch("data.csv");
  const text = await response.text();

  const rows = text.trim().split("\n");

  // Remove header row safely
  rows.shift();

  const years = [];
  const growthRates = [];

  rows.forEach(row => {
    if (!row) return;

    const parts = row.split(",");

    const year = parts[0].replace(/"/g, "").trim();
    const rate = Number(parts[1].replace(/"/g, "").trim());

    years.push(year);
    growthRates.push(rate);
  });

  const graph = document.getElementById("gdpChart");

  new Chart(graph, {
    type: "bar",
    data: {
      labels: years,
      datasets: [{
        label: "US GDP Growth Rate (%; green = positive, red = negative)",
        data: growthRates,
        backgroundColor: growthRates.map(p => p >= 0 ? "rgba(60, 235, 54, 0.7)" : "rgba(255,99,132,0.7)")
      }]
    },
    options: {
      scales: {
        x: {
            title: {
                    display: true,
                    text: 'Year',
                    font: {
                        size: 14
                    },
                },
            min: 0,
            max: 62,
            ticks: {
                callback: function(value, index) {
                return index % 5 === 0 ? this.getLabelForValue(value) : '';
                }
            }
        },
        y: {
            title: {
                    display: true,
                    text: 'Growth Rate',     // x-axis title
                    font: {                   // font properties
                        size: 14
                    },
                },
            min: -4,
            max: 8,
            ticks: {
                stepSize: 2
            }
        }
      }
    }
  });
}

function getData(year){
    let yearVal = document.getElementById('yearVal')
    let rateVal = document.getElementById('rateVal')
    const dbref = ref(db)

    // provide node path
    get(child(dbref, 'data/' + year))
    .then((snapshot) => {
      if(snapshot.exists()){
        yearVal.textContent = year
        

        // to get specific value from the provided key
        rateVal.textContent = snapshot.val()[rate]
      }
      else{
        alert('No data found')
      }
    })
    .catch((error)=>{
      alert('Unsuccessful, error: ' + error)
    })
  }

gdpChart();
getData();