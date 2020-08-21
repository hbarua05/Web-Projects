const time = document.querySelector("#time");
const timezone = document.querySelector("#timezone");
const temp = document.querySelector("#temp");
const feel = document.querySelector("#feel");
const description = document.querySelector("#description");
const icon = document.querySelector(".icon");
const infoList = document.querySelectorAll("li");
const sunriseTime = document.querySelector(".sunrise p");
const sunsetTime = document.querySelector(".sunset p");

let overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.backgroundColor = "rgba(0,0,0,0.75)";
document.querySelector("body").appendChild(overlay);

if (window.navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, alertError);
}

function setPosition(pos) {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    getWeather(lat, lon);
}

function alertError() {
    alert("Please allow location to see the weather");
}

function getWeather(lat, lon) {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid={OpenWeatherMapAPIkey}`;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => setInfo(data));
}

function setInfo(obj) {
    time.textContent =
        new Date(obj.current.dt * 1000).toString().slice(16, 21) +
        " (" +
        new Date(obj.current.dt * 1000).toString().slice(25, 31) +
        ")";
    timezone.textContent = obj.timezone;
    temp.textContent = Math.floor(parseInt(obj.current.temp)) + "°";
    feel.textContent =
        "Feels like " + Math.floor(parseInt(obj.current.feels_like)) + "°C";
    description.textContent =
        obj.current.weather[0].description.slice(0, 1).toUpperCase() +
        obj.current.weather[0].description.slice(1);
    icon.src = `img/icons/${obj.current.weather[0].icon}.png`;

    infoList[0].textContent = "Midday UV Index: " + obj.current.uvi;
    infoList[1].textContent = "Humidity: " + obj.current.humidity + "%";
    infoList[2].textContent = "Clouds: " + obj.current.clouds + "%";
    infoList[3].textContent =
        "Visibility: " + obj.current.visibility / 1000 + "km";
    infoList[4].textContent = "Wind Speed: " + obj.current.wind_speed + "m/s";
    infoList[5].textContent = "Dew Point: " + obj.current.dew_point + "°C";
    infoList[6].textContent = "Pressure: " + obj.current.pressure + "hPa";

    sunriseTime.textContent = new Date(obj.current.sunrise * 1000)
        .toString()
        .slice(16, 21);

    sunsetTime.textContent = new Date(obj.current.sunset * 1000)
        .toString()
        .slice(16, 21);
    overlay.style.display = "none";
}
