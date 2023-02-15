const locationsDiv = document.querySelector("#location-cards")
const locationLink = document.querySelector("#location-link")
const searchBar = document.querySelector("#search_input")
const key = "62d5440eb21080da0f55dfad5e6d254d"
// const key = "fdfc69f0a3fe9836736635c42b79958b" - second key



const likeIcon =  "fa-solid fa-heart";
const unlikeIcon = "fa-regular fa-heart";


let updateLocations = function(locations) {
    let locationsFromStorage = localStorage.getItem("locations")
    if (locationsFromStorage === null) {
        return locations
    } else {
        locations = JSON.parse(locationsFromStorage)
        return locations
    }
}


// -------------------------- NEED TO KNOW HOW TO RETURN FROM AN AJAX --------------------------------

// let getWeatherIcon = function(lat, lng) {
//     console.log(lat, lng);

//     let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + key + "&units=metric"
//     let iconURL = ""

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(function(response) {
//         console.log(queryURL)
//         iconCode = response.list[0].weather[0].icon 
//         console.log(response);
//         console.log(iconCode);
//         iconURL = "http://openweathermap.org/img/wn/" + iconCode + ".png";
//         console.log("1", iconURL);
//         return iconURL /// Need to know how to return this item

//     })
//     console.log("2",iconURL);
//     return iconURL /// Need to know how to return this item

// }



let renderLocations = function() {

    locationsDiv.innerHTML = '';

    locations.forEach(location => {
   
        let card = document.createElement("div")
        card.setAttribute("id", location["name"])
        card.setAttribute("class", "card")
        card.setAttribute("data-fave", location["isFavourite"])

        let imageContainer = document.createElement("div")
        imageContainer.setAttribute("class", "image-container")

        let img = document.createElement("img")
        img.setAttribute("class", "card-img-top location-image")
        img.setAttribute("src", location["images"][0])

        let icon = document.createElement("i")
        if (location["isFavourite"] === false) {
            icon.setAttribute("class", unlikeIcon)
        } else if (location["isFavourite"] === true) {
            icon.setAttribute("class", likeIcon)
        }

        let cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body d-flex")

        let textContainer = document.createElement("div")
        textContainer.setAttribute("class", "textContainer col")


        let placeName = document.createElement("h5")
        placeName.setAttribute("class", "card-title")
        placeName.innerText = location["name"]

        let locationText = document.createElement("p")
        locationText.setAttribute("class", "card-title")
        locationText.innerText = location["area"]


        let weatherContainer = document.createElement("div")
        weatherContainer.setAttribute("class", "weatherContainer col d-flex")

        let weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("class", "icon-image row")
        let lat = location["latlng"]["lat"]
        let lng = location["latlng"]["lng"]

        let tempText = document.createElement("p")
        tempText.setAttribute("class", "row")





        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + key + "&units=metric"
        let iconURL = ""
        let temp = ""

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            console.log(queryURL)
            iconCode = response.list[0].weather[0].icon 
            temp = response.list[0].main.temp 
            console.log(temp);
            console.log(response);
            console.log(iconCode);
            iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            console.log("1", iconURL);
            weatherIcon.setAttribute("src", iconURL)
            tempText.innerText = (`${temp}°C`)

        })

        
       





        // let weatherIconURL = getWeatherIcon(lat, lng)
        // console.log(weatherIconURL)
        // weatherIcon.setAttribute("src", weatherIconURL)



        imageContainer.appendChild(icon)
        imageContainer.appendChild(img)

        textContainer.appendChild(placeName)
        textContainer.appendChild(locationText)

        cardBody.appendChild(textContainer)

        weatherContainer.appendChild(weatherIcon)
        weatherContainer.appendChild(tempText)

        cardBody.appendChild(weatherContainer)

        card.appendChild(imageContainer)
        card.appendChild(cardBody)
        locationsDiv.appendChild(card)
    });
}

let likeButton = function(event) {
    let heart = event.target
    let check = heart.tagName
    let parent = heart.parentElement
    let grandParent = parent.parentElement
    let locationId = grandParent.getAttribute("id")


    if (check === "I") {
        if (heart.classList.contains("fa-regular")) {
            heart.setAttribute("class",likeIcon)
            const locationsIndex = locations.findIndex(({ name }) => name === locationId);
            locations[locationsIndex].isFavourite = true
       
        } else if (heart.classList.contains("fa-solid")) {
            heart.setAttribute("class",unlikeIcon)
            const locationsIndex = locations.findIndex(({ name }) => name === locationId);
            locations[locationsIndex].isFavourite = false
    
        }
        let locationsString = JSON.stringify(locations)
        localStorage.setItem("locations", locationsString)

    }
}






locations = updateLocations(locations)
locationLink.addEventListener("click", renderLocations)
locationsDiv.addEventListener("click", likeButton)