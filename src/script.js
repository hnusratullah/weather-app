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

function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="row">`;
  let days = ["Thur", "Fri", "Sat", "Sun"];
  days.forEach(function(day) {
    forecastHTML = forecastHTML + `
    <div class="col-2">
    <div class="weather-forecast-date"> ${day} </div>
    <img src="http://openweathermap.org/img/wn/01n@2x.png" width="80"/>
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">80° </span>
      <span class="weather-forecast-temperature-min"> 18° </span>
    </div>
    </div>
    `;
  })

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "74735326822fd761ab3cae03ca68c8d0";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiURL);
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

search("New York");


let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);


let currentLocation = document.querySelector("#current-Location")
currentLocation.addEventListener("click", getCurrentLocation);

function showFarenheitTemperature(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  farenheitlink.classList.add("active");
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let celciusTemperature = (farenheitTemperature - 32) * 5/9;
  farenheitlink.classList.remove("active");
  celciusLink.classList.add("active");
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let farenheitlink = document.querySelector("#farenheit-link");
farenheitlink.addEventListener("click", showFarenheitTemperature);


let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

let farenheitTemperature = null;
