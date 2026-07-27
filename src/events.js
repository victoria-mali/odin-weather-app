import { elements, renderWeather } from "./dom.js";
import { processWeatherData } from "./api.js";

async function showWeather() {
  let searchValue = elements.searchBar.value;
  let weatherObj = await processWeatherData(searchValue);
  showWeather(weatherObj);
}

elements.searchBtn.addEventListener("click", showWeather);
