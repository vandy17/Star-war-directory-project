// script.js
const planetContainer = document.getElementById("planets");
const paginationContainer = document.getElementById("pagination");
let currentPage = 1;

function fetchPlanets(page) {
  fetch(`https://swapi.dev/api/planets/?format=json&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      displayPlanets(data.results);
      displayPagination(data.next, data.previous);
    })
    .catch((error) => console.error("Error fetching planets:", error));
}

function displayPlanets(planets) {
  planetContainer.innerHTML = "";
  planets.forEach((planet) => {
    const residentsList =
      planet.residents.length > 0
        ? `<ul class="residents-list">
        ${planet.residents.map((resident) => `<li>${resident}</li>`).join("")}
      </ul>`
        : "<p>No residents</p>";

    const planetCard = `
    <div class="card">
  <div class="card-header">
    ${planet.name}
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p><strong>Climate:</strong> ${planet.climate}</p>
      <p><strong>Population:</strong> ${planet.population}</p>
        <p><strong>Terrain:</strong> ${planet.terrain}</p>
      <footer class="blockquote-footer">${residentsList}</footer>
    </blockquote>
  </div>
</div>

    `;
    planetContainer.innerHTML += planetCard;
  });
}

function displayPagination(next, previous) {
  paginationContainer.innerHTML = "";
  if (previous) {
    paginationContainer.innerHTML += `<button class="page-item" onclick="fetchPlanets(${
      currentPage - 1
    })">Previous</button>`;
  }
  if (next) {
    paginationContainer.innerHTML += `<button class="page-item" onclick="fetchPlanets(${
      currentPage + 1
    })">Next</button>`;
  }
}

fetchPlanets(currentPage);
