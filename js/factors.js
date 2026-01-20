/*
    Name: M. Kang
    File: factors.js
    Purpose: Adds functionality to the GDP calculator in factors.html
*/

// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

document.getElementById('calculateButton').addEventListener("click", function(){
    // GDP = C + I + G + (X-M)
    // Where C is consumption, I is investment, G is government spending, and (X-M) is the net exports (exports-imports).

    const c = document.getElementById('consumption').value
    const i = document.getElementById('investments').value
    const g = document.getElementById('govSpending').value
    const x = document.getElementById('exports').value
    const m = document.getElementById('imports').value


    let gdpCalculation = document.getElementById('gdpValue');

    // Check for empty or spaces
    if(isEmptyorSpaces(c) || isEmptyorSpaces(i) || isEmptyorSpaces(g) || isEmptyorSpaces(x) || isEmptyorSpaces(m)){
        alert("Please enter all values.");

    }

    else {
        const gdp = parseFloat(c) + parseFloat(i) + parseFloat(g) + (parseFloat(x) - parseFloat(m));
        
        if(gdp < 0){ // if the gdp calculated is negative
            if(Math.abs(gdp) >= 1000){
                gdpCalculation.innerText = `GDP: -$${Math.round(Math.abs(gdp) / 10) / 100} trillion`;

            } else if(Math.abs(gdp) < 1){
                gdpCalculation.innerText = `GDP: -$${Math.round(Math.abs(gdp) * 100000) / 100} million`;
            }
            else {
                gdpCalculation.innerText = `GDP: -$${Math.round(Math.abs(gdp) * 100) / 100} billion`;
            }
        }
        else{ // if the gdp is positive
            if(gdp >= 1000){
                gdpCalculation.innerText = `GDP: $${Math.round(gdp / 10) / 100} trillion`;

            } else if(gdp < 1){
                gdpCalculation.innerText = `GDP: $${Math.round(gdp * 100000) / 100} million`;
            }
            else {
                gdpCalculation.innerText = `GDP: $${Math.round(gdp * 100) / 100} billion`;
            }
        }
    }

});