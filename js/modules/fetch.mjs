const countriesURL = "https://restcountries.com/v3.1/all";

const getCountriesInfo = () => {
    fetch(countriesURL)
        .then(res => res.json())
        .then(data => {
            return data;
        })
}

export { getCountriesInfo };