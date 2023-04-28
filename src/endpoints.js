


export async function getBranches() {
    let response = await fetch('http://localhost:5218/api/Branch');
    let data = await response.json();
    return data;
}

/* export async function getBranches() {
    let response = await fetch('http://localhost:5218/api/Branch', {
        credentials: 'include'
    });
    let data = await response.json();
    return data;
} */

/* export async function getAvailability(branchId, initialDate, finalDate) {
    let response = await fetch(`http://localhost:5218/api/Car/availability/${branchId}/${initialDate}/${finalDate}`);
    let data = await response.json();
    return data;

} */