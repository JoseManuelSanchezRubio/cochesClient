


export async function getBranches() {
    let response = await fetch('http://localhost:5218/api/Branch');
    let data = await response.json();
    return data;
}