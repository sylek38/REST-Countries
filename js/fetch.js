const allCountries = 'https://restcountries.eu/rest/v2/all';

fetch(allCountries)
.then(res => res.json())
.then(data => {
    temp = "";
    data.forEach(country => {
        temp += `<tr>`;
        temp += `<td>${country.name}</td>`;
        temp += `<td>${country.currencies[0].name}</td>`
        temp += `<td>${country.languages[0].name}</td>`
        temp += `<td>${country.population}</td>`
        temp += `<td>${country.area}</td>`
        temp += `<td><img class="flag-container" src="${country.flag}"></td>`
        temp += `</tr>`;
    })

    document.getElementById("data").innerHTML = temp;


})