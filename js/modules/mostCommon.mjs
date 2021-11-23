const findFiveMostCommon = (allCountsOfElements) => {
    const fiveMostCommon = [];

    const hashMap = allCountsOfElements.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {});

    console.log(hashMap);

    for (let i = 1; i <= 5; i++) {
        const currentMostCommon = 
            Object.keys(hashMap)
            .reduce((a, b) => hashMap[a] > hashMap[b] ? a : b);
        
        fiveMostCommon.push(currentMostCommon);

        Object.keys(hashMap).forEach(key => {
            if (key === (fiveMostCommon[fiveMostCommon.length - 1])) {
                delete hashMap[key];
            }
        });
        
    }

    return fiveMostCommon;

}

export { findFiveMostCommon };