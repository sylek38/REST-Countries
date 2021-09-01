//fetch api
const allCountries = "https://restcountries.eu/rest/v2/all";

fetch(allCountries)
.then(res => res.json())
.then(data => displayTableValues(data))

const rows = document.querySelector('tbody').children;

function displayTableValues(countries){

    console.log(countries)

    tableRows = countries.map((country, idx) => {
        return `
        <tr>
            <td>${idx} ${country.name}</td>
            <td>${displayProps(country.currencies)}</td>
            <td>${displayProps(country.languages)}</td>
            <td>${country.population.toLocaleString()}</td>
            <td>${country.area ? country.area.toLocaleString() : '---'}</td>
            <td><img class="flag-container" src="${country.flag}" alt="the flag of ${country.name}"/></td>
        </tr>`;
    })
    .join("");

    document.querySelector("#data").innerHTML = tableRows;

}


displayProps = (countryProp) => {
    let tabl = [];
        for (let prop in countryProp) {
             let arr = countryProp[prop];
            for (let anotherProp in arr) {
                if (anotherProp === "name") {
                    tabl.push(arr[anotherProp]);
                    
                }
                
            }
        }
        return tabl.join(",<br>");
    }



// set max inp value dynamically + set min inp value
const populationInputs = document.querySelectorAll(".num-inp");

const maxPopulationArr = [];
Array.from(rows).forEach(row => maxPopulationArr.push(row[3]));


populationInputs.forEach(input => {
    input.setAttribute("min", 0);
    input.setAttribute("max", Math.max(...maxPopulationArr));
})



// // show results by keyword
// document.querySelector("#cta").addEventListener("click", e => {
//     e.preventDefault();
    
//     const keyword = document.querySelector("#keyword-inp").value.trim();
    
//     Array.from(rows).forEach(row => { 
//         row.textContent.toLowerCase().includes(keyword.toLowerCase()) ?
//             row.style.display = "table-row"
//             :
//             row.style.display = "none";
//     })   


//     // show results by keyword && values
//     const min = parseInt(document.querySelector("#min-population-inp")).value;
//     const max = parseInt(document.querySelector("#max-population-inp")).value;

//     let columnList = [];

//     for (row of rows) {
//         let columnEl = row.children[3];
//         if ((parseInt(columnEl.textContent) >= min) && (parseInt(columnEl.textContent) <= max) && (row.textContent.toLowerCase().includes(keyword.toLowerCase()))) {
//             columnList.push(columnEl.textContent);
//         }
//     }
//     document.querySelector("#data").innerHTML = columnList;


// })


