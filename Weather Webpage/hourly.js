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

    getHourlyWeather(lat, lon);
}

function alertError() {
    alert("Please allow location to see the weather");
}

function getHourlyWeather(lat, lon) {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=674d13d1e2dffb08a8f5829bf90d68d0`;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => setHourlyInfo(data));
}

function setHourlyInfo(obj) {
    let body = document.querySelector("body");
    document.querySelector("#timezone").textContent = obj.timezone;
    for (let hourInfo of obj.hourly) {
        let div = document.createElement("div");
        let time = new Date(hourInfo.dt * 1000).toString();
        div.className = "hourly-info";
        div.innerHTML = `<div class="time-data">
                            <p class="time">${time.slice(16, 21)}</p>
                            <p class="date">${time.slice(0, 10)}</p>
                        </div>
                        <img src="img/icons/${hourInfo.weather[0].icon}.png">
                        <p>${Math.floor(parseInt(hourInfo.temp))}°C</p>
                        <ul class="extra">
                            <li>${
                                hourInfo.weather[0].description
                                    .slice(0, 1)
                                    .toUpperCase() +
                                hourInfo.weather[0].description.slice(1)
                            }</li>
                            <li>Feels like: ${Math.floor(
                                parseInt(hourInfo.feels_like)
                            )}°C</li>
                            <li>Humidity: ${hourInfo.humidity}%</li>
                            <li>Clouds: ${hourInfo.clouds}%</li>
                        </ul>`;
        body.appendChild(div);
    }
    overlay.style.display = "none";
}
