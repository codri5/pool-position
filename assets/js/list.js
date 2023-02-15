const locationsDiv = document.querySelector("#location-cards")
const locationLink = document.querySelector("#location-link")
// const searchBar = document.querySelector("#search_input")
const key = "fdfc69f0a3fe9836736635c42b79958b" 



// Global Variables, for liked button styling. 
const likeIcon =  "fa-solid fa-heart";
const unlikeIcon = "fa-regular fa-heart";


let updateLocations = function(locations) {
    // For the first time, locations will equal the locations.js. Once user selects a favourite, 
    // from then on, locations will equal what is stored in local storage. 
    let locationsFromStorage = localStorage.getItem("locations")
    if (locationsFromStorage === null) {
        return locations
    } else {
        locations = JSON.parse(locationsFromStorage)
        return locations
    }
}


// Render the Location card information with data from locations object. 
let renderLocations = function() {

    locationsDiv.innerHTML = '';

    locations.forEach(location => {

        let card = document.createElement("div")  // Create card container
        card.setAttribute("id", location["name"])
        card.setAttribute("class", "card")
        card.setAttribute("data-fave", location["isFavourite"])
        
        let imageContainer = document.createElement("div") // Create image container
        imageContainer.setAttribute("class", "image-container")
        
        let img = document.createElement("img") // The photo
        img.setAttribute("class", "card-img-top location-image")
        img.setAttribute("src", location["images"][0])

        let icon = document.createElement("i") // Create icon. Check property to determine which icon
        if (location["isFavourite"] === false) {
            icon.setAttribute("class", unlikeIcon)
        } else if (location["isFavourite"] === true) {
            icon.setAttribute("class", likeIcon)
        }

        let cardBody = document.createElement("div") // Create the container for the bottom half of the card
        cardBody.setAttribute("class", "card-body d-flex")

        let textContainer = document.createElement("div") // Create the container for the text elements
        textContainer.setAttribute("class", "textContainer col")

        let placeName = document.createElement("h5") // The Title
        placeName.setAttribute("class", "card-title")
        placeName.innerText = location["name"]

        let locationText = document.createElement("p") // The Area
        locationText.setAttribute("class", "card-title")
        locationText.innerText = location["area"]

        let weatherContainer = document.createElement("div") // Create the container for the weather elements
        weatherContainer.setAttribute("class", "weatherContainer col d-flex")

        let weatherIcon = document.createElement("img") // The weather icon. 
        weatherIcon.setAttribute("class", "icon-image row")
        let lat = location["latlng"]["lat"] // Getting coords from locations.js
        let lng = location["latlng"]["lng"]

        let tempText = document.createElement("p")
        tempText.setAttribute("class", "row")

        // Get the current weather for each location. 
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + key + "&units=metric"
        let iconURL = ""
        let temp = ""

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            iconCode = response.list[0].weather[0].icon 
            temp = response.list[0].main.temp 
            iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            weatherIcon.setAttribute("src", iconURL)
            tempText.innerText = (`${temp}°C`)
        })
    
        
        // Appending each item to the locationsDiv
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


// If user likes or unlikes, update locations object, and store in local storage. 
let likeButton = function(event) {
    // Use an event target to retrieve the card's ID name and to update the property for the corrosponding object.
    let heart = event.target
    let check = heart.tagName
    let parent = heart.parentElement
    let grandParent = parent.parentElement
    let locationId = grandParent.getAttribute("id")


    // As using event deligation, check if the item is an icon > Then change class, update locations object then store in local storage. 
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