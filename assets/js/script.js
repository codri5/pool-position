let map;

// added and centered map
function initMap() {
  const wales = new google.maps.LatLng(52.1580, -3.9076);
  map = new google.maps.Map(document.getElementById('map'), {
    center: wales,
    zoom: 7,
  });
  // added markers
  setTimeout(function () {
    for (let i = 0; i < spots.length; i++) {
      new google.maps.Marker({
        position: coord[i],
        map
      });
    }
  }, 100) 
}

// spots array
const spots = ['Dorothea Quarry', 'Llyn Tegid', 'Blue Lake Wales', 'Pont Melin-Fach', 
              'Henrhyd Falls', 'Pistyll Rhaeadr', 'Horseshoe Falls Wales', 'Bae y Tri Chlogwyn', 
              'Rhossili Bay', 'Llynnau Mymbyr', 'Llyn Dinas', 'River Towy', 'Llyn y Fan Fach'];

// declare coord and id arrays
const coord = [];
const spotsID = []; 
// loop through spots array
for (let i = 0; i < spots.length; i++) {
  // call geocoding API and extract coordinates and place ids for each item
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${spots[i]}&key=AIzaSyB4_LlKcmjksW1RPD-Zm2y-t0JR7KMMtV4`)
  .then((response) => {
    return response.json();
  }).then(jsonData => {
    // stored coordinates and place ids in arrays
      coord.push(jsonData.results[0].geometry.location);
      spotsID.push(jsonData.results[0].place_id)
  })
  .catch(error => {
    console.log(error);
  })
}
// await call to complete before logging arrays
setTimeout(function () {
  console.log(coord);
  console.log(spotsID);
}, 100)
/*
// Slideshow to randomly display on fade-out-fade-in
let slideshow = document.querySelector("#slideshow");
let slides = slideshow.querySelectorAll("img");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 3000);

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
*/