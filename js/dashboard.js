// a) total number of countries
// b) top 5 most common languages
// c) top 5 most common currencies
// d) avg population
// e) avg area
// f) avg number of neigbours

const countriesURL = "https://restcountries.com/v3.1/all";

const dashboard = document.querySelector(".dashboard__results");
let countries = "";

fetch(countriesURL)
    .then(res => res.json())
    .then(data => {
        countries = data;
        setDashboard(countries)
        console.log(countries)
    })

function setDashboard(countries) {
    const paragraph1 = dashboard.querySelector("li:nth-child(1)");
    const paragraph2 = dashboard.querySelector("li:nth-child(2)");
    const paragraph3 = dashboard.querySelector("li:nth-child(3)");
    const paragraph4 = dashboard.querySelector("li:nth-child(4)");
    const paragraph5 = dashboard.querySelector("li:nth-child(5)");

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

        // znalezienie wszystkich języków, tyle razy ile występują
        countries.forEach(country => {
            for (let prop in country.languages) {
                allCountsOfElements.push(country.languages[prop])
            }
        })

        return findFiveMostCommon(allCountsOfElements);
    }

    const mostCommonCurrencies = () => {
        let allCountsOfElements = [];

        // znalezienie wszystkich języków, tyle razy ile występują
        countries.forEach(country => {
            for (let prop in country.currencies) {
                for (let nestedProp in country.currencies[prop]) {
                    if (nestedProp === "name") {
                        allCountsOfElements.push(country.currencies[prop][nestedProp])
                    }
                }
            }
        })

        return findFiveMostCommon(allCountsOfElements);
    }

    const averagePopulation = () => {
        
    }
           
    paragraph1.textContent += numberOfCountries();
    paragraph2.textContent += mostCommonLanguages().join(", ");
    paragraph3.textContent += mostCommonCurrencies().join(", ");;

    }
