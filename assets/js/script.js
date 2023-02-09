let map;

// added and centered map
function initMap() {
  const wales = new google.maps.LatLng(52.1580, -3.9076);
  map = new google.maps.Map(document.getElementById('map'), {
    center: wales,
    zoom: 8,
  });
}

// spots array
let spots = ['Dorothea Quarry', 'Llyn Tegid', 'Blue Lake', 'Pont Melin-Fach', 'Nant Gwrelych', 'Henrhyd Falls',
'Pistyll Rhaeadr', 'Horseshoe Falls', 'Three Cliffs Bay', 'Rhossili Bay', 'Llynnau Mymbyr', 'Llyn Crafnant',
'Llyn Dinas', 'River Towy', 'Llyn y Fan Fach'];
// loop through spots array
for (let i = 0; i < spots.length; i++) {
  // call geocoding API and extract coordinates and place ids for each item
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${spots[i]}&key=AIzaSyB4_LlKcmjksW1RPD-Zm2y-t0JR7KMMtV4`)
  .then((response) => {
    return response.json();
  }).then(jsonData => {
    console.log(jsonData.results[0].place_id);
    console.log(jsonData.results[0].geometry.location);
   
  })
  .catch(error => {
    console.log(error);
  })
}

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
