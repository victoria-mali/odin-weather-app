import clearDay from "./img/clear-day.jpg";
import partlyCloudyDay from "./img/partly-cloudy-day.jpg";
import rain from "./img/rain.jpg";
import clearNight from "./img/clear-night.jpg";
import snow from "./img/snow.jpg";
import fog from "./img/fog.jpg";
import partlyCloudyNight from "./img/partly-cloudy-night.jpg";
import cloudy from "./img/cloudy.jpg";
import wind from "./img/wind.jpg";

import clearDayIcon from "./img/icons/clear-day.svg";
import partlyCloudyDayIcon from "./img/icons/partly-cloudy-day.svg";
import rainIcon from "./img/icons/rain.svg";
import clearNightIcon from "./img/icons/clear-night.svg";
import snowIcon from "./img/icons/snow.svg";
import partlyCloudyNightIcon from "./img/icons/fog.svg";
import fogIcon from "./img/icons/partly-cloudy-night.svg";
import cloudyIcon from "./img/icons/cloudy.svg";
import windIcon from "./img/icons/wind.svg";

import { format } from "date-fns";

const weatherImages = {
  "clear-day": clearDay,
  "partly-cloudy-day": partlyCloudyDay,
  rain: rain,
  "clear-night": clearNight,
  snow: snow,
  fog: fog,
  "partly-cloudy-night": partlyCloudyNight,
  cloudy: cloudy,
  wind: wind,
};

const forecastIcons = {
  "clear-day": clearDayIcon,
  "partly-cloudy-day": partlyCloudyDayIcon,
  rain: rainIcon,
  "clear-night": clearNightIcon,
  snow: snowIcon,
  fog: fogIcon,
  "partly-cloudy-night": partlyCloudyNightIcon,
  cloudy: cloudyIcon,
  wind: windIcon,
};

const elements = {
  tempInfoDiv: document.querySelector(".temperature-info"),
  searchContainer: document.querySelector(".search-container"),
  searchBar: document.getElementById("city-search"),
  searchBtn: document.querySelector(".search-btn"),
  locationDiv: document.querySelector(".location"),
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
  errorMsg: document.querySelector(".error"),
  moreInfoDiv: document.querySelector(".more-info"),
  loader: document.querySelector(".loader"),
  status: document.querySelector(".status"),
  forecast: document.querySelector(".forecast"),
  forecastDayDiv: document.querySelectorAll(".forecast-day-div"),
  date: document.querySelector(".date"),
};

function setScreen(screen) {
  document.body.dataset.state = screen;
}

function capitalizeNames(name) {
  return name
    .split(/\s+/)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function renderForecast(forecast) {
  elements.forecastDayDiv.forEach((item) => {
    item.innerHTML = "";
    let itemId = Number(item.id);
    let forecastDay = document.createElement("p");
    forecastDay.classList.add("forecast-day");
    item.appendChild(forecastDay);
    let date = forecast[itemId].date;
    console.log(date);
    let formattedDate = format(date, "MMM d");
    forecastDay.textContent = formattedDate;

    let forecastIcon = document.createElement("img");
    forecastIcon.classList.add("forecast-icon");
    let icon = forecast[itemId].icon;
    forecastIcon.src = forecastIcons[icon];
    item.appendChild(forecastIcon);

    let forecastTemp = document.createElement("p");
    forecastTemp.classList.add("forecast-temp");
    item.appendChild(forecastTemp);
    if (elements.celsiusBtn.getAttribute("aria-pressed") === "true") {
      forecastTemp.textContent = forecast[itemId].tempC + "°C";
    } else if (elements.fahrenheitBtn.getAttribute("aria-pressed") === "true") {
      forecastTemp.textContent = forecast[itemId].tempF + "°F";
    }
  });
}

function renderWeather(weatherObj) {
  if (elements.celsiusBtn.getAttribute("aria-pressed") === "true") {
    elements.temperature.textContent = weatherObj.tempC + "°C";
    elements.feelslike.textContent =
      "Feels like " + weatherObj.feelslikeC + "°C";
  } else if (elements.fahrenheitBtn.getAttribute("aria-pressed") === "true") {
    elements.temperature.textContent = weatherObj.tempF + "°F";
    elements.feelslike.textContent =
      "Feels like " + weatherObj.feelslikeF + "°F";
  }

  if (weatherObj.precip === null) {
    elements.precip.textContent = "0";
  } else {
    elements.precip.textContent = weatherObj.precip;
  }

  let date = weatherObj.date;
  elements.date.textContent = "Today, " + format(date, "do LLLL");
  elements.conditions.textContent = weatherObj.conditions;
  let initializedLocation = capitalizeNames(weatherObj.location);
  elements.locationText.textContent = initializedLocation;
  elements.description.textContent = weatherObj.description;
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

  elements.status.textContent = `${initializedLocation}: ${elements.temperature.textContent}, ${weatherObj.conditions}`;

  setScreen("data");
}

function renderError(message) {
  elements.errorMsg.textContent = message;
  elements.status.textContent = message;

  setScreen("error");
}

function showLoading() {
  elements.status.textContent = "Loading weather…";
  setScreen("loading");
}

export { elements, renderWeather, renderError, renderForecast, showLoading };
