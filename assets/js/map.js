let map;
let infWindow = false;
// added and centered map
function initMap() {
  const wales = new google.maps.LatLng(52.1580, -3.9076);
  map = new google.maps.Map(document.getElementById('map'), {
    center: wales,
    zoom: 7.3,
  });
  // create markers and info windows
  for (let i = 0; i < locations.length; i++) {
    const marker = new google.maps.Marker({
      position: latlng[i],
      animation: google.maps.Animation.DROP,
      map
    });
    // change marker color
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
    // info windows content
    const windowContent = `<img id="windowImg" src="${mainImg[i]}" http://maps.google.com/mapfiles/ms/icons/green-dot.png/>
                           <h6 id="windowNames">${names[i]}</h1>
                           <p id="windowArea">${area[i]}</p>
                           <p id="windowRtg">★ ${rating[i]}</p>
                           <p id="dir"><a class="dir href="${directions[i]}" target=_blank>Get Directions</a></p>`;
    const info = new google.maps.InfoWindow({
      content: windowContent,
    });
    // event listener
    google.maps.event.addListener(marker, 'click', function() {
      if(infWindow) {
        infWindow.close();
      }
      infWindow = info;
      info.open(map, marker);
    });
  }
}
// create arrays from main object
const latlng = [];
locations.forEach(item => latlng.push(item.latlng));
const names = [];
locations.forEach(item => names.push(item.name));
const mainImg = [];
locations.forEach(item => mainImg.push(item.images[0]));
const area = [];
locations.forEach(item => area.push(item.area));
const rating = [];
locations.forEach(item => rating.push(item.rating));
const directions = [];
locations.forEach(item => directions.push(item.directions));