import { elements, renderWeather, renderError, showLoading } from "./dom.js";
import { processWeatherData } from "./api.js";

let lastSearch;

async function showWeather(location) {
    showLoading();
  let weatherObj;
  try {
    weatherObj = await processWeatherData(location);
  } catch (error) {
    renderError(error.message);
    return;
  }
  lastSearch = weatherObj;
  renderWeather(lastSearch);
}

elements.searchContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchValue = elements.searchBar.value;
  showWeather(searchValue);
});

elements.celsiusBtn.addEventListener("click", (e) => {
  elements.celsiusBtn.classList.add("active-btn");
  elements.fahrenheitBtn.classList.remove("active-btn");

  renderWeather(lastSearch);
});

elements.fahrenheitBtn.addEventListener("click", (e) => {
  elements.celsiusBtn.classList.remove("active-btn");
  elements.fahrenheitBtn.classList.add("active-btn");

  renderWeather(lastSearch);
});

/* document.addEventListener("DOMContentLoaded", async function (e) {
  showWeather("porto");
}); */
