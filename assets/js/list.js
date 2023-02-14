const locationsDiv = document.querySelector("#location-cards")
const discoverBtn = document.querySelector("#hero-search")
const locationLink = document.querySelector("#location-link")
const searchBar = document.querySelector("#search_input")
// const firsticon = document.querySelector("#firsticon")

const likeIcon =  "fa-solid fa-heart";
const unlikeIcon = "fa-regular fa-heart";

let updateLocations = function(locations){
    let locationsFromStorage = localStorage.getItem("locations")
    console.log("returned",locationsFromStorage)
    if (locationsFromStorage === null) {
        console.log("null");
        return locations
    } else {
        locations = JSON.parse(locationsFromStorage)
        console.log(locations);
        return locations
    }
}

let renderLocations = function() {
    console.log("inside",locations); 
    locations.forEach(location => {
   
    let card = document.createElement("div")
    card.setAttribute("id", location["name"])
    card.setAttribute("class", "card")
    card.setAttribute("data-fave", location["isFavourite"])

    let imageContainer = document.createElement("div")
    imageContainer.setAttribute("class", "image-container")

    let img = document.createElement("img")
    img.setAttribute("class", "card-img-top")
    img.setAttribute("src", location["images"][0])

    let cardBody = document.createElement("div")
    cardBody.setAttribute("class", "card-body")

    let placeName = document.createElement("h4")
    placeName.setAttribute("class", "card-title")
    placeName.innerText = location["name"]

    let icon = document.createElement("i")
    if (location["isFavourite"] === false) {
        console.log("location", location , location["isFavourite"]);
        icon.setAttribute("class", unlikeIcon)
    } else if (location["isFavourite"] === true) {
        console.log("location", location , location["isFavourite"]);
        icon.setAttribute("class", likeIcon)
    }

    let locationText = document.createElement("h5")
    locationText.setAttribute("class", "card-title")
    locationText.innerText = location["area"]

    let smallText = document.createElement("p")
    smallText.setAttribute("class", "card-text")
    smallText.innerText = "Some quick example text to build on the card and make up the buold of the content"

    cardBody.appendChild(placeName)
    cardBody.appendChild(locationText)
    cardBody.appendChild(icon)
    cardBody.appendChild(smallText)

    imageContainer.appendChild(img)

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

    // console.log(event);
    console.log(heart);
    // console.log(parent);
    console.log(grandParent);

    let locationId = grandParent.getAttribute("id")
    console.log(locationId);

    if (check === "I") {
        if (heart.classList.contains("fa-regular")) {
            console.log(heart);
            heart.setAttribute("class",likeIcon)
            console.log(grandParent);
            const locationsIndex = locations.findIndex(({ name }) => name === locationId);
            // console.log(locationsIndex)
            locations[locationsIndex].isFavourite = true
            // console.log(locations);
            let locationsString = JSON.stringify(locations)
            // console.log(locationsString);
            localStorage.setItem("locations", locationsString)
       
        } else if (heart.classList.contains("fa-solid")) {
            console.log(heart);
            heart.setAttribute("class",unlikeIcon)
            console.log(grandParent);
            const locationsIndex = locations.findIndex(({ name }) => name === locationId);
            // console.log(locationsIndex)
            locations[locationsIndex].isFavourite = true
            // console.log(locations);
            let locationsString = JSON.stringify(locations)
            // console.log(locationsString);
            localStorage.setItem("locations", locationsString)
        }
    }
}



locations = updateLocations(locations)

// addEventListener("load", )
// searchBar.addEventListener("keydown", showmap)
locationLink.addEventListener("click", renderLocations)
locationsDiv.addEventListener("click", likeButton)