document.addEventListener("DOMContentLoaded", async function () {
  showLoading();
  setTimeout(async () => {
    const data = await getStreetData();
    clearPage();
    buildPage(data);
  }, 1000);

  const refreshButton = document.querySelector("p");
  refreshButton.addEventListener("click", async function () {
    clearPage();
    showLoading();

    setTimeout(async () => {
      const data = await getStreetData();
      clearPage();
      buildPage(data);
    }, 1000);
  });
});

const showLoading = () => {
  const streetContainer = document.querySelector(".streets");
  const loading = document.createElement("article");
  loading.innerHTML = `
    <progress></progress>
    `;
  streetContainer.appendChild(loading);
};

const getStreetData = async () => {
  const url = "https://smart-street-lighting.herokuapp.com/api/streets/";
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const buildPage = (data) => {
  const streetContainer = document.querySelector(".streets");
  data.forEach((street) => {
    const streetElement = document.createElement("details");
    streetElement.innerHTML = `
        <summary>${street.id} - ${street.name}</summary>
        <div class="grid">
        ${street.lamps
          .map((lamp) => {
            return `
            <article>
            <h3>ID: ${lamp.id}</h3>
            <p>
                Status: <strong>${
                  lamp.status === "on"
                    ? "<mark>" + lamp.status + "</mark>"
                    : lamp.status
                }</strong>
            </p>
            <footer>
                <p>Brightness: <strong>${lamp.brightness}</strong></p>
                <progress value="${lamp.brightness}" max="100" %>></progress>
            </footer>
            </article>
        `;
          })
          .join("")}
        </div>
        `;
    streetContainer.appendChild(streetElement);
  });

  const mapContainer = document.querySelector("#mapContainer");
  mapContainer.innerHTML = `
    <h3>Overview</h3>
    <div class="leafletMapbox">
        <div id="map"></div>
    </div>
  `;

  addMap();
};

const clearPage = () => {
  const streetContainer = document.querySelector(".streets");
  streetContainer.innerHTML = "";

  const mapContainer = document.querySelector("#mapContainer");
  mapContainer.innerHTML = "";
};

const addMap = () => {
  var map = new L.map("map", { zoomControl: false }).setView(
    [50.97163316779158, 7.00961219657849],
    16
  );

  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
  map.dragging.disable();

  var mapInBox = L.tileLayer(
    "https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  mapInBox.addTo(map);

  //Draw Line for 'Schützenhofstrasse'
  var streetOnePointList = [
    [50.970794756723286, 7.009275224520514],
    [50.97147135926861, 7.007670299883486],
  ];
  var streetOneCol = "#4746E0";

  var firstPolyline = L.polyline(streetOnePointList, {
    color: streetOneCol,
    weight: 6,
  }).addTo(map);

  //Draw Line for 'Berliner Strasse'
  var streetTwoPointList = [
    [50.96951107535977, 7.007065084378232],
    [50.970794756723286, 7.009275224520514],
    [50.970799823820414, 7.009296682202651],
    [50.971110604465025, 7.009811666356889],
    [50.971434895095875, 7.010181811186542],
    [50.97394809689066, 7.012821076026798],
  ];
  var streetTwoCol = "#1095c1";

  var secondPolyline = L.polyline(streetTwoPointList, {
    color: streetTwoCol,
    weight: 6,
  }).addTo(map);
};
