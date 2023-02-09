let map;

// added and centered map
function initMap() {
  const wales = new google.maps.LatLng(52.1580, -3.9076);
  map = new google.maps.Map(document.getElementById('map'), {
    center: wales,
    zoom: 7,
  });
    // added markers
    new google.maps.Marker({
      position: {lat: 52.8552183, lng: -3.3787533},
      map
    });

    new google.maps.Marker({
      position: {lat: 53.0551749, lng: -4.2407414},
      map
    });

    new google.maps.Marker({
      position: {lat: 51.88179659999999, lng: -3.7415411},
      map
    });

    new google.maps.Marker({
      position: {lat: 52.8972141, lng: -3.6088066},
      map
    });

    new google.maps.Marker({
      position: {lat: 51.79562439999999, lng: -3.664348099999999},
      map
    });

    new google.maps.Marker({
      position: {lat: 52.981314, lng: -3.1997901},
      map
    });

    new google.maps.Marker({
      position: {lat: 51.7822701, lng: -3.5845648},
      map
    });

    new google.maps.Marker({
      position: {lat: 53.09786321255787, lng: -3.928736052823314},
      map
    });

    new google.maps.Marker({
      position: {lat: 52.6887894, lng: -4.0417908},
      map
    });

    new google.maps.Marker({
      position: {lat: 51.91971329382864, lng: -4.091270186035342},
      map
    });

    new google.maps.Marker({
      position: {lat: 51.5780409, lng: -4.3001967},
      map
    });

    new google.maps.Marker({
      position: {lat: 53.0684687, lng: -4.0768601},
      map
    });

    new google.maps.Marker({
      position: {lat: 53.0256944, lng: -4.0628135},
      map
    });
}

// spots array
const spots = ['Dorothea Quarry', 'Llyn Tegid', 'Blue Lake Wales', 'Pont Melin-Fach', 'Henrhyd Falls',
              'Pistyll Rhaeadr', 'Horseshoe Falls Wales', 'Bae y Tri Chlogwyn', 'Rhossili Bay', 
              'Llynnau Mymbyr', 'Llyn Dinas', 'River Towy', 'Llyn y Fan Fach'];
// loop through spots array
const coord = [];
const spotsID = [];
for (let i = 0; i < spots.length; i++) {
  // call geocoding API and extract coordinates and place ids for each item
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${spots[i]}&key=AIzaSyB4_LlKcmjksW1RPD-Zm2y-t0JR7KMMtV4`)
  .then((response) => {
    return response.json();
  }).then(jsonData => {
    // stored coordinates and place ids in arrays
    coord.push(jsonData.results[0].geometry.location);
    coord.push(jsonData.results[0].geometry.location);
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