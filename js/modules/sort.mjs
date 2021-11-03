import { rows } from "../main.mjs";

function sortTableByColumn(table, column, asc = true, isNumeric) {
    const directionModifier = asc ? 1 : -1;
    const tBody = document.querySelector("#data");

    const sortedRows = Array.from(rows).sort((a, b) => {
        if (isNumeric) {
            
            const aColumnValue = parseInt(a.querySelector(`td:nth-child(${column + 1})`).textContent);
            const bColumnValue = parseInt(b.querySelector(`td:nth-child(${column + 1})`).textContent);

            return aColumnValue > bColumnValue ? (1 * directionModifier) : (-1 * directionModifier)

        } else {

            const aColumnValue = a.querySelector(`td:nth-child(${column + 1})`).textContent.toLowerCase().trim();
            const bColumnValue = b.querySelector(`td:nth-child(${column + 1})`).textContent.toLowerCase().trim();

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

export { sortTableByColumn };