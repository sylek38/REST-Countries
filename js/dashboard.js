const allCountries = "https://restcountries.eu/rest/v2/all";

fetch(allCountries)
.then(res => res.json())
.then(data => displayDashboard(data))

function displayDashboard(countries) {

    const dashboard = document.querySelector(".dashboard__results");

    const allCountries = document.createElement("p");
    const span = document.createElement("span");
    allCountries.textContent = "Total number of countries: ";
    span.textContent = countries.length;
    dashboard.appendChild(allCountries);
    allCountries.appendChild(span);
        
}