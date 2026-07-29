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
  searchContainer: document.querySelector(".search-container"),
  searchBar: document.getElementById("city-search"),
  searchBtn: document.querySelector(".search-btn"),
  locationText: document.querySelector(".location-text"),
  celsiusBtn: document.querySelector(".celsius-btn"),
  fahrenheitBtn: document.querySelector(".fahrenheit-btn"),
  temperature: document.querySelector(".temperature"),
  conditions: document.querySelector(".conditions"),
  feelslike: document.querySelector(".temp-feels-like"),
  precip: document.querySelector(".precip"),
  precipprob: document.querySelector(".precipprob"),
  humidity: document.querySelector(".humidity"),
  sunrise: document.querySelector(".sunrise"),
  sunset: document.querySelector(".sunset"),
  uvindex: document.querySelector(".uvindex"),
  windspeed: document.querySelector(".windspeed"),
  pressure: document.querySelector(".pressure"),
  description: document.querySelector(".description"),
};

function capitalizeNames(name) {
  let nameArray = Array.from(name.split(/\s+/));
  let arrayLength = nameArray.length;

  if (arrayLength === 1) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  } else {
    let firstName =
      nameArray.at(0).charAt(0).toUpperCase() + nameArray.at(0).slice(1);
    let lastName =
      nameArray.at(-1).charAt(0).toUpperCase() + nameArray.at(-1).slice(1);
    let middleNames = nameArray.slice(1, -1);

    function capitalize(name) {
      let capitalName;
      return (capitalName = name.charAt(0).toUpperCase() + name.slice(1));
    }
    let capitalizedNames = middleNames.map(capitalize);
    let joinedNames = capitalizedNames.join(" ");

    return firstName + " " + joinedNames + " " + lastName;
  }
}

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
  let initializedLocation = capitalizeNames(weatherObj.location);
  elements.locationText.textContent = initializedLocation;

elements.description.textContent = weatherObj.description;
  elements.precip.textContent = weatherObj.precip;
  elements.precipprob.textContent = weatherObj.precipprob + "%";
  elements.humidity.textContent = weatherObj.humidity + "%";
  elements.sunrise.textContent = weatherObj.sunrise.slice(0, 5);
  elements.sunset.textContent = weatherObj.sunset.slice(0, 5);
  elements.uvindex.textContent = weatherObj.uvindex;
  elements.windspeed.textContent = weatherObj.windspeed + " km/h";
  elements.pressure.textContent = weatherObj.pressure + " mb";

  let icon = weatherObj.icon;
  let backgroundImg = weatherImages[icon];
  elements.tempInfoDiv.style.backgroundImage = `url(${backgroundImg})`;
  elements.tempInfoDiv.style.backgroundSize = "cover";
}

function throwError() {
  elements.temperature.textContent = "Error";
}

export { elements, renderWeather, throwError };
