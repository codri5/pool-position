// Included because my hamburger menu doesn't open, but as this is supposed to be a default in Bootstrap, maybe this is redundant?

$(document).ready(function(){
    $(".navbar-toggler").click(function(){
      $(".navbar-toggler").toggleClass("active");
    });
  });  

//   Slideshow to randomly display on fade-out-fade-in
let slideshow = document.querySelector("#slideshow");
let slides = slideshow.querySelectorAll("img");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 3000);

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

// To close or dismiss the modal that appears when user clicks on "About" in navbar
$(document).ready(function() {
  $('#aboutModal').on('shown.bs.modal', function () {
    $('#aboutModal').trigger('focus')
  });
  $("button.close").click(function() {
    $("#aboutModal").modal("hide");
  });
});

let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 8
  });
  
  marker = new google.maps.Marker({
    position: {lat: 37.7749, lng: -122.4194},
    map: map
  });
}

let mapLocation1 = new google.maps.Map(document.getElementById('map-location-1'), {
  zoom: 8,
  center: {lat: 37.7749, lng: -122.4194}
});

let mapLocation2 = new google.maps.Map(document.getElementById('map-location-2'), {
  zoom: 8,
  center: {lat: 47.6062, lng: -122.3321}
});

