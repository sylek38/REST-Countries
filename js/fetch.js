//fetch api
const allCountries = "https://restcountries.eu/rest/v2/all";

fetch(allCountries)
    .then(res => res.json())
    .then(data => displayTableValues(data))

const rows = document.querySelector('tbody').children;

function displayTableValues(countries) {

    console.log(countries)
    
    tableRows = countries.map((country, idx) => {
        
            return `
        <tr>
            <td>${displayProps(country.name)}</td>
            <td>${displayProps(country.currencies)}</td>
            <td>${displayProps(country.languages)}</td>
            <td>${displayProps(country.population)}</td>
            <td>${displayProps(country.area)}</td>
            <td><img class="flag-container" src="${displayProps(country.flag)}" alt="the flag of ${displayProps(country.name)}"/></td>
        </tr>`;
        })
        .join("");

    document.querySelector("#data").innerHTML = tableRows;

}

// TODO: refactor this function. it can be done better
displayProps = (countryProp) => {
    // console.log(typeof(countryProp), countryProp)
    let tabl = [];

    if (countryProp === null) {
        tabl.push("---");
    }

    else if (countryProp === "number") {
        tabl.push(parseInt(countryProp.toLocaleString()))
    }

    else if (typeof (countryProp) === "object") {
        for (let prop in countryProp) {
            for (let nestedProp in countryProp[prop]) {
                if (nestedProp === "name") {
                    tabl.push(countryProp[prop][nestedProp]);
                }
            }
        }

    } else {
        tabl.push(countryProp);
    }

    return tabl.join(",<br>");
}

// FILTER BY KEYWORD

const keyword = document.querySelector("#keyword-inp").value.trim();

 document.querySelector("#cta").addEventListener("click", e => {
        e.preventDefault();
        filterByKeyword(keyword)
});



const filterByKeyword = keyword => {
    // if (keyword ){}

    // displayTableValues()
}


// set max inp value dynamically + set min inp value
// const populationInputs = document.querySelectorAll(".num-inp");

// const maxPopulationArr = [];
// Array.from(rows).forEach(row => maxPopulationArr.push(row[3]));


// populationInputs.forEach(input => {
//     input.setAttribute("min", 0);
//     input.setAttribute("max", Math.max(...maxPopulationArr));
// })



// show results by keyword

// const min = document.querySelector("#min-population-inp").value;
// const max = document.querySelector("#max-population-inp").value;
// const keyword = document.querySelector("#keyword-inp").value.trim();

// document.querySelector("#cta").addEventListener("click", e => {
//     e.preventDefault();
//     getKeyword(rows);



    // Array.from(rows).forEach(row => {
    //     console.log(row);
    //     row.textContent.toLowerCase().includes(keyword.toLowerCase()) ?
    //         row.style.display = "table-row"
    //         :
    //         row.style.display = "none";
    // })

    // console.log(min)
    Array.from(rows).forEach((row, idx) => {
        let populationTd = parseInt(row.children[3].innerText.replace(/\s/g, ""))
        populationTd >= min && populationTd <= max ?
            row.style.display = "table-row" 
            :
            row.style.display = "none"

    })


// const getKeyword = rows => {
//     [...rows].forEach(row => {
//         console.log(row);
//         row.textContent.toLowerCase().includes(keyword.toLowerCase()) ?
//             row.style.display = "table-row" :
//             row.style.display = "none";
//     })
// }

// const getMinGetMax = rows => {
//     [...rows].forEach((row, idx) => {
//         let populationTd = parseInt(row.children[3].innerText.replace(/\s/g, ""))
//         populationTd >= min && populationTd <= max ?
//             row.style.display = "table-row" :
//             row.style.display = "none"

//     })
// }



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
