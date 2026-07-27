import { elements, renderWeather } from "./dom.js";
import { processWeatherData } from "./api.js";

async function showWeather() {
  let searchValue = elements.searchBar.value;
  let weatherObj = await processWeatherData(searchValue);
  renderWeather(weatherObj);
}

elements.searchBtn.addEventListener("click", showWeather);
elements.celsiusBtn.addEventListener("click", (e) => {
  elements.celsiusBtn.classList.add("active-btn");
  elements.fahrenheitBtn.classList.remove("active-btn");

  showWeather();
});

elements.fahrenheitBtn.addEventListener("click", (e) => {
        elements.celsiusBtn.classList.remove("active-btn");

  elements.fahrenheitBtn.classList.add("active-btn");
  showWeather();
});
