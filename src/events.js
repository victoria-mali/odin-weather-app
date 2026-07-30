import { elements, renderWeather, renderError, showLoading } from "./dom.js";
import { processWeatherData } from "./api.js";

let lastSearch;

async function showWeather(location) {
  showLoading();
  let weatherObj;
  try {
    weatherObj = await processWeatherData(location);
  } catch (error) {
    lastSearch = null;
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

elements.celsiusBtn.addEventListener("click", () => {
  elements.celsiusBtn.setAttribute("aria-pressed", "true");
  elements.fahrenheitBtn.setAttribute("aria-pressed", "false");
  if (!lastSearch) return;

  renderWeather(lastSearch);
});

elements.fahrenheitBtn.addEventListener("click", () => {
  elements.celsiusBtn.setAttribute("aria-pressed", "false");
  elements.fahrenheitBtn.setAttribute("aria-pressed", "true");
  if (!lastSearch) return;

  renderWeather(lastSearch);
});

document.addEventListener("DOMContentLoaded", async function () {
  showWeather("porto");
});
