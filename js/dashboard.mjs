import * as Helpers from "./modules/helpers.mjs";

const countriesURL = "https://restcountries.com/v3.1/all";

const dashboard = document.querySelector(".dashboard__results");
let countries = "";

fetch(countriesURL)
    .then(res => res.json())
    .then(data => {
        countries = data;
        displayDashboardInfo();
})

function displayDashboardInfo() {
    const dashboard = document.querySelector("#dashboard");
    const paragraph1 = dashboard.querySelector("li:nth-child(1)");
    const paragraph2 = dashboard.querySelector("li:nth-child(2)");
    const paragraph3 = dashboard.querySelector("li:nth-child(3)");
    const paragraph4 = dashboard.querySelector("li:nth-child(4)");
    const paragraph5 = dashboard.querySelector("li:nth-child(5)");

    paragraph1.textContent += numberOfCountries();
    paragraph2.textContent += mostCommonLanguages().join(", ");
    paragraph3.textContent += mostCommonCurrencies().join(", ");
    paragraph4.textContent += averagePopulation().toFixed(0);
    paragraph5.textContent += averageArea().toFixed(0);

}

    const numberOfCountries = () => {
        return countries.length
    }

    const findFiveMostCommon = (allCountsOfElements) => {

        // usunięcie duplikatów, dodanie ilości powtórzeń
        const hashMap = allCountsOfElements.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1
            return acc
        }, {})

        const fiveMostCommon = [];

        // znalezienie most common elementu
        for (let i = 1; i <= 5; i++) {
            const currentMostCommon = 
                Object.keys(hashMap)
                .reduce((a, b) => hashMap[a] > hashMap[b] ? a : b)
            
            fiveMostCommon.push(currentMostCommon);

            // usuniecie most common elementu ze starej listy (by zrobilo się miejsce na nowy)
            Object.keys(hashMap).forEach(key => {
                if (key === (fiveMostCommon[fiveMostCommon.length - 1])) {
                    delete hashMap[key];
                }
            });
            
        }
    
        return fiveMostCommon;

    }

    const mostCommonLanguages = () => {
        let allCountsOfElements = [];
        
        countries.forEach(country => {
            allCountsOfElements.push(Helpers.getLanguages(country.languages));
        });

        return findFiveMostCommon(allCountsOfElements);
    }

    const mostCommonCurrencies = () => {
        let allCountsOfElements = [];

        countries.forEach(country => {
            allCountsOfElements.push(Helpers.getCurrencies(country.currencies));
        });

        return findFiveMostCommon(allCountsOfElements);
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
           
   
