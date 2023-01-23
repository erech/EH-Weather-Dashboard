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
windowEl.init()