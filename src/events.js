import {
  elements,
  renderWeather,
  renderError,
  renderForecast,
  showLoading,
} from "./dom.js";
import { processWeatherData } from "./api.js";

let lastSearch;
let forecast;

async function showWeather(location) {
  showLoading();
  let weatherObj;
  try {
    weatherObj = await processWeatherData(location);
    console.log(weatherObj);
  } catch (error) {
    lastSearch = null;
    renderError(error.message);
    return;
  }
  forecast = weatherObj.forecast;
  lastSearch = weatherObj.weather;
  renderWeather(lastSearch);
  renderForecast(forecast);
}

elements.searchContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = elements.searchBar.value;
  showWeather(searchValue);
});

elements.celsiusBtn.addEventListener("click", () => {
  elements.celsiusBtn.setAttribute("aria-pressed", "true");
  elements.fahrenheitBtn.setAttribute("aria-pressed", "false");
  if (!lastSearch) return;

  renderWeather(lastSearch);
  renderForecast(forecast);
});

elements.fahrenheitBtn.addEventListener("click", () => {
  elements.celsiusBtn.setAttribute("aria-pressed", "false");
  elements.fahrenheitBtn.setAttribute("aria-pressed", "true");
  if (!lastSearch) return;

  renderWeather(lastSearch);
  renderForecast(forecast);
});

document.addEventListener("DOMContentLoaded", async function () {
  showWeather("porto");
});