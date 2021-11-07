import * as Helpers from "./modules/helpers.mjs";
import * as MostCommon from "./modules/mostCommon.mjs";

const countriesURL = "https://restcountries.com/v3.1/all";
const dashboard = document.querySelector("#dashboard");
let countries = "";

fetch(countriesURL)
    .then(res => res.json())
    .then(data => {
        countries = data;
        displayDashboardInfo();
})

function displayDashboardInfo() {

    const paragraph1 = document.createElement("p");
    paragraph1.textContent += `Total number of countries: ${numberOfCountries()}`;
    dashboard.appendChild(paragraph1);

    const paragraph2 = document.createElement("p");
    paragraph2.textContent += `Top 5 most common languages: ${mostCommonLanguages().join(", ")}`;
    dashboard.appendChild(paragraph2);

    const paragraph3 = document.createElement("p");
    paragraph3.textContent += `Top 5 most common currencies: ${mostCommonCurrencies().join(", ")}`;
    dashboard.appendChild(paragraph3);

    const paragraph4 = document.createElement("p");
    paragraph4.textContent += `Average population: ${averageArea().toFixed(0)}`;
    dashboard.appendChild(paragraph4);

    const paragraph5 = document.createElement("p");
    paragraph5.textContent += `Average area: ${averagePopulation().toFixed(0)}`;
    dashboard.appendChild(paragraph5);

}

    const numberOfCountries = () => {
        return countries.length
    }

    const mostCommonLanguages = () => {
        let allCountsOfElements = [];
        
        countries.forEach(country => {
            allCountsOfElements.push(Helpers.getLanguages(country.languages));
        });

        return MostCommon.findFiveMostCommon(allCountsOfElements);
    }

    const mostCommonCurrencies = () => {
        let allCountsOfElements = [];

        countries.forEach(country => {
            allCountsOfElements.push(Helpers.getCurrencies(country.currencies));
        });

        return MostCommon.findFiveMostCommon(allCountsOfElements);
    }

    const getAverage = (elements) => {
        return elements.reduce((avg, value) => {
            return avg + value;
        }, 0) / elements.length;
    }

    const averagePopulation = () => {
        let allCountsOfElements = [];

        countries.forEach(country => {
            allCountsOfElements.push(country.population);
        })

        return getAverage(allCountsOfElements);
    }

    const averageArea = () => {
        let allCountsOfElements = [];

        countries.forEach(country => {
            allCountsOfElements.push(country.area);
        })

        return getAverage(allCountsOfElements);
    }