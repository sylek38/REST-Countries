const getCurrencies = (countryProp) => {
    let currencies = [];

        for (let prop in countryProp) {
            for (let nestedProp in countryProp[prop]) {
                if (nestedProp === "name") {
                    currencies.push(countryProp[prop][nestedProp]);
                }
            }
        }

    return currencies;
}


const getLanguages = (countryProp) => {
    let languages = [];

    for (let prop in countryProp) {
        languages.push(countryProp[prop]);
    }

    return languages;

}

const getFlags = (flagProp) => {
    for (let prop in flagProp) {
        if (prop === "svg") {
            return flagProp[prop];
        }
    }
}

export { getLanguages, getCurrencies, getFlags }