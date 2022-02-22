//Feature #1
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayTime = document.querySelector(".dayTime");
dayTime.innerHTML = `${day} ${hour}:${minutes}`;

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayForecast(response){
 let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="row">`;
  
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML + `
    <div class="col-2">
    <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)} </div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="80"/>
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
      <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
    </div>
    </div>
    `;
    }
  })

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  let apiKey = "74735326822fd761ab3cae03ca68c8d0";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}
function showWeather(response){
    let city = response.data.name
    let cityElement = document.querySelector("h1")
    cityElement.innerHTML = `${city}`
   
    let icon = response.data.weather[0].icon
    let iconElement = document.querySelector("#icon-source");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);

    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector(".current-temperature");
    temperatureElement.innerHTML = `${temperature}`;

    let weatherStatus = (response.data.weather[0].main);
    let weatherStatusElement = document.querySelector(".current-weather")
    weatherStatusElement.innerHTML = `${weatherStatus}`;

    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${wind} mph`;

    let humidity = (response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = ` ${humidity}%`;

    farenheitTemperature = response.data.main.temp;

    getForecast(response.data.coord);
}



function showLocation (position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "imperial";
    let apiKey = "74735326822fd761ab3cae03ca68c8d0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  
    axios.get(apiUrl).then(showWeather);

}

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(showLocation);
}


function search(city) {
let apiKey = "74735326822fd761ab3cae03ca68c8d0";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-City");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
  search(city.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);


let currentLocation = document.querySelector("#current-Location")
currentLocation.addEventListener("click", getCurrentLocation);

search("Houston");