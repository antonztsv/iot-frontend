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
// var streetOneCol = "#ff0000";

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
// var streetTwoCol = "#ff0000";

var secondPolyline = L.polyline(streetTwoPointList, {
  color: streetTwoCol,
  weight: 6,
}).addTo(map);

//This is only a test how to change color of the lines afterwards.
//The Street line of Street One is now green, after it was initially red.
//In order to prevent that the green line is just drawn over the red one,
// we must remove the red line first.
// map.removeLayer(firstPolyline);
// streetOneCol = "#1095c1";
// firstPolyline = L.polyline(streetOnePointList, { color: streetOneCol }).addTo(
//   map
// );
