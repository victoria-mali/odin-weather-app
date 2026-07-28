import clearDay from "./img/clear-day.jpg";
import partlyCloudyDay from "./img/partly-cloudy-day.jpg";
import rain from "./img/rain.jpg";
import clearNight from "./img/clear-night.jpg";
import snow from "./img/snow.jpg";
import fog from "./img/fog.jpg";
import partlyCloudyNight from "./img/partly-cloudy-night.jpg";
import cloudy from "./img/cloudy.jpg";
import wind from "./img/wind.jpg";
 

const weatherImages = {
  "clear-day": clearDay,
  "partly-cloudy-day": partlyCloudyDay,
  "rain": rain,
  "clear-night": clearNight,
  "snow": snow,
  "fog": fog,
  "partly-cloudy-night": partlyCloudyNight,
  "cloudy": cloudy, 
  "wind": wind,
};

const elements = {
  tempInfoDiv: document.querySelector(".temperature-info"),
  searchBar: document.getElementById("city-search"),
  searchBtn: document.querySelector(".search-btn"),
  temperature: document.querySelector(".temperature"),
  conditions: document.querySelector(".conditions"),
  feelslike: document.querySelector(".temp-feels-like"),
  location: document.querySelector(".location"),
  celsiusBtn: document.querySelector(".celsius-btn"),
  fahrenheitBtn: document.querySelector(".fahrenheit-btn"),
};

function renderWeather(weatherObj) {
  if (elements.celsiusBtn.classList.contains("active-btn")) {
    elements.temperature.textContent = weatherObj.tempC + "°C";
    elements.feelslike.textContent =
      "Feels like " + weatherObj.feelslikeC + "°C";
  } else if (elements.fahrenheitBtn.classList.contains("active-btn")) {
    elements.temperature.textContent = weatherObj.tempF + "°F";
    elements.feelslike.textContent =
      "Feels like " + weatherObj.feelslikeF + "°F";
  }
  elements.conditions.textContent = weatherObj.conditions;
  let icon = weatherObj.icon;
  let backgroundImg = weatherImages[icon];
  elements.tempInfoDiv.style.backgroundImage = `url(${backgroundImg})`;
  elements.tempInfoDiv.style.backgroundSize = "cover";
}

export { elements, renderWeather };
