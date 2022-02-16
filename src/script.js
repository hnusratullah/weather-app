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

//Feature #2

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-City");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;

let apiKey = "74735326822fd761ab3cae03ca68c8d0";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showWeather);
}

function showWeather(response){
    let city = response.data.name
    let cityElement = document.querySelector("h1")
    cityElement.innerHTML = `${city}`
   
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);



let currentLocation = document.querySelector("#current-Location")
currentLocation.addEventListener("click", getCurrentLocation);

