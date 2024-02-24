const planetContainer = document.getElementById("planets");

function getPlanets(page) {
  fetch(`https://swapi.dev/api/planets/?format=json`).then((response) =>
    response.json()
  );
}
