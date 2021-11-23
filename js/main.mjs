import * as Helpers from "./modules/helpers.mjs";
import * as Filter from "./modules/filter.mjs";
import * as Sort from "./modules/sort.mjs";


const countriesURL = "https://restcountries.com/v3.1/all";

const rows = document.querySelector("#data").children;
let countries;

// TODO: FIX FETCH

fetch(countriesURL)
    .then(res => res.json())
    .then(data => {
        countries = data;
        displayTable(countries);
    })

function displayTable() {
    const populatedRows = countries.map((country) => {
        return `
        <tr>
            <td>${country.name.common}</td>
            <td>${country.currencies ? displayCurrencies(country.currencies) : "---"}</td>
            <td>${country.languages ? displayLanguages(country.languages) : "---"}</td>
            <td>${country.population}</td>
            <td>${country.area}</td>
            <td><img class="flag-container" src="${Helpers.getFlags(country.flags)}" alt="the flag of ${country.name.common}"/></td>
        </tr>`;
        })
        
        .join("");

    document.querySelector("#data").innerHTML = populatedRows;

}

const displayCurrencies = (currencies) => {
    return Helpers.getCurrencies(currencies).join(",<br>");
}

const displayLanguages = (languages) => {
    return Helpers.getLanguages(languages).join(",<br>");
}

// FILTER TABLE
document.querySelector("#cta").addEventListener("click", e => {
    const min = document.querySelector("#min-population-inp").value;
    const max = document.querySelector("#max-population-inp").value;
    const keyword = document.querySelector("#keyword-inp").value.trim();

    Filter.filterTable(keyword, min, max);
});

// SORT TABLE
document.querySelectorAll(".table th.sortable").forEach(th => {
    th.addEventListener("click", () => {
        const tableElement = th.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(th.parentElement.children, th);
        const currentIsAsc = th.classList.contains("th-sort-asc");
        const currentIsNumeric = th.classList.contains("numeric");

        Sort.sortTableByColumn(tableElement, headerIndex, !currentIsAsc, currentIsNumeric);
    })
})

export { rows };