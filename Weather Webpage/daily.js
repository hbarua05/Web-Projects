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

    getDailyWeather(lat, lon);
}

function alertError() {
    alert("Please allow location to see the weather");
}

function getDailyWeather(lat, lon) {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=674d13d1e2dffb08a8f5829bf90d68d0`;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => setDailyInfo(data));
}

function setDailyInfo(obj) {
    let body = document.querySelector("body");
    document.querySelector("#timezone").textContent = obj.timezone;
    for (let dailyInfo of obj.daily) {
        let div = document.createElement("div");
        let time = new Date(dailyInfo.dt * 1000).toString();
        div.className = "daily-info";
        div.innerHTML = `<div class="time-data">
                            <p class="day">${time.slice(0, 3)}</p>
                            <p class="date">${time.slice(4, 11)}</p>
                        </div>
                        <img src="img/icons/${dailyInfo.weather[0].icon}.png">
                        <p>${Math.floor(
                            parseInt(dailyInfo.temp.max)
                        )}°<span>/${Math.floor(
            parseInt(dailyInfo.temp.min)
        )}°C</span></p>
                        <ul class="extra">
                            <li>${
                                dailyInfo.weather[0].description
                                    .slice(0, 1)
                                    .toUpperCase() +
                                dailyInfo.weather[0].description.slice(1)
                            }</li>
                            <li>Midday UV Index: ${Math.floor(
                                parseInt(dailyInfo.uvi)
                            )}</li>
                            <li>Humidity: ${dailyInfo.humidity}%</li>
                            <li>Clouds: ${dailyInfo.clouds}%</li>
                        </ul>`;
        body.appendChild(div);
    }
    overlay.style.display = "none";
}
