


// let getWeather = function() {

//     locations.forEach(element => {
//         console.log(element["name"]);

//         let lat = element["latlng"]["lat"]
//         let lng = element["latlng"]["lng"]
//         let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + key + "&units=metric"
      
            
//         $.ajax({
//             url: queryURL,
//             method: "GET",
//         }).then(function(response) {
//             iconCode = response.list[0].weather[0].icon 
//             iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png"

//         })

//     });




// }




// locationLink.addEventListener("click", getWeather)