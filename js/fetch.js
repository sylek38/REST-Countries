//fetch api
const allCountries = "https://restcountries.com/v3.1/all";
const rows = document.querySelector('tbody').children;
let countries;

fetch(allCountries)
    .then(res => res.json())
    .then(data => {
        countries = data;
        displayTable(countries)
    })

function displayTable(countries) {

    // console.log(countries)
    // ? displayArea(country.area) : "no data"
    tableRows = countries.map((country, idx) => {

            return `
        <tr>
            <td>${country.name.common}</td>
            <td>${country.currencies ? displayCurrencies(country.currencies) : "---"}</td>
            <td>${country.languages ? displayLanguages(country.languages) : "---"}</td>
            <td>${country.population}</td>
            <td>${country.area}</td>
            <td><img class="flag-container" src="${displayFlag(country.flags)}" alt="the flag of ${country.name.common}"/></td>
        </tr>`;
        })
        .join("");

    document.querySelector("#data").innerHTML = tableRows;

}

// const displayArea = (countryProp) => { 
//     return countryProp.toLocaleString().replace(",", ".");
// }

const displayCurrencies = (countryProp) => {
    let currencies = [];

        for (let prop in countryProp) {
            for (let nestedProp in countryProp[prop]) {
                if (nestedProp === "name") {
                    currencies.push(countryProp[prop][nestedProp]);
                }
            }
        }

    return currencies.join(",<br>");
}

const displayLanguages = (countryProp) => {
    let languages = [];

    for (let prop in countryProp) {
        languages.push(countryProp[prop]);
    }

    return languages.join(",<br>");

}

const displayFlag = (flagProp) => {
    for (let prop in flagProp) {
        if (prop === "svg") {
            return flagProp[prop];
        }
    }
}

// TODO:
// getMaxPopulationValue = () => {

// };

// FILTER BY KEYWORD
function filterTable(keyword, min, max) {

    min = min ? parseInt(min) : 0;
    max = max ? parseInt(max) : 1000000000000;

    // console.log(min, max)

    //filter by keyword and min/max
    if (keyword !== "") {

        // console.log("keyword !== ''")

        Array.from(rows).forEach(row => {
            if (row.textContent.toLowerCase().includes(keyword.toLowerCase()) &&
                min <= parseInt(row.children[3].textContent.replace(/\D/g, '')) &&
                max >= parseInt(row.children[3].textContent.replace(/\D/g, ''))) {

                row.style.display = "table-row"

            } else {

                row.style.display = "none";

            }
        });

        // filter by min/max
    } else {

        // console.log("keyword === ''")

        Array.from(rows).forEach(row => {
            if (min <= parseInt(row.children[3].textContent.replace(/\D/g, '')) &&
                max >= parseInt(row.children[3].textContent.replace(/\D/g, ''))) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }
        });
    }

}

document.querySelector("#cta").addEventListener("click", e => {
    e.preventDefault();
    const min = document.querySelector("#min-population-inp").value;
    const max = document.querySelector("#max-population-inp").value;
    const keyword = document.querySelector("#keyword-inp").value.trim();

    filterTable(keyword, min, max)
});



// SORT TABLE:
function sortTableByColumn(table, column, asc = true, isNumeric) {
    const directionModifier = asc ? 1 : -1;
    const tBody = document.querySelector("#data");

    const sortedRows = Array.from(rows).sort((a, b) => {
        if (isNumeric) {

            
            a = parseInt(a.querySelector(`td:nth-child(${column + 1})`).textContent);
            b = parseInt(b.querySelector(`td:nth-child(${column + 1})`).textContent);

            return a > b ? (1 * directionModifier) : (-1 * directionModifier)
            

        } else {

            const aColumnValue = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            const bColumnValue = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

            return aColumnValue > bColumnValue ? (1 * directionModifier) : (-1 * directionModifier)
        }
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    table.querySelectorAll("th.sortable").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th.sortable:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th.sortable:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);

}

document.querySelectorAll(".table th.sortable").forEach(th => {
    th.addEventListener("click", () => {
        const tableElement = th.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(th.parentElement.children, th);
        const currentIsAsc = th.classList.contains("th-sort-asc");
        const currentIsNumeric = th.classList.contains("numeric");

        sortTableByColumn(tableElement, headerIndex, !currentIsAsc, currentIsNumeric);
    })
})
