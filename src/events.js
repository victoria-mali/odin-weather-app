import { elements, renderWeather, throwError } from "./dom.js";
import { processWeatherData } from "./api.js";

async function showWeather(location) {
  let weatherObj = await processWeatherData(location);
  if (!weatherObj) {
    throwError();
  } else {
    renderWeather(weatherObj);
  }
}

elements.searchBtn.addEventListener("click", (e) => {
  let searchValue = elements.searchBar.value;
  showWeather(searchValue);
});

elements.celsiusBtn.addEventListener("click", (e) => {
  elements.celsiusBtn.classList.add("active-btn");
  elements.fahrenheitBtn.classList.remove("active-btn");
  let currentLocation = elements.locationText.textContent;

  showWeather(currentLocation);
});

elements.fahrenheitBtn.addEventListener("click", (e) => {
  elements.celsiusBtn.classList.remove("active-btn");
  elements.fahrenheitBtn.classList.add("active-btn");
  let currentLocation = elements.locationText.textContent;

  showWeather(currentLocation);
});

/* document.addEventListener("DOMContentLoaded", async function (e) {
  let weatherObj = await processWeatherData("porto");
  renderWeather(weatherObj);
}); */
