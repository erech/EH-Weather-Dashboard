//constants of html elements

const currentWthr = $('#currentWthr')
const cityLoc = $('#cityLoc')
const cityTemp = $('#cityTemp')
const cityWind = $('#cityWind')
const cityHumidity = $('#cityHumidity')

const userSearch = $('#userSearch')
const searchBttn = $('#searchBttn')
const searchHistory = $('#searchHistory')
const clearBttn = $('#clearDataBttn')

const windowEl = {
    init: () => {

        document.getElementById('getLocationEl')
        document.addEventListener('click', windowEl.getLocation)
    },


    fetchWeather: (position) => {
        let latitude = String(position.coords.latitude);
        let longitude = String(position.coords.longitude);

        let key = 'abaee6a5b250f2ea1a819bc5044c5897';
        let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + key + '&units=metric&lang=en';
        console.log(apiUrl);

        fetch(apiUrl)
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(data => {
                windowEl.showWeather(data.weather[0].description)
            })
            .catch(console.err);
    },
    getLocation: (ev) => {
        let opts = {
            enableHighAccuracy: true,

            timeout: 1000 * 10,
            maximumAge: 1000 * 60 * 5,
        };
        navigator.geolocation.getCurrentPosition(windowEl.fetchWeather, windowEl.error)
    },
    ftw: (position) => {
        windowEl.fetchWeather(position);
    },
    error: () => {
        console.log("error occured");
    },

    showWeather: (resp) => {
        console.log(resp)
    }
};


//localStorage
let saveSearch = JSON.parse(localStorage.getItem("currWeather"))
    if (saveSearch == null) saveSearch = []

    //function to append the searched city to aside element on html
    function appendValue() {
        // Get the value of input and aside element from html
        var inputValue = document.getElementById("inputElement").value
        var asideElement = document.getElementById("asideElement")

        // Create a new paragraph element
        var newParagraph = document.createElement("p")

        // Set the text content and append 
        var paragraphText = document.createTextNode(inputValue)
        newParagraph.appendChild(paragraphText)

        asideElement.appendChild(newParagraph)
    }

// function to clear search data
clearDataBttn.click(function()
{
    searchHistory.text("")
    saveSearch = []
    localStorage.clear()
})
  
//function to repeat data if the saved data is already in localStorage
if (saveSearch != null)
{
    saveSearch.forEach(city => {windowEl(city)})
}


windowEl.init()


