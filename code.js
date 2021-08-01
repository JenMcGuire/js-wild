// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here



const fallbackLocation = { latitude: 41.975028699999996, longitude: -88.0072909 }

let photosArray = []
let currentPhotoIndex = 0

function assembleImageSourceURL (photoObj) {
    return `https://farm${photoObj.farm}.staticflickr.com/` +
        `${photoObj.server}/` +
        `${photoObj.id}_${photoObj.secret}.jpg`;
};

function showPhotos(data) {
    console.log(data)
    photosArray = data.photos.photo
    console.log(assembleImageSourceURL(photosArray[currentPhotoIndex]))
}

function processResponse(response) {
    let responsePromise = response.json()
    responsePromise.then(showPhotos)
}

function requestPhotos(location) {
    console.log("Requesting photos near " + location.latitude + ", " + location.longitude)

    let myApiKey = "aef26760380a73c68ee427fcba56c0c7"
    let url = 'https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key=' + myApiKey + '&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=' + location.latitude + '&lon=' + location.longitude + '&text=trains'

    let fetchPromise = fetch(url)
    fetchPromise.then(processResponse)
}

function useCurrentLocation(pos) {
    console.log("Using the actual location")
    console.log(pos)
    requestPhotos(pos.coords)
}

function useFallbackLocation() {
    console.log("I could not find you!")
    requestPhotos(fallbackLocation)
}

navigator.geolocation.getCurrentPosition(useCurrentLocation, useFallbackLocation)

