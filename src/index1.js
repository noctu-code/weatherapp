let currentDate = new Date();
console.log(currentDate);

let currentDay = currentDate.getDay();
console.log(currentDay);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[currentDay];

let currentHour = currentDate.getHours();
console.log(currentHour);

let currentMinutes = currentDate.getMinutes();
console.log(currentMinutes);

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${currentHour}:${currentMinutes}`;

function changeCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector(".searchfield");
  let newCity = document.querySelector("#city-name");
  newCity.innerHTML = `${searchedCity.value.toUpperCase()}`;

  let apiKey = "285f7dfb6ea9613847e41d2341dd08f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.innerHTML}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityWeather);
}

let cityName = document.querySelector("#search-form");
cityName.addEventListener("submit", changeCity);

function showCityWeather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}

let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "285f7dfb6ea9613847e41d2341dd08f1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCurrentCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function showCurrentCity(response) {
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name.toUpperCase();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}
