import { rows } from "../main.mjs";

const getMaxPopulationValue = () => {
    let populationArray = [];
    
    Array.from(rows).forEach(row => {
        populationArray.push(row.children[3].textContent);
    })
    
    return Math.max(...populationArray);
};

const filterTable = (keyword, min, max) => {

    min = min ? parseInt(min) : 0;
    max = max ? parseInt(max) : parseInt(getMaxPopulationValue());

    // Filter by keyword && min/max
    if (keyword !== "") {

        Array.from(rows).forEach(row => {
            if (row.textContent.toLowerCase().includes(keyword.toLowerCase()) &&
                min <= parseInt(row.children[3].textContent.replace(/\D/g, '')) &&
                max >= parseInt(row.children[3].textContent.replace(/\D/g, ''))) {

                row.style.display = "";
                row.classList.add("visible");

            } else {

                row.style.display = "none";

            }
        });

    // Filter only by min/max
    } else {

        Array.from(rows).forEach(row => {
            if (min <= parseInt(row.children[3].textContent.replace(/\D/g, '')) &&
                max >= parseInt(row.children[3].textContent.replace(/\D/g, ''))) {

                row.style.display = "";
                row.classList.add("visible");

            } else {

                row.style.display = "none";
            }
        });
    }
}

export { filterTable };