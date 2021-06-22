const allCountries = 'https://restcountries.eu/rest/v2/all';

fetch(allCountries)
.then(res => res.json())
.then(data => {
    temp = "";
    data.forEach(country => {
        temp += `<tr>`;
        temp += `<td>${country.name}</td>`;
        temp += `<td>${country.currencies.name}</td>`
        temp += `<td>${country.languages.name}</td>`
        temp += `<td>${country.population}</td>`
        temp += `<td>${country.area}</td>`
        temp += `<td>${country.flag}</td>`
        temp += `</tr>`;
    })

    document.getElementById("data").innerHTML = temp;


})